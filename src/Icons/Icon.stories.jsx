import React from 'react';
import Icon from './Icon';

export default {
  title: 'Icons/Icon',
  component: Icon,
  tags: ['autodocs'],
};

const iconNames = [
  'chevron-left', 'chevron-right', 'chevron-down', 'chevron-up',
  'chevrons-left', 'chevrons-right',
  'arrow-left', 'arrow-right', 'arrow-down', 'arrow-up',
  'minimize', 'maximize', 'undo', 'redo', 'reload',
  'play', 'pause', 'minus', 'plus', 'close', 'check', 'forbid',
  'info-circle', 'alert-triangle', 'alert-octagon', 'check-circle',
  'search', 'upload', 'download', 'file-export', 'file-import', 'filter', 'share', 'share-ios', 'pencil', 'copy', 'trash', 'backspace', 'remove', 'cog', 'wrench', 'cinfigurations', 'lock', 'lock-off', 'unlock', 'eye', 'eye-off', 'dots', 'dots-vertical'
];

export const AllIcons = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
    {iconNames.map(name => (
      <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 80 }}>
        <Icon name={name} size={32} />
        <span style={{ fontSize: 12, marginTop: 8 }}>{name}</span>
      </div>
    ))}
  </div>
); 