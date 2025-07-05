// List of framer-motion props that should not be forwarded to DOM elements
const framerMotionProps = [
  'initial',
  'animate',
  'exit',
  'transition',
  'variants',
  'whileHover',
  'whileTap',
  'whileFocus',
  'whileInView',
  'whileDrag',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
  'dragPropagation',
  'dragSnapToOrigin',
  'dragTransition',
  'onDrag',
  'onDragStart',
  'onDragEnd',
  'layout',
  'layoutId',
  'layoutDependency',
  'onLayoutAnimationStart',
  'onLayoutAnimationComplete',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
  'transformTemplate',
  'transformValues',
  'custom',
  'inherit'
];

// Custom theme props that should not be forwarded
const customThemeProps = [
  'isDark',
  'theme',
  'currentTheme'
];

// All props that should be filtered out
const propsToFilter = [...framerMotionProps, ...customThemeProps];

/**
 * Determines whether a prop should be forwarded to the DOM element
 * @param {string} prop - The prop name to check
 * @returns {boolean} - Whether the prop should be forwarded
 */
export const shouldForwardProp = (prop) => {
  return !propsToFilter.includes(prop);
};

export default shouldForwardProp;
