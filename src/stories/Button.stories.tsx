import React from 'react';
import { Button } from './Button';

export default {
  title: 'Buttons & Tags/Button',
  component: Button,
};

export const Filled = () => <Button variant="filled" label="Filled Button" />;
export const Outline = () => <Button variant="outline" label="Outline Button" />;
export const FilledWarning = () => <Button variant="filled-warning" label="Filled Warning Button" />;
export const OutlineWarning = () => <Button variant="outline-warning" label="Outline Warning Button" />;
export const Subtle = () => <Button variant="subtle" label="Subtle Button" />;
export const SubtleWarning = () => <Button variant="subtle-warning" label="Subtle Warning Button" />;

export const FilledSmall = () => <Button variant="filled" size="small" label="Filled Small" />;
export const OutlineSmall = () => <Button variant="outline" size="small" label="Outline Small" />;
export const FilledWarningSmall = () => <Button variant="filled-warning" size="small" label="Filled Warning Small" />;
export const OutlineWarningSmall = () => <Button variant="outline-warning" size="small" label="Outline Warning Small" />;
export const SubtleSmall = () => <Button variant="subtle" size="small" label="Subtle Small" />;
export const SubtleWarningSmall = () => <Button variant="subtle-warning" size="small" label="Subtle Warning Small" />; 