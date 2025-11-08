module.exports = {
  plugins: [
    {
      name: 'preset-default',
    },
    // Keep viewBox for responsive scaling (disable removal)
    {
      name: 'removeViewBox',
      active: false,
    },
    // Remove width/height for responsive behavior
    'removeDimensions',
    // Remove metadata and comments
    'removeMetadata',
    'removeComments',
    // Remove hidden elements
    'removeHiddenElems',
    // Collapse groups where safe
    'collapseGroups',
    // Merge paths where safe
    'mergePaths',
    // Convert path data to relative coordinates
    'convertPathData',
    // Remove unused definitions
    'removeUselessDefs',
  ],
  js2svg: {
    // Pretty print with 2-space indent
    pretty: true,
    indent: 2,
  },
};

