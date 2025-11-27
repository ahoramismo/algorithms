# All Nodes Distance K in Binary Tree

**난이도:** Medium  
**문제 링크:** [LeetCode - All Nodes Distance K in Binary Tree](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/)

## 문제 설명

이진 트리의 루트 노드 `root`, 타겟 노드 `target`, 정수 `k`가 주어집니다.

`target` 노드로부터 거리가 `k`인 모든 노드의 값들을 배열로 반환하세요. 반환 순서는 상관없습니다.

## 제약 조건

- 노드 개수 범위: `[1, 500]`
- `0 <= Node.val <= 500`
- 모든 노드의 값은 유일합니다.
- `target`은 트리 내에 반드시 존재하는 노드입니다.
- `0 <= k <= 1000`

## 예제

### 예제 1
**입력:** `root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2`  
**출력:** `[7,4,1]`  
**설명:** 
노드 5로부터 거리가 2인 노드들은 다음과 같습니다:
- 경로 5 -> 2 -> 7 (거리 2)
- 경로 5 -> 2 -> 4 (거리 2)
- 경로 5 -> 3 -> 1 (거리 2)

### 예제 2
**입력:** `root = [1], target = 1, k = 3`  
**출력:** `[]`

## 솔루션

### 코드
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = this.parent = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function (root, target, k) {
    // 1단계: DFS를 사용하여 부모 포인터를 할당하고 실제 target 노드를 찾음
    let actualTarget = null;

    function dfs(node, parent = null) {
        if (!node) return;
        node.parent = parent;
        if (node.val === target.val) actualTarget = node;

        dfs(node.left, node);
        dfs(node.right, node);
    }

    dfs(root);

    if (!actualTarget) return [];

    // 2단계: target 노드에서 시작하는 BFS 탐색
    const queue = [[actualTarget, 0]];
    const visited = new Set([actualTarget]);
    const result = [];

    while (queue.length) {
        const [node, dist] = queue.shift();

        if (dist === k) {
            result.push(node.val);
            continue; // 거리 k인 노드에서는 더 이상 탐색하지 않음
        }

        // 왼쪽 자식, 오른쪽 자식, 부모 노드로 이동
        for (const next of [node.left, node.right, node.parent]) {
            if (next && !visited.has(next)) {
                visited.add(next);
                queue.push([next, dist + 1]);
            }
        }
    }

    return result;
};
```

### 접근 방법

이 문제는 **트리**를 **그래프**처럼 다루는 것이 핵심입니다.

1. **그래프 변환 (부모 포인터 추가)**:
   - 일반적인 이진 트리는 부모로 이동할 수 있는 링크가 없습니다.
   - DFS를 통해 모든 노드에 `parent` 포인터를 추가하여 양방향 이동이 가능한 그래프 형태로 만듭니다.

2. **BFS 탐색**:
   - `target` 노드에서 시작하여 거리가 `k`인 노드를 찾습니다.
   - BFS는 레벨(거리) 단위로 탐색하므로 거리 `k`를 찾기에 적합합니다.
   - `visited` 세트를 사용하여 이미 방문한 노드(부모에서 자식으로 왔다가 다시 부모로 가는 경우 등)를 중복 방문하지 않도록 합니다.

### 시간 복잡도
**`O(n)`**

- DFS로 부모 포인터 할당: 모든 노드 방문 `O(n)`
- BFS 탐색: 최악의 경우 모든 노드 방문 `O(n)`
- 전체 시간 복잡도는 `O(n)`입니다.

### 공간 복잡도
**`O(n)`**

- `parent` 포인터 추가, 재귀 스택(DFS), 큐(BFS), 방문 체크(Set) 모두 최대 `O(n)` 공간을 사용합니다.
