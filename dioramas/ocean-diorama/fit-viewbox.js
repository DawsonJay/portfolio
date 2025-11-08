const fs = require('fs');
const path = require('path');
const { svgPathBbox } = require('svg-path-bbox');

// Function to parse SVG and extract path data
function parseSVG(svgContent) {
  const paths = [];
  const pathRegex = /<path[^>]*\sd="([^"]+)"/g;
  let match;
  
  while ((match = pathRegex.exec(svgContent)) !== null) {
    paths.push(match[1]);
  }
  
  return paths;
}

// Function to calculate combined bounding box
function calculateBoundingBox(paths) {
  if (paths.length === 0) return null;
  
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  
  for (const pathData of paths) {
    try {
      const bbox = svgPathBbox(pathData); // Returns [minX, minY, maxX, maxY]
      minX = Math.min(minX, bbox[0]);
      minY = Math.min(minY, bbox[1]);
      maxX = Math.max(maxX, bbox[2]);
      maxY = Math.max(maxY, bbox[3]);
    } catch (e) {
      console.warn('Error calculating bbox for path:', e.message);
    }
  }
  
  // Add small padding (1% of dimensions)
  const paddingX = (maxX - minX) * 0.01;
  const paddingY = (maxY - minY) * 0.01;
  
  return {
    x: Math.max(0, minX - paddingX),
    y: Math.max(0, minY - paddingY),
    width: maxX - minX + (paddingX * 2),
    height: maxY - minY + (paddingY * 2)
  };
}

// Function to update viewBox in SVG
function updateViewBox(svgContent, bbox) {
  const newViewBox = `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`;
  return svgContent.replace(/viewBox="[^"]*"/, `viewBox="${newViewBox}"`);
}

// Main function
function processSVG(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const paths = parseSVG(content);
  
  if (paths.length === 0) {
    console.warn(`No paths found in ${filePath}`);
    return;
  }
  
  const bbox = calculateBoundingBox(paths);
  if (!bbox) {
    console.warn(`Could not calculate bbox for ${filePath}`);
    return;
  }
  
  const updatedContent = updateViewBox(content, bbox);
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  
  console.log(`${path.basename(filePath)}: viewBox="${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}"`);
}

// Process all SVG files in the current directory
const dioramaDir = __dirname;
const svgFiles = fs.readdirSync(dioramaDir).filter(f => f.endsWith('.svg'));

console.log('Updating viewBox for all SVG files...\n');
svgFiles.forEach(file => {
  processSVG(path.join(dioramaDir, file));
});

console.log('\nDone!');
