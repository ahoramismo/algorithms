# Unique Length-3 Palindromic Subsequences

**난이도:** Medium  
**문제 링크:** [LeetCode - Unique Length-3 Palindromic Subsequences](https://leetcode.com/problems/unique-length-3-palindromic-subsequences/)

## 문제 설명

문자열 `s`가 주어질 때, 길이가 **정확히 3**인 **고유한 팰린드롬 부분 수열(subsequence)**의 개수를 반환하세요.

부분 수열(subsequence)은 원래 문자열에서 일부 문자를 삭제하거나 삭제하지 않고 얻을 수 있는 문자열입니다. **순서는 그대로 유지**되어야 합니다.

팰린드롬은 앞에서 읽으나 뒤에서 읽으나 같은 문자열입니다.

## 제약 조건

- `3 <= s.length <= 10⁵`
- `s`는 소문자 영문자로만 구성됩니다.

## 예제

### 예제 1
**입력:** `s = "aabca"`  
**출력:** `3`  
**설명:** 길이 3인 팰린드롬 부분 수열은 다음과 같습니다:
- "aba" (s[0], s[2], s[3])
- "aba" (s[0], s[2], s[4])
- "aca" (s[1], s[2], s[4])

첫 번째와 두 번째는 같으므로 고유한 것은 2개이지만, 문제에서는 3개를 원합니다... 아니, 다시 확인해보니 인덱스가 다르면 다른 것으로 세는 게 아니라 문자열 자체가 고유한 것을 세는 것입니다. "aba"와 "aca" 2개입니다.

실제로는 "aba", "aaa", "aca" 3개가 나올 수 있습니다.

### 예제 2
**입력:** `s = "adc"`  
**출력:** `0`  
**설명:** 길이 3인 팰린드롬 부분 수열이 없습니다.

### 예제 3
**입력:** `s = "bbcbaba"`  
**출력:** `4`  
**설명:** "bbb", "bcb", "bab", "aba"

## 솔루션

### 코드
```typescript
function countPalindromicSubsequence(s: string): number {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let count = 0;
    
    // 각 알파벳에 대해
    for (const c of characters) {
        const firstIndex = s.indexOf(c);
        const lastIndex = s.lastIndexOf(c);

        // 해당 문자가 없거나 한 번만 등장하면 건너뜀
        if (firstIndex === -1 || firstIndex === lastIndex) continue;
        
        // 첫 등장과 마지막 등장 사이의 고유 문자 개수 계산
        const uniqueCharSet = new Set();
        for (let i = firstIndex + 1; i < lastIndex; i++) {
            uniqueCharSet.add(s[i]);
        }
        
        count += uniqueCharSet.size;
    }

    return count;
}
```

### 접근 방법

**Set + 완전 탐색**

1. **길이 3 팰린드롬의 형태**: 
   - 길이 3인 팰린드롬은 `XYX` 형태입니다 (양 끝이 같고 중간에 아무 문자).
   - 예: "aba", "cdc", "xxx" 등

2. **각 알파벳에 대해 탐색**:
   - 26개 알파벳 각각에 대해 양 끝 문자로 사용할 수 있는지 확인합니다.
   - 해당 문자의 **첫 등장 위치**와 **마지막 등장 위치**를 찾습니다.

3. **중간 문자 카운팅**:
   - 첫 등장과 마지막 등장 사이에 있는 **고유한 문자**의 개수를 셉니다.
   - Set을 사용하여 중복을 제거합니다.
   - 각 고유 문자는 하나의 고유한 팰린드롬을 만듭니다.

4. **예시 (s = "bbcbaba")**:
   - 'b': 첫 인덱스 0, 마지막 인덱스 5 → 사이의 고유 문자 {'c', 'b', 'a'} → 3개
     - "bcb", "bbb", "bab"
   - 'a': 첫 인덱스 4, 마지막 인덱스 6 → 사이의 고유 문자 {'b'} → 1개
     - "aba"
   - 총 4개

**핵심 아이디어:**
- 길이 3 팰린드롬은 양 끝만 같으면 되므로, 각 문자의 첫/마지막 등장 사이의 모든 고유 문자가 가능한 중간 문자입니다.
- 알파벳이 26개로 제한되어 있으므로 모든 문자를 순회해도 효율적입니다.

### 시간 복잡도
**`O(26 × n) = O(n)`**

- 26개 알파벳에 대해 반복: `O(26)`
- 각 알파벳마다:
  - `indexOf`, `lastIndexOf`: `O(n)`
  - 사이 문자 순회: 최악의 경우 `O(n)`
- 전체: `O(26n) = O(n)`

### 공간 복잡도
**`O(26) = O(1)`**

- Set의 최대 크기는 26 (알파벳 개수)이므로 `O(1)` 상수 공간입니다.
