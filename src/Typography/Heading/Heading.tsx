import React from 'react';
import styles from './Heading.module.css';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

export const Heading = ({ level = 1, children, ...props }: HeadingProps) => {
  const className = styles[`h${level}`];
  return React.createElement(`h${level}`, { className, ...props }, children);
};
