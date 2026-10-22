import Link from 'next/link';
import { ArrowRight, Check } from '@nsmr/pixelart-react';
import { home, modules } from '@/content/modules';
import { HeroHeading } from '@/components/landing/HeroHeading';
import { HookChat } from '@/components/landing/HookChat';
import { ThemeMarquee } from '@/components/landing/ThemeMarquee';
import { ScrubText } from '@/components/landing/ScrubText';
import { ModuleStack } from '@/components/landing/ModuleStack';
import { Reveal } from '@/components/landing/Reveal';
import { Cart, Notification } from '@nsmr/pixelart-react';

export default function LandingPage() {
  return (
    <>
      <header className="top">
        <div className="wrap">
          <Link className="logo" href="/">ConectaSeguro</Link>
          <Link className="btn" href="/entrar" aria-label={home.cta}><span className="cta-long">{home.cta}</span><span className="cta-short" aria-hidden="true">Começar</span></Link>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <HeroHeading />
              <p className="hero-sub rise" style={{ ['--i' as string]: 0 }}>{home.subtitulo}</p>
              <div className="hero-cta rise" style={{ ['--i' as string]: 1 }}>
                <Link className="btn btn--lg" href="/entrar">
                  {home.cta} <ArrowRight className="btn-arrow" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="chat-wrap rise" style={{ ['--i' as string]: 2 }}>
              <div className="float-chip fc1" aria-hidden="true"><Notification size={20} /> Novo login detectado</div>
              <div className="float-chip fc2" aria-hidden="true"><Cart size={20} /> Seu pedido foi entregue?</div>
              <HookChat gancho={home.gancho} cta={home.cta} />
            </div>
          </div>
        </section>

        <ThemeMarquee temas={home.temas} />

        <section className="sec">
          <div className="wrap">
            <ScrubText text="Você não precisa saber reconhecer todos os problemas da internet. Precisa saber parar, pensar e escolher o próximo passo." />
          </div>
        </section>

        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap how">
            <h2>{home.comoFunciona.titulo}</h2>
            <ol className="steps">
              {home.comoFunciona.passos.map((p, i) => (
                <Reveal as="li" key={p} delay={i * 0.1}>
                  <span>{p}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: 0 }} id="modulos">
          <div className="wrap">
            <h2>{home.fatos[0]}</h2>
            <p className="sec-lede">{home.fatos.slice(1).join('. ')}.</p>
            <ModuleStack modulos={modules} />
          </div>
        </section>

        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="priv">
              <h2>Seu nome não é pedido.</h2>
              <ul>
                {home.privacidade.map((t, i) => (
                  <Reveal as="li" key={t} delay={i * 0.12}>
                    <Check className="ico" aria-hidden="true" />
                    {t}
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2>Perguntas rápidas</h2>
            <div className="faq">
              {home.faq.map((f) => (
                <details key={f.p}>
                  <summary>{f.p}</summary>
                  <p>{f.r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final">
          <div className="wrap">
            <h2>Bora começar?</h2>
            <Link className="btn btn--lg" href="/entrar">
              {home.cta} <ArrowRight className="btn-arrow" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <span>ConectaSeguro, projeto de extensão universitária.</span>
        </div>
      </footer>
    </>
  );
}
