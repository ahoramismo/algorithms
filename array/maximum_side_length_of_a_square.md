# Maximum Side Length of a Square with Sum Less than or Equal to Threshold

**난이도:** Medium  
**문제 링크:** [LeetCode - Maximum Side Length of a Square with Sum Less than or Equal to Threshold](https://leetcode.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold/)

## 문제 설명

`m x n` 크기의 행렬 `mat`와 정수 `threshold`가 주어집니다.

행렬 내에서 **모든 원소의 합이 `threshold` 이하**인 정사각형의 **최대 변의 길이**를 반환하세요. 그러한 정사각형이 없으면 `0`을 반환하세요.

## 제약 조건

- `1 <= m, n <= 300`
- `0 <= mat[i][j] <= 10⁴`
- `0 <= threshold <= 10⁵`

## 예제

### 예제 1
**입력:** `mat = [[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]], threshold = 4`  
**출력:** `2`  
**설명:** 변의 길이가 2인 정사각형의 최대 합은 4입니다.

### 예제 2
**입력:** `mat = [[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]], threshold = 1`  
**출력:** `0`  
**설명:** 합이 1 이하인 정사각형이 없습니다.

## 솔루션

### 코드 (개선 버전 - Binary Search 사용)

```typescript
/**
 * @param {number[][]} mat
 * @param {number} threshold
 * @return {number}
 */
function maxSideLength(mat: number[][], threshold: number): number {
    const rows = mat.length;
    const cols = mat[0].length;
    
    // Prefix Sum 배열 생성
    const prefixSum = Array.from({ length: rows + 1 }, () => 
        Array.from({ length: cols + 1 }, () => 0)
    );

    // Prefix Sum 계산
    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            prefixSum[i][j] =
                prefixSum[i - 1][j] +
                prefixSum[i][j - 1] -
                prefixSum[i - 1][j - 1] +
                mat[i - 1][j - 1];
        }
    }

    let maxLen = 0;

    // 각 위치에서 Binary Search로 최대 길이 찾기
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Binary Search: 현재 위치에서 가능한 최대 길이 찾기
            let left = 1;
            let right = Math.min(rows - i, cols - j);
            let bestLen = 0;

            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                const sum = squareSum(prefixSum, i, j, i + mid, j + mid);

                if (sum <= threshold) {
                    bestLen = mid;
                    left = mid + 1; // 더 큰 길이 시도
                } else {
                    right = mid - 1; // 길이를 줄임
                }
            }

            maxLen = Math.max(maxLen, bestLen);
        }
    }

    return maxLen;
}

/**
 * (x1, y1)부터 (x2, y2)까지의 정사각형 영역의 합을 계산
 * x2, y2는 x1, y1보다 커야 함
 */
function squareSum(
    prefixSum: number[][],
    x1: number,
    y1: number,
    x2: number,
    y2: number
): number {
    return (
        prefixSum[x2][y2] -
        prefixSum[x1][y2] -
        prefixSum[x2][y1] +
        prefixSum[x1][y1]
    );
}
```

### 접근 방법

**Prefix Sum (2D 누적 합)**과 **Binary Search**를 결합한 접근법입니다.

1. **Prefix Sum 배열 생성**: 
   - `prefixSum[i][j]`는 `(0,0)`부터 `(i-1, j-1)`까지의 모든 원소의 합을 저장합니다.
   - 이를 통해 임의의 정사각형 영역의 합을 `O(1)`에 계산할 수 있습니다.

2. **정사각형 영역 합 계산**:
   - `(x1, y1)`부터 `(x2, y2)`까지의 합은 다음 공식으로 계산:
     ```
     sum = prefixSum[x2][y2] - prefixSum[x1][y2] - prefixSum[x2][y1] + prefixSum[x1][y1]
     ```

3. **Binary Search로 최대 길이 찾기**:
   - 각 위치 `(i, j)`에서 시작하는 정사각형의 최대 길이를 Binary Search로 찾습니다.
   - 가능한 길이 범위: `1`부터 `min(rows - i, cols - j)`까지
   - 합이 `threshold` 이하인 최대 길이를 찾습니다.

**핵심 아이디어:** 
- Prefix Sum을 사용하여 정사각형 영역의 합을 `O(1)`에 계산
- Binary Search를 사용하여 각 위치에서 가능한 최대 길이를 효율적으로 찾음 (`O(log(min(m,n)))`)

### 시간 복잡도
**`O(m * n * log(min(m, n)))`**

- Prefix Sum 배열 생성: `O(m * n)`
- 각 위치에서 Binary Search: `O(m * n * log(min(m, n)))`
- 전체: `O(m * n * log(min(m, n)))`

### 공간 복잡도
**`O(m * n)`**

- Prefix Sum 배열에 `O(m * n)` 공간이 필요합니다.

### 개선 사항

원래 코드는 각 위치에서 선형 탐색(`while` 루프)을 사용하여 `O(m * n * min(m, n))` 시간이 걸렸지만, Binary Search를 사용하여 `O(m * n * log(min(m, n)))`로 개선되었습니다.
