import React from 'react';
import BodyText from './BodyText';

export default {
  title: 'Typography/BodyText',
  component: BodyText,
  tags: ['autodocs'],
};

export const AllVariants = () => (
  <div>
    <BodyText>Body text (default)</BodyText>
    <BodyText variant="large">Body text large</BodyText>
    <BodyText variant="small">Body text small</BodyText>
    <BodyText variant="light">Body text light</BodyText>
    <BodyText variant="largeLight">Body text large light</BodyText>
    <BodyText variant="smallLight">Body text small light</BodyText>
  </div>
); 