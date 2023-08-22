function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';

const SkeletonBlock = ({
  tag: Tag = 'div',
  width,
  height,
  borderRadius,
  effect,
  className,
  style,
  children,
  ...other
} = {}) => {
  const skeletonStyle = style || {};
  if (width) skeletonStyle.width = width;
  if (height) skeletonStyle.height = height;
  if (borderRadius) skeletonStyle.borderRadius = borderRadius;
  const skeletonClassName = ['skeleton-block', effect && `skeleton-effect-${effect}`, className].filter(c => !!c).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: skeletonStyle,
    className: skeletonClassName
  }, other), children);
};

export default SkeletonBlock;