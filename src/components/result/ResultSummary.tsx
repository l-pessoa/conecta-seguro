import type { QuizResult } from '@/lib/types';

interface ResultSummaryProps {
  pre: QuizResult | null;
  post: QuizResult | null;
}

export function ResultSummary({ pre, post }: ResultSummaryProps) {
  if (!pre || !post) {
    return (
      <div className="result-summary panel">
        <p>Ainda faltam etapas pra ver o resultado completo.</p>
      </div>
    );
  }

  const competencies = Array.from(new Set([...Object.keys(pre.byCompetency), ...Object.keys(post.byCompetency)]));

  return (
    <div className="result-summary panel">
      <h2>Seu resultado</h2>
      <p className="result-overview">
        Antes: {pre.correct}/{pre.total} · Depois: {post.correct}/{post.total}
      </p>
      <table className="result-table">
        <thead>
          <tr>
            <th>Competência</th>
            <th>Antes</th>
            <th>Depois</th>
          </tr>
        </thead>
        <tbody>
          {competencies.map((c) => (
            <tr key={c}>
              <td>{c}</td>
              <td>{pre.byCompetency[c] ? `${pre.byCompetency[c].correct}/${pre.byCompetency[c].total}` : '—'}</td>
              <td>{post.byCompetency[c] ? `${post.byCompetency[c].correct}/${post.byCompetency[c].total}` : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="result-note">
        Esse número mede apenas o instrumento, não o quanto você aprendeu na vida real — mas é um
        bom sinal de que algo mudou na forma como você olha pra essas situações.
      </p>
    </div>
  );
}
