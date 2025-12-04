# Longest Subarray of 1's After Deleting One Element

**난이도:** Medium  
**문제 링크:** [LeetCode - Longest Subarray of 1's After Deleting One Element](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/)

## 문제 설명

0과 1로 이루어진 이진 배열 `nums`가 주어집니다. 배열에서 **정확히 하나의 요소**를 삭제해야 합니다.

삭제 후 남은 배열에서 **1로만 이루어진 가장 긴 비어있지 않은 부분 배열(subarray)**의 길이를 반환하세요.

만약 그러한 부분 배열이 없다면 0을 반환하세요.

## 제약 조건

- `1 <= nums.length <= 10⁵`
- `nums[i]`는 0 또는 1입니다.

## 예제

### 예제 1
**입력:** `nums = [1,1,0,1]`  
**출력:** `3`  
**설명:** 인덱스 2에 있는 0을 삭제하면 `[1,1,1]`이 되어 길이가 3인 1들의 부분 배열이 됩니다.

### 예제 2
**입력:** `nums = [0,1,1,1,0,1,1,0,1]`  
**출력:** `5`  
**설명:** 인덱스 4에 있는 0을 삭제하면 `[0,1,1,1,1,1,0,1]`이 되어 길이가 5인 1들의 부분 배열이 됩니다.

### 예제 3
**입력:** `nums = [1,1,1]`  
**출력:** `2`  
**설명:** 반드시 하나의 요소를 삭제해야 하므로 하나를 삭제하면 `[1,1]`이 되어 길이는 2가 됩니다.

## 솔루션

### 코드
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function (nums) {
    let left = 0;
    let zeros = 0;
    let maxLength = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) zeros++;

        // 0의 개수가 1개를 초과하면(2개가 되면) 윈도우를 줄임
        while (zeros > 1) {
            if (nums[left++] === 0) zeros--;
        }

        // 현재 윈도우 길이 계산 (0을 하나 포함할 수도 있음)
        maxLength = Math.max(maxLength, right - left + 1);
    }

    // 반드시 하나를 삭제해야 하므로 윈도우 길이에서 1을 뺌
    return maxLength - 1;
};
```

### 접근 방법

**슬라이딩 윈도우(Sliding Window)** 기법을 사용합니다.

1. `left`와 `right` 두 포인터를 사용하여 윈도우를 유지합니다.
2. `right`를 이동하며 윈도우를 확장하고, 윈도우 내의 `0`의 개수를 셉니다.
3. `0`의 개수가 1개를 초과하면(즉, 2개가 되면), `left`를 이동하여 윈도우를 축소합니다. 이때 `left`가 가리키던 값이 `0`이었다면 `0`의 개수를 줄입니다.
4. 매 단계마다 현재 윈도우의 길이(`right - left + 1`)를 계산하여 최대 길이를 갱신합니다.
5. 문제 조건상 **반드시 하나의 요소를 삭제**해야 하므로, 계산된 최대 윈도우 길이에서 1을 뺀 값을 반환합니다.

**핵심 아이디어:** "정확히 하나 삭제"라는 조건은 "최대 1개의 0을 포함하는 가장 긴 부분 배열"을 찾는 것과 같습니다.

### 시간 복잡도
**`O(n)`**

- `right` 포인터가 0부터 n까지 한 번 이동하고, `left` 포인터도 최대 n번 이동하므로 `O(n)`입니다.

### 공간 복잡도
**`O(1)`**

- 추가적인 자료구조 없이 변수 몇 개만 사용하므로 `O(1)`입니다.
