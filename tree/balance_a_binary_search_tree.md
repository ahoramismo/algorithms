## Balance a Binary Search Tree

**난이도:** Medium  
**문제 링크:** [LeetCode - Balance a Binary Search Tree](https://leetcode.com/problems/balance-a-binary-search-tree/)

## 문제 설명

임의의 형태(편향되었을 수도 있음)의 **이진 탐색 트리(BST)** 의 루트 노드 `root` 가 주어집니다.  
이 트리와 **같은 값들**을 가지되, **높이가 가능한 한 낮은 균형 잡힌 BST** 로 재구성한 트리의 루트를 반환하세요.

> 값의 멀티셋(multiset)은 동일하게 유지하되, **구조만** 더 균형 잡히도록 바꾸는 문제입니다.

## 제약 조건

- 노드 개수: `1 <= n <= 10⁴`  
- 노드 값: `1 <= Node.val <= 10⁵`

## 예제

### 예제 1

**입력:** `root = [1,null,2,null,3,null,4,null,null]` (오른쪽으로만 뻗은 편향 트리)  
**출력:** `[2,1,3,null,null,null,4]` (높이가 더 낮은 균형 트리의 한 예)  

### 예제 2

**입력:** `root = [2,1,3]`  
**출력:** `[2,1,3]`  
**설명:** 이미 균형 잡힌 BST 이므로 그대로 반환해도 됩니다.

## 솔루션

### 코드 (TypeScript)

```typescript
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function balanceBST(root: TreeNode | null): TreeNode | null {
    if (root === null) {
        return null;
    }

    const nodes: TreeNode[] = [];

    const inorder = (node: TreeNode | null) => {
        if (node === null) return;

        inorder(node.left);
        nodes.push(node);
        inorder(node.right);
    };

    inorder(root);

    const build = (left: number, right: number): TreeNode | null => {
        if (left > right) return null;

        const mid = (left + right) >> 1;
        const node = nodes[mid];

        node.left = build(left, mid - 1);
        node.right = build(mid + 1, right);

        return node;
    };

    return build(0, nodes.length - 1);
}
```

## 접근 방법

**접근 요약:**  
1) BST 를 **중위 순회**해서 **정렬된 노드 배열**을 만든 뒤,  
2) 그 배열에서 항상 **중간 원소를 루트로 선택**하는 방식으로 **재귀적으로 트리를 재구성**합니다.

### 1. 중위 순회(Inorder Traversal)로 정렬된 배열 만들기

- BST 를 중위 순회하면 값들이 **오름차순**으로 방문됩니다.
- 이 순서대로 `nodes` 배열에 **노드 객체 자체**를 넣습니다.
- 이렇게 하면 `nodes` 는 `val` 기준으로 정렬된 상태가 됩니다.

### 2. 정렬된 배열로 균형 BST 구성하기

- 구간 `[left, right]` 에 대해:
  - 중간 인덱스 `mid = (left + right) >> 1` 를 선택합니다.
  - `nodes[mid]` 를 현재 서브트리의 루트로 사용합니다.
  - 왼쪽 서브트리: `[left, mid - 1]` 로 재귀 호출 → `node.left`
  - 오른쪽 서브트리: `[mid + 1, right]` 로 재귀 호출 → `node.right`
- 이 과정을 반복하면, 항상 **중간 값이 루트**가 되기 때문에  
  트리의 높이가 **대략 log n 수준으로 균형**을 이루게 됩니다.

### 3. 노드 재사용

- 새로운 노드를 만들지 않고, 기존 트리의 노드들을 **그대로 재배치**합니다.
- 각 노드의 `left`, `right` 포인터만 새롭게 설정하므로,  
  추가적인 노드 생성을 하지 않아도 됩니다.

**핵심 아이디어:**  
BST 는 중위 순회 시 값이 정렬된다는 성질을 이용해  
1) **정렬된 배열**로 바꾸고, 2) **배열 중간을 루트로 잡는 방식**으로 재귀적으로 트리를 만들면  
항상 **균형 잡힌 BST** 를 만들 수 있습니다.

## 시간 복잡도

- 중위 순회: 모든 노드를 한 번씩 방문 → `O(n)`  
- 정렬 배열로부터 트리 구성: 각 노드를 한 번씩 루트로 사용 → `O(n)`  
- **총 시간 복잡도:** `O(n)`

## 공간 복잡도

- `nodes` 배열에 모든 노드를 저장 → `O(n)`  
- 재귀 호출 스택(트리 높이 비례): 균형 트리 기준 `O(log n)`, 최악(이미 편향된 트리) `O(n)`  
- **총 추가 공간 복잡도:** `O(n)`

