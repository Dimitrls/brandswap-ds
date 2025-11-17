import React from 'react';

const shadows = [
  { name: 'shadow-tiny', varName: '--shadow-tiny' },
  { name: 'shadow-sm', varName: '--shadow-sm' },
  { name: 'shadow-md', varName: '--shadow-md' },
  { name: 'shadow-lg', varName: '--shadow-lg' },
  { name: 'shadow-xl', varName: '--shadow-xl' },
  { name: 'shadow-upwards-sm', varName: '--shadow-upwards-sm' },
  { name: 'shadow-difuse', varName: '--shadow-difuse' },
];

export const ShadowPalette = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 32 }}>
    {shadows.map(({ name, varName }) => (
      <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div
          style={{
            width: 200,
            height: 60,
            background: '#fff',
            borderRadius: 8,
            boxShadow: `var(${varName})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: '#777', fontSize: 12 }}>{name}</span>
        </div>
        <code style={{ color: '#555' }}>{`var(${varName})`}</code>
      </div>
    ))}
  </div>
); 