/**
 * Problem:
 * Given a list of unique points in a 2D plane, find the number of axis-aligned rectangles
 * that can be formed using these points as corners.
 *
 * Approach:
 * - Store all points in a Set for quick lookup.
 * - Iterate through all pairs of points and check if they can form the diagonal of a rectangle.
 * - A valid rectangle requires two additional points: (x1, y2) and (x2, y1).
 * - If both additional points exist in the Set, count it as a rectangle.
 * - Since each rectangle is counted twice (once per diagonal), divide the final count by 2.
 */

const getRectanglesCount = (points) => {
  const pointsSet = new Set(points.map((point) => point.join(",")));
  let count = 0;

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];

      if (x1 === x2 || y1 === y2) continue;

      if (pointsSet.has(`${x1},${y2}`) && pointsSet.has(`${x2},${y1}`)) {
        count++;
      }
    }
  }

  return count / 2;
};

console.log(
  getRectanglesCount([
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
  ])
); // Output: 1

console.log(
  getRectanglesCount([
    [0, 0],
    [0, 1],
    [1, 1],
    [3, 1],
    [1, 0],
    [2, 1],
    [2, 0],
    [3, 0]
  ])
); // Output: 6
