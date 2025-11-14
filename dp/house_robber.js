/**
 * https://leetcode.com/problems/house-robber/
 * You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
 * Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.
 *
 * Example 1:
 * Input: nums = [1,2,3,1]
 * Output: 4
 * Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
 * Total amount you can rob = 1 + 3 = 4.
 *
 * Example 2:
 * Input: nums = [2,7,9,3,1]
 * Output: 12
 * Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
 * Total amount you can rob = 2 + 9 + 1 = 12.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];

  let prev2 = nums[0]; // dp[i-2]
  let prev1 = Math.max(nums[0], nums[1]); // dp[i-1]

  for (let i = 2; i < n; i++) {
    const current = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
};

console.log(rob([1, 2, 3, 1])); // 4
console.log(rob([2, 7, 9, 3, 1])); // 12

/**
 * 1. 특정 array index의 집을 기준으로 생각하면, 두 가지 경우의 수가 있을 수 있다. 
 * 2. 첫째, 직전 집 (index: i - 1)을 털었을 때. 이 경우에는 현재 집 (index: i)을 털 수 없다. 왜냐면 연속된 집을 털 수 없다는 문제의 조건 때문이다.
 * 3. 둘째, 그 이전의 집 (index: i - 2)을 털었을 때. 이 경우에는 현재 집 (index: i)을 털 수 있다.
 * 4. 따라서 현재 집(index: i)까지 거쳐 왔을 때 최대로 털 수 있는 경우는 위 두 가지 중 최댓값이 된다. 
 * 5. 처음에는 max_money라는 배열을 두고 각 index에 대해 최대로 털 수 있는 경우를 저장하려고 했지만, 이렇게 하면 공간 복잡도가 O(n)이 된다. 
 * 6. 어차피 직접 집과 그 이전 집에 대한 값만 참고할 것이기 때문에 prev2, prev1 변수만 사용해서 공간 복잡도를 O(1)로 줄였다.
 */
