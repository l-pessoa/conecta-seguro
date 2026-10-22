-- ConectaSeguro: 3 tabelas. Ja aplicado no projeto Supabase conecta-seguro (sa-east-1).
-- Nenhum dado pessoal: so codigo pseudonimo (ex.: CS-7F3K).

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
  score            int not null,          -- acertos (so para analise, nunca mostrado no site)
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

-- RLS ligado e SEM nenhuma policy = o navegador (chave anon) nao le nem escreve nada.
-- So o servidor, com a service role key, acessa.
alter table participants    enable row level security;
alter table quiz_responses  enable row level security;
alter table journey_events  enable row level security;
revoke all on participants, quiz_responses, journey_events from anon, authenticated;

create index if not exists journey_events_participant_idx on journey_events (participant_code);

-- View pronta para a analise pre/pos (uma linha por pessoa).
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
