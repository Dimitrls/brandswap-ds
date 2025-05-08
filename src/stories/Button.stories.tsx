import React from 'react';
import { Button } from './Button';

export default {
  title: 'Buttons & Tags/Button',
  component: Button,
  tags: ['autodocs'],
};

export const Filled = () => (
  <>
    <div style={{ marginBottom: 16, color: '#555', fontSize: 15 }}>
      <strong>Filled</strong> buttons are <strong>high-emphasis</strong> buttons, used for primary actions
    </div>
    <Button variant="filled" label="Filled Button" />
  </>
);

export const Outline = () => (
  <>
    <div style={{ marginBottom: 16, color: '#555', fontSize: 15 }}>
      <strong>Outline</strong> buttons are <strong>medium-emphasis</strong> buttons, used for actions of secondary importance
    </div>
    <Button variant="outline" label="Outline Button" />
  </>
);

export const FilledWarning = () => <Button variant="filled-warning" label="Filled Warning Button" />;
export const OutlineWarning = () => <Button variant="outline-warning" label="Outline Warning Button" />;
export const Subtle = () => (
  <>
    <div style={{ marginBottom: 16, color: '#555', fontSize: 15 }}>
      <strong>Subtle</strong> buttons are <strong>low-emphasis</strong> buttons, used for supplementary actions
    </div>
    <Button variant="subtle" label="Subtle Button" />
  </>
);
export const SubtleWarning = () => <Button variant="subtle-warning" label="Subtle Warning Button" />;

export const FilledSmall = () => <Button variant="filled" size="small" label="Filled Small" />;
export const OutlineSmall = () => <Button variant="outline" size="small" label="Outline Small" />;
export const FilledWarningSmall = () => <Button variant="filled-warning" size="small" label="Filled Warning Small" />;
export const OutlineWarningSmall = () => <Button variant="outline-warning" size="small" label="Outline Warning Small" />;
export const SubtleSmall = () => <Button variant="subtle" size="small" label="Subtle Small" />;
export const SubtleWarningSmall = () => <Button variant="subtle-warning" size="small" label="Subtle Warning Small" />;

export const WithIcon = () => <Button variant="filled" label="Button with Icon" icon />; 