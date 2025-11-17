# Jump Game II

**난이도:** Medium  
**문제 링크:** [LeetCode - Jump Game II](https://leetcode.com/problems/jump-game-ii/)

## 문제 설명

길이 `n`의 정수 배열 `nums`가 주어집니다. 처음에는 `nums[0]`에 위치합니다.

각 요소 `nums[i]`는 인덱스 `i`에서의 최대 전진 점프 길이를 나타냅니다. 즉, `nums[i]`에 있으면 `nums[i + j]`로 점프할 수 있습니다 (단, `0 <= j <= nums[i]`이고 `i + j < n`).

`nums[n - 1]`에 도달하는 데 필요한 **최소 점프 횟수**를 반환하세요. 테스트 케이스는 항상 `nums[n - 1]`에 도달할 수 있도록 생성됩니다.

## 제약 조건

- `1 <= nums.length <= 10⁴`
- `0 <= nums[i] <= 1000`
- 항상 `nums[n - 1]`에 도달할 수 있습니다.

## 예제

### 예제 1
**입력:** `nums = [2,3,1,1,4]`  
**출력:** `2`  
**설명:** 마지막 인덱스에 도달하는 최소 점프 횟수는 2입니다. 인덱스 0에서 1로 1칸 점프한 다음, 인덱스 1에서 마지막 인덱스로 3칸 점프합니다.

### 예제 2
**입력:** `nums = [2,3,0,1,4]`  
**출력:** `2`  
**설명:** 마지막 인덱스에 도달하는 최소 점프 횟수는 2입니다. 인덱스 0에서 1로 1칸 점프한 다음, 인덱스 1에서 마지막 인덱스로 2칸 점프합니다.

## 솔루션

### 코드
```javascript
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
```

### 접근 방법

**그리디 알고리즘**을 사용합니다.

1. `jumps = 0`: 지금까지 점프한 횟수
2. `currentEnd = 0`: 현재 점프 범위 안에서 도달할 수 있는 가장 먼 인덱스
3. `farthest = 0`: 전체적으로 도달할 수 있는 가장 먼 인덱스

4. 배열을 순회하면서:
   - `farthest`를 업데이트합니다 (`i + nums[i]`와 비교).
   - `i === currentEnd` (현재 점프 범위의 끝)에 도달했다면:
     - 점프를 한 번 해야 함을 의미하므로 `jumps`를 1 증가시킵니다.
     - 다음 점프 범위를 설정하기 위해 `currentEnd = farthest`로 갱신합니다.
     - `currentEnd >= 마지막 인덱스`라면 이미 배열의 끝 또는 그 이후까지 도달 가능하므로 종료합니다.

**핵심 아이디어:** 각 점프 범위에서 가장 멀리 갈 수 있는 지점을 추적하고, 현재 범위의 끝에 도달할 때마다 점프 횟수를 증가시킵니다. 이렇게 하면 최소 점프 횟수를 구할 수 있습니다.

### 시간 복잡도
**`O(n)`**

- 배열을 한 번 순회하므로 `O(n)`입니다.

### 공간 복잡도
**`O(1)`**

- 추가 공간을 사용하지 않습니다.

