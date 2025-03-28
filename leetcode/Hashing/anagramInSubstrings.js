/**
 * Problem Statement:
 * Given a string `s`, find the number of unordered anagrammatic substring pairs.
 * Two substrings are anagrams if they contain the same characters with the same frequency.
 *
 * Approach:
 * 1. Use a nested loop to generate all substrings dynamically.
 * 2. Maintain a frequency array (`charsFreq`) of size 26 to count character occurrences.
 * 3. Convert `charsFreq` into a hashable string (`hashString`) and store it in a map.
 * 4. If a hashString appears multiple times, it means multiple substrings are anagrams.
 * 5. Use the combination formula: (frequency * (frequency - 1)) / 2 to count anagram pairs.
 *
 * Time Complexity:
 * - O(n²) due to the nested loop processing all substrings.
 * - Updating `charsFreq` and storing it in the map takes O(1).
 */

const anagramSubstrings = (s) => {
  const freqMap = new Map();

  for (let i = 0; i < s.length; i++) {
    const charsFreq = Array(26).fill(0);

    for (let j = i; j < s.length; j++) {
      charsFreq[s[j].charCodeAt(0) - 97]++;
      const hashString = charsFreq.join(",");
      freqMap.set(hashString, (freqMap.get(hashString) ?? 0) + 1);
    }
  }

  let totalAnagrams = 0;

  for (const frequency of freqMap.values()) {
    if (frequency > 1) {
      totalAnagrams += (frequency * (frequency - 1)) / 2;
    }
  }

  return totalAnagrams;
};

console.log(anagramSubstrings("abba")); // Output: 4
