# Exclusive Time of Functions

**난이도:** Medium  
**문제 링크:** [LeetCode - Exclusive Time of Functions](https://leetcode.com/problems/exclusive-time-of-functions/)

## 문제 설명

단일 스레드 CPU에서 `n`개의 함수를 포함한 프로그램을 실행한다고 가정합니다. 각 함수는 `0`부터 `n-1`까지의 고유한 ID를 가집니다.

함수 호출은 호출 스택(call stack)에 저장됩니다. 함수 호출이 시작되면 해당 함수의 ID가 스택에 push되고, 함수 호출이 끝나면 스택에서 pop됩니다. 스택의 맨 위에 있는 함수 ID가 현재 실행 중인 함수입니다.

함수가 시작하거나 종료될 때마다, 해당 함수 ID와 시작 또는 종료 여부, 그리고 타임스탬프를 포함한 로그를 기록합니다.

`logs`라는 리스트가 주어지며, `logs[i]`는 `i`번째 로그 메시지를 나타냅니다. 형식은 문자열 `"{function_id}:{"start" | "end"}:{timestamp}"`입니다.

예를 들어:
- `"0:start:3"`은 함수 ID 0이 타임스탬프 3의 시작 시점에 호출되었음을 의미합니다.
- `"1:end:2"`는 함수 ID 1이 타임스탬프 2의 끝에서 종료되었음을 의미합니다.

참고로 하나의 함수는 여러 번 호출될 수 있으며, 재귀적으로 호출될 수도 있습니다.

함수의 **exclusive time**(순수 실행 시간)은 프로그램 내에서 해당 함수 호출들이 실제로 실행된 시간들의 합입니다. 예를 들어, 한 함수가 두 번 호출되었고 첫 번째 호출이 2 시간 단위 동안 실행되고 두 번째 호출이 1 시간 단위 동안 실행되었다면, exclusive time은 2 + 1 = 3이 됩니다.

각 함수의 exclusive time을 배열 형태로 반환하세요. 배열의 `i`번째 값은 함수 ID `i`의 exclusive time을 나타냅니다.

## 제약 조건

- `1 <= n <= 100`
- `1 <= logs.length <= 500`
- `0 <= function_id < n`
- `0 <= timestamp <= 10⁹`
- 로그는 타임스탬프의 오름차순으로 정렬되어 있습니다.
- 두 개의 시작 이벤트가 같은 타임스탬프를 가질 수 없습니다.
- 두 개의 종료 이벤트가 같은 타임스탬프를 가질 수 없습니다.
- 함수는 항상 `start`로 시작하고 `end`로 종료됩니다.

## 예제

### 예제 1
**입력:** `n = 2, logs = ["0:start:0","1:start:2","1:end:5","0:end:6"]`  
**출력:** `[3,4]`  
**설명:** 함수 0은 타임스탬프 0에서 시작하여 타임스탬프 6에서 종료되지만, 실제로는 타임스탬프 0-2와 5-6에서만 실행되었습니다. 함수 1은 타임스탬프 2에서 시작하여 타임스탬프 5에서 종료되었습니다.

### 예제 2
**입력:** `n = 1, logs = ["0:start:0","0:end:0"]`  
**출력:** `[1]`  
**설명:** 함수 0은 타임스탬프 0에서 시작하여 타임스탬프 0에서 종료되었습니다.

### 예제 3
**입력:** `n = 1, logs = ["0:start:0","0:start:1","0:end:2","0:end:3"]`  
**출력:** `[4]`  
**설명:** 함수 0은 재귀적으로 호출되었습니다. 타임스탬프 0-1과 2-3에서 실행되었습니다.

## 솔루션

### 코드
```javascript
/**
 * @param {string} logText
 * @return {number[]}
 */
function parseLog(logText) {
    const [idStr, type, timeStr] = logText.split(':');
    return [parseInt(idStr), type, parseInt(timeStr)];
}

/**
 * @param {number} n
 * @param {string[]} logs
 * @return {number[]}
 */
var exclusiveTime = function (n, logs) {
    // result[i]는 i번 함수가 실행된 총 시간을 저장하는 배열.
    const result = Array(n).fill(0);

    // 현재 실행 중인 함수들을 쌓아두는 스택. 스택의 맨 위(top)가 현재 실행 중인 함수. 새로운 함수가 시작되면 추가(push), 함수가 끝나면 제거(pop)
    const stack = [];

    // CPU가 마지막으로 "작업 전환" 된 시간을 기록. 함수가 시작되거나 끝날 때 갱신됨. 이전 작업이 실제로 실행되던 구간을 계산하는 데 필요
    let prevTime = 0;

    for (let log of logs) {
        const [id, type, timestamp] = parseLog(log);
        if (type === 'start') {
            if (stack.length > 0) {
                result[stack.at(-1)] += timestamp - prevTime;
            }
            stack.push(id);
            prevTime = timestamp;
        } else {
            result[stack.pop()] += timestamp - prevTime + 1;
            prevTime = timestamp + 1;
        }
    }

    return result;
};
```

### 접근 방법

**스택(Stack)**을 사용하여 함수 호출을 추적합니다.

1. `result[i]`: 함수 ID `i`가 실행된 총 시간을 저장하는 배열
2. `stack`: 현재 실행 중인 함수들을 저장하는 스택 (맨 위가 현재 실행 중인 함수)
3. `prevTime`: CPU가 마지막으로 작업 전환된 시간을 기록

**로직:**
- **`start` 이벤트**: 
  - 스택이 비어있지 않으면, 이전 함수(스택의 맨 위)의 실행 시간을 `timestamp - prevTime`만큼 증가시킵니다.
  - 새 함수를 스택에 push하고 `prevTime`을 업데이트합니다.
- **`end` 이벤트**:
  - 현재 함수(스택의 맨 위)의 실행 시간을 `timestamp - prevTime + 1`만큼 증가시킵니다.
  - 함수를 스택에서 pop하고 `prevTime`을 `timestamp + 1`로 업데이트합니다.

**핵심 아이디어:** 한 CPU에서 여러 함수가 호출되고 종료될 때, 각 함수가 실제로 실행된 시간(Exclusive Time)만 계산해야 합니다. 함수는 `start`/`end` 로그로 시작과 종료 시간을 알려주며, 호출이 중첩될 수 있기 때문에 스택을 사용합니다.

### 시간 복잡도
**`O(n)`**

- `n`은 로그의 개수입니다. 각 로그를 한 번씩 처리하므로 `O(n)`입니다.

### 공간 복잡도
**`O(n)`**

- 스택과 결과 배열에 `O(n)` 공간이 필요합니다.

