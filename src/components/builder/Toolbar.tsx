'use client';

import { useCanvasStore } from '@/store/canvas-store';
import { app } from '@/data/tokens';
import { Undo2, Redo2, Trash2, Download, LayoutGrid, Shuffle } from 'lucide-react';
import { LAYOUT_TEMPLATES } from '@/data/layout-templates';
import { toPng } from 'html-to-image';
import { useRef } from 'react';

interface Props {
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

export function Toolbar({ canvasRef }: Props) {
  const { undo, redo, canUndo, canRedo, clear, shuffle, nodes } = useCanvasStore();

  const handleExportPng = async () => {
    if (!canvasRef.current) return;
    try {
      const dataUrl = await toPng(canvasRef.current, { backgroundColor: '#0F0F0D' });
      const link = document.createElement('a');
      link.download = 'lego-layout.png';
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error('Export failed', e);
    }
  };

  const handleExportJson = () => {
    const json = JSON.stringify(nodes, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'lego-layout.json';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header
      style={{
        height: '52px',
        background: app.bg,
        borderBottom: `1px solid ${app.border}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        flexShrink: 0,
      }}
    >
      {/* Esquerda: Logo + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: app.andesBlue,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LayoutGrid size={16} color="white" />
        </div>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: '15px',
              fontWeight: 300,
              fontStyle: 'italic',
              color: app.text,
              lineHeight: 1.2,
            }}
          >
            MPX Layout Builder
          </div>
          <div
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontSize: '10px',
              color: app.textDim,
              letterSpacing: '0.04em',
            }}
          >
            Andes Design System · Mercado Pago
          </div>
        </div>
      </div>

      {/* Centro: Botão Proposta */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ShuffleButton
          onClick={() => {
            if (nodes.length > 0 && !confirm('Substituir o canvas por uma proposta gerada?')) return;
            shuffle();
          }}
          templateCount={LAYOUT_TEMPLATES.length}
        />
      </div>

      {/* Direita: Ações utilitárias */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, justifyContent: 'flex-end' }}>
        {/* Undo */}
        <ToolbarButton onClick={undo} disabled={!canUndo()} title="Desfazer (Ctrl+Z)">
          <Undo2 size={15} />
        </ToolbarButton>

        {/* Redo */}
        <ToolbarButton onClick={redo} disabled={!canRedo()} title="Refazer (Ctrl+Shift+Z)">
          <Redo2 size={15} />
        </ToolbarButton>

        <div style={{ width: '1px', height: '20px', background: app.border, margin: '0 4px' }} />

        {/* Clear */}
        <ToolbarButton
          onClick={() => { if (confirm('Limpar o canvas?')) clear(); }}
          disabled={nodes.length === 0}
          title="Limpar canvas"
          danger
        >
          <Trash2 size={15} />
        </ToolbarButton>

        <div style={{ width: '1px', height: '20px', background: app.border, margin: '0 4px' }} />

        {/* Export JSON */}
        <ToolbarButton onClick={handleExportJson} disabled={nodes.length === 0} title="Exportar JSON">
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-geist-sans)', fontWeight: 600 }}>JSON</span>
        </ToolbarButton>

        {/* Export PNG */}
        <button
          onClick={handleExportPng}
          disabled={nodes.length === 0}
          title="Exportar PNG"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: `1px solid ${app.accent}60`,
            background: app.accentBg,
            color: nodes.length === 0 ? app.textDim : app.accent,
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: nodes.length === 0 ? 'not-allowed' : 'pointer',
            opacity: nodes.length === 0 ? 0.5 : 1,
            transition: 'all 120ms',
          }}
        >
          <Download size={13} />
          Exportar
        </button>
      </div>
    </header>
  );
}

function ShuffleButton({ onClick, templateCount }: { onClick: () => void; templateCount: number }) {
  return (
    <button
      onClick={onClick}
      title={`Gerar proposta aleatória (${templateCount} templates)`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 20px',
        borderRadius: '8px',
        border: '1px solid #a78bfa',
        background: 'linear-gradient(135deg, #a78bfa22 0%, #7c3aed18 100%)',
        color: '#c4b5fd',
        fontFamily: 'var(--font-geist-sans)',
        fontSize: '13px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 120ms',
        boxShadow: '0 0 12px #a78bfa22',
        letterSpacing: '0.01em',
      }}
    >
      <Shuffle size={14} />
      Gerar proposta
    </button>
  );
}

function ToolbarButton({
  children,
  onClick,
  disabled,
  title,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  title?: string;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '6px',
        border: `1px solid ${app.border}`,
        background: 'transparent',
        color: disabled
          ? app.textDim
          : danger
          ? app.errorRed
          : app.textMuted,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.4 : 1,
        transition: 'all 120ms',
      }}
    >
      {children}
    </button>
  );
}
