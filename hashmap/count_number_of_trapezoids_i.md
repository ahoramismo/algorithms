# Count Number of Trapezoids I

**난이도:** Medium (추정)  
**문제 링크:** (정보 없음)

## 문제 설명

2차원 평면상에 여러 개의 점 `points`가 주어집니다. 각 점은 `[x, y]` 좌표를 가집니다.

주어진 점들로 만들 수 있는 **사다리꼴(Trapezoid)**의 개수를 구하세요. 여기서 사다리꼴은 **x축에 평행한 두 변**을 가진 사각형으로 정의합니다. (즉, 밑변과 윗변이 x축과 평행해야 합니다.)

결과가 커질 수 있으므로 `10^9 + 7`로 나눈 나머지를 반환하세요.

## 제약 조건

- `points.length`는 최대 `1000` (추정)
- 좌표 값의 범위는 제한 없음 (하지만 해시맵을 사용하므로 크게 중요하지 않음)
- 중복된 점은 없다고 가정

## 예제

### 예제 1
**입력:** `points = [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]]`  
**출력:** `3`  
**설명:**
- y=0: [0,0], [1,0], [2,0]
- y=1: [0,1], [1,1], [2,1]
- 가능한 x좌표 쌍: (0,1), (0,2), (1,2)
- 각 쌍이 y=0과 y=1 두 곳에서 모두 등장하므로, 3개의 사다리꼴(또는 직사각형)이 형성됩니다.

## 솔루션

### 코드
```javascript
/**
 * @param {number[][]} points
 * @return {number}
 */
var countTrapezoids = function (points) {
    // 1. y좌표별로 점의 개수 카운트
    const countByY = {};
    for (const [x, y] of points) {
        countByY[y] = (countByY[y] || 0) + 1;
    }

    // 2. 각 y 레벨에서 만들 수 있는 선분의 개수 계산
    // 점이 n개면 선분은 nC2 = n * (n - 1) / 2 개
    const segmentsByY = [];
    for (const y in countByY) {
        const n = countByY[y];
        if (n >= 2) {
            segmentsByY.push((n * (n - 1)) / 2);
        }
    }

    let answer = 0;
    const MOD = 1e9 + 7;

    // 3. 서로 다른 두 y 레벨의 선분 개수를 곱해서 더함 (누적 합 이용)
    // 현재 레벨의 선분 개수 * (이전까지의 선분 개수 합)
    let currentSum = 0;
    for (const count of segmentsByY) {
        // count * currentSum 가 MAX_SAFE_INTEGER를 넘을 수 있으므로 BigInt 사용 혹은 모듈러 연산 주의
        // 여기서는 문제의 제약 조건에 따라 다르지만, 안전하게 BigInt 사용 가능
        const term = (BigInt(count) * BigInt(currentSum)) % BigInt(MOD);
        answer = (answer + Number(term)) % MOD;
        
        currentSum = (currentSum + count) % MOD;
    }

    return answer;
};
```

### 접근 방법

**수학적 조합(Combinatorics)**과 **해시맵(HashMap)**을 사용합니다.

1. **Y좌표별 점 개수 카운트**: 사다리꼴의 두 평행한 변(밑변, 윗변)은 x축과 평행해야 하므로, 같은 y좌표를 가진 점들로 만들어집니다.
2. **선분 개수 계산**: 특정 y 레벨에 점이 `n`개 있다면, 그 안에서 만들 수 있는 선분의 개수는 `n`개 중 2개를 뽑는 조합 `nC2 = n * (n - 1) / 2`입니다.
3. **사다리꼴 개수 계산**: 서로 다른 두 y 레벨 `y1`, `y2`를 선택했을 때, `y1`에 있는 선분 중 하나와 `y2`에 있는 선분 중 하나를 짝지으면 사다리꼴이 됩니다.
   - 즉, 모든 서로 다른 두 y 레벨 쌍에 대해 `(y1의 선분 수) * (y2의 선분 수)`를 더하면 됩니다.
   - 이를 효율적으로 계산하기 위해 **누적 합(Prefix Sum)** 아이디어를 사용합니다. 반복문을 돌면서 `현재 레벨의 선분 수 * 이전까지의 선분 수 합`을 누적합니다.

**핵심 아이디어:** 두 평행한 선분이 있으면, 그 선분의 x구간이 겹치거나 같을 필요 없이 무조건 사다리꼴을 형성합니다.

### 시간 복잡도
**`O(N)`**

- 점들을 한 번 순회하며 y좌표별 개수를 세고(`O(N)`), 생성된 y 레벨의 수만큼 반복(`O(N)` 이하)하므로 전체적으로 `O(N)`입니다.

### 공간 복잡도
**`O(N)`**

- y좌표별 카운트를 저장하기 위한 맵에 `O(N)` 공간이 필요합니다.
