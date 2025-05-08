import React from 'react';
import { Tag } from './Tag';

export default {
  title: 'Buttons & Tags/Tag',
  component: Tag,
  tags: ['autodocs'],
};

export const Neutral = () => <Tag label="Neutral" variant="neutral" />;
export const Positive = () => <Tag label="Positive" variant="positive" />;
export const Negative = () => <Tag label="Negative" variant="negative" />;
export const Accent1 = () => <Tag label="Accent1" variant="accent1" />;
export const Accent2 = () => <Tag label="Accent2" variant="accent2" />;

export const SubtleNeutral = () => <Tag label="Subtle Neutral" variant="neutral" subtle />;
export const SubtlePositive = () => <Tag label="Subtle Positive" variant="positive" subtle />;
export const SubtleNegative = () => <Tag label="Subtle Negative" variant="negative" subtle />;
export const SubtleAccent1 = () => <Tag label="Subtle Accent1" variant="accent1" subtle />;
export const SubtleAccent2 = () => <Tag label="Subtle Accent2" variant="accent2" subtle />; 