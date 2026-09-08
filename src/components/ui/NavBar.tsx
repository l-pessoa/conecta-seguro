'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '/', label: 'Início' },
  { href: '/modulos', label: 'Módulos' },
  { href: '/diagnostico', label: 'Diagnóstico' },
  { href: '/avaliacao', label: 'Avaliação final' },
  { href: '/resultado', label: 'Resultado' },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        <Link href="/" className="navbar-brand" onClick={() => setOpen(false)}>
          ConectaSeguro
        </Link>
        <button
          type="button"
          className="navbar-toggle"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {open && (
        <div className="navbar-drawer">
          <nav className="navbar-drawer-links">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="navbar-drawer-hint">Você pode sair e voltar quando quiser — seu progresso fica salvo.</p>
        </div>
      )}
    </>
  );
}
