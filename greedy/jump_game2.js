/**
 * https://leetcode.com/problems/jump-game-ii/
 * You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].
 * Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:
 * 0 <= j <= nums[i] and i + j < n
 * Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].
 *
 * Example 1:
 * Input: nums = [2,3,1,1,4]
 * Output: 2
 * Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
 *
 * Example 2:
 * Input: nums = [2,3,0,1,4]
 * Output: 2
 * Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 2 steps to the last index.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let jumps = 0;
  let farthest = 0;
  let currentEnd = 0;

  for (let i = 0; i < nums.length; i++) {
    farthest = Math.max(farthest, i + nums[i]);

    if (currentEnd === i) {
      jumps++;
      currentEnd = farthest;

      if (currentEnd >= nums.length - 1) break;
    }
  }

  return jumps;
};

console.log(jump([2, 3, 1, 1, 4])); // 2
console.log(jump([2, 3, 0, 1, 4])); // 2

/**
 * 시간 복잡도: O(n)
 * 공간 복잡도: O(1)
 * jumps = 0;       // 지금까지 점프한 횟수
 * currentEnd = 0;  // 현재 점프 안에서 도달할 수 있는 가장 먼 인덱스
 * farthest = 0;    // 전체적으로 도달할 수 있는 가장 먼 인덱스
 *
 * 만약 i === currentEnd (현재 점프 범위의 끝)에 도달했다면,
 * 더 멀리 가기 위해 점프를 한 번 해야 함을 의미합니다.
 * jumps를 1 증가시킵니다.
 * 다음 점프 범위를 설정하기 위해 currentEnd = farthest로 갱신합니다.
 * 만약 currentEnd >= 마지막 인덱스라면,
 * 이미 배열의 끝 또는 그 이후까지 도달 가능하므로 jumps를 반환합니다.
 */
