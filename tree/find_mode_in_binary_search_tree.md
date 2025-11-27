# Find Mode in Binary Search Tree

**난이도:** Easy  
**문제 링크:** [LeetCode - Find Mode in Binary Search Tree](https://leetcode.com/problems/find-mode-in-binary-search-tree/)

## 문제 설명

이진 탐색 트리(BST)가 주어졌을 때, 가장 많이 등장하는 값(Mode)을 모두 찾아 정수 배열로 반환하세요. BST에는 중복 값이 존재할 수 있습니다.

## 제약 조건

- 노드 수: `1 <= n <= 10⁴`
- 노드 값: `-10⁵ <= Node.val <= 10⁵`
- BST 구조

## 예제

### 예제 1
**입력:** `root = [1,null,2,2]`  
**출력:** `[2]`

### 예제 2
**입력:** `root = [0]`  
**출력:** `[0]`

## 솔루션

### 접근 방법 1: BFS (단순 카운팅)
BST의 특성을 활용하지 않고 전체 노드를 BFS로 순회하며 빈도를 기록합니다.

```javascript
var findMode = function (root) {
  if (!root) return [];

  const freq = {};
  const queue = [root];
  let maxFreq = 0;

  while (queue.length) {
    const node = queue.shift();
    freq[node.val] = (freq[node.val] || 0) + 1;
    maxFreq = Math.max(maxFreq, freq[node.val]);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return Object.entries(freq)
    .filter(([, count]) => count === maxFreq)
    .map(([value]) => Number(value));
};
```

### 접근 방법 2: 중위 순회 (BST 특성 활용, O(1) 추가 공간)
중위 순회를 이용하면 값이 정렬된 순서로 방문되므로 연속된 값의 빈도를 쉽게 셀 수 있습니다.

```javascript
var findMode = function (root) {
  let prev = null;
  let currentCount = 0;
  let maxCount = 0;
  const modes = [];

  function handleValue(val) {
    if (val === prev) {
      currentCount += 1;
    } else {
      currentCount = 1;
      prev = val;
    }

    if (currentCount > maxCount) {
      maxCount = currentCount;
      modes.length = 0;
      modes.push(val);
    } else if (currentCount === maxCount) {
      modes.push(val);
    }
  }

  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    handleValue(node.val);
    inorder(node.right);
  }

  inorder(root);
  return modes;
};
```

### 시간 복잡도
- 두 접근 모두 모든 노드를 한 번씩 방문하므로 `O(n)`

### 공간 복잡도
- **BFS 방식:** 맵 및 큐 사용으로 `O(n)`
- **중위 순회 방식:** 재귀 스택을 제외하면 추가 공간 `O(1)` (follow-up 요구 사항 충족)
