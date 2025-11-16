/**
 * https://leetcode.com/problems/power-of-four/
 * 정수 n이 주어졌을 때, n이 4의 거듭제곱(power of four) 이면 true를, 그렇지 않으면 false를 반환하세요.
 * 정수 n이 4의 거듭제곱이라는 것은, 어떤 정수 x가 존재하여 다음을 만족한다는 의미입니다. n == 4^x
 *
 * Example 1:
 * Input: n = 16
 * Output: true
 * Explanation: 16 = 4^2
 *
 * Example 2:
 * Input: n = 5
 * Output: false
 * Explanation: 5 is not a power of four.
 *
 * Example 3:
 * Input: n = 1
 * Output: true
 * Explanation: 1 = 4^0
 */

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function (n) {
  return n > 0 && (n & (n - 1)) === 0 && (n & 0x55555555) !== 0;
};

/**
 * 4의 거듭제곱은 항상 양수입니다. 또한 그중에서도 특정 자리(짝수 비트 위치)에만 1이 있는 수입니다.
 */
