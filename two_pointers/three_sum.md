# 3Sum

**난이도:** Medium  
**문제 링크:** [LeetCode - 3Sum](https://leetcode.com/problems/3sum/)

## 문제 설명

정수 배열 `nums`가 주어집니다. 배열에서 `nums[i] + nums[j] + nums[k] == 0`을 만족하는 모든 고유한 삼중항(triplet) `[nums[i], nums[j], nums[k]]`을 반환하세요 (단, `i != j`, `i != k`, `j != k`).

**중복되지 않는** 삼중항만 반환해야 합니다.

## 제약 조건

- `3 <= nums.length <= 3000`
- `-10⁵ <= nums[i] <= 10⁵`

## 예제

### 예제 1
**입력:** `nums = [-1,0,1,2,-1,-4]`  
**출력:** `[[-1,-1,2],[-1,0,1]]`  
**설명:**
- `nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0`
- `nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0`
- `nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0`
- 고유한 삼중항은 `[-1,0,1]`과 `[-1,-1,2]`입니다.

### 예제 2
**입력:** `nums = [0,1,1]`  
**출력:** `[]`  
**설명:** 유일한 삼중항의 합은 0이 아닙니다.

### 예제 3
**입력:** `nums = [0,0,0]`  
**출력:** `[[0,0,0]]`  
**설명:** 유일한 삼중항의 합은 0입니다.

## 솔루션

### 코드
```typescript
function threeSum(nums: number[]): number[][] {
    // 배열을 오름차순으로 정렬
    nums.sort((a, b) => a - b);

    const result = [];

    for (let left = 0; left < nums.length - 2; left++) {
        // 첫 번째 요소 중복 건너뛰기
        if (left > 0 && nums[left - 1] === nums[left]) continue;
        
        let middle = left + 1;
        let right = nums.length - 1;

        while (middle < right) {
            const sum = nums[left] + nums[middle] + nums[right];

            if (sum === 0) {
                result.push([nums[left], nums[middle], nums[right]]);
                middle++;
                right--;
                
                // 두 번째, 세 번째 요소 중복 건너뛰기
                while (middle < right && nums[middle] === nums[middle - 1]) middle++;
                while (middle < right && nums[right] === nums[right + 1]) right--;
            } else if (sum < 0) {
                middle++; // 합이 작으면 더 큰 값 필요
            } else {
                right--; // 합이 크면 더 작은 값 필요
            }
        }
    }

    return result;
}
```

### 접근 방법

**정렬 + Two Pointers** 기법을 사용합니다.

1. **정렬**: 배열을 오름차순으로 정렬합니다. 이를 통해 Two Pointers를 효과적으로 사용하고 중복을 쉽게 제거할 수 있습니다.

2. **고정 + Two Pointers**:
   - 첫 번째 요소(`left`)를 고정합니다.
   - 나머지 부분에서 Two Pointers(`middle`, `right`)를 사용하여 `target = -nums[left]`이 되는 두 숫자를 찾습니다.
   - 이는 2Sum 문제를 반복적으로 푸는 것과 같습니다.

3. **중복 제거**:
   - 첫 번째 요소: `if (left > 0 && nums[left - 1] === nums[left]) continue;`
   - 두 번째, 세 번째 요소: 답을 찾은 후 같은 값들을 건너뜁니다.

4. **포인터 이동 로직**:
   - `sum === 0`: 답을 저장하고 양쪽 포인터를 모두 이동
   - `sum < 0`: 합이 너무 작으므로 `middle++` (더 큰 값 필요)
   - `sum > 0`: 합이 너무 크므로 `right--` (더 작은 값 필요)

**핵심 아이디어:** 3Sum을 "하나를 고정하고 2Sum 반복"으로 변환하고, 정렬된 배열에서 Two Pointers로 효율적으로 탐색합니다.

### 시간 복잡도
**`O(n²)`**

- 정렬: `O(n log n)`
- 외부 루프: `O(n)`
- 각 외부 루프마다 Two Pointers: `O(n)`
- 전체: `O(n log n) + O(n²) = O(n²)`

### 공간 복잡도
**`O(1)` 또는 `O(log n)`**

- 정렬이 in-place라면 `O(log n)` (정렬 스택 공간)
- 결과 배열은 출력이므로 공간 복잡도에 포함하지 않습니다.

---

## 다른 접근 방법들

### 접근 방법 2: Binary Search (비효율적)

```typescript
function twoSum(numbers: number[], target: number): number[] {
    for (let i = 0; i < numbers.length; i++) {
        let l = i + 1;
        let r = numbers.length - 1;
        const tmp = target - numbers[i];

        while (l <= r) {
            const mid = Math.floor((l + r) / 2);

            if (numbers[mid] === tmp) {
                return [i + 1, mid + 1];
            } else if (numbers[mid] < tmp) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
    }

    return [];
}
```

**시간 복잡도:** `O(n² log n)` - Two Pointers보다 느림  
**공간 복잡도:** `O(1)`

---

### 접근 방법 3: Hash Map (비효율적)

```typescript
function twoSum(numbers: number[], target: number): number[] {
    const mapping: Record<number, number> = {};
    
    for (let i = 0; i < numbers.length; i++) {
        const diff = target - numbers[i];
        
        if (numbers[i] in mapping) {
            return [mapping[numbers[i]] + 1, i + 1];
        }
        
        mapping[diff] = i;
    }
    
    return [];
}
```

**시간 복잡도:** `O(n²)` (외부 루프 필요)  
**공간 복잡도:** `O(n)` - 추가 공간 사용

---

**권장:** 배열이 정렬되어 있으므로 **Two Pointers** 접근법이 가장 효율적입니다.
