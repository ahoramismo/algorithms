# Pascal's Triangle

**난이도:** Easy  
**문제 링크:** [LeetCode - Pascal's Triangle](https://leetcode.com/problems/pascals-triangle/)

## 문제 설명

정수 `numRows`가 주어지면, 파스칼의 삼각형의 첫 `numRows`개 행을 반환하세요.

파스칼의 삼각형에서 각 숫자는 바로 위의 두 숫자의 합입니다.

## 제약 조건

- `1 <= numRows <= 30`

## 예제

### 예제 1
**입력:** `numRows = 5`  
**출력:** `[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]`

### 예제 2
**입력:** `numRows = 1`  
**출력:** `[[1]]`

## 솔루션

### 코드
```typescript
/**
 * @param {number} numRows
 * @return {number[][]}
 */
function generate(numRows: number): number[][] {
    const result = [[1]];

    for (let n = 1; n < numRows; n++) {
        // 각 행은 n+1개의 요소를 가지며, 모두 1로 초기화
        const row = Array(n + 1).fill(1);
        const prev = result[n - 1];

        // 첫 번째와 마지막은 1이므로, 중간 요소들만 계산
        for (let j = 1; j < n; j++) {
            row[j] = prev[j - 1] + prev[j];
        }

        result.push(row);
    }

    return result;
}
```

### 접근 방법

**수학적 패턴 구현** 접근법을 사용합니다.

1. **기본 케이스**: 첫 번째 행은 항상 `[1]`입니다.
2. **수학적 규칙**: 
   - 각 행의 첫 번째와 마지막 요소는 항상 `1`입니다.
   - 중간 요소들은 이전 행의 `prev[j-1] + prev[j]`로 계산됩니다. (파스칼의 삼각형의 정의)
3. **순차적 계산**: 이전 행의 결과를 사용하여 다음 행을 계산합니다.

**핵심 아이디어:** 파스칼의 삼각형의 각 숫자는 바로 위의 두 숫자의 합이라는 수학적 성질을 구현합니다. 이전 행의 값을 재사용하여 효율적으로 계산할 수 있습니다.

### 시간 복잡도
**`O(numRows²)`**

- 총 `numRows`개의 행을 생성하고, 각 행의 평균 길이는 `numRows/2`이므로 전체 요소 개수는 약 `numRows²/2`입니다.
- 따라서 시간 복잡도는 `O(numRows²)`입니다.

### 공간 복잡도
**`O(numRows²)`**

- 결과 배열에 모든 행을 저장하므로 `O(numRows²)` 공간이 필요합니다.

