'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Key, Link as LinkIcon, Drama, EyeOff, Share2, TriangleAlert } from 'lucide-react';
import { introBeats } from '@/content/intro';
import { DialogueBox } from '@/components/scene/DialogueBox';
import { ParallaxBackground } from '@/components/scene/ParallaxBackground';
import { ConsentGate } from '@/components/ui/ConsentGate';
import { Button } from '@/components/ui/Button';
import { getOrCreateParticipant, recordConsent } from '@/lib/participant';

const ICONS = {
  key: Key,
  link: LinkIcon,
  drama: Drama,
  'eye-off': EyeOff,
  'share-2': Share2,
  'triangle-alert': TriangleAlert,
} as const;

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
  const [beatIndex, setBeatIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [showTopics, setShowTopics] = useState(false);
  const [showCta, setShowCta] = useState(false);

  const beat = introBeats[beatIndex];
  const isLastBeat = beatIndex === introBeats.length - 1;

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
    router.push('/diagnostico');
  }

  if (view === 'consent') {
    return <ConsentGate onAccept={handleAccept} />;
  }

  if (view === 'hero') {
    return (
      <div className="stage-shell">
        <ParallaxBackground env="hero" />
        <div className="hero-content">
          <h1 className="hero-title">ConectaSeguro</h1>
          <p className="hero-tagline">
            Uma pequena aventura sobre as decisões que a gente toma todo dia sem perceber.
          </p>
          <Button onClick={() => setView('intro')}>Começar</Button>
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
