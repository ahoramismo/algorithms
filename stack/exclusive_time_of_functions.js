/**
 * https://leetcode.com/problems/exclusive-time-of-functions/
 * 단일 스레드 CPU에서 n개의 함수를 포함한 프로그램을 실행한다고 가정하자. 각 함수는 0부터 n-1까지의 고유한 ID를 가진다.
 * 함수 호출은 호출 스택(call stack)에 저장된다. 함수 호출이 시작되면 해당 함수의 ID가 스택에 push되고, 함수 호출이 끝나면 스택에서 pop된다. 
 * 스택의 맨 위에 있는 함수 ID가 현재 실행 중인 함수이다. 함수가 시작하거나 종료될 때마다, 해당 함수 ID와 시작 또는 종료 여부, 그리고 타임스탬프를 포함한 로그를 기록한다.
 * logs라는 리스트가 주어지며, logs[i]는 i번째 로그 메시지를 나타낸다. 형식은 문자열 "{function_id}:{"start" | "end"}:{timestamp}" 이다. 
 * 예를 들어, "0:start:3"은 함수 ID 0이 타임스탬프 3의 시작 시점에 호출되었음을 의미하고, "1:end:2"는 함수 ID 1이 타임스탬프 2의 끝에서 종료되었음을 의미한다. 
 * 참고로 하나의 함수는 여러 번 호출될 수 있으며, 재귀적으로 호출될 수도 있다.
 * 함수의 exclusive time(순수 실행 시간)은 프로그램 내에서 해당 함수 호출들이 실제로 실행된 시간들의 합이다. 
 * 예를 들어, 한 함수가 두 번 호출되었고 첫 번째 호출이 2 시간 단위 동안 실행되고 두 번째 호출이 1 시간 단위 동안 실행되었다면, exclusive time은 2 + 1 = 3이 된다.
 * 각 함수의 exclusive time을 배열 형태로 반환하라. 배열의 i번째 값은 함수 ID i의 exclusive time을 나타낸다.
 */

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

    // 현재 실행 중인 함수들을 쌓아두는 스택.스택의 맨 위(top)가 현재 실행 중인 함수. 새로운 함수가 시작되면 추가(push), 함수가 끝나면 제거(pop)
    const stack = [];

    // CPU가 마지막으로 “작업 전환” 된 시간을 기록. 함수가 시작되거나 끝날 때 갱신됨. 이전 작업이 실제로 실행되던 구간을 계산하는 데 필요
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


console.log(exclusiveTime(2, ["0:start:0", "1:start:2", "1:end:5", "0:end:6"])); // [3, 4]

console.log(exclusiveTime(1, ["0:start:0", "0:end:0"])); // [1]

console.log(exclusiveTime(1, ["0:start:0", "0:start:1", "0:end:2", "0:end:3"])); // [1, 1]

console.log(exclusiveTime(2, ["0:start:0", "0:start:2", "0:end:5", "1:start:6", "1:end:9", "0:end:10"])); // [3, 4]

/**
 * 한 CPU에서 여러 함수가 호출되고 종료될 때,
 * 각 함수가 진짜로 실행된 시간(Exclusive Time) 만 계산해야 함.
 * 함수는 start / end 로그로 시작과 종료 시간을 알려줌.
 * 호출이 중첩될 수 있기 때문에 스택(Stack) 을 사용.
 */