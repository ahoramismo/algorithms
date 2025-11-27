# Delete Node in a BST

**난이도:** Medium  
**문제 링크:** [LeetCode - Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/)

## 문제 설명

BST의 루트 노드 참조와 키가 주어지면, BST에서 주어진 키를 가진 노드를 삭제하세요. BST의 루트 노드 참조(업데이트될 수 있음)를 반환하세요.

삭제는 두 단계로 나눌 수 있습니다:
1. 삭제할 노드를 찾습니다.
2. 노드를 찾으면 노드를 삭제합니다.

## 제약 조건

- 노드의 개수는 `[0, 10⁴]` 범위에 있습니다.
- `-10⁵ <= Node.val <= 10⁵`
- 각 노드는 **유일한** 값을 가집니다.
- `-10⁵ <= key <= 10⁵`

## 예제

### 예제 1
**입력:** `root = [4,2,6,1,3,5,7], key = 2`  
**출력:** `[4,3,6,1,null,5,7]`  
**설명:** 값 2를 가진 노드를 삭제하면, 노드 2를 루트로 하는 서브트리의 루트가 삭제됩니다. 유효한 답 중 하나는 `[4,3,6,1,null,5,7]`입니다.

### 예제 2
**입력:** `root = [5,3,6,2,4,null,7], key = 3`  
**출력:** `[5,4,6,2,null,null,7]`  
**설명:** 값 3을 가진 노드를 삭제하면, 노드 3을 루트로 하는 서브트리의 루트가 삭제됩니다. 유효한 답 중 하나는 `[5,4,6,2,null,null,7]`입니다.

### 예제 3
**입력:** `root = [5,3,6,2,4,null,7], key = 0`  
**출력:** `[5,3,6,2,4,null,7]`  
**설명:** 삭제할 노드가 없으므로 원래 트리를 반환합니다.

## 솔루션

### 코드
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (!root) return null;

  if (root.val < key) {
    root.right = deleteNode(root.right, key);
  } else if (root.val > key) {
    root.left = deleteNode(root.left, key);
  } else {
    // root.val === key;
    // if only one child is available
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // both nodes are available
    const replacement = findMinNode(root.right);
    root.val = replacement.val;
    root.right = deleteNode(root.right, replacement.val);
  }

  return root;
};

function findMinNode(node) {
  while (node.left) node = node.left;
  return node;
}
```

### 접근 방법

**재귀적 탐색 및 삭제** 접근법을 사용합니다.

1. 삭제할 노드를 찾는 과정:
   - 현재 노드 값과 키를 비교해 왼쪽/오른쪽 서브트리로 재귀 탐색합니다.

2. 삭제할 노드를 찾았을 때:
   - **자식이 0개 또는 1개**: 해당 자식(또는 `null`)으로 대체합니다.
   - **자식이 2개**: 오른쪽 서브트리의 최솟값 노드를 찾아 현재 노드 값으로 교체한 뒤, 오른쪽 서브트리에서 그 최솟값 노드를 재귀적으로 삭제합니다.

**핵심 아이디어:** 자식이 둘인 경우, 오른쪽 서브트리의 최솟값(중위 순회 후계자)으로 값을 교체하면 BST 속성을 유지하면서 삭제할 수 있습니다.

### 시간 복잡도
**`O(h)`**

- `h`는 트리의 높이입니다.
- 최악의 경우 `O(n)` (편향된 트리), 평균적으로 `O(log n)` (균형 트리)입니다.

### 공간 복잡도
**`O(h)`**

- 재귀 호출 스택: 최악의 경우 `O(n)`, 평균적으로 `O(log n)`입니다.

