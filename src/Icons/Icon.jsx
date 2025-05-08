import React from 'react';
import PropTypes from 'prop-types';

const icons = {
  'chevron-left': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 7L9 12L14 17" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'chevron-right': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M10 7L15 12L10 17" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'chevron-down': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 10L12 15L7 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'chevron-up': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 14L12 9L7 14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'chevrons-left': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11 7L6 12L11 17M17 7L12 12L17 17" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'chevrons-right': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 7L12 12L7 17M13 7L18 12L13 17" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'arrow-left': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12L11 6M5 12L11 18M5 12H19" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'arrow-right': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 12L13 6M19 12L13 18M19 12H5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'arrow-down': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 19L18 13M12 19L6 13M12 19L12 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'arrow-up': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5L18 11M12 5L6 11M12 5L12 19" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'minimize': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 14H10M10 14V18M10 14L4 20M18 10H14M14 10V6M14 10L20 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'maximize': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8 20H4M4 20V16M4 20L10 14M16 4H20M20 4V8M20 4L14 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'undo': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 9V14H9M20 16C19.5026 11.5 16.6326 8 12 8C9.27084 8 6.07142 10.2681 4.70591 13.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'redo': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 9V14H15M4 16C4.49744 11.5 7.36745 8 12 8C14.7292 8 17.9286 10.2681 19.2941 13.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'reload': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 13.5C19 17.6421 15.6421 21 11.5 21C7.35786 21 4 17.6421 4 13.5C4 9.35786 7.35786 6 11.5 6H20M20 6L17 3M20 6L17 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'play': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 4V20L20 12L7 4Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'pause': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 5H7C6.44772 5 6 5.44772 6 6V18C6 18.5523 6.44772 19 7 19H9C9.55228 19 10 18.5523 10 18V6C10 5.44772 9.55228 5 9 5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 5H15C14.4477 5 14 5.44772 14 6V18C14 18.5523 14.4477 19 15 19H17C17.5523 19 18 18.5523 18 18V6C18 5.44772 17.5523 5 17 5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'minus': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12H12H19" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'plus': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12H12M19 12H12M12 12V5M12 12V19" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'close': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 12L7 7M12 12L17 17M12 12L17 7M12 12L7 17" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'check': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L20 7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'forbid': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'info-circle': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 8H12.01M11 12H12V16H13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'alert-triangle': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11.9999 9V11M11.9999 15V15.01M4.99995 19H18.9999C19.3263 18.9977 19.647 18.9156 19.9343 18.7609C20.2216 18.6061 20.4667 18.3835 20.6482 18.1123C20.8296 17.841 20.942 17.5296 20.9754 17.205C21.0088 16.8804 20.9623 16.5525 20.8399 16.25L13.7399 4.00002C13.567 3.68741 13.3135 3.42685 13.0057 3.2454C12.6979 3.06396 12.3472 2.96826 11.9899 2.96826C11.6327 2.96826 11.2819 3.06396 10.9742 3.2454C10.6664 3.42685 10.4129 3.68741 10.2399 4.00002L3.13995 16.25C3.01989 16.5456 2.97228 16.8656 3.0011 17.1833C3.02991 17.501 3.13432 17.8073 3.3056 18.0764C3.47688 18.3456 3.71006 18.5698 3.98567 18.7305C4.26129 18.8912 4.57134 18.9836 4.88995 19" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'alert-octagon': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 8V12M12 16H12.01M8.7 3H15.3C15.6 3 15.8 3.1 16 3.3L20.7 8C20.9 8.2 21 8.4 21 8.7V15.3C21 15.6 20.9 15.8 20.7 16L16 20.7C15.8 20.9 15.6 21 15.3 21H8.7C8.4 21 8.2 20.9 8 20.7L3.3 16C3.1 15.8 3 15.6 3 15.3V8.7C3 8.4 3.1 8.2 3.3 8L8 3.3C8.2 3.1 8.4 3 8.7 3Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'check-circle': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'search': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'upload': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7.5 19C5.66667 19 2 17.9 2 13.5C2 9.1 5.66667 8 7.5 8C8 7 9.7 5 12.5 5C16 5 17.5 8.5 17.5 10C19 10 22 10.9 22 14.5C22 18.1 19 19 17.5 19M12 11L9 14M12 11L15 14M12 11V19" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'download': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 9V19C20 20.1046 19.1046 21 18 21L6 21C4.89543 21 4 20.1046 4 19L4 5C4 3.89543 4.89543 3 6 3H14M20 9V8.82843C20 8.29799 19.7893 7.78929 19.4142 7.41421L15.5858 3.58579C15.2107 3.21071 14.702 3 14.1716 3H14M20 9H16C14.8954 9 14 8.10457 14 7L14 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 18L9 15M12 18L15 15M12 18V12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'file-export': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19M14 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H11.5M14 3L19 8M19 8V13M14 19H21M21 19L18 16M21 19L18 22" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'file-import': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19M14 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V13M14 3L19 8M19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H11.5M2 19H9M9 19L6 16M9 19L6 22" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'filter': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 4H6C4.89543 4 3.97434 4.90932 4.24685 5.97975C4.83604 8.29411 6.43423 10.2054 8.54545 11.2177C9.36832 11.6123 10 12.3858 10 13.2984V19.382C10 20.1253 10.7823 20.6088 11.4472 20.2764L13.4472 19.2764C13.786 19.107 14 18.7607 14 18.382V13.2984C14 12.3858 14.6317 11.6123 15.4545 11.2177C17.5658 10.2054 19.164 8.29411 19.7531 5.97975C20.0257 4.90932 19.1046 4 18 4Z" stroke="currentColor" stroke-width="1.2"/></svg>
  ),
  'share': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8.70001 10.7L15.3 7.29999M8.70001 13.3L15.3 16.7M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6ZM21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'share-ios': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3L8 6.85714M12 3L16 6.85714M12 3V16" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.5 10H16C17.6569 10 19 11.3431 19 13V19C19 20.6569 17.6569 22 16 22H8C6.34315 22 5 20.6569 5 19V13C5 11.3431 6.34315 10 8 10H9.5" stroke="black" stroke-width="1.2"/></svg>
  ),
  'pencil': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 6L16.2929 3.70711C16.6834 3.31658 17.3166 3.31658 17.7071 3.70711L20.2929 6.29289C20.6834 6.68342 20.6834 7.31658 20.2929 7.70711L18 10M14 6L4.29289 15.7071C4.10536 15.8946 4 16.149 4 16.4142V19C4 19.5523 4.44772 20 5 20H7.58579C7.851 20 8.10536 19.8946 8.29289 19.7071L18 10M14 6L18 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'copy': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M16 8V6C16 5.46957 15.7893 4.96086 15.4142 4.58579C15.0391 4.21071 14.5304 4 14 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V14C4 14.5304 4.21071 15.0391 4.58579 15.4142C4.96086 15.7893 5.46957 16 6 16H8M10 8H18C19.1046 8 20 8.89543 20 10V18C20 19.1046 19.1046 20 18 20H10C8.89543 20 8 19.1046 8 18V10C8 8.89543 8.89543 8 10 8Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'trash': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M9 6V6C9 4.34315 10.3431 3 12 3V3C13.6569 3 15 4.34315 15 6V6M9 6H15M9 6H5M15 6H19M21 6H19M3 6H5M5 6V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V6M10 10V17M14 17V10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'backspace': (
    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="16" viewBox="0 0 23 16" fill="none">
  <path d="M14 8L11 5M14 8L17 11M14 8L17 5M14 8L11 11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.14286 1H22V15H7.14286L1 8L7.14286 1Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
</svg>
  ),
  'remove': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M21 14H18.3529L17.2941 21H6.70589L5.64706 14H3" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
  <path d="M3 6.6L6.52941 3M3 6.6L6.52941 10.2M3 6.6H10C11.1046 6.6 12 7.49543 12 8.6V15" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'cog': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M14 21H9.99996L9.44899 18.5206C8.78785 18.2618 8.17569 17.9053 7.63023 17.4689L5.20569 18.232L3.20569 14.7679L5.07823 13.0503C5.02668 12.7077 4.99996 12.357 4.99996 12C4.99996 11.643 5.02668 11.2923 5.07824 10.9496L3.20569 9.23204L5.20569 5.76794L7.63025 6.53106C8.1757 6.09467 8.78786 5.73819 9.44899 5.47935L9.99996 3H14L14.5509 5.47935C15.212 5.73819 15.8242 6.09466 16.3696 6.53104L18.7941 5.76794L20.7941 9.23204L18.9217 10.9496C18.9732 11.2922 19 11.643 19 12C19 12.357 18.9732 12.7078 18.9217 13.0504L20.7941 14.7679L18.7941 18.232L16.3697 17.4689C15.8242 17.9053 15.2121 18.2618 14.5509 18.5206L14 21Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.2"/>
</svg>
  ),
  'wrench': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_328_244)">
    <path d="M3.39202 6.39243L3.81629 5.96817C3.67315 5.82503 3.46748 5.76372 3.26932 5.80511C3.07117 5.84651 2.90725 5.98504 2.83339 6.17352L3.39202 6.39243ZM6.39322 9.39363L5.96896 9.8179L6.39322 9.39363ZM7.80744 9.39363L7.38317 8.96937L7.80744 9.39363ZM9.58256 7.6185L10.0068 8.04277L9.58256 7.6185ZM6.58138 3.20311L6.36247 2.64447C6.17399 2.71833 6.03546 2.88225 5.99406 3.0804C5.95266 3.27856 6.01397 3.48423 6.15712 3.62737L6.58138 3.20311ZM13.8912 10.5131L13.3326 10.2942C13.2456 10.5162 13.2983 10.7687 13.467 10.9373L13.8912 10.5131ZM10.7018 13.7024L11.1261 13.2781C10.9575 13.1095 10.705 13.0567 10.4829 13.1437L10.7018 13.7024ZM2.83339 6.17352C1.95667 8.41077 2.42126 11.0542 4.23069 12.8637L5.07922 12.0151C3.61906 10.555 3.2417 8.42052 3.95066 6.61135L2.83339 6.17352ZM6.81749 8.96937L3.81629 5.96817L2.96776 6.8167L5.96896 9.8179L6.81749 8.96937ZM7.38317 8.96937C7.22696 9.12558 6.97369 9.12558 6.81749 8.96937L5.96896 9.8179C6.5938 10.4427 7.60686 10.4427 8.2317 9.8179L7.38317 8.96937ZM9.1583 7.19424L7.38317 8.96937L8.2317 9.8179L10.0068 8.04277L9.1583 7.19424ZM9.1583 6.62855C9.31451 6.78476 9.31451 7.03803 9.1583 7.19424L10.0068 8.04277C10.6317 7.41793 10.6317 6.40487 10.0068 5.78003L9.1583 6.62855ZM6.15712 3.62737L9.1583 6.62855L10.0068 5.78003L7.00564 2.77884L6.15712 3.62737ZM13.0526 4.0418C11.2432 2.23238 8.59971 1.76778 6.36247 2.64447L6.80029 3.76175C8.60946 3.0528 10.7439 3.43018 12.204 4.89033L13.0526 4.0418ZM14.4499 10.732C15.3266 8.49475 14.862 5.85124 13.0526 4.0418L12.204 4.89033C13.6642 6.3505 14.0416 8.48498 13.3326 10.2942L14.4499 10.732ZM13.467 10.9373L20.2306 17.701L21.0792 16.8525L14.3155 10.0888L13.467 10.9373ZM20.2306 17.701C20.877 18.3474 20.877 19.3954 20.2306 20.0418L21.0792 20.8904C22.1942 19.7753 22.1942 17.9675 21.0792 16.8525L20.2306 17.701ZM20.2306 20.0418C19.5842 20.6882 18.5362 20.6882 17.8898 20.0418L17.0413 20.8904C18.1563 22.0054 19.9641 22.0054 21.0792 20.8904L20.2306 20.0418ZM17.8898 20.0418L11.1261 13.2781L10.2776 14.1266L17.0413 20.8904L17.8898 20.0418ZM4.23069 12.8637C6.0401 14.6731 8.68352 15.1377 10.9208 14.261L10.4829 13.1437C8.67378 13.8527 6.53936 13.4753 5.07922 12.0151L4.23069 12.8637Z" fill="currentColor"/>
  </g>
  <defs>
    <clipPath id="clip0_328_244">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
  ),
  'cinfigurations': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M5 3V13.8101M5 21V18.2611" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M19 3V10.8849M19 21V15.2162" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M12 21L12 10.1899M12 3L12 5.73888" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
  <circle cx="5" cy="16" r="2" stroke="currentColor" stroke-width="1.2"/>
  <circle cx="19" cy="13" r="2" stroke="currentColor" stroke-width="1.2"/>
  <circle cx="12" cy="8" r="2" transform="rotate(-180 12 8)" stroke="currentColor" stroke-width="1.2"/>
</svg>
  ),
  'lock': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8 10H6C4.89543 10 4 10.8954 4 12V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V12C20 10.8954 19.1046 10 18 10H16M8 10V7C8 4.79086 9.79086 3 12 3V3C14.2091 3 16 4.79086 16 7V10M8 10H16M12 14V17" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'lock-off': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8 10H6C4.89543 10 4 10.8954 4 12V19C4 20.1046 4.89543 21 6 21H18C18.7403 21 19.3866 20.5978 19.7324 20M8 10V8M8 10H10M16 10H18C19.1046 10 20 10.8954 20 12V15M16 10V7C16 4.79086 14.2091 3 12 3C11.2714 3 10.5883 3.19479 10 3.53513M16 10H15M12 14V17" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3 3L21 21" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'unlock': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8 10H6C4.89543 10 4 10.8954 4 12V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V12C20 10.8954 19.1046 10 18 10H16H8ZM8 10V7C8 5.66667 8.8 3 12 3C13.9039 3 14.9583 3.94401 15.5 4.98952M12 14V17" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'eye': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 5C5.69265 5 2.63286 10.6832 2.08909 11.808C2.02953 11.9311 2.02953 12.0689 2.08909 12.192C2.63286 13.3168 5.69265 19 12 19C18.3074 19 21.3671 13.3168 21.9109 12.192C21.9705 12.0689 21.9705 11.9311 21.9109 11.808C21.3671 10.6832 18.3074 5 12 5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'eye-off': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M7 6.36185C8.36209 5.55936 10.0212 5 12 5C18.3074 5 21.3671 10.6832 21.9109 11.808C21.9705 11.9311 21.9702 12.0694 21.9107 12.1926C21.5585 12.9208 20.1542 15.5545 17.5 17.3244M14 18.8001C13.3735 18.9286 12.7071 19 12 19C5.69265 19 2.63286 13.3168 2.08909 12.192C2.02953 12.0689 2.03049 11.9291 2.09008 11.8059C2.30875 11.3539 2.9298 10.1741 4 8.92114" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 9.76389C10.5308 9.28885 11.2316 9 12 9C13.6569 9 15 10.3431 15 12C15 12.7684 14.7111 13.4692 14.2361 14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3 3L21 21" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'dots': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" fill="currentColor"/>
  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor"/>
  <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" fill="currentColor"/>
  <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'dots-vertical': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor"/>
  <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" fill="currentColor"/>
  <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" fill="currentColor"/>
  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
};

const Icon = ({ name, size = 24, color = 'currentColor', ...props }) => {
  const icon = icons[name];
  if (!icon) return null;
  return React.cloneElement(icon, { width: size, height: size, color, ...props });
};

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(icons)).isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

export default Icon; 