/**
 * https://leetcode.com/problems/jump-game/
 * You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.
 * Return true if you can reach the last index, or false otherwise.
 *
 * Example 1:
 * Input: nums = [2,3,1,1,4]
 * Output: true
 * Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
 *
 * Example 2:
 * Input: nums = [3,2,1,0,4]
 * Output: false
 * Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let maxJump = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxJump) return false;
    maxJump = Math.max(maxJump, i + nums[i]);
  }
  return true;
};

console.log(canJump([2, 3, 1, 1, 4])); // true
console.log(canJump([3, 2, 1, 0, 4])); // false

/**
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * 그리디 알고리즘은 현재 상황에서 최적의 선택을 하는 알고리즘입니다.
 * 이 문제는 그리디 알고리즘을 사용하여 해결할 수 있습니다.
 *
 * 1. 최대 점프 길이를 0으로 초기화합니다.
 * 2. 배열을 순회합니다.
 * 3. 현재 인덱스가 최대 점프 길이보다 크면 false를 반환합니다.
 * 4. 최대 점프 길이를 현재 최대 점프 길이와 현재 인덱스에 값을 더한 값 중 최대값으로 업데이트합니다.
 * 5. 배열을 순회한 후 true를 반환합니다.
 *
 *
 */
