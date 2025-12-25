# Maximum Happiness Sum

**난이도:** Easy  
**문제 링크:** [LeetCode - Maximum Happiness Sum](https://leetcode.com/problems/maximize-happiness-of-selected-children/)

## 문제 설명

`n`명의 아이들이 있고, 각 아이는 행복도 점수 `happiness[i]`를 가지고 있습니다.

당신은 `k`명의 아이를 선택해야 합니다. 아이를 선택할 때마다, 선택된 아이의 행복도는 **선택된 순서에 따라 감소**합니다. 구체적으로:
- 첫 번째로 선택된 아이: 행복도 그대로 (`happiness[i]`)
- 두 번째로 선택된 아이: 행복도 - 1 (`happiness[i] - 1`)
- 세 번째로 선택된 아이: 행복도 - 2 (`happiness[i] - 2`)
- ...
- `k`번째로 선택된 아이: 행복도 - (k-1) (`happiness[i] - (k-1)`)

단, 행복도가 음수가 되면 0으로 처리됩니다.

선택된 `k`명의 아이들의 **최대 행복도 합**을 구하세요.

## 제약 조건

- `1 <= n == happiness.length <= 2 * 10⁵`
- `1 <= happiness[i] <= 10⁸`
- `1 <= k <= n`

## 예제

### 예제 1
**입력:** `happiness = [1,2,3], k = 2`  
**출력:** `4`  
**설명:** 
- 행복도 3인 아이를 첫 번째로 선택: 3
- 행복도 2인 아이를 두 번째로 선택: 2 - 1 = 1
- 합: 3 + 1 = 4

### 예제 2
**입력:** `happiness = [1,1,1,1], k = 2`  
**출력:** `1`  
**설명:**
- 첫 번째 아이 선택: 1
- 두 번째 아이 선택: 1 - 1 = 0
- 합: 1 + 0 = 1

### 예제 3
**입력:** `happiness = [2,3,4,5], k = 1`  
**출력:** `5`  
**설명:** 행복도 5인 아이를 선택하면 됩니다.

## 솔루션

### 코드
```typescript
function maximumHappinessSum(happiness: number[], k: number): number {
    // 행복도를 내림차순으로 정렬
    happiness.sort((a, b) => b - a);

    let answer = 0;
    let selected = 0;

    for (const score of happiness) {
        if (selected === k) break;
        // 선택된 순서만큼 빼되, 0보다 작으면 0으로 처리
        answer += Math.max(0, score - selected);
        selected++;
    }

    return answer;
}
```

### 접근 방법

**그리디 알고리즘**을 사용합니다.

1. **정렬**: 행복도를 내림차순으로 정렬합니다. 행복도가 높은 아이를 먼저 선택하는 것이 최적입니다.
2. **순차 선택**: 정렬된 배열을 순회하면서:
   - 현재 아이의 행복도에서 이미 선택된 아이의 수(`selected`)만큼 뺍니다.
   - 음수가 되면 0으로 처리합니다 (`Math.max(0, score - selected)`).
   - `k`명을 선택하면 종료합니다.

**핵심 아이디어:** 행복도가 높은 아이를 먼저 선택할수록 감소폭이 작아지므로, 전체 합이 최대가 됩니다. 따라서 내림차순 정렬 후 그리디하게 선택하는 것이 최적해입니다.

### 시간 복잡도
**`O(n log n)`**

- 정렬에 `O(n log n)` 시간이 걸립니다.
- 이후 순회는 `O(k)`이므로 전체적으로 `O(n log n)`입니다.

### 공간 복잡도
**`O(1)`**

- 추가 공간 없이 입력 배열을 정렬만 하므로 `O(1)`입니다 (정렬이 in-place라면).

