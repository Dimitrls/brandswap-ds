import React from 'react';
import { Button } from './Button';
import { IconButton } from './IconButton';

export default {
  title: 'Buttons & Tags/Button',
  component: Button,
  tags: ['autodocs'],
};

export const Filled = () => <Button variant="filled" label="Filled Button" />;
export const FilledSmall = () => <Button variant="filled" size="small" label="Filled Small" />;
export const FilledLarge = () => <Button variant="filled" size="large" label="Filled Large" />;
export const Outline = () => <Button variant="outline" label="Outline Button" />;
export const FilledWarning = () => <Button variant="filled-warning" label="Filled Warning Button" />;
export const OutlineWarning = () => <Button variant="outline-warning" label="Outline Warning Button" />;
export const Subtle = () => <Button variant="subtle" label="Subtle Button" />;
export const SubtleWarning = () => <Button variant="subtle-warning" label="Subtle Warning Button" />;
export const WithIcon = () => <Button variant="filled" label="Button with Icon" icon="pencil" />;
export const IconButtonFilled = () => <IconButton icon="pencil" ariaLabel="Edit" variant="filled" sizeVariant="medium" />;
export const IconButtonFilledSmall = () => <IconButton icon="pencil" ariaLabel="Edit" variant="filled" sizeVariant="small" />;
export const IconButtonFilledLarge = () => <IconButton icon="pencil" ariaLabel="Edit" variant="filled" sizeVariant="large" />;
export const IconButtonOutline = () => <IconButton icon="pencil" ariaLabel="Edit" variant="outline" sizeVariant="medium" />;
export const IconButtonFilledWarning = () => <IconButton icon="pencil" ariaLabel="Edit" variant="filled-warning" sizeVariant="medium" />;
export const IconButtonOutlineWarning = () => <IconButton icon="pencil" ariaLabel="Edit" variant="outline-warning" sizeVariant="medium" />;
export const IconButtonSubtle = () => <IconButton icon="pencil" ariaLabel="Edit" variant="subtle" sizeVariant="medium" />;
export const IconButtonSubtleWarning = () => <IconButton icon="pencil" ariaLabel="Edit" variant="subtle-warning" sizeVariant="medium" />; 