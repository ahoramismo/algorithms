# Successful Pairs of Spells and Potions

**난이도:** Medium  
**문제 링크:** [LeetCode - Successful Pairs of Spells and Potions](https://leetcode.com/problems/successful-pairs-of-spells-and-potions/)

## 문제 설명

두 개의 양수 정수 배열 `spells`와 `potions`가 주어지며, 각각 주문과 물약의 강도를 나타냅니다.

또한 정수 `success`가 주어집니다. `spell`과 `potion`의 곱이 `success` 이상이면 **성공적인 쌍**이라고 합니다.

각 `spell`에 대해, 성공적인 쌍을 만들 수 있는 `potions`의 개수를 반환하세요.

## 제약 조건

- `n == spells.length`
- `m == potions.length`
- `1 <= n, m <= 10⁵`
- `1 <= spells[i], potions[i] <= 10⁵`
- `1 <= success <= 10¹⁰`

## 예제

### 예제 1
**입력:** `spells = [5,1,3], potions = [1,2,3,4,5], success = 7`  
**출력:** `[4,0,3]`  
**설명:**
- spell 0 = 5: [1,2,3,4,5] 중 5*1=5, 5*2=10, 5*3=15, 5*4=20, 5*5=25 → 4개 (5*1=5 < 7이므로 제외)
- spell 1 = 1: [1,2,3,4,5] 중 1*5=5 < 7이므로 0개
- spell 2 = 3: [1,2,3,4,5] 중 3*3=9, 3*4=12, 3*5=15 → 3개

### 예제 2
**입력:** `spells = [3,1,2], potions = [8,5,8], success = 16`  
**출력:** `[2,0,2]`  
**설명:**
- spell 0 = 3: [8,5,8] 중 3*8=24, 3*8=24 → 2개
- spell 1 = 1: [8,5,8] 중 모두 16 미만이므로 0개
- spell 2 = 2: [8,5,8] 중 2*8=16, 2*8=16 → 2개

## 솔루션

### 코드
```typescript
/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
function successfulPairs(spells: number[], potions: number[], success: number): number[] {
    // potions 배열을 오름차순으로 정렬
    const normalized = potions.sort((a, b) => a - b);
    const n = spells.length;
    const m = potions.length;
    const pairs = Array(n);

    for (let i = 0; i < n; i++) {
        const spell = spells[i];
        // spell * potion >= success를 만족하는 최소 potion 값
        const minPotionValue = Math.ceil(success / spell);
        
        // Binary Search: 정렬된 potions 배열에서 minPotionValue 이상인 첫 번째 위치 찾기
        let left = 0, right = m - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (potions[mid] >= minPotionValue) {
                right = mid - 1; // 더 작은 값 찾기
            } else {
                left = mid + 1; // 더 큰 값 찾기
            }
        }

        // left는 minPotionValue 이상인 첫 번째 인덱스
        // 따라서 left부터 끝까지의 개수 = m - left
        pairs[i] = m - left;
    }
    
    return pairs;
}
```

### 접근 방법

**이진 탐색(Binary Search)**을 사용합니다.

1. **정렬**: `potions` 배열을 오름차순으로 정렬합니다. 이진 탐색을 위해 필요합니다.

2. **최소 potion 값 계산**: 
   - `spell * potion >= success`를 만족하려면 `potion >= success / spell`이어야 합니다.
   - `Math.ceil(success / spell)`을 사용하여 최소 potion 값을 계산합니다.

3. **이진 탐색**: 
   - 정렬된 `potions` 배열에서 `minPotionValue` 이상인 첫 번째 위치를 찾습니다.
   - 이 위치(`left`)부터 배열 끝까지의 모든 potion이 성공적인 쌍을 만들 수 있습니다.
   - 따라서 성공적인 쌍의 개수는 `m - left`입니다.

**핵심 아이디어:** 
- 정렬 후 이진 탐색을 사용하여 각 spell에 대해 필요한 최소 potion 값을 효율적으로 찾습니다.
- `O(m log m)` 정렬 + `O(n log m)` 이진 탐색으로 전체 `O((n + m) log m)` 시간에 해결할 수 있습니다.

### 시간 복잡도
**`O((n + m) log m)`**

- `potions` 정렬: `O(m log m)`
- 각 `spell`마다 이진 탐색: `O(n log m)`
- 전체: `O((n + m) log m)`

### 공간 복잡도
**`O(1)`** (입력 배열을 수정하는 경우)

- 정렬이 in-place라면 추가 공간 없이 `O(1)`입니다.
- 결과 배열 `pairs`는 반환값이므로 공간 복잡도에 포함하지 않습니다.
