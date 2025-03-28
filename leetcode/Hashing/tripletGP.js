/**
 * Finds the number of triplets (i, j, k) such that arr[i], arr[j], and arr[k]
 * form a geometric progression with a common ratio `r` (i < j < k).
 *
 * Approach:
 * - Use two hash maps (`left` and `right`) to store frequency counts of numbers
 *   before and after the current index.
 * - Initialize `right` with the frequency of all elements.
 * - Iterate through the array, updating `right` and checking if a valid triplet exists:
 *   - If arr[i] can be the second element of a GP (i.e., a/r exists in `left` and ar exists in `right`),
 *     multiply their frequencies to count valid triplets.
 *   - Move arr[i] from `right` to `left` as it is processed.
 */

const getTriplets = (arr, r) => {
  const left = new Map();
  const right = new Map();
  let count = 0;

  for (const num of arr) {
    right.set(num, (right.get(num) ?? 0) + 1);
  }

  for (const num of arr) {
    right.set(num, right.get(num) - 1);

    if (num % r === 0) {
      const aByR = num / r;
      const ar = num * r;

      const leftFreq = left.get(aByR) ?? 0;
      const rightFreq = right.get(ar) ?? 0;

      count += leftFreq * rightFreq;
    }

    left.set(num, (left.get(num) ?? 0) + 1);
  }

  return count;
};

console.log(getTriplets([1, 16, 4, 16, 64, 16], 4)); // Output: 3
