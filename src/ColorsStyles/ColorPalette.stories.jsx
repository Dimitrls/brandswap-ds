import React from 'react';
import ColorPalette, { primitiveColors, semanticColors } from './ColorPalette';

export default {
  title: 'Colors & Styles/ColorPalette',
  component: ColorPalette,
  tags: ['autodocs'],
};

export const Palette = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
    <section>
      <h3 style={{ marginBottom: 16 }}>Primitive Colors</h3>
      <ColorPalette colors={primitiveColors} />
    </section>
    <section>
      <h3 style={{ marginBottom: 16 }}>Semantic Colors</h3>
      <ColorPalette colors={semanticColors} />
    </section>
  </div>
);