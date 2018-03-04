import React from 'react';
const files = require.context('!svg-sprite!./assets', false, /.*\.svg$/);
files.keys().forEach(files);

const Icon = ({ type, className }) => (
  <svg className={ `dib v-mid ${ className }` }
    width="1em" height="1em">
    <use xlinkHref={ `#${ type }` }></use>
  </svg>
);

export default Icon;
