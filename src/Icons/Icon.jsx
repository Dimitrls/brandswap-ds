import React from 'react';
import PropTypes from 'prop-types';

const icons = {
  'chevron-left': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 7L9 12L14 17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'chevron-right': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M10 7L15 12L10 17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'chevron-down': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 10L12 15L7 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'chevron-up': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 14L12 9L7 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'chevrons-left': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11 7L6 12L11 17M17 7L12 12L17 17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'chevrons-right': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 7L12 12L7 17M13 7L18 12L13 17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'arrow-left': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12L11 6M5 12L11 18M5 12H19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'arrow-right': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 12L13 6M19 12L13 18M19 12H5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'arrow-down': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 19L18 13M12 19L6 13M12 19L12 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'arrow-up': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5L18 11M12 5L6 11M12 5L12 19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'minimize': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 14H10M10 14V18M10 14L4 20M18 10H14M14 10V6M14 10L20 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'maximize': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8 20H4M4 20V16M4 20L10 14M16 4H20M20 4V8M20 4L14 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'undo': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 9V14H9M20 16C19.5026 11.5 16.6326 8 12 8C9.27084 8 6.07142 10.2681 4.70591 13.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'redo': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 9V14H15M4 16C4.49744 11.5 7.36745 8 12 8C14.7292 8 17.9286 10.2681 19.2941 13.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'reload': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 13.5C19 17.6421 15.6421 21 11.5 21C7.35786 21 4 17.6421 4 13.5C4 9.35786 7.35786 6 11.5 6H20M20 6L17 3M20 6L17 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'play': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 4V20L20 12L7 4Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'pause': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 5H7C6.44772 5 6 5.44772 6 6V18C6 18.5523 6.44772 19 7 19H9C9.55228 19 10 18.5523 10 18V6C10 5.44772 9.55228 5 9 5Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 5H15C14.4477 5 14 5.44772 14 6V18C14 18.5523 14.4477 19 15 19H17C17.5523 19 18 18.5523 18 18V6C18 5.44772 17.5523 5 17 5Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'minus': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12H12H19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'plus': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12H12M19 12H12M12 12V5M12 12V19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'close': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 12L7 7M12 12L17 17M12 12L17 7M12 12L7 17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'check': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L20 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'forbid': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'info-circle': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 8H12.01M11 12H12V16H13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'alert-triangle': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11.9999 9V11M11.9999 15V15.01M4.99995 19H18.9999C19.3263 18.9977 19.647 18.9156 19.9343 18.7609C20.2216 18.6061 20.4667 18.3835 20.6482 18.1123C20.8296 17.841 20.942 17.5296 20.9754 17.205C21.0088 16.8804 20.9623 16.5525 20.8399 16.25L13.7399 4.00002C13.567 3.68741 13.3135 3.42685 13.0057 3.2454C12.6979 3.06396 12.3472 2.96826 11.9899 2.96826C11.6327 2.96826 11.2819 3.06396 10.9742 3.2454C10.6664 3.42685 10.4129 3.68741 10.2399 4.00002L3.13995 16.25C3.01989 16.5456 2.97228 16.8656 3.0011 17.1833C3.02991 17.501 3.13432 17.8073 3.3056 18.0764C3.47688 18.3456 3.71006 18.5698 3.98567 18.7305C4.26129 18.8912 4.57134 18.9836 4.88995 19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'alert-octagon': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 8V12M12 16H12.01M8.7 3H15.3C15.6 3 15.8 3.1 16 3.3L20.7 8C20.9 8.2 21 8.4 21 8.7V15.3C21 15.6 20.9 15.8 20.7 16L16 20.7C15.8 20.9 15.6 21 15.3 21H8.7C8.4 21 8.2 20.9 8 20.7L3.3 16C3.1 15.8 3 15.6 3 15.3V8.7C3 8.4 3.1 8.2 3.3 8L8 3.3C8.2 3.1 8.4 3 8.7 3Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'check-circle': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'search': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'upload': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7.5 19C5.66667 19 2 17.9 2 13.5C2 9.1 5.66667 8 7.5 8C8 7 9.7 5 12.5 5C16 5 17.5 8.5 17.5 10C19 10 22 10.9 22 14.5C22 18.1 19 19 17.5 19M12 11L9 14M12 11L15 14M12 11V19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'download': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 9V19C20 20.1046 19.1046 21 18 21L6 21C4.89543 21 4 20.1046 4 19L4 5C4 3.89543 4.89543 3 6 3H14M20 9V8.82843C20 8.29799 19.7893 7.78929 19.4142 7.41421L15.5858 3.58579C15.2107 3.21071 14.702 3 14.1716 3H14M20 9H16C14.8954 9 14 8.10457 14 7L14 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 18L9 15M12 18L15 15M12 18V12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'file-export': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19M14 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H11.5M14 3L19 8M19 8V13M14 19H21M21 19L18 16M21 19L18 22" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'file-import': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19M14 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V13M14 3L19 8M19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H11.5M2 19H9M9 19L6 16M9 19L6 22" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'filter': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 4H6C4.89543 4 3.97434 4.90932 4.24685 5.97975C4.83604 8.29411 6.43423 10.2054 8.54545 11.2177C9.36832 11.6123 10 12.3858 10 13.2984V19.382C10 20.1253 10.7823 20.6088 11.4472 20.2764L13.4472 19.2764C13.786 19.107 14 18.7607 14 18.382V13.2984C14 12.3858 14.6317 11.6123 15.4545 11.2177C17.5658 10.2054 19.164 8.29411 19.7531 5.97975C20.0257 4.90932 19.1046 4 18 4Z" stroke="currentColor" stroke-width="1.6"/></svg>
  ),
  'share': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8.70001 10.7L15.3 7.29999M8.70001 13.3L15.3 16.7M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6ZM21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'share-ios': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3L8 6.85714M12 3L16 6.85714M12 3V16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.5 10H16C17.6569 10 19 11.3431 19 13V19C19 20.6569 17.6569 22 16 22H8C6.34315 22 5 20.6569 5 19V13C5 11.3431 6.34315 10 8 10H9.5" stroke="black" stroke-width="1.6"/></svg>
  ),
  'pencil': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 6L16.2929 3.70711C16.6834 3.31658 17.3166 3.31658 17.7071 3.70711L20.2929 6.29289C20.6834 6.68342 20.6834 7.31658 20.2929 7.70711L18 10M14 6L4.29289 15.7071C4.10536 15.8946 4 16.149 4 16.4142V19C4 19.5523 4.44772 20 5 20H7.58579C7.851 20 8.10536 19.8946 8.29289 19.7071L18 10M14 6L18 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'copy': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M16 8V6C16 5.46957 15.7893 4.96086 15.4142 4.58579C15.0391 4.21071 14.5304 4 14 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V14C4 14.5304 4.21071 15.0391 4.58579 15.4142C4.96086 15.7893 5.46957 16 6 16H8M10 8H18C19.1046 8 20 8.89543 20 10V18C20 19.1046 19.1046 20 18 20H10C8.89543 20 8 19.1046 8 18V10C8 8.89543 8.89543 8 10 8Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'trash': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M9 6V6C9 4.34315 10.3431 3 12 3V3C13.6569 3 15 4.34315 15 6V6M9 6H15M9 6H5M15 6H19M21 6H19M3 6H5M5 6V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V6M10 10V17M14 17V10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'backspace': (
    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="16" viewBox="0 0 23 16" fill="none">
  <path d="M14 8L11 5M14 8L17 11M14 8L17 5M14 8L11 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.14286 1H22V15H7.14286L1 8L7.14286 1Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
</svg>
  ),
  'remove': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M21 14H18.3529L17.2941 21H6.70589L5.64706 14H3" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M3 6.6L6.52941 3M3 6.6L6.52941 10.2M3 6.6H10C11.1046 6.6 12 7.49543 12 8.6V15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'cog': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M14 21H9.99996L9.44899 18.5206C8.78785 18.2618 8.17569 17.9053 7.63023 17.4689L5.20569 18.232L3.20569 14.7679L5.07823 13.0503C5.02668 12.7077 4.99996 12.357 4.99996 12C4.99996 11.643 5.02668 11.2923 5.07824 10.9496L3.20569 9.23204L5.20569 5.76794L7.63025 6.53106C8.1757 6.09467 8.78786 5.73819 9.44899 5.47935L9.99996 3H14L14.5509 5.47935C15.212 5.73819 15.8242 6.09466 16.3696 6.53104L18.7941 5.76794L20.7941 9.23204L18.9217 10.9496C18.9732 11.2922 19 11.643 19 12C19 12.357 18.9732 12.7078 18.9217 13.0504L20.7941 14.7679L18.7941 18.232L16.3697 17.4689C15.8242 17.9053 15.2121 18.2618 14.5509 18.5206L14 21Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/>
</svg>
  ),
  'wrench': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4.655 12.4394C3.0202 10.8046 2.59922 8.41565 3.39206 6.39244L6.39326 9.39363C6.78378 9.78416 7.41695 9.78416 7.80747 9.39363L9.5826 7.61851C9.97312 7.22798 9.97313 6.59482 9.5826 6.20429L6.58142 3.20311C8.60462 2.41029 10.9936 2.83128 12.6283 4.46606C14.2632 6.10087 14.6841 8.48986 13.8913 10.5131L20.6549 17.2768C21.5356 18.1575 21.5356 19.5854 20.6549 20.4661C19.7742 21.3468 18.3463 21.3468 17.4656 20.4661L10.7019 13.7024C8.67869 14.4952 6.28977 14.0742 4.655 12.4394Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
  ),
  'cinfigurations': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M5 3V13.8101M5 21V18.2611" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M19 3V10.8849M19 21V15.2162" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M12 21L12 10.1899M12 3L12 5.73888" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <circle cx="5" cy="16" r="2" stroke="currentColor" stroke-width="1.6"/>
  <circle cx="19" cy="13" r="2" stroke="currentColor" stroke-width="1.6"/>
  <circle cx="12" cy="8" r="2" transform="rotate(-180 12 8)" stroke="currentColor" stroke-width="1.6"/>
</svg>
  ),
  'lock': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8 10H6C4.89543 10 4 10.8954 4 12V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V12C20 10.8954 19.1046 10 18 10H16M8 10V7C8 4.79086 9.79086 3 12 3V3C14.2091 3 16 4.79086 16 7V10M8 10H16M12 14V17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'lock-off': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8 10H6C4.89543 10 4 10.8954 4 12V19C4 20.1046 4.89543 21 6 21H18C18.7403 21 19.3866 20.5978 19.7324 20M8 10V8M8 10H10M16 10H18C19.1046 10 20 10.8954 20 12V15M16 10V7C16 4.79086 14.2091 3 12 3C11.2714 3 10.5883 3.19479 10 3.53513M16 10H15M12 14V17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3 3L21 21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'unlock': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8 10H6C4.89543 10 4 10.8954 4 12V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V12C20 10.8954 19.1046 10 18 10H16H8ZM8 10V7C8 5.66667 8.8 3 12 3C13.9039 3 14.9583 3.94401 15.5 4.98952M12 14V17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'eye': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 5C5.69265 5 2.63286 10.6832 2.08909 11.808C2.02953 11.9311 2.02953 12.0689 2.08909 12.192C2.63286 13.3168 5.69265 19 12 19C18.3074 19 21.3671 13.3168 21.9109 12.192C21.9705 12.0689 21.9705 11.9311 21.9109 11.808C21.3671 10.6832 18.3074 5 12 5Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'eye-off': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M7 6.36185C8.36209 5.55936 10.0212 5 12 5C18.3074 5 21.3671 10.6832 21.9109 11.808C21.9705 11.9311 21.9702 12.0694 21.9107 12.1926C21.5585 12.9208 20.1542 15.5545 17.5 17.3244M14 18.8001C13.3735 18.9286 12.7071 19 12 19C5.69265 19 2.63286 13.3168 2.08909 12.192C2.02953 12.0689 2.03049 11.9291 2.09008 11.8059C2.30875 11.3539 2.9298 10.1741 4 8.92114" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 9.76389C10.5308 9.28885 11.2316 9 12 9C13.6569 9 15 10.3431 15 12C15 12.7684 14.7111 13.4692 14.2361 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3 3L21 21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'dots': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" fill="currentColor"/>
  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor"/>
  <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" fill="currentColor"/>
  <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'dots-vertical': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor"/>
  <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" fill="currentColor"/>
  <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" fill="currentColor"/>
  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'home': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M20 19V10.5C20 10.1852 19.8518 9.88885 19.6 9.7L12.6 4.45C12.2444 4.18333 11.7556 4.18333 11.4 4.45L4.4 9.7C4.14819 9.88885 4 10.1852 4 10.5V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'monitor': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 16H19C20.1046 16 21 15.1046 21 14V6C21 4.89543 20.1046 4 19 4L5 4C3.89543 4 3 4.89543 3 6L3 14C3 15.1046 3.89543 16 5 16H12ZM12 16V20M12 20L16 20M12 20H8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'phone': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M11 18L13 18M18 19L18 5C18 3.89543 17.1046 3 16 3L8 3C6.89543 3 6 3.89543 6 5L6 19C6 20.1046 6.89543 21 8 21L16 21C17.1046 21 18 20.1046 18 19Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'calendar': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M4 9V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V9M4 9V7C4 5.89543 4.89543 5 6 5H8M4 9H20M20 9V7C20 5.89543 19.1046 5 18 5H16M16 5V3M16 5H8M8 3V5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'calendar-plus': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M4 9V19C4 20.1046 4.89543 21 6 21H12M4 9V7C4 5.89543 4.89543 5 6 5H8M4 9H20M20 9V7C20 5.89543 19.1046 5 18 5H16M20 9V12M16 5V3M16 5H8M8 3V5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19 16V19M19 22V19M19 19H22M19 19H16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'note': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M21 15L21 5C21 3.89543 20.1046 3 19 3L5 3C3.89543 3 3 3.89543 3 5L3 19C3 20.1046 3.89543 21 5 21L15 21M21 15V15.1716C21 15.702 20.7893 16.2107 20.4142 16.5858L16.5858 20.4142C16.2107 20.7893 15.702 21 15.1716 21H15M21 15L17 15C15.8954 15 15 15.8954 15 17L15 21M7 7L17 7M7 11L17 11M7 15L11 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ), 
  'code': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8 7L3 12L8 17M16 17L21 12L16 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ), 
  'curly-braces': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M9.5 5H9C7.89543 5 7 5.89543 7 7V9C7 10 6.4 12 4 12C5 12 7 12.6 7 15V17.0002C7 18.1048 7.89543 19 9 19H9.5M14.5 5H15C16.1046 5 17 5.89543 17 7V9C17 10 17.6 12 20 12C19 12 17 12.6 17 15V17.0002C17 18.1048 16.1046 19 15 19H14.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ), 
  'megaphone': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M13 15V7M13 15L18.5039 18.1451C19.1705 18.526 20 18.0446 20 17.2768V14V8V4.72318C20 3.95536 19.1705 3.47399 18.5039 3.85494L13 7M13 15H10M13 7H7C4.79086 7 3 8.79086 3 11V11C3 13.2091 4.79086 15 7 15V15M7 15V19.5C7 20.3284 7.67157 21 8.5 21V21C9.32843 21 10 20.3284 10 19.5V15M7 15H10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ), 
  'offer': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8.98874 14.9888L14.9887 8.98877M9.98874 9.48877C9.98874 9.76491 9.76488 9.98877 9.48874 9.98877C9.2126 9.98877 8.98874 9.76491 8.98874 9.48877C8.98874 9.21263 9.2126 8.98877 9.48874 8.98877C9.76488 8.98877 9.98874 9.21263 9.98874 9.48877ZM14.9887 14.4888C14.9887 14.7649 14.7649 14.9888 14.4887 14.9888C14.2126 14.9888 13.9887 14.7649 13.9887 14.4888C13.9887 14.2126 14.2126 13.9888 14.4887 13.9888C14.7649 13.9888 14.9887 14.2126 14.9887 14.4888ZM4.98874 7.18874C4.98874 6.60527 5.22053 6.04569 5.63311 5.63311C6.04569 5.22053 6.60527 4.98874 7.18874 4.98874H8.18874C8.76964 4.98841 9.32683 4.75834 9.73874 4.34874L10.4387 3.64874C10.6432 3.44314 10.8863 3.27998 11.154 3.16865C11.4217 3.05731 11.7088 3 11.9987 3C12.2887 3 12.5758 3.05731 12.8435 3.16865C13.1112 3.27998 13.3543 3.44314 13.5587 3.64874L14.2587 4.34874C14.6707 4.75834 15.2278 4.98841 15.8087 4.98874H16.8087C17.3922 4.98874 17.9518 5.22053 18.3644 5.63311C18.777 6.04569 19.0087 6.60527 19.0087 7.18874V8.18874C19.0091 8.76964 19.2391 9.32683 19.6487 9.73874L20.3487 10.4387C20.5543 10.6432 20.7175 10.8863 20.8288 11.154C20.9402 11.4217 20.9975 11.7088 20.9975 11.9987C20.9975 12.2887 20.9402 12.5758 20.8288 12.8435C20.7175 13.1112 20.5543 13.3543 20.3487 13.5587L19.6487 14.2587C19.2391 14.6707 19.0091 15.2278 19.0087 15.8087V16.8087C19.0087 17.3922 18.777 17.9518 18.3644 18.3644C17.9518 18.777 17.3922 19.0087 16.8087 19.0087H15.8087C15.2278 19.0091 14.6707 19.2391 14.2587 19.6487L13.5587 20.3487C13.3543 20.5543 13.1112 20.7175 12.8435 20.8288C12.5758 20.9402 12.2887 20.9975 11.9987 20.9975C11.7088 20.9975 11.4217 20.9402 11.154 20.8288C10.8863 20.7175 10.6432 20.5543 10.4387 20.3487L9.73874 19.6487C9.32683 19.2391 8.76964 19.0091 8.18874 19.0087H7.18874C6.60527 19.0087 6.04569 18.777 5.63311 18.3644C5.22053 17.9518 4.98874 17.3922 4.98874 16.8087V15.8087C4.98841 15.2278 4.75834 14.6707 4.34874 14.2587L3.64874 13.5587C3.44314 13.3543 3.27998 13.1112 3.16865 12.8435C3.05731 12.5758 3 12.2887 3 11.9987C3 11.7088 3.05731 11.4217 3.16865 11.154C3.27998 10.8863 3.44314 10.6432 3.64874 10.4387L4.34874 9.73874C4.75834 9.32683 4.98841 8.76964 4.98874 8.18874V7.18874Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ), 
  'featured-offer': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8.98874 14.9888L14.9887 8.98877M20.8288 12.8435C20.9402 12.5758 20.9975 12.2887 20.9975 11.9987C20.9975 11.7088 20.9402 11.4217 20.8288 11.154C20.7175 10.8863 20.5543 10.6432 20.3487 10.4387L19.6487 9.73874C19.2391 9.32683 19.0091 8.76964 19.0087 8.18874V7.18874C19.0087 6.60527 18.777 6.04569 18.3644 5.63311C17.9518 5.22053 17.3922 4.98874 16.8087 4.98874H15.8087C15.2278 4.98841 14.6707 4.75834 14.2587 4.34874L13.5587 3.64874C13.3543 3.44314 13.1112 3.27998 12.8435 3.16865C12.5758 3.05731 12.2887 3 11.9987 3C11.7088 3 11.4217 3.05731 11.154 3.16865C10.8863 3.27998 10.6432 3.44314 10.4387 3.64874L9.73874 4.34874C9.32683 4.75834 8.76964 4.98841 8.18874 4.98874H7.18874C6.60527 4.98874 6.04569 5.22053 5.63311 5.63311C5.22053 6.04569 4.98874 6.60527 4.98874 7.18874V8.18874C4.98841 8.76964 4.75834 9.32683 4.34874 9.73874L3.64874 10.4387C3.44314 10.6432 3.27998 10.8863 3.16865 11.154C3.05731 11.4217 3 11.7088 3 11.9987C3 12.2887 3.05731 12.5758 3.16865 12.8435C3.27998 13.1112 3.44314 13.3543 3.64874 13.5587L4.34874 14.2587C4.75834 14.6707 4.98841 15.2278 4.98874 15.8087V16.8087C4.98874 17.3922 5.22053 17.9518 5.63311 18.3644C6.04569 18.777 6.60527 19.0087 7.18874 19.0087H8.18874C8.76964 19.0091 9.32683 19.2391 9.73874 19.6487L10.4387 20.3487C10.6432 20.5543 10.8863 20.7175 11.154 20.8288C11.4217 20.9402 11.7088 20.9975 11.9987 20.9975M9.98874 9.48877C9.98874 9.76491 9.76488 9.98877 9.48874 9.98877C9.2126 9.98877 8.98874 9.76491 8.98874 9.48877C8.98874 9.21263 9.2126 8.98877 9.48874 8.98877C9.76488 8.98877 9.98874 9.21263 9.98874 9.48877Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M17.5006 20.6688L15.1735 21.9489C15.1044 21.9866 15.0268 22.0035 14.9491 21.9975C14.8715 21.9916 14.7969 21.9631 14.7338 21.9153C14.6707 21.8674 14.6214 21.8021 14.5916 21.7266C14.5618 21.6511 14.5526 21.5684 14.5649 21.4877L15.0096 18.7756L13.1271 16.8555C13.0709 16.7984 13.0311 16.726 13.0123 16.6463C12.9935 16.5667 12.9963 16.4831 13.0206 16.4051C13.0448 16.3271 13.0895 16.2578 13.1494 16.2052C13.2093 16.1526 13.2822 16.1187 13.3596 16.1074L15.961 15.7115L17.1246 13.2446C17.1594 13.1711 17.213 13.1093 17.2794 13.0661C17.3459 13.0229 17.4225 13 17.5006 13C17.5788 13 17.6554 13.0229 17.7218 13.0661C17.7883 13.1093 17.8419 13.1711 17.8767 13.2446L19.0402 15.7115L21.6416 16.1074C21.7188 16.1191 21.7914 16.1532 21.8511 16.2059C21.9107 16.2586 21.9552 16.3277 21.9794 16.4056C22.0036 16.4834 22.0065 16.5668 21.9879 16.6463C21.9693 16.7258 21.9299 16.7982 21.8741 16.8555L19.9917 18.7756L20.4352 21.4866C20.4485 21.5674 20.44 21.6505 20.4106 21.7265C20.3811 21.8025 20.332 21.8683 20.2687 21.9165C20.2055 21.9646 20.1306 21.9932 20.0526 21.9989C19.9747 22.0047 19.8968 21.9873 19.8277 21.9489L17.5006 20.6688Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ), 
  'brush': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8.2 13.2C9.2177 10.505 10.9441 8.13474 13.1971 6.33944C15.45 4.54414 18.1458 3.3904 21 3C20.6096 5.85418 19.4559 8.55002 17.6606 10.8029C15.8653 13.0559 13.495 14.7823 10.8 15.8M10.6 9C12.5432 9.89687 14.1031 11.4568 15 13.4M3 21V17C3 16.2089 3.2346 15.4355 3.67412 14.7777C4.11365 14.1199 4.73836 13.6072 5.46927 13.3045C6.20017 13.0017 7.00444 12.9225 7.78036 13.0769C8.55629 13.2312 9.26902 13.6122 9.82843 14.1716C10.3878 14.731 10.7688 15.4437 10.9231 16.2196C11.0775 16.9956 10.9983 17.7998 10.6955 18.5307C10.3928 19.2616 9.88008 19.8864 9.22228 20.3259C8.56448 20.7654 7.79113 21 7 21H3Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ), 
  'design-tools': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8.2 13.2C9.2177 10.505 10.9441 8.13474 13.1971 6.33944C15.45 4.54414 18.1458 3.3904 21 3C20.6096 5.85418 19.4559 8.55002 17.6606 10.8029C15.8653 13.0559 13.495 14.7823 10.8 15.8M3 21V17C3 16.2089 3.2346 15.4355 3.67412 14.7777C4.11365 14.1199 4.73836 13.6072 5.46927 13.3045C6.20017 13.0017 7.00444 12.9225 7.78036 13.0769C8.55629 13.2312 9.26902 13.6122 9.82843 14.1716C10.3878 14.731 10.7688 15.4437 10.9231 16.2196C11.0775 16.9956 10.9983 17.7998 10.6955 18.5307C10.3928 19.2616 9.88008 19.8864 9.22228 20.3259C8.56448 20.7654 7.79113 21 7 21H3Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4.97487 8.97487L2.5 6.5L6.74264 2.25736L11.8924 7.40715M4.97487 8.97487L6.35663 7.59312M4.97487 8.97487L8.35338 12.3534M14.8744 18.8744L17.3492 21.3492L21.5919 17.1066L16.6107 12.1255M14.8744 18.8744L16.2561 17.4926M14.8744 18.8744L11.6139 15.6139" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ), 
  'chart-pie': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M9.99996 3.19998C8.43567 3.56262 6.99688 4.33718 5.83284 5.44332C4.6688 6.54946 3.8219 7.94689 3.37999 9.49066C2.93808 11.0344 2.91725 12.6683 3.31965 14.2229C3.72206 15.7774 4.53305 17.196 5.66851 18.3314C6.80397 19.4669 8.22254 20.2779 9.77708 20.6803C11.3316 21.0827 12.9655 21.0619 14.5093 20.62C16.0531 20.178 17.4505 19.3311 18.5566 18.1671C19.6628 17.0031 20.4373 15.5643 20.8 14C20.8 13.7348 20.6946 13.4804 20.5071 13.2929C20.3195 13.1053 20.0652 13 19.8 13H13C12.4695 13 11.9608 12.7893 11.5857 12.4142C11.2107 12.0391 11 11.5304 11 11V3.99998C10.9875 3.88151 10.9517 3.76668 10.8946 3.66215C10.8374 3.55763 10.7601 3.46548 10.6671 3.39107C10.5741 3.31665 10.4672 3.26144 10.3527 3.22864C10.2382 3.19584 10.1183 3.1861 9.99996 3.19998Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 3.5C16.2697 3.94708 17.4229 4.6733 18.3748 5.62516C19.3267 6.57702 20.0529 7.73028 20.5 9H16C15.7347 9 15.4804 8.89464 15.2929 8.70711C15.1053 8.51957 15 8.26522 15 8V3.5Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ), 
  'webpage': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M4 8H20M8 4V8M5 4H19C19.5523 4 20 4.44772 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44772 4 5 4Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ), 
  'web-ad': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M4 8H20M8 4V8M5 4H19C19.5523 4 20 4.44772 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44772 4 5 4Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7 17V13C7 12.4696 7.21071 11.9609 7.58579 11.5858C7.96086 11.2107 8.46957 11 9 11C9.53043 11 10.0391 11.2107 10.4142 11.5858C10.7893 11.9609 11 12.4696 11 13V17M7 15H11M17 11V17H15.5C15.2033 17 14.9133 16.912 14.6666 16.7472C14.42 16.5824 14.2277 16.3481 14.1142 16.074C14.0007 15.7999 13.9709 15.4983 14.0288 15.2074C14.0867 14.9164 14.2296 14.6491 14.4393 14.4393C14.6491 14.2296 14.9164 14.0867 15.2074 14.0288C15.4983 13.9709 15.7999 14.0006 16.074 14.1142C16.3481 14.2277 16.5824 14.42 16.7472 14.6666C16.912 14.9133 17 15.2033 17 15.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ), 
  'store': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M3 21H21M3 7V8C3 8.79565 3.31607 9.55871 3.87868 10.1213C4.44129 10.6839 5.20435 11 6 11C6.79565 11 7.55871 10.6839 8.12132 10.1213C8.68393 9.55871 9 8.79565 9 8M3 7H9V8M3 7H21M3 7L5 3H19L21 7M9 8C9 8.79565 9.31607 9.55871 9.87868 10.1213C10.4413 10.6839 11.2044 11 12 11C12.7956 11 13.5587 10.6839 14.1213 10.1213C14.6839 9.55871 15 8.79565 15 8M15 8V7M15 8C15 8.79565 15.3161 9.55871 15.8787 10.1213C16.4413 10.6839 17.2044 11 18 11C18.7956 11 19.5587 10.6839 20.1213 10.1213C20.6839 9.55871 21 8.79565 21 8V7M5 21.0001V10.8501M19 21.0001V10.8501M9 21V17C9 16.4696 9.21071 15.9609 9.58579 15.5858C9.96086 15.2107 10.4696 15 11 15H13C13.5304 15 14.0391 15.2107 14.4142 15.5858C14.7893 15.9609 15 16.4696 15 17V21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ), 
  'test-tube': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M4.00043 8.04L16.1224 20.164C16.3877 20.4293 16.7026 20.6398 17.0493 20.7834C17.3959 20.9271 17.7674 21.001 18.1426 21.0011C18.9003 21.0012 19.6271 20.7002 20.1629 20.1645C20.6988 19.6288 20.9999 18.9021 21 18.1444C21.0001 17.3866 20.6992 16.6599 20.1634 16.124L8.04144 4M17.0004 13H9.00043M9.00043 3L3.00043 9M5.00044 15L3.50043 16.6C3.24585 16.8887 3.07997 17.2447 3.0227 17.6253C2.96543 18.0059 3.0192 18.3949 3.17756 18.7458C3.33592 19.0966 3.59214 19.3942 3.91548 19.603C4.23882 19.8118 4.61554 19.9229 5.00044 19.9229C5.38533 19.9229 5.76205 19.8118 6.08539 19.603C6.40873 19.3942 6.66495 19.0966 6.82331 18.7458C6.98167 18.3949 7.03544 18.0059 6.97817 17.6253C6.9209 17.2447 6.75502 16.8887 6.50044 16.6L5.00044 15Z" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ), 
  'click': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M3 12H6M12 3V6M7.79998 7.79998L5.59998 5.59998M16.2 7.79998L18.4 5.59998M7.79998 16.2L5.59998 18.4M12 12L21 15L17 17L15 21L12 12Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ), 
  'coffee': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M3 14.0001C3.83 14.6421 5.077 15.0171 6.5 15.0001C7.923 15.0171 9.17 14.6421 10 14.0001C10.83 13.3581 12.077 12.9831 13.5 13.0001C14.923 12.9831 16.17 13.3581 17 14.0001M8.00001 3C7.68352 3.22717 7.42708 3.52797 7.25286 3.87642C7.07863 4.22488 6.99185 4.6105 7.00001 5C6.99185 5.3895 7.07863 5.77512 7.25286 6.12358C7.42708 6.47203 7.68352 6.77283 8.00001 7M12 3C11.6835 3.22717 11.4271 3.52797 11.2529 3.87642C11.0786 4.22488 10.9918 4.6105 11 5C10.9918 5.3895 11.0786 5.77512 11.2529 6.12358C11.4271 6.47203 11.6835 6.77283 12 7M16.746 16.7259C17.1926 16.931 17.6827 17.0231 18.1733 16.9944C18.6639 16.9656 19.1398 16.8167 19.5594 16.5609C19.979 16.3051 20.3293 15.9501 20.5795 15.5272C20.8297 15.1043 20.9723 14.6264 20.9945 14.1355C21.0168 13.6446 20.9181 13.1557 20.7072 12.7119C20.4963 12.268 20.1796 11.8828 19.7849 11.59C19.3902 11.2973 18.9297 11.1059 18.4437 11.0329C17.9578 10.9598 17.4613 11.0072 16.998 11.1709M3 10H17V15C17 16.5913 16.3679 18.1174 15.2426 19.2426C14.1174 20.3679 12.5913 21 11 21H9C7.4087 21 5.88258 20.3679 4.75736 19.2426C3.63214 18.1174 3 16.5913 3 15V10Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ), 
  'map': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M11.5 5.5L9 4M9 4L3 7V20L9 17M9 4V17M9 17L15 20M15 20L21 17V14M15 20V14M18 13L14.5 7.99997C14.1631 7.391 13.9909 6.70466 14.0004 6.00876C14.0099 5.31287 14.2008 4.63149 14.5543 4.03197C14.9077 3.43245 15.4115 2.93552 16.0158 2.59029C16.6201 2.24506 17.304 2.06348 18 2.06348C18.696 2.06348 19.3799 2.24506 19.9842 2.59029C20.5885 2.93552 21.0923 3.43245 21.4457 4.03197C21.7992 4.63149 21.9901 5.31287 21.9996 6.00876C22.0091 6.70466 21.8369 7.391 21.5 7.99997L18 13ZM18.5 6C18.5 6.27614 18.2761 6.5 18 6.5C17.7239 6.5 17.5 6.27614 17.5 6C17.5 5.72386 17.7239 5.5 18 5.5C18.2761 5.5 18.5 5.72386 18.5 6Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ), 
  'circle-square': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9.5 16C13.0899 16 16 13.0899 16 9.5C16 5.91015 13.0899 3 9.5 3C5.91015 3 3 5.91015 3 9.5C3 13.0899 5.91015 16 9.5 16Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 10H12C10.8954 10 10 10.8954 10 12V19C10 20.1046 10.8954 21 12 21H19C20.1046 21 21 20.1046 21 19V12C21 10.8954 20.1046 10 19 10Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ), 
  'table-pencil': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11.5 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V11.5M4 10H20M10 4V20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.9177 14.9057C17.9446 14.8788 17.9907 14.8327 18.05 14.7734C18.746 14.0774 19.8749 14.0769 20.5708 14.7729V14.7729C21.2656 15.4677 21.2667 16.5945 20.573 17.2904C20.5123 17.3513 20.4652 17.3985 20.4378 17.4258L17.0456 20.8436L14.2728 21.0708L14.5 18.298L17.9177 14.9057Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  ),
  'gift': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 8V21M12 8C11.6383 6.5094 11.0154 5.23507 10.2127 4.34317C9.41003 3.45127 8.46469 2.9832 7.5 3.00001C6.83696 3.00001 6.20107 3.2634 5.73223 3.73224C5.26339 4.20108 5 4.83697 5 5.50001C5 6.16305 5.26339 6.79894 5.73223 7.26778C6.20107 7.73662 6.83696 8.00001 7.5 8.00001M12 8C12.3617 6.5094 12.9846 5.23507 13.7873 4.34317C14.59 3.45127 15.5353 2.9832 16.5 3.00001C17.163 3.00001 17.7989 3.2634 18.2678 3.73224C18.7366 4.20108 19 4.83697 19 5.50001C19 6.16305 18.7366 6.79894 18.2678 7.26778C17.7989 7.73662 17.163 8.00001 16.5 8.00001M19 12V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V12M4 8H20C20.5523 8 21 8.44772 21 9V11C21 11.5523 20.5523 12 20 12H4C3.44772 12 3 11.5523 3 11V9C3 8.44772 3.44772 8 4 8Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'font-family': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M4 20H7M14 20H21M6.9 15H13.8M10.2 6.30005L16 20M5 20L11 4H13L20 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'font-size': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M2 19.9999H5.2194M13.7448 19.9999H17M5.47964 14.5255H13.6195M15.8911 20L9.66693 5L3.07313 19.9999" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15.4853 5.82843L18.3137 3M18.3137 3L21.1421 5.82843M18.3137 3V11.4853" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'bold': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M13 12C13.9283 12 14.8185 11.6313 15.4749 10.9749C16.1313 10.3185 16.5 9.42826 16.5 8.5C16.5 7.57174 16.1313 6.6815 15.4749 6.02513C14.8185 5.36875 13.9283 5 13 5H7V12M13 12H7M13 12H14C14.9283 12 15.8185 12.3688 16.4749 13.0251C17.1313 13.6815 17.5 14.5717 17.5 15.5C17.5 16.4283 17.1313 17.3185 16.4749 17.9749C15.8185 18.6313 14.9283 19 14 19H7V12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'italic': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M11 5H17M7 19H13M14 5L10 19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'list': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M9 6H20M9 12H20M9 18H20M5 6V6.01M5 12V12.01M5 18V18.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'list-numbers': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M11 6H20M11 12H20M12 18H20M4 16C4 15.4696 4.21071 14.9609 4.58579 14.5858C4.96086 14.2107 5.46957 14 6 14C6.53043 14 7.03914 14.2107 7.41421 14.5858C7.78929 14.9609 8 15.4696 8 16C8 16.591 7.5 17 7 17.5L4 20H8M6 10V4L4 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'radius': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M5 19V13C5 10.8783 5.84285 8.84344 7.34315 7.34315C8.84344 5.84285 10.8783 5 13 5H19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'padding-vertical': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M4 4H20M4 20H20M8 9H16C17.1046 9 18 9.89543 18 11V13C18 14.1046 17.1046 15 16 15H8C6.89543 15 6 14.1046 6 13V11C6 9.89543 6.89543 9 8 9Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'padding-horizontal': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M4 4V20M20 4V20M11 6H13C14.1046 6 15 6.89543 15 8V16C15 17.1046 14.1046 18 13 18H11C9.89543 18 9 17.1046 9 16V8C9 6.89543 9.89543 6 11 6Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'width': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M4 12V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V12M10 18H3M3 18L6 15M3 18L6 21M21 18H14M21 18L18 15M21 18L18 21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'height': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H12M18 14V21M18 21L15 18M18 21L21 18M18 3V10M18 3L15 6M18 3L21 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  'line-solid': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5V2C11.4477 2 11 2.44772 11 3V4C11 4.55228 11.4477 5 12 5ZM12 6C8.68629 6 6 8.68629 6 12C6 14.0883 7.06676 15.9258 8.68257 17H12V6ZM12 18H9V19C9 20.6569 10.3431 22 12 22V18ZM4.79289 4.79289C5.18342 4.40237 5.81658 4.40237 6.20711 4.79289L7.20711 5.79289C7.59763 6.18342 7.59763 6.81658 7.20711 7.20711C6.81658 7.59763 6.18342 7.59763 5.79289 7.20711L4.79289 6.20711C4.40237 5.81658 4.40237 5.18342 4.79289 4.79289ZM2 12C2 11.4477 2.44772 11 3 11H4C4.55228 11 5 11.4477 5 12C5 12.5523 4.55228 13 4 13H3C2.44772 13 2 12.5523 2 12Z" fill="#161616"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21.6C13.4359 21.6 14.6 20.4359 14.6 19V16.9609C16.3826 16.0248 17.6 14.1552 17.6 12C17.6 8.90717 15.0928 6.39996 12 6.39996C12 6.39996 12 6.39996 12 6.39996V7.59996C12 7.59996 12 7.59996 12 7.59996C14.4301 7.59996 16.4 9.56991 16.4 12C16.4 13.8033 15.315 15.3546 13.7598 16.0341C13.2216 16.2692 12.6269 16.4 12 16.4V17.6C12.4829 17.6 12.9522 17.5387 13.4 17.4234V19C13.4 19.7732 12.7732 20.4 12 20.4V21.6ZM12 4.59996C12 4.59996 12 4.59996 12 4.59996C12.3314 4.59996 12.6 4.33133 12.6 3.99996V2.99996C12.6 2.66859 12.3314 2.39996 12 2.39996C12 2.39996 12 2.39996 12 2.39996V4.59996ZM18.9243 5.92423C19.1586 5.68991 19.1586 5.31001 18.9243 5.0757C18.69 4.84138 18.3101 4.84138 18.0757 5.0757L17.0757 6.0757C16.8414 6.31001 16.8414 6.68991 17.0757 6.92423C17.3101 7.15854 17.69 7.15854 17.9243 6.92423L18.9243 5.92423ZM20 11.4C19.6686 11.4 19.4 11.6686 19.4 12C19.4 12.3313 19.6686 12.6 20 12.6H21C21.3314 12.6 21.6 12.3313 21.6 12C21.6 11.6686 21.3314 11.4 21 11.4H20Z" fill="#161616"/>
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