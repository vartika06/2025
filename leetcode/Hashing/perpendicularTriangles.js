/**
 * Problem:
 * Given a list of unique points in a 2D plane, find the number of right-angled triangles
 * that can be formed where one of the sides is parallel to the x-axis and the other to the y-axis.
 *
 * Approach:
 * - Use two hash maps (`xCoordMap` and `yCoordMap`) to count occurrences of each x-coordinate and y-coordinate.
 * - Iterate through each point and treat it as the right-angle vertex.
 * - The number of valid right-angled triangles with this point as the right-angle vertex
 *   is determined by the count of other points sharing its x-coordinate and y-coordinate.
 * - The formula `(xCoordMap.get(x) - 1) * (yCoordMap.get(y) - 1)` ensures:
 *   - `xCoordMap.get(x) - 1`: Excludes the current point while counting other points on the same vertical line.
 *   - `yCoordMap.get(y) - 1`: Excludes the current point while counting other points on the same horizontal line.
 * - Multiply these counts to get the number of valid triangles using this point as the right angle.
 */

const getPerpendicularTriangles = (points) => {
  const xCoordMap = new Map();
  const yCoordMap = new Map();

  for (const [x, y] of points) {
    xCoordMap.set(x, (xCoordMap.get(x) ?? 0) + 1);
    yCoordMap.set(y, (yCoordMap.get(y) ?? 0) + 1);
  }

  let count = 0;
  for (const [x, y] of points) {
    count += (xCoordMap.get(x) - 1) * (yCoordMap.get(y) - 1);
  }

  return count;
};

console.log(
  getPerpendicularTriangles([
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
  ])
); // Output: 1
