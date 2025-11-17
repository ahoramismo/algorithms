# Maximum Energy Boost from Two Drinks

**난이도:** Medium  
**문제 링크:** (LeetCode 링크 없음)

## 문제 설명

두 가지 에너지 드링크 `energyDrinkA`와 `energyDrinkB`가 주어집니다. 각 인덱스에서 하나의 드링크를 선택할 수 있으며, 같은 드링크를 연속으로 2번 이상 마실 수 없습니다. 최대 에너지 부스트를 구하세요.

## 제약 조건

- `1 <= energyDrinkA.length == energyDrinkB.length <= 10⁵`
- `0 <= energyDrinkA[i], energyDrinkB[i] <= 10⁴`

## 예제

(예제 없음 - 코드 기반으로 작성)

## 솔루션

### 코드
```javascript
/**
 * @param {number[]} energyDrinkA
 * @param {number[]} energyDrinkB
 * @return {number}
 */
var maxEnergyBoost = function (energyDrinkA, energyDrinkB) {
    const n = energyDrinkA.length;

    const maxA = Array(n).fill(-1);
    const maxB = Array(n).fill(-1);

    maxA[0] = energyDrinkA[0];
    maxB[0] = energyDrinkB[0];
    maxA[1] = energyDrinkA[0] + energyDrinkA[1];
    maxB[1] = energyDrinkB[0] + energyDrinkB[1];

    for (let i = 2; i < n; i++) {
        maxA[i] = Math.max(maxA[i - 1], maxB[i - 2]) + energyDrinkA[i];
        maxB[i] = Math.max(maxB[i - 1], maxA[i - 2]) + energyDrinkB[i];
    }
    
    return Math.max(maxA.at(-1), maxB.at(-1));
};
```

### 접근 방법

**동적 프로그래밍 (DP)** 접근법을 사용합니다.

1. `maxA[i]`: 인덱스 `i`까지 A 드링크를 선택했을 때의 최대 에너지
2. `maxB[i]`: 인덱스 `i`까지 B 드링크를 선택했을 때의 최대 에너지

**상태 전이:**
- `maxA[i] = max(maxA[i-1], maxB[i-2]) + energyDrinkA[i]`
  - 이전에 A를 선택했거나, 2칸 전에 B를 선택한 경우
- `maxB[i] = max(maxB[i-1], maxA[i-2]) + energyDrinkB[i]`
  - 이전에 B를 선택했거나, 2칸 전에 A를 선택한 경우

**핵심 아이디어:** 같은 드링크를 연속으로 2번 이상 마실 수 없으므로, 현재 드링크를 선택하려면 이전에 같은 드링크를 선택했거나, 2칸 전에 다른 드링크를 선택해야 합니다.

### 시간 복잡도
**`O(n)`**

- 배열을 한 번 순회하므로 `O(n)`입니다.

### 공간 복잡도
**`O(n)`**

- `maxA`와 `maxB` 배열에 `O(n)` 공간이 필요합니다.

