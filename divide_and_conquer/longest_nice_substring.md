# Longest Nice Substring

**난이도:** Medium  
**문제 링크:** [LeetCode - Longest Nice Substring](https://leetcode.com/problems/longest-nice-substring/)

## 문제 설명

문자열 `s`가 **nice**하다는 것은, `s`에 포함된 모든 알파벳이 **대문자와 소문자 모두** 나타날 때를 의미합니다.

예를 들어:
- `"abABB"`는 `'A'`와 `'a'`가 모두 나타나고, `'B'`와 `'b'`가 모두 나타나므로 nice합니다.
- `"abA"`는 `'b'`는 나타나지만 `'B'`는 나타나지 않으므로 nice하지 않습니다.

문자열 `s`가 주어지면, `s`의 **가장 긴 nice한 부분 문자열**을 반환하세요. 여러 개가 있다면 가장 먼저 나타나는 것을 반환하세요. 없다면 빈 문자열을 반환하세요.

## 제약 조건

- `1 <= s.length <= 100`
- `s`는 대문자와 소문자 영어 알파벳으로 구성됩니다.

## 예제

### 예제 1
**입력:** `s = "YazaAay"`  
**출력:** `"aAa"`  
**설명:** `"aAa"`는 nice한 문자열입니다. `s`에 포함된 알파벳 중 `'A'`/`'a'`만 있고, `'A'`와 `'a'`가 모두 나타나기 때문입니다. `"aAa"`가 가장 긴 nice한 부분 문자열입니다.

### 예제 2
**입력:** `s = "Bb"`  
**출력:** `"Bb"`  
**설명:** `"Bb"`는 `'B'`와 `'b'`가 모두 나타나므로 nice한 문자열입니다. 전체 문자열이 부분 문자열입니다.

### 예제 3
**입력:** `s = "c"`  
**출력:** `""`  
**설명:** nice한 부분 문자열이 없습니다.

## 솔루션

### 접근 방법

**Divide and Conquer (분할 정복)** 접근법을 사용합니다.

1. 현재 문자열의 모든 문자를 `Set`에 저장합니다.
2. 문자열을 순회하면서 각 문자의 대문자와 소문자가 모두 `Set`에 있는지 확인합니다.
3. 만약 대문자 또는 소문자 중 하나라도 없는 문자가 발견되면:
   - 해당 위치를 기준으로 문자열을 왼쪽과 오른쪽으로 분할합니다.
   - 각 부분에 대해 재귀적으로 가장 긴 nice 부분 문자열을 찾습니다.
   - 두 결과 중 더 긴 것을 반환합니다.
4. 모든 문자가 대문자/소문자 쌍을 가지고 있으면, 현재 문자열 자체가 nice하므로 그대로 반환합니다.

**핵심 아이디어:**

만약 문자열에 대문자만 있거나 소문자만 있는 문자가 있다면, 그 문자를 포함하는 어떤 부분 문자열도 nice할 수 없습니다.

예를 들어, 문자열 `"YazaAay"`에서 `'z'`는 있지만 `'Z'`는 없습니다. 따라서 `'z'`를 포함하는 모든 부분 문자열은 nice할 수 없으므로, `'z'`를 기준으로 왼쪽과 오른쪽으로 나누어 각각에서 nice한 부분 문자열을 찾아야 합니다.

이렇게 문제를 작은 부분 문제로 나누어 해결하는 것이 분할 정복의 핵심입니다.

### 시간 복잡도
**`O(n²)`**

- 각 재귀 호출에서 `Set` 생성과 문자열 순회에 `O(n)` 시간이 걸립니다.
- 최악의 경우 문자열이 계속 분할되어 `O(n)`번의 재귀 호출이 발생할 수 있습니다.
- 따라서 전체 시간 복잡도는 `O(n²)`입니다.

### 공간 복잡도
**`O(n)`**

- 재귀 호출 스택: 최악의 경우 `O(n)` 깊이
- 각 호출마다 `Set`과 `substring` 생성에 `O(n)` 공간이 필요하지만, 재귀 스택의 깊이가 `O(n)`이므로 전체 공간 복잡도는 `O(n)`입니다.

### 코드
```javascript
/**
 * @param {string} s
 * @return {string}
 */
var longestNiceSubstring = function (s) {
    const set = new Set(s);

    for (let i = 0; i < s.length; i++) {
        const c = s[i];

        if (set.has(c.toUpperCase()) && set.has(c.toLowerCase())) continue;

        const left = longestNiceSubstring(s.substring(0, i));
        const right = longestNiceSubstring(s.substring(i + 1));

        return left.length >= right.length ? left : right;
    }

    return s;
};
```
