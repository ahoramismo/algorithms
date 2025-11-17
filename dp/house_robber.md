# House Robber

**난이도:** Medium  
**문제 링크:** [LeetCode - House Robber](https://leetcode.com/problems/house-robber/)

## 문제 설명

당신은 전문 강도입니다. 거리를 따라 집들을 털 계획을 세우고 있습니다. 각 집에는 일정 금액의 돈이 숨겨져 있으며, 인접한 두 집을 같은 밤에 털면 보안 시스템이 자동으로 경찰에 연락합니다.

각 집의 금액을 나타내는 정수 배열 `nums`가 주어지면, 경찰에 알리지 않고 오늘 밤 털 수 있는 최대 금액을 반환하세요.

## 제약 조건

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 400`

## 예제

### 예제 1
**입력:** `nums = [1,2,3,1]`  
**출력:** `4`  
**설명:** 집 1 (금액 = 1)을 턴 다음 집 3 (금액 = 3)을 털면 됩니다. 털 수 있는 총 금액 = 1 + 3 = 4입니다.

### 예제 2
**입력:** `nums = [2,7,9,3,1]`  
**출력:** `12`  
**설명:** 집 1 (금액 = 2), 집 3 (금액 = 9), 집 5 (금액 = 1)을 털면 됩니다. 털 수 있는 총 금액 = 2 + 9 + 1 = 12입니다.

## 솔루션

### 코드
```javascript
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
```

### 접근 방법

**동적 프로그래밍 (DP)** 접근법을 사용합니다.

특정 인덱스 `i`의 집을 기준으로 생각하면 두 가지 경우가 있습니다:

1. **직전 집 (index: `i - 1`)을 턴 경우**: 현재 집 (index: `i`)을 털 수 없습니다. 연속된 집을 털 수 없다는 조건 때문입니다.
2. **그 이전 집 (index: `i - 2`)을 턴 경우**: 현재 집 (index: `i`)을 털 수 있습니다.

따라서 현재 집까지 거쳐 왔을 때 최대로 털 수 있는 금액은 위 두 가지 중 최댓값이 됩니다.

**핵심 아이디어:** 
- `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`
- 공간 복잡도를 최적화하기 위해 배열 대신 `prev2`, `prev1` 변수만 사용하여 `O(1)` 공간으로 해결합니다.

### 시간 복잡도
**`O(n)`**

- 배열을 한 번 순회하므로 `O(n)`입니다.

### 공간 복잡도
**`O(1)`**

- `prev2`, `prev1` 변수만 사용하므로 `O(1)`입니다.

