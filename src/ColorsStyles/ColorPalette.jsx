import React from 'react';
import PropTypes from 'prop-types';

export const primitiveColors = [
  { token: '--white', value: 'var(--white)', description: '#FFFFFF' },
  { token: '--white-75', value: 'var(--white-75)', description: '#FFFFFFbf' },
  { token: '--white-50', value: 'var(--white-50)', description: '#FFFFFF80' },
  { token: '--white-25', value: 'var(--white-25)', description: '#FFFFFF40' },
  { token: '--white-10', value: 'var(--white-10)', description: '#FFFFFF1a' },
  { token: '--black', value: 'var(--black)', description: '#161616' },
  { token: '--black-75', value: 'var(--black-75)', description: '#161616bf' },
  { token: '--black-50', value: 'var(--black-50)', description: '#16161680' },
  { token: '--black-25', value: 'var(--black-25)', description: '#16161640' },
  { token: '--black-10', value: 'var(--black-10)', description: '#1616161a' },
  { token: '--black-03', value: 'var(--black-03)', description: '#16161608' },
  { token: '--grey050', value: 'var(--grey050)', description: '#FAFAFA' },
  { token: '--grey075', value: 'var(--grey075)', description: '#F5F5F5' },
  { token: '--grey1', value: 'var(--grey1)', description: '#F2F2F2' },
  { token: '--grey150', value: 'var(--grey150)', description: '#E0E1E8' },
  { token: '--grey2', value: 'var(--grey2)', description: '#D3D5DD' },
  { token: '--grey3', value: 'var(--grey3)', description: '#A0A2A7' },
  { token: '--grey4', value: 'var(--grey4)', description: '#77787E' },
  { token: '--grey5', value: 'var(--grey5)', description: '#343434' },
  { token: '--green', value: 'var(--green)', description: '#3AB78F' },
  { token: '--green-75', value: 'var(--green-75)', description: '#3AB78Fbf' },
  { token: '--green-50', value: 'var(--green-50)', description: '#3AB78F80' },
  { token: '--green-25', value: 'var(--green-25)', description: '#3AB78F40' },
  { token: '--green-10', value: 'var(--green-10)', description: '#3AB78F1a' },
  { token: '--green-pseudo10', value: 'var(--green-pseudo10)', description: '#EBF8F4' },
  { token: '--purple', value: 'var(--purple)', description: '#844AFF' },
  { token: '--purple-75', value: 'var(--purple-75)', description: '#844AFFbf' },
  { token: '--purple-50', value: 'var(--purple-50)', description: '#844AFF80' },
  { token: '--purple-25', value: 'var(--purple-25)', description: '#844AFF40' },
  { token: '--purple-10', value: 'var(--purple-10)', description: '#844AFF1a' },
  { token: '--yellow', value: 'var(--yellow)', description: '#F2D42F' },
  { token: '--yellow-75', value: 'var(--yellow-75)', description: '#F2D42Fbf' },
  { token: '--yellow-50', value: 'var(--yellow-50)', description: '#F2D42F80' },
  { token: '--yellow-25', value: 'var(--yellow-25)', description: '#F2D42F40' },
  { token: '--yellow-10', value: 'var(--yellow-10)', description: '#F2D42F1a' },
  { token: '--yellow-dark', value: 'var(--yellow-dark)', description: '#B89C00' },
  { token: '--red', value: 'var(--red)', description: '#FF3D60' },
  { token: '--red-75', value: 'var(--red-75)', description: '#FF3D60bf' },
  { token: '--red-50', value: 'var(--red-50)', description: '#FF3D6080' },
  { token: '--red-25', value: 'var(--red-25)', description: '#FF3D6040' },
  { token: '--red-10', value: 'var(--red-10)', description: '#FF3D601a' },
];

export const semanticColors = [
  { token: '--bg-default', value: 'var(--bg-default)', description: 'Maps to var(--white)' },
  { token: '--bg-xlight', value: 'var(--bg-xlight)', description: 'Maps to var(--grey050)' },
  { token: '--bg-xxlight', value: 'var(--bg-xxlight)', description: 'Maps to var(--grey075)' },
  { token: '--bg1', value: 'var(--bg1)', description: 'Maps to var(--grey1)' },
  { token: '--bg1-2', value: 'var(--bg1-2)', description: 'Maps to var(--grey150)' },
  { token: '--bg2', value: 'var(--bg2)', description: 'Maps to var(--grey2)' },
  { token: '--bg3', value: 'var(--bg3)', description: 'Maps to var(--grey3)' },
  { token: '--text-default', value: 'var(--text-default)', description: 'Maps to var(--black)' },
  { token: '--text-subtle', value: 'var(--text-subtle)', description: 'Maps to var(--grey5)' },
  { token: '--text-muted', value: 'var(--text-muted)', description: 'Maps to var(--grey4)' },
  { token: '--text-weak', value: 'var(--text-weak)', description: 'Maps to var(--grey3)' },
  { token: '--text-negative', value: 'var(--text-negative)', description: 'Maps to var(--white)' },
  { token: '--text-on-primary', value: 'var(--text-on-primary)', description: 'Maps to var(--white)' },
  { token: '--text-on-accent1', value: 'var(--text-on-accent1)', description: 'Maps to var(--white)' },
  { token: '--text-on-accent2', value: 'var(--text-on-accent2)', description: 'Maps to var(--black)' },
  { token: '--text-on-warning', value: 'var(--text-on-warning)', description: 'Maps to var(--white)' },
  { token: '--border-default', value: 'var(--border-default)', description: 'Maps to var(--grey2)' },
  { token: '--border-subtle', value: 'var(--border-subtle)', description: 'Maps to var(--grey1)' },
  { token: '--border-vivid', value: 'var(--border-vivid)', description: 'Maps to var(--grey3)' },
  { token: '--primary', value: 'var(--primary)', description: 'Maps to var(--green)' },
  { token: '--primary-75', value: 'var(--primary-75)', description: 'Maps to var(--green-75)' },
  { token: '--primary-50', value: 'var(--primary-50)', description: 'Maps to var(--green-50)' },
  { token: '--primary-25', value: 'var(--primary-25)', description: 'Maps to var(--green-25)' },
  { token: '--primary-10', value: 'var(--primary-10)', description: 'Maps to var(--green-10)' },
  { token: '--primary-pseudo10', value: 'var(--primary-pseudo10)', description: 'Maps to var(--green-pseudo10)' },
  { token: '--accent1', value: 'var(--accent1)', description: 'Maps to var(--purple)' },
  { token: '--accent1-75', value: 'var(--accent1-75)', description: 'Maps to var(--purple-75)' },
  { token: '--accent1-50', value: 'var(--accent1-50)', description: 'Maps to var(--purple-50)' },
  { token: '--accent1-25', value: 'var(--accent1-25)', description: 'Maps to var(--purple-25)' },
  { token: '--accent1-10', value: 'var(--accent1-10)', description: 'Maps to var(--purple-10)' },
  { token: '--accent2', value: 'var(--accent2)', description: 'Maps to var(--yellow)' },
  { token: '--accent2-75', value: 'var(--accent2-75)', description: 'Maps to var(--yellow-75)' },
  { token: '--accent2-50', value: 'var(--accent2-50)', description: 'Maps to var(--yellow-50)' },
  { token: '--accent2-25', value: 'var(--accent2-25)', description: 'Maps to var(--yellow-25)' },
  { token: '--accent2-10', value: 'var(--accent2-10)', description: 'Maps to var(--yellow-10)' },
  { token: '--accent2-dark', value: 'var(--accent2-dark)', description: 'Maps to var(--yellow-dark)' },
  { token: '--warning', value: 'var(--warning)', description: 'Maps to var(--red)' },
  { token: '--warning-75', value: 'var(--warning-75)', description: 'Maps to var(--red-75)' },
  { token: '--warning-50', value: 'var(--warning-50)', description: 'Maps to var(--red-50)' },
  { token: '--warning-25', value: 'var(--warning-25)', description: 'Maps to var(--red-25)' },
  { token: '--warning-10', value: 'var(--warning-10)', description: 'Maps to var(--red-10)' },
];

const swatchStyle = {
  width: 48,
  height: 48,
  borderRadius: 8,
  border: '1px solid #eee',
  marginBottom: 8,
};

const ColorPalette = ({ colors, columns = 'repeat(auto-fit, minmax(160px, 1fr))' }) => (
  <div style={{ display: 'grid', gridTemplateColumns: columns, gap: 24 }}>
    {colors.map(color => (
      <div key={color.token} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ ...swatchStyle, background: color.value }} />
        <div style={{ fontSize: 13, fontWeight: 600 }}>{color.token}</div>
        {color.description ? (
          <div style={{ fontSize: 12, color: '#777' }}>{color.description}</div>
        ) : null}
      </div>
    ))}
  </div>
);

ColorPalette.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      token: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ).isRequired,
  columns: PropTypes.string,
};

export default ColorPalette;