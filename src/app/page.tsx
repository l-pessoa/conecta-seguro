'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Key, Link as LinkIcon, Drama, EyeOff, Share2, TriangleAlert } from 'lucide-react';
import { introBeats } from '@/content/intro';
import { DialogueBox } from '@/components/scene/DialogueBox';
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

  const [beatIndex, setBeatIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [showTopics, setShowTopics] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

  const beat = introBeats[beatIndex];
  const isLastBeat = beatIndex === introBeats.length - 1;

  function goNextBeat() {
    if (isLastBeat) {
      setShowConsent(true);
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

  if (showConsent) {
    return <ConsentGate onAccept={handleAccept} />;
  }

  return (
    <main className="intro-screen">
      {!showTopics && !showCta && (
        <DialogueBox line={{ text: beat.lines[lineIndex] }} onAdvance={advanceLine} />
      )}

      {showTopics && beat.topics && (
        <div className="intro-topics panel">
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
          <Button onClick={advanceLine}>Continuar</Button>
        </div>
      )}

      {showCta && beat.cta && (
        <div className="intro-cta panel">
          <Button onClick={goNextBeat}>{beat.cta}</Button>
        </div>
      )}
    </main>
  );
}
