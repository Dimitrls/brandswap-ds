import React from 'react';
import './Heading.css';

const styles: Record<string, string> = {
  h1: "bs-heading--h1",
  h2: "bs-heading--h2",
  h3: "bs-heading--h3",
  h4: "bs-heading--h4",
  h5: "bs-heading--h5",
  h6: "bs-heading--h6",
};

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

export const Heading = ({ level = 1, children, ...props }: HeadingProps) => {
  const className = styles[`h${level}`];
  return React.createElement(`h${level}`, { className, ...props }, children);
};
