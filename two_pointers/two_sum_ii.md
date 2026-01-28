# Two Sum II - Input Array Is Sorted

**난이도:** Medium  
**문제 링크:** [LeetCode - Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

## 문제 설명

**비내림차순(non-decreasing order)으로 정렬된** 정수 배열 `numbers`가 주어집니다.

두 숫자를 찾아 그 합이 특정 `target`이 되도록 하세요. 두 숫자의 **인덱스**를 `index1`과 `index2`로 반환하세요 (단, `1 <= index1 < index2 <= numbers.length`).

정답은 **정확히 하나만** 존재하며, **같은 요소를 두 번 사용할 수 없습니다**.

반환하는 인덱스는 **1-based**입니다 (0이 아닌 1부터 시작).

## 제약 조건

- `2 <= numbers.length <= 3 * 10⁴`
- `-1000 <= numbers[i] <= 1000`
- `numbers`는 **비내림차순**으로 정렬되어 있습니다.
- `-1000 <= target <= 1000`
- 정답은 **정확히 하나만** 존재합니다.

## 예제

### 예제 1
**입력:** `numbers = [2,7,11,15], target = 9`  
**출력:** `[1,2]`  
**설명:** 2 + 7 = 9이므로 인덱스 1과 2를 반환합니다.

### 예제 2
**입력:** `numbers = [2,3,4], target = 6`  
**출력:** `[1,3]`

### 예제 3
**입력:** `numbers = [-1,0], target = -1`  
**출력:** `[1,2]`

## 솔루션

### 접근 방법 1: Two Pointers (최적 - O(n) 시간, O(1) 공간)

**두 포인터(Two Pointers)** 기법을 사용합니다. 배열이 정렬되어 있다는 특성을 활용합니다.

```typescript
function twoSum(numbers: number[], target: number): number[] {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];
        
        if (sum === target) {
            return [left + 1, right + 1]; // 1-based 인덱스
        } else if (sum < target) {
            left++; // 합이 작으면 왼쪽 포인터를 오른쪽으로 이동
        } else {
            right--; // 합이 크면 오른쪽 포인터를 왼쪽으로 이동
        }
    }

    return [];
}
```

**핵심 아이디어:**
- 배열이 정렬되어 있으므로, `left`와 `right` 포인터를 사용하여 합을 조절할 수 있습니다.
- 합이 `target`보다 작으면 더 큰 값이 필요하므로 `left`를 증가시킵니다.
- 합이 `target`보다 크면 더 작은 값이 필요하므로 `right`를 감소시킵니다.

**시간 복잡도:** `O(n)`  
**공간 복잡도:** `O(1)`

---

### 접근 방법 2: Binary Search

각 요소에 대해 `target - numbers[i]`를 이진 탐색으로 찾습니다.

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

**핵심 아이디어:**
- 각 요소 `numbers[i]`에 대해, `target - numbers[i]`를 나머지 배열에서 이진 탐색합니다.

**시간 복잡도:** `O(n log n)`  
**공간 복잡도:** `O(1)`

---

### 접근 방법 3: Hash Map

해시 맵을 사용하여 차이값을 저장합니다.

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

**핵심 아이디어:**
- 각 요소를 순회하면서 `target - numbers[i]`를 맵에 저장합니다.
- 현재 요소가 맵에 있으면, 이전에 본 요소와 합쳐서 target이 됩니다.

**시간 복잡도:** `O(n)`  
**공간 복잡도:** `O(n)`

---

### 접근 방법 비교

| 특성 | Two Pointers | Binary Search | Hash Map |
|-----|-------------|---------------|----------|
| **시간 복잡도** | O(n) | O(n log n) | O(n) |
| **공간 복잡도** | O(1) | O(1) | O(n) |
| **정렬 활용** | ✅ | ✅ | ❌ |
| **가독성** | 높음 | 중간 | 높음 |
| **최적 솔루션** | ✅ | - | - |

**권장:** 배열이 정렬되어 있으므로 **Two Pointers** 접근법이 가장 효율적입니다 (O(n) 시간, O(1) 공간).
