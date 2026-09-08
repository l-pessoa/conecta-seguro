'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Key, Link as LinkIcon, Drama, EyeOff, Share2, TriangleAlert } from 'lucide-react';
import { introBeats } from '@/content/intro';
import { DialogueBox } from '@/components/scene/DialogueBox';
import { ParallaxBackground } from '@/components/scene/ParallaxBackground';
import { ConsentGate } from '@/components/ui/ConsentGate';
import { Button } from '@/components/ui/Button';
import { VirusIcon } from '@/components/ui/VirusIcon';
import { getOrCreateParticipant, recordConsent } from '@/lib/participant';

const ICONS = {
  key: Key,
  link: LinkIcon,
  drama: Drama,
  'eye-off': EyeOff,
  'share-2': Share2,
  'triangle-alert': TriangleAlert,
} as const;

const FLOATING_ICONS = [
  { Icon: Key, top: '14%', left: '12%', delay: '0s', duration: '9s' },
  { Icon: LinkIcon, top: '68%', left: '8%', delay: '1.2s', duration: '11s' },
  { Icon: Drama, top: '22%', left: '84%', delay: '2.4s', duration: '8s' },
  { Icon: EyeOff, top: '78%', left: '80%', delay: '0.6s', duration: '10s' },
  { Icon: Share2, top: '48%', left: '92%', delay: '3s', duration: '9s' },
  { Icon: TriangleAlert, top: '85%', left: '45%', delay: '1.8s', duration: '7.5s' },
] as const;

type View = 'hero' | 'intro' | 'consent';

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <IntroFlow />
    </Suspense>
  );
}

function IntroFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [view, setView] = useState<View>('hero');
  const [exploring, setExploring] = useState(false);
  const [beatIndex, setBeatIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [showTopics, setShowTopics] = useState(false);
  const [showCta, setShowCta] = useState(false);

  const beat = introBeats[beatIndex];
  const isLastBeat = beatIndex === introBeats.length - 1;

  function startTour() {
    setExploring(false);
    setView('intro');
  }

  function startExploring() {
    setExploring(true);
    setView('consent');
  }

  function goNextBeat() {
    if (isLastBeat) {
      setView('consent');
      return;
    }
    setBeatIndex((i) => i + 1);
    setLineIndex(0);
    setShowTopics(false);
    setShowCta(false);
  }

  function advanceLine() {
    if (lineIndex + 1 < beat.lines.length) {
      setLineIndex((i) => i + 1);
      return;
    }
    if (beat.topics && !showTopics) {
      setShowTopics(true);
      return;
    }
    if (beat.cta && !showCta) {
      setShowCta(true);
      return;
    }
    goNextBeat();
  }

  function handleAccept() {
    getOrCreateParticipant(searchParams.get('t'));
    recordConsent();
    router.push(exploring ? '/diagnostico?next=modulos' : '/diagnostico');
  }

  if (view === 'consent') {
    return <ConsentGate onAccept={handleAccept} />;
  }

  if (view === 'hero') {
    return (
      <div className="stage-shell">
        <ParallaxBackground env="hero" />
        <div className="hero-floating-icons" aria-hidden="true">
          {FLOATING_ICONS.map(({ Icon, top, left, delay, duration }, i) => (
            <Icon
              key={i}
              size={26}
              className="hero-floating-icon"
              style={{ top, left, animationDelay: delay, animationDuration: duration }}
            />
          ))}
        </div>
        <div className="hero-content">
          <VirusIcon size={64} className="hero-virus reveal-1" />
          <h1 className="hero-welcome reveal-1">Bem-vindo</h1>
          <p className="hero-tagline reveal-2">
            Uma jornada sobre as decisões que a gente toma todo dia sem perceber.
          </p>
          <p className="hero-question reveal-3">Vamos começar?</p>
          <div className="hero-buttons reveal-4">
            <Button onClick={startTour}>Começar o tour</Button>
            <Button variant="ghost" onClick={startExploring}>
              Explorar livremente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stage-shell">
      <ParallaxBackground env="hero" />
      <div className="intro-content">
        {!showTopics && !showCta && (
          <DialogueBox line={{ text: beat.lines[lineIndex] }} onAdvance={advanceLine} />
        )}

        {showTopics && beat.topics && (
          <div className="intro-topics">
            <p>{beat.lines[0]}</p>
            <ul className="intro-topic-list">
              {beat.topics.map((topic) => {
                const Icon = ICONS[topic.icon];
                return (
                  <li key={topic.label}>
                    <Icon size={20} aria-hidden="true" />
                    <div>
                      <strong>{topic.label}</strong>
                      <span>{topic.hint}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="intro-cta">
              <Button onClick={advanceLine}>Continuar</Button>
            </div>
          </div>
        )}

        {showCta && beat.cta && (
          <div className="intro-cta">
            <Button onClick={goNextBeat}>{beat.cta}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
