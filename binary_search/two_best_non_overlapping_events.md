# Two Best Non-Overlapping Events

**난이도:** Medium  
**문제 링크:** [LeetCode - Two Best Non-Overlapping Events](https://leetcode.com/problems/two-best-non-overlapping-events/)

## 문제 설명

이벤트 배열 `events`가 주어집니다. 각 이벤트는 `[startTime, endTime, value]` 형태입니다.

**겹치지 않는** 두 개의 이벤트를 선택했을 때 얻을 수 있는 **최대 value 합**을 구하세요.

두 이벤트가 겹치지 않는다는 것은, 첫 번째 이벤트의 `endTime`이 두 번째 이벤트의 `startTime`보다 작거나 같다는 의미입니다.

## 제약 조건

- `2 <= events.length <= 10⁵`
- `events[i].length == 3`
- `1 <= startTimeᵢ <= endTimeᵢ <= 10⁹`
- `1 <= valueᵢ <= 10⁶`

## 예제

### 예제 1
**입력:** `events = [[1,3,2],[4,5,2],[2,4,3]]`  
**출력:** `4`  
**설명:** 
- 이벤트 0 `[1,3,2]`와 이벤트 1 `[4,5,2]`를 선택: 2 + 2 = 4
- 또는 이벤트 0 `[1,3,2]`와 이벤트 2 `[2,4,3]`는 겹치므로 선택 불가

### 예제 2
**입력:** `events = [[1,3,2],[4,5,2],[1,5,5]]`  
**출력:** `5`  
**설명:** 이벤트 2 `[1,5,5]` 하나만 선택하는 것이 최대입니다.

### 예제 3
**입력:** `events = [[1,5,3],[1,5,1],[6,6,5]]`  
**출력:** `8`  
**설명:** 이벤트 0 `[1,5,3]`와 이벤트 2 `[6,6,5]`를 선택: 3 + 5 = 8

## 솔루션

### 코드
```typescript
function maxTwoEvents(events: number[][]): number {
    const N = events.length;

    // end time으로 정렬
    const sorted = events.sort((a, b) => a[1] - b[1]);

    // best[i] = events[0...i]까지의 최대 value
    const best = new Array(N);
    best[0] = events[0][2];

    for (let i = 1; i < N; i++) {
        best[i] = Math.max(best[i - 1], events[i][2]);
    }

    let ans = 0;

    for (let i = 0; i < N; i++) {
        const [start, end, value] = events[i];
        // 단일 이벤트만 선택하는 경우
        ans = Math.max(ans, value);

        // 이진 탐색: 현재 이벤트와 겹치지 않는 가장 늦게 끝나는 이벤트 찾기
        let left = 0, right = i - 1;
        let idx = -1;

        while (left <= right) {
            const mid = (left + right) >> 1;
            if (events[mid][1] < start) {
                // events[mid]는 현재 이벤트와 겹치지 않음
                idx = mid;
                left = mid + 1; // 더 늦게 끝나는 이벤트 찾기
            } else {
                // 겹침
                right = mid - 1;
            }
        }

        // 겹치지 않는 이벤트를 찾았다면, 그 최대값과 현재 이벤트의 합 계산
        if (idx !== -1) {
            ans = Math.max(ans, best[idx] + value);
        }
    }
    
    return ans;
}
```

### 접근 방법

**이진 탐색(Binary Search)**과 **그리디(Greedy)** 접근법을 결합한 방법입니다.

1. **정렬**: 이벤트들을 `endTime` 기준으로 오름차순 정렬합니다. 이렇게 하면 이전 이벤트들은 항상 현재 이벤트보다 먼저 끝나거나 동시에 끝납니다.

2. **Prefix Maximum 배열**: `best[i]`는 `events[0...i]`까지의 이벤트들 중 최대 value를 저장합니다. 이를 통해 특정 인덱스 이전의 최대값을 `O(1)`에 접근할 수 있습니다.

3. **이진 탐색**: 각 이벤트 `i`에 대해, 현재 이벤트의 `startTime`보다 작은 `endTime`을 가진 가장 늦게 끝나는 이벤트를 이진 탐색으로 찾습니다. 이 이벤트는 현재 이벤트와 겹치지 않습니다.

4. **최대값 계산**: 
   - 단일 이벤트만 선택하는 경우: `value`
   - 두 이벤트를 선택하는 경우: `best[idx] + value` (겹치지 않는 이전 이벤트의 최대값 + 현재 이벤트의 값)

**핵심 아이디어:** 
- 정렬을 통해 이전 이벤트들이 항상 현재 이벤트보다 먼저 끝나도록 보장
- `best` 배열(prefix maximum)을 통해 각 인덱스까지의 최대값을 미리 계산
- 이진 탐색으로 겹치지 않는 이벤트를 효율적으로 찾음

### 시간 복잡도
**`O(n log n)`**

- 정렬: `O(n log n)`
- Prefix maximum 배열 생성: `O(n)`
- 각 이벤트마다 이진 탐색: `O(n log n)`
- 전체: `O(n log n)`

### 공간 복잡도
**`O(n)`**

- `best` 배열에 `O(n)` 공간이 필요합니다.

