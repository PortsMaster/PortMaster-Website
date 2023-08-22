function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';

const SkeletonText = ({
  tag: Tag = 'span',
  effect,
  className,
  children,
  ...other
} = {}) => {
  const skeletonClassName = ['skeleton-text', effect && `skeleton-effect-${effect}`, className].filter(c => !!c).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: skeletonClassName
  }, other), children);
};

export default SkeletonText;