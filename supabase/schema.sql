-- ConectaSeguro: banco no Supabase (projeto conecta-seguro, sa-east-1). Ja aplicado.
-- Este arquivo e o retrato completo do banco; para recriar num projeto novo, cole no SQL Editor e rode.
-- Nenhum dado pessoal: so codigo pseudonimo (ex.: CS-7F3K).
--
-- Seguranca em uma frase: todas as tabelas sao trancadas (RLS ligado, sem policy) e a UNICA porta
-- de escrita sao as 3 funcoes cs_*, que validam tudo, so gravam e nao devolvem dados. Por isso o
-- site usa so a chave publica (publishable) e nao precisa de nenhuma chave secreta.

-- ============ TABELAS ============

create table if not exists participants (
  code        text primary key,
  session_tag text,
  consent_at  timestamptz,
  created_at  timestamptz not null default now()
);

create table if not exists quiz_responses (
  id               bigint generated always as identity primary key,
  participant_code text not null references participants(code),
  form             text not null check (form in ('A','B')),
  phase            text not null check (phase in ('pre','post')),
  answers          jsonb not null,        -- [{itemId, optionId}] (inclui "nao_sei")
  score            int not null,          -- acertos, calculados no banco (nunca mostrados no site)
  total            int not null,
  unsure           int not null default 0, -- quantos "nao sei"
  by_competency    jsonb not null,
  created_at       timestamptz not null default now(),
  unique (participant_code, phase)        -- 1 pre e 1 pos por pessoa; reenvio nao duplica
);

create table if not exists journey_events (
  id               bigint generated always as identity primary key,
  participant_code text not null references participants(code),
  type             text not null,
  ref              text not null,
  at               timestamptz not null,
  created_at       timestamptz not null default now(),
  unique (participant_code, type, ref, at)
);
create index if not exists journey_events_participant_idx on journey_events (participant_code);

-- Gabarito do quiz. Precisa bater com src/lib/server/gabarito.ts (tests/quiz.test.ts confere).
create table if not exists gabarito (
  form       text not null check (form in ('A','B')),
  item_id    text not null,
  correct    text not null check (correct in ('A','B','C','D')),
  competency text not null,
  primary key (form, item_id)
);

alter table participants    enable row level security;
alter table quiz_responses  enable row level security;
alter table journey_events  enable row level security;
alter table gabarito        enable row level security;
revoke all on participants, quiz_responses, journey_events, gabarito from anon, authenticated;

insert into public.gabarito (form,item_id,correct,competency) values
('A','a-m1-1','A','Senhas'),
('A','a-m1-2','D','Segurança de contas'),
('A','a-m2-1','B','Verificação de links'),
('A','a-m2-2','C','QR Codes e destinos de links'),
('A','a-m3-1','D','Engenharia social'),
('A','a-m3-2','A','Autenticação'),
('A','a-m4-1','C','Exposição acidental'),
('A','a-m4-2','B','Permissões de aplicativos'),
('A','a-m5-1','D','Identidade digital'),
('A','a-m5-2','A','Audiência e contexto em redes sociais'),
('A','a-m6-1','B','Golpes contextualizados'),
('A','a-m6-2','C','Proteção e recuperação de acesso'),
('B','b-m1-1','B','Senhas'),
('B','b-m1-2','C','Segurança de contas'),
('B','b-m2-1','A','Verificação de links'),
('B','b-m2-2','D','QR Codes e destinos de links'),
('B','b-m3-1','C','Engenharia social'),
('B','b-m3-2','B','Autenticação'),
('B','b-m4-1','D','Exposição acidental'),
('B','b-m4-2','A','Permissões de aplicativos'),
('B','b-m5-1','B','Identidade digital'),
('B','b-m5-2','C','Audiência e contexto em redes sociais'),
('B','b-m6-1','D','Golpes contextualizados'),
('B','b-m6-2','A','Proteção e recuperação de acesso')
on conflict (form, item_id) do update set correct = excluded.correct, competency = excluded.competency;

-- ============ FUNCOES (unica porta de escrita) ============

-- 1) Participante: devolve true se o codigo e novo.
create or replace function public.cs_registrar_participante(
  p_code text, p_session_tag text default null, p_consent_at timestamptz default null
) returns boolean
language plpgsql security definer set search_path = ''
as $$
declare v_novo boolean;
begin
  if p_code is null or p_code !~ '^CS-[A-Z0-9]{4,6}$' then raise exception 'codigo invalido'; end if;
  if p_session_tag is not null and length(p_session_tag) > 60 then raise exception 'tag invalida'; end if;
  insert into public.participants (code, session_tag, consent_at)
  values (p_code, p_session_tag, p_consent_at)
  on conflict (code) do update
    set session_tag = coalesce(public.participants.session_tag, excluded.session_tag),
        consent_at  = coalesce(public.participants.consent_at, excluded.consent_at)
  returning (xmax = 0) into v_novo;
  return v_novo;
end $$;

-- 2) Quiz: recebe so as respostas; a correcao acontece aqui, com o gabarito trancado.
create or replace function public.cs_salvar_quiz(
  p_code text, p_form text, p_phase text, p_answers jsonb
) returns void
language plpgsql security definer set search_path = ''
as $$
declare
  v_n int; v_distintos int; v_validos int;
  v_score int; v_total int; v_unsure int; v_comp jsonb;
begin
  if p_code is null or p_code !~ '^CS-[A-Z0-9]{4,6}$' then raise exception 'codigo invalido'; end if;
  if p_form not in ('A','B') or p_phase not in ('pre','post') then raise exception 'forma invalida'; end if;
  if jsonb_typeof(p_answers) <> 'array' then raise exception 'respostas invalidas'; end if;
  v_n := jsonb_array_length(p_answers);
  if v_n < 1 or v_n > 30 then raise exception 'respostas invalidas'; end if;

  select count(distinct a->>'itemId'),
         count(*) filter (where g.item_id is not null and a->>'optionId' in ('A','B','C','D','nao_sei'))
    into v_distintos, v_validos
    from jsonb_array_elements(p_answers) a
    left join public.gabarito g on g.form = p_form and g.item_id = a->>'itemId';
  if v_distintos <> v_n or v_validos <> v_n then raise exception 'respostas invalidas'; end if;

  select count(*) into v_total from public.gabarito where form = p_form;
  select count(*) filter (where a->>'optionId' = g.correct),
         count(*) filter (where a->>'optionId' = 'nao_sei')
    into v_score, v_unsure
    from jsonb_array_elements(p_answers) a
    join public.gabarito g on g.form = p_form and g.item_id = a->>'itemId';
  select coalesce(jsonb_object_agg(competency, jsonb_build_object('total', t, 'correct', c)), '{}'::jsonb)
    into v_comp
    from (
      select g.competency, count(*) as t,
             count(*) filter (where a->>'optionId' = g.correct) as c
        from public.gabarito g
        left join jsonb_array_elements(p_answers) a on a->>'itemId' = g.item_id
       where g.form = p_form
       group by g.competency
    ) s;

  insert into public.participants (code) values (p_code) on conflict (code) do nothing;
  insert into public.quiz_responses (participant_code, form, phase, answers, score, total, unsure, by_competency)
  values (p_code, p_form, p_phase, p_answers, v_score, v_total, v_unsure, v_comp)
  on conflict (participant_code, phase) do update
    set form = excluded.form, answers = excluded.answers, score = excluded.score,
        total = excluded.total, unsure = excluded.unsure, by_competency = excluded.by_competency;
end $$;

-- 3) Eventos da jornada (reenvio nao duplica). Devolve quantos chegaram.
create or replace function public.cs_registrar_eventos(p_code text, p_events jsonb)
returns int
language plpgsql security definer set search_path = ''
as $$
declare v_n int;
begin
  if p_code is null or p_code !~ '^CS-[A-Z0-9]{4,6}$' then raise exception 'codigo invalido'; end if;
  if jsonb_typeof(p_events) <> 'array' then raise exception 'eventos invalidos'; end if;
  v_n := jsonb_array_length(p_events);
  if v_n < 1 or v_n > 50 then raise exception 'eventos invalidos'; end if;
  if exists (
    select 1 from jsonb_array_elements(p_events) e
     where coalesce(length(e->>'type'), 0) not between 1 and 40
        or coalesce(length(e->>'ref'), 0) > 80
        or e->>'at' is null
  ) then raise exception 'eventos invalidos'; end if;

  insert into public.participants (code) values (p_code) on conflict (code) do nothing;
  insert into public.journey_events (participant_code, type, ref, at)
  select p_code, e->>'type', coalesce(e->>'ref', ''), (e->>'at')::timestamptz
    from jsonb_array_elements(p_events) e
  on conflict (participant_code, type, ref, at) do nothing;
  return v_n;
end $$;

-- So o papel publico (anon) chama as funcoes; o site nao usa login.
revoke all on function public.cs_registrar_participante(text, text, timestamptz) from public, authenticated;
revoke all on function public.cs_salvar_quiz(text, text, text, jsonb) from public, authenticated;
revoke all on function public.cs_registrar_eventos(text, jsonb) from public, authenticated;
grant execute on function public.cs_registrar_participante(text, text, timestamptz) to anon;
grant execute on function public.cs_salvar_quiz(text, text, text, jsonb) to anon;
grant execute on function public.cs_registrar_eventos(text, jsonb) to anon;

-- ============ ANALISE ============

-- Uma linha por pessoa. Rode `select * from analise_pre_pos;` no SQL Editor e baixe o CSV.
create or replace view analise_pre_pos with (security_invoker = on) as
select p.code,
       p.session_tag,
       pre.score  as pre_acertos,
       post.score as pos_acertos,
       post.score - pre.score as ganho,
       pre.unsure  as pre_nao_sei,
       post.unsure as pos_nao_sei
from participants p
left join quiz_responses pre  on pre.participant_code  = p.code and pre.phase  = 'pre'
left join quiz_responses post on post.participant_code = p.code and post.phase = 'post';
revoke all on analise_pre_pos from anon, authenticated;
