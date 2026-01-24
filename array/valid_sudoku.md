# Valid Sudoku

**난이도:** Medium  
**문제 링크:** [LeetCode - Valid Sudoku](https://leetcode.com/problems/valid-sudoku/)

## 문제 설명

부분적으로 채워진 `9 x 9` 스도쿠 보드가 주어집니다. 보드가 **유효한지** 판단하세요.

스도쿠 보드는 다음 규칙에 따라 유효해야 합니다:
1. 각 행에는 `1-9`의 숫자가 중복 없이 나타나야 합니다.
2. 각 열에는 `1-9`의 숫자가 중복 없이 나타나야 합니다.
3. 각 `3 x 3` 서브박스(sub-box)에는 `1-9`의 숫자가 중복 없이 나타나야 합니다.

**참고:**
- 보드가 해결 가능한지는 확인할 필요가 없습니다. 이미 채워진 셀만 유효한지 확인하면 됩니다.
- 빈 셀은 `'.'`로 표시됩니다.

## 제약 조건

- `board.length == 9`
- `board[i].length == 9`
- `board[i][j]`는 숫자 `1-9` 또는 `'.'`입니다.

## 예제

### 예제 1
**입력:** 
```
board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
```
**출력:** `true`

### 예제 2
**입력:** (위와 동일하지만 첫 번째 행이 `["8","3",...]`)
**출력:** `false`  
**설명:** 첫 번째 `3 x 3` 박스에 `8`이 중복됩니다.

## 솔루션

### 접근 방법 1: Set 기반

**해시 셋(Hash Set)**을 사용하여 각 행, 열, 박스의 중복을 확인합니다.

```typescript
function isValidSudoku(board: string[][]): boolean {
    const rowSet = Array.from({ length: 9 }, () => new Set());
    const colSet = Array.from({ length: 9 }, () => new Set());

    for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
            // 3x3 박스 체크
            const set = new Set();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const r = i + k * 3;
                    const c = j + l * 3;
                    const num = board[r][c];

                    if (num === '.') continue;
                    
                    // 행, 열, 박스에서 중복 체크
                    for (const _set of [rowSet[r], colSet[c], set]) {
                        if (_set.has(num)) {
                            return false;
                        }
                        _set.add(num);
                    }
                }
            }
        }
    }

    return true;
}
```

### 접근 방법 2: Bit Manipulation (개선 버전)

**비트 마스킹(Bit Masking)**을 사용하여 공간과 시간을 최적화합니다.

```typescript
function isValidSudoku(board: string[][]): boolean {
    const rows = new Array(9).fill(0);
    const cols = new Array(9).fill(0);
    const boxes = new Array(9).fill(0);

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const char = board[r][c];
            if (char === '.') continue;

            // 숫자를 0-8 범위로 변환
            const digit = char.charCodeAt(0) - '1'.charCodeAt(0);
            const bit = 1 << digit; // 해당 비트 위치에 1을 설정
            const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);

            // 비트 AND 연산으로 중복 체크
            if (
                (rows[r] & bit) ||
                (cols[c] & bit) ||
                (boxes[boxIdx] & bit)
            ) {
                return false;
            }

            // 비트 OR 연산으로 현재 숫자 추가
            rows[r] |= bit;
            cols[c] |= bit;
            boxes[boxIdx] |= bit;
        }
    }

    return true;
}
```

### 접근 방법 비교

| 특성 | Set 기반 | Bit Manipulation |
|-----|---------|------------------|
| **공간 복잡도** | O(n²) | O(n) |
| **시간 복잡도** | O(n²) | O(n²) |
| **가독성** | 높음 | 중간 |
| **성능** | 좋음 | 더 좋음 |

**Bit Manipulation의 장점:**
1. **공간 효율성**: Set 대신 정수 하나로 9개 숫자의 존재 여부를 추적 (9비트만 사용)
2. **빠른 연산**: 비트 연산(`&`, `|`)이 Set의 `has`, `add`보다 빠름
3. **메모리 효율**: Set 객체 오버헤드가 없음

**Bit Manipulation 설명:**
- `1 << digit`: 숫자 1~9를 0~8 비트 위치로 매핑
  - 예: 숫자 1 → `1 << 0` = `0b000000001`
  - 예: 숫자 5 → `1 << 4` = `0b000010000`
- `rows[r] & bit`: 해당 비트가 이미 설정되었는지 확인 (중복 체크)
- `rows[r] |= bit`: 해당 비트를 설정 (숫자 추가)

### 시간 복잡도
**`O(1)`** (보드 크기가 고정 9x9)

- 실질적으로 `O(n²)` 단계지만, `n = 9`로 고정되어 있으므로 `O(81) = O(1)`

### 공간 복잡도
- **Set 기반**: `O(n²)` - 최대 81개의 Set 객체
- **Bit Manipulation**: `O(n)` - 27개의 정수 배열 (9 rows + 9 cols + 9 boxes)
