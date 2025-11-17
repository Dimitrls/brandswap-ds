import React from 'react';
import { Button } from './Button';
import { IconButton } from './IconButton';

export default {
  title: 'Buttons & Tags/Button',
  component: Button,
  tags: ['autodocs'],
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
export const FilledLarge = () => <Button variant="filled" size="large" label="Filled Large" />;
export const OutlineLarge = () => <Button variant="outline" size="large" label="Outline Large" />;
export const FilledWarningLarge = () => <Button variant="filled-warning" size="large" label="Filled Warning Large" />;
export const OutlineWarningLarge = () => <Button variant="outline-warning" size="large" label="Outline Warning Large" />;
export const SubtleLarge = () => <Button variant="subtle" size="large" label="Subtle Large" />;
export const SubtleWarningLarge = () => <Button variant="subtle-warning" size="large" label="Subtle Warning Large" />;
export const WithIcon = () => <Button variant="filled" label="Button with Icon" icon="pencil" />;
export const IconButtonFilled = () => <IconButton icon="pencil" ariaLabel="Edit" variant="filled" sizeVariant="medium" />;
export const IconButtonOutline = () => <IconButton icon="pencil" ariaLabel="Edit" variant="outline" sizeVariant="medium" />;
export const IconButtonFilledWarning = () => <IconButton icon="pencil" ariaLabel="Edit" variant="filled-warning" sizeVariant="medium" />;
export const IconButtonOutlineWarning = () => <IconButton icon="pencil" ariaLabel="Edit" variant="outline-warning" sizeVariant="medium" />;
export const IconButtonSubtle = () => <IconButton icon="pencil" ariaLabel="Edit" variant="subtle" sizeVariant="medium" />;
export const IconButtonSubtleWarning = () => <IconButton icon="pencil" ariaLabel="Edit" variant="subtle-warning" sizeVariant="medium" />; 
export const IconButtonFilledSmall = () => <IconButton icon="pencil" ariaLabel="Edit" variant="filled" sizeVariant="small" />;
export const IconButtonOutlineSmall = () => <IconButton icon="pencil" ariaLabel="Edit" variant="outline" sizeVariant="small" />;
export const IconButtonFilledWarningSmall  = () => <IconButton icon="pencil" ariaLabel="Edit" variant="filled-warning" sizeVariant="small" />;
export const IconButtonOutlineWarningSmall = () => <IconButton icon="pencil" ariaLabel="Edit" variant="outline-warning" sizeVariant="small" />;
export const IconButtonSubtleSmall = () => <IconButton icon="pencil" ariaLabel="Edit" variant="subtle" sizeVariant="small" />;
export const IconButtonSubtleWarningSmall = () => <IconButton icon="pencil" ariaLabel="Edit" variant="subtle-warning" sizeVariant="small" />; 
export const IconButtonFilledLarge = () => <IconButton icon="pencil" ariaLabel="Edit" variant="filled" sizeVariant="large" />;
export const IconButtonOutlineLarge = () => <IconButton icon="pencil" ariaLabel="Edit" variant="outline" sizeVariant="large" />;
export const IconButtonFilledWarningLarge  = () => <IconButton icon="pencil" ariaLabel="Edit" variant="filled-warning" sizeVariant="large" />;
export const IconButtonOutlineWarningLarge = () => <IconButton icon="pencil" ariaLabel="Edit" variant="outline-warning" sizeVariant="large" />;
export const IconButtonSubtleLarge = () => <IconButton icon="pencil" ariaLabel="Edit" variant="subtle" sizeVariant="large" />;
export const IconButtonSubtleWarningLarge = () => <IconButton icon="pencil" ariaLabel="Edit" variant="subtle-warning" sizeVariant="large" />; 