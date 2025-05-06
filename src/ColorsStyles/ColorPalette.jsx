import React from 'react';

const colors = [
  { name: 'Primary', value: '#3AB78F' },
  { name: 'Primary 75', value: '#3AB78Fbf' },
  { name: 'Primary 50', value: '#3AB78F80' },
  { name: 'Primary 25', value: '#3AB78F40' },
  { name: 'Primary 10', value: '#3AB78F1a' },
  { name: 'Accent1', value: '#844AFF' },
  { name: 'Accent1 75', value: '#844AFFbf' },
  { name: 'Accent1 50', value: '#844AFF80' },
  { name: 'Accent1 25', value: '#844AFF40' },
  { name: 'Accent1 10', value: '#844AFF1a' },
  { name: 'Accent2', value: '#F2D42F' },
  { name: 'Accent2 75', value: '#F2D42Fbf' },
  { name: 'Accent2 50', value: '#F2D42F80' },
  { name: 'Accent2 25', value: '#F2D42F40' },
  { name: 'Accent2 10', value: '#F2D42F1a' },
  { name: 'Warning', value: '#FF3D60' },
  { name: 'Warning 75', value: '#FF3D60bf' },
  { name: 'Warning 50', value: '#FF3D6080' },
  { name: 'Warning 25', value: '#FF3D6040' },
  { name: 'Warning 10', value: '#FF3D601a' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'White 75', value: '#FFFFFFbf' },
  { name: 'White 50', value: '#FFFFFF80' },
  { name: 'White 25', value: '#FFFFFF40' },
  { name: 'White 10', value: '#FFFFFF1a' },
  { name: 'Black', value: '#000000' },
  { name: 'Black 75', value: '#000000bf' },
  { name: 'Black 50', value: '#00000080' },
  { name: 'Black 25', value: '#00000040' },
  { name: 'Black 10', value: '#0000001a' },
  { name: 'Black 03', value: '#00000008' },
  { name: 'Grey1', value: '#F2F2F2' },
  { name: 'Grey2', value: '#D3D5DD' },
  { name: 'Grey3', value: '#A0A2A7' },
  { name: 'Grey4', value: '#77787E' },
  { name: 'Grey5', value: '#343434' },
];

const swatchStyle = {
  width: 48,
  height: 48,
  borderRadius: 8,
  border: '1px solid #eee',
  marginBottom: 8,
};

const ColorPalette = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 24 }}>
    {colors.map(color => (
      <div key={color.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ ...swatchStyle, background: color.value }} />
        <div style={{ fontSize: 14, fontWeight: 500 }}>{color.name}</div>
        <div style={{ fontSize: 12, color: '#777' }}>{color.value}</div>
      </div>
    ))}
  </div>
);

export default ColorPalette; 