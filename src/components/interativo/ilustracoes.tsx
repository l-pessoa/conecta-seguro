import type { ReactNode } from 'react';
import { Box, Disc, Ell, Oct, PixelSvg, R, Spr, Texto } from './pixel';
import s from './ilustracoes.module.css';

/**
 * Sistema de ilustracao em pixel art: grade 80x60 (1 pixel = 4 px), contorno de tinta de 1 pixel,
 * paleta de 10 cores (pixel.tsx). Animacoes so com steps() em transform/opacity (ilustracoes.module.css).
 * Os pontos de toque (slots) ficam em coordenadas do viewBox 320x240 (= grade x 4).
 */
export type ArtId = 'cofre' | 'celular-link' | 'mascara-anzol' | 'olho-foto' | 'perfil-post' | 'placa-pare' | 'mesa';

export interface Slot { id: string; x: number; y: number; r: number; label: string }
export interface Cena { Draw: () => ReactNode; slots: Slot[]; titulo: string }

const G = ({ c, children }: { c: string; children: ReactNode }) => <g className={s[c]}>{children}</g>;
const Chao = ({ x = 12, w = 56 }: { x?: number; w?: number }) => <R x={x} y={54} w={w} h={2} c="l" />;

/* ---------- M1: cofre ---------- */
const cofre: Cena = {
  titulo: 'Cofre com cadeado e chave',
  slots: [
    { id: 'combinacao', x: 160, y: 112, r: 30, label: 'Combinação do cofre' },
    { id: 'cadeado', x: 252, y: 176, r: 26, label: 'Cadeado' },
    { id: 'chave', x: 66, y: 178, r: 26, label: 'Chave' },
  ],
  Draw: () => (
    <>
      <Chao />
      <Box x={18} y={8} w={44} h={44} c="l" sombra />
      <Box x={21} y={11} w={38} h={38} c="m" />
      <R x={23} y={52} w={6} h={2} c="k" /><R x={51} y={52} w={6} h={2} c="k" />
      <Disc cx={40} cy={28} r={10} c="g" />
      <Disc cx={40} cy={28} r={3} c="k" />
      <G c="f1"><R x={39} y={19} w={2} h={4} c="k" /><R x={39} y={34} w={2} h={4} c="k" /><R x={31} y={27} w={4} h={2} c="k" /><R x={45} y={27} w={4} h={2} c="k" /></G>
      <G c="f2"><R x={33} y={21} w={2} h={2} c="k" /><R x={45} y={21} w={2} h={2} c="k" /><R x={33} y={33} w={2} h={2} c="k" /><R x={45} y={33} w={2} h={2} c="k" /></G>
      <Box x={54} y={24} w={5} h={9} c="y" />
      <G c="sway">
        <R x={60} y={37} w={2} h={7} c="k" /><R x={66} y={37} w={2} h={7} c="k" /><R x={62} y={35} w={4} h={2} c="k" />
        <Box x={58} y={43} w={12} h={10} c="y" />
        <R x={63} y={46} w={2} h={4} c="k" />
      </G>
      <G c="bob">
        <Disc cx={10} cy={44} r={4} c="g" />
        <R x={9} y={43} w={2} h={2} c="w" />
        <R x={14} y={43} w={14} h={2} c="k" /><R x={22} y={45} w={2} h={3} c="k" /><R x={26} y={45} w={2} h={2} c="k" />
      </G>
    </>
  ),
};

/* ---------- M2: celular com link ---------- */
const celularLink: Cena = {
  titulo: 'Celular com mensagem e link',
  slots: [
    { id: 'remetente', x: 160, y: 62, r: 28, label: 'Quem mandou' },
    { id: 'link', x: 160, y: 126, r: 30, label: 'Link da mensagem' },
    { id: 'botao', x: 160, y: 182, r: 26, label: 'Botão de ação' },
  ],
  Draw: () => (
    <>
      <Chao />
      <Box x={26} y={2} w={28} h={54} c="w" sombra />
      <R x={37} y={4} w={6} h={1} c="k" />
      <Box x={29} y={7} w={22} h={44} c="l" o="m" />
      <Disc cx={34} cy={13} r={3} c="g" />
      <R x={39} y={11} w={10} h={1} c="k" /><R x={39} y={14} w={7} h={1} c="m" />
      <Box x={31} y={19} w={18} h={7} c="w" />
      <R x={33} y={21} w={12} h={1} c="m" /><R x={33} y={23} w={8} h={1} c="m" />
      <G c="blip"><Box x={31} y={28} w={18} h={6} c="g" /></G>
      <R x={33} y={32} w={14} h={1} c="k" />
      <Box x={33} y={42} w={14} h={7} c="y" />
      <R x={36} y={45} w={8} h={1} c="k" />
      <G c="cursor">
        <Spr x={60} y={46} rows={['k.......', 'kk......', 'kwk.....', 'kwwk....', 'kwwwk...', 'kwwwwk..', 'kwwkkkk.', 'kwk.....', 'kk......']} />
      </G>
    </>
  ),
};

/* ---------- M3: mascara e anzol ---------- */
const mascaraAnzol: Cena = {
  titulo: 'Máscara e anzol na água',
  slots: [
    { id: 'mascara', x: 118, y: 92, r: 38, label: 'Máscara' },
    { id: 'anzol', x: 214, y: 150, r: 30, label: 'Anzol' },
    { id: 'isca', x: 252, y: 70, r: 28, label: 'Isca' },
  ],
  Draw: () => (
    <>
      <R x={0} y={46} w={80} h={14} c="l" />
      <R x={0} y={46} w={80} h={1} c="k" />
      <G c="f1"><R x={6} y={50} w={6} h={1} c="m" /><R x={30} y={54} w={8} h={1} c="m" /><R x={58} y={50} w={8} h={1} c="m" /></G>
      <G c="f2"><R x={10} y={52} w={6} h={1} c="m" /><R x={34} y={50} w={8} h={1} c="m" /><R x={62} y={54} w={8} h={1} c="m" /></G>
      <G c="sway">
        <R x={29} y={2} w={1} h={10} c="k" />
        <Box x={20} y={11} w={20} h={24} c="g" />
        <R x={24} y={19} w={5} h={3} c="k" /><R x={31} y={19} w={5} h={3} c="k" />
        <R x={25} y={27} w={2} h={1} c="k" /><R x={27} y={28} w={6} h={1} c="k" /><R x={33} y={27} w={2} h={1} c="k" />
      </G>
      <G c="bob">
        <R x={53} y={2} w={1} h={34} c="k" />
        <R x={53} y={36} w={1} h={3} c="k" /><R x={51} y={39} w={3} h={1} c="k" /><R x={50} y={38} w={1} h={1} c="k" /><R x={49} y={36} w={1} h={2} c="k" /><R x={47} y={35} w={2} h={1} c="r" />
      </G>
      <G c="blip">
        <Box x={57} y={11} w={13} h={10} c="y" />
        <R x={60} y={14} w={7} h={1} c="k" /><R x={60} y={16} w={4} h={1} c="k" /><R x={60} y={18} w={2} h={1} c="r" />
      </G>
    </>
  ),
};

/* ---------- M4: olho e foto ---------- */
const olhoFoto: Cena = {
  titulo: 'Olho observando uma foto',
  slots: [
    { id: 'olho', x: 160, y: 70, r: 40, label: 'Olho' },
    { id: 'foto', x: 98, y: 168, r: 36, label: 'Foto' },
    { id: 'fundo', x: 238, y: 168, r: 34, label: 'Detalhe do fundo' },
  ],
  Draw: () => (
    <>
      <Chao />
      <Ell cx={40} cy={17} rx={24} ry={10} c="w" />
      <Disc cx={40} cy={17} r={8} c="g" />
      <G c="look"><Disc cx={40} cy={17} r={3} c="k" /><R x={38} y={15} w={1} h={1} c="w" /></G>
      <R x={14} y={4} w={2} h={2} c="k" /><R x={22} y={1} w={2} h={3} c="k" /><R x={57} y={1} w={2} h={3} c="k" /><R x={65} y={4} w={2} h={2} c="k" />
      <G c="tilt">
        <Box x={12} y={32} w={26} h={22} c="w" sombra />
        <Box x={15} y={35} w={20} h={14} c="l" o="m" />
        <Disc cx={20} cy={39} r={2} c="y" o={null} />
        <Spr x={15} y={42} rows={['..........GG..........', '.....GG..GGGG..GGGG...', '....GGGG.GGGGGGGGGG...']} />
      </G>
      <G c="bob">
        <Disc cx={60} cy={42} r={8} c="w" />
        <R x={56} y={38} w={3} h={5} c="r" /><R x={60} y={40} w={4} h={4} c="m" />
        <R x={66} y={48} w={2} h={2} c="k" /><R x={68} y={50} w={2} h={2} c="k" /><R x={70} y={52} w={2} h={2} c="k" />
      </G>
    </>
  ),
};

/* ---------- M5: perfil e post ---------- */
const perfilPost: Cena = {
  titulo: 'Perfil com post público',
  slots: [
    { id: 'perfil', x: 82, y: 66, r: 34, label: 'Perfil' },
    { id: 'post', x: 170, y: 140, r: 44, label: 'Post' },
    { id: 'publico', x: 268, y: 52, r: 28, label: 'Quem pode ver' },
  ],
  Draw: () => (
    <>
      <Chao />
      <Box x={8} y={5} w={50} h={48} c="w" sombra />
      <Disc cx={20} cy={16} r={5} c="g" />
      <R x={19} y={14} w={3} h={3} c="k" /><R x={17} y={18} w={7} h={2} c="k" />
      <R x={29} y={13} w={20} h={2} c="k" /><R x={29} y={18} w={13} h={1} c="m" />
      <Box x={12} y={26} w={42} h={22} c="l" o="m" />
      <Disc cx={22} cy={32} r={3} c="y" o={null} />
      <Spr x={13} y={41} rows={['........GGG...........GGGG.........', '......GGGGGGG.....GGGGGGGGGG.....', '....GGGGGGGGGGGGGGGGGGGGGGGGGG...']} />
      <G c="beat"><Spr x={44} y={49} rows={['.rr.rr.', 'rrrrrrr', 'rrrrrrr', '.rrrrr.', '..rrr..', '...r...']} /></G>
      <G c="bob">
        <Disc cx={67} cy={13} r={7} c="w" />
        <R x={60} y={13} w={15} h={1} c="k" /><R x={67} y={6} w={1} h={14} c="k" /><R x={63} y={9} w={9} h={1} c="m" /><R x={63} y={17} w={9} h={1} c="m" />
      </G>
      <G c="look">
        <Ell cx={69} cy={37} rx={8} ry={4} c="w" />
        <Disc cx={69} cy={37} r={2} c="k" o={null} />
      </G>
    </>
  ),
};

/* ---------- M6: placa de pare ---------- */
const placaPare: Cena = {
  titulo: 'Placa de pare e respiração',
  slots: [
    { id: 'placa', x: 160, y: 84, r: 50, label: 'Placa de pare' },
    { id: 'respirar', x: 64, y: 176, r: 34, label: 'Respirar' },
    { id: 'pensar', x: 262, y: 160, r: 32, label: 'Pensar' },
  ],
  Draw: () => (
    <>
      <Chao />
      <R x={38} y={32} w={4} h={22} c="m" /><R x={38} y={32} w={1} h={22} c="k" /><R x={41} y={32} w={1} h={22} c="k" />
      <G c="sway">
        <Oct x={25} y={4} w={30} h={30} corte={9} c="r" />
        <Oct x={27} y={6} w={26} h={26} corte={8} c="r" o="w" />
        <Texto x={32} y={16} t="PARE" />
      </G>
      <G c="r1"><Disc cx={16} cy={44} r={4} c="g" /></G>
      <G c="r2"><Disc cx={16} cy={44} r={6} c="g" /></G>
      <G c="r3"><Disc cx={16} cy={44} r={8} c="g" /></G>
      <G c="bob">
        <R x={58} y={50} w={2} h={2} c="k" /><R x={55} y={53} w={1} h={1} c="k" />
        <Box x={56} y={34} w={21} h={13} c="w" />
        <R x={61} y={40} w={2} h={2} c="k" /><R x={66} y={40} w={2} h={2} c="k" /><R x={71} y={40} w={2} h={2} c="k" />
      </G>
    </>
  ),
};

/* ---------- M4 C1: mesa (ids combinados com conteudo) ---------- */
const mesa: Cena = {
  titulo: 'Mesa com uniforme, documento, tela e gato',
  // centros batem com as areas em % do conteudo: uniforme 21/55, documento 54/70, tela 76/29, gato 21/19
  slots: [
    { id: 'uniforme', x: 67, y: 132, r: 34, label: 'Uniforme da escola' },
    { id: 'documento', x: 173, y: 168, r: 36, label: 'Documento na mesa' },
    { id: 'tela', x: 243, y: 70, r: 40, label: 'Tela com conversa e código' },
    { id: 'gato', x: 67, y: 46, r: 30, label: 'Gato dormindo' },
  ],
  Draw: () => (
    <>
      <R x={0} y={0} w={80} h={40} c="l" />
      <R x={0} y={40} w={80} h={20} c="b" />
      <R x={0} y={40} w={80} h={1} c="k" />
      {/* gato dormindo na prateleira */}
      <R x={4} y={16} w={28} h={2} c="k" />
      <G c="breath">
        <R x={8} y={11} w={19} h={5} c="y" /><R x={8} y={10} w={17} h={1} c="k" /><R x={7} y={11} w={1} h={5} c="k" /><R x={27} y={12} w={4} h={2} c="y" />
        <R x={4} y={9} w={7} h={6} c="y" /><R x={4} y={7} w={2} h={2} c="k" /><R x={9} y={7} w={2} h={2} c="k" /><R x={5} y={11} w={2} h={1} c="k" /><R x={8} y={11} w={2} h={1} c="k" />
      </G>
      <G c="blip"><Spr x={12} y={3} rows={['kkk', '.k.', 'kkk']} /><Spr x={17} y={1} rows={['kk', '.k', 'kk']} /></G>
      {/* uniforme */}
      <R x={16} y={21} w={1} h={3} c="k" />
      <Box x={10} y={25} w={14} h={15} c="g" />
      <Box x={5} y={25} w={7} h={9} c="g" /><Box x={22} y={25} w={7} h={9} c="g" />
      <R x={15} y={25} w={4} h={2} c="w" />
      <Box x={12} y={31} w={4} h={4} c="w" />
      {/* tela */}
      <R x={46} y={27} w={30} h={2} c="k" />
      <Box x={48} y={4} w={26} h={20} c="w" />
      <R x={50} y={6} w={22} h={16} c="k" />
      <R x={52} y={8} w={10} h={2} c="g" /><R x={58} y={12} w={12} h={2} c="l" />
      <G c="blip"><R x={52} y={16} w={6} h={1} c="G" /><R x={60} y={16} w={8} h={1} c="G" /><R x={52} y={19} w={12} h={1} c="G" /></G>
      <R x={59} y={24} w={4} h={3} c="k" />
      {/* documento */}
      <G c="tilt">
        <Box x={31} y={38} w={24} h={17} c="w" sombra />
        <Box x={33} y={40} w={7} h={8} c="g" o="m" />
        <R x={43} y={41} w={9} h={1} c="k" /><R x={43} y={44} w={6} h={1} c="k" /><R x={34} y={51} w={18} h={1} c="m" />
      </G>
    </>
  ),
};

export const CENAS: Record<ArtId, Cena> = {
  cofre, 'celular-link': celularLink, 'mascara-anzol': mascaraAnzol,
  'olho-foto': olhoFoto, 'perfil-post': perfilPost, 'placa-pare': placaPare, mesa,
};

export const ART_IDS = Object.keys(CENAS) as ArtId[];

/** Ilustracao do modulo (1..6) */
export const ARTE_DO_MODULO: Record<1 | 2 | 3 | 4 | 5 | 6, ArtId> = {
  1: 'cofre', 2: 'celular-link', 3: 'mascara-anzol', 4: 'olho-foto', 5: 'perfil-post', 6: 'placa-pare',
};

export { PixelSvg };
