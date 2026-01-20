# Find the Number of Ways to Place People I

**난이도:** Medium  
**문제 링크:** [LeetCode - Find the Number of Ways to Place People I](https://leetcode.com/problems/find-the-number-of-ways-to-place-people-i/)

## 문제 설명

2D 평면에 `n`개의 점이 주어집니다. 각 점은 `[x, y]` 좌표를 가집니다.

두 점 `(x1, y1)`과 `(x2, y2)`가 다음 조건을 만족하면 "유효한 쌍"이라고 합니다:
- `x1 < x2` (첫 번째 점이 두 번째 점보다 왼쪽에 있음)
- `y1 >= y2` (첫 번째 점이 두 번째 점보다 위 또는 같은 높이에 있음)
- 두 점 사이의 직사각형 영역에 다른 점이 없어야 함 (즉, `(x1, y1)`과 `(x2, y2)`를 대각선으로 하는 직사각형 내부에 다른 점이 없음)

유효한 점 쌍의 개수를 반환하세요.

## 제약 조건

- `2 <= points.length <= 50`
- `points[i].length == 2`
- `0 <= points[i][0], points[i][1] <= 10⁶`
- 모든 점은 서로 다릅니다.

## 예제

### 예제 1
**입력:** `points = [[1,1],[2,2],[3,3]]`  
**출력:** `0`  
**설명:** 조건을 만족하는 쌍이 없습니다.

### 예제 2
**입력:** `points = [[6,2],[4,4],[2,6]]`  
**출력:** `2`  
**설명:** 
- `[4,4]`와 `[2,6]`: x1 < x2이고 y1 >= y2이지만, 직사각형 내부에 점이 없어야 함
- `[6,2]`와 `[4,4]`: x1 < x2가 아니므로 불가
- `[6,2]`와 `[2,6]`: x1 < x2이고 y1 >= y2이지만, 직사각형 내부에 `[4,4]`가 있음

## 솔루션

### 코드
```typescript
/**
 * @param {number[][]} points
 * @return {number}
 */
function numberOfPairs(points: number[][]): number {
    const len = points.length;
    
    // x좌표 오름차순, y좌표 내림차순으로 정렬
    const sorted = points.sort((a, b) => (a[0] - b[0]) || (b[1] - a[1]));

    let count = 0;

    for (let i = 0; i < len - 1; i++) {
        const y1 = sorted[i][1];
        let maxY = -Infinity;

        for (let j = i + 1; j < len; j++) {
            const y2 = sorted[j][1];

            // y1 >= y2 조건 확인
            // y2 > maxY: 직사각형 내부에 다른 점이 없는지 확인
            // (maxY는 현재까지 본 점들 중 최대 y좌표)
            if (y1 >= y2 && y2 > maxY) {
                maxY = y2;
                count++;
            }
        }
    }

    return count;
}
```

### 접근 방법

**정렬(Sorting)**과 **조건 검사**를 사용합니다.

1. **정렬**: 
   - x좌표 오름차순으로 정렬 (같으면 y좌표 내림차순)
   - 이렇게 하면 `i < j`일 때 항상 `sorted[i][0] <= sorted[j][0]`이 보장됩니다.

2. **유효한 쌍 찾기**:
   - 각 점 `i`에 대해, 오른쪽에 있는 점들(`j > i`)을 확인합니다.
   - `y1 >= y2` 조건을 만족해야 합니다.
   - `y2 > maxY` 조건을 확인하여 직사각형 내부에 다른 점이 없는지 검사합니다.
     - `maxY`는 현재까지 본 점들 중 최대 y좌표를 저장합니다.
     - `y2 > maxY`이면, `(x1, y1)`과 `(x2, y2)`를 대각선으로 하는 직사각형 내부에 다른 점이 없다는 의미입니다.

**핵심 아이디어:** 
- 정렬을 통해 x좌표 순서를 보장하고, `maxY`를 추적하여 직사각형 내부에 점이 있는지 효율적으로 확인합니다.
- `y2 > maxY` 조건은 "현재 점이 이전에 본 모든 점보다 아래에 있다"는 의미이므로, 직사각형 내부에 점이 없음을 보장합니다.

### 시간 복잡도
**`O(n²)`**

- 정렬: `O(n log n)`
- 이중 루프: `O(n²)`
- 전체: `O(n²)`

### 공간 복잡도
**`O(1)`**

- 추가 공간 없이 변수 몇 개만 사용하므로 `O(1)`입니다 (정렬이 in-place라면).
