# Redundant Connection

**난이도:** Medium  
**문제 링크:** [LeetCode - Redundant Connection](https://leetcode.com/problems/redundant-connection/)

## 문제 설명

이 문제에서 "트리"는 사이클이 없는 무방향 연결 그래프입니다.

`1`부터 `n`까지의 라벨이 붙은 `n`개의 노드로 구성된 그래프가 주어집니다. 원래는 트리였지만, 하나의 추가적인 간선이 더해졌습니다. 이 추가된 간선은 `1`에서 `n` 사이의 서로 다른 두 노드를 연결하며, 이미 존재하는 간선과 중복되지 않습니다.

그래프는 `edges`라는 배열로 주어지며, `edges[i] = [ai, bi]`는 노드 `ai`와 `bi` 사이에 간선이 있음을 의미합니다.

트리가 되도록 하기 위해 제거해야 할 간선 하나를 반환하세요. 정답이 여러 개인 경우, 입력 `edges`에서 **가장 마지막에 등장하는 간선**을 반환하세요.

## 제약 조건

- `n == edges.length`
- `3 <= n <= 1000`
- `edges[i].length == 2`
- `1 <= ai < bi <= edges.length`
- `ai != bi`
- 중복된 간선은 없습니다.
- 주어진 그래프는 연결되어 있습니다.

## 예제

### 예제 1
**입력:** `edges = [[1,2], [1,3], [2,3]]`  
**출력:** `[2,3]`  
**설명:** `[2,3]` 간선을 제거하면 그래프는 트리가 됩니다.

### 예제 2
**입력:** `edges = [[1,2], [2,3], [3,4], [1,4], [1,5]]`  
**출력:** `[1,4]`  
**설명:** `[1,4]` 간선을 제거하면 그래프는 트리가 됩니다.

## 솔루션

### 코드
```javascript
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
    const n = edges.length;
    const parent = Array.from({ length: n + 1 }, (_, i) => i);

    function find(x) {
        if (parent[x] === x) return x;
        return (parent[x] = find(parent[x])); // 경로 압축 (Path Compression)
    }

    function union(x, y) {
        const rootX = find(x);
        const rootY = find(y);

        if (rootX === rootY) return false; // 이미 같은 집합이면 사이클 발생

        parent[rootX] = rootY; // 두 집합 병합
        return true;
    }

    for (const [u, v] of edges) {
        if (!union(u, v)) {
            return [u, v]; // 사이클을 만드는 간선 반환
        }
    }

    return [];
};
```

### 접근 방법

**유니온 파인드 (Union-Find / Disjoint Set)** 자료구조를 사용합니다.

1. 트리는 사이클이 없는 연결 그래프입니다. 노드가 `n`개일 때 간선은 `n-1`개여야 합니다. 문제에서는 간선이 `n`개 주어지므로 정확히 하나의 사이클이 존재합니다.
2. 간선을 순서대로 하나씩 확인하면서, 두 노드가 이미 같은 집합에 속해 있는지 확인합니다.
   - **같은 집합에 속해 있지 않다면 (`union` 성공)**: 두 노드를 연결합니다 (같은 집합으로 만듭니다).
   - **이미 같은 집합에 속해 있다면 (`union` 실패)**: 이 간선을 추가하면 사이클이 형성됩니다. 따라서 이 간선이 바로 제거해야 할 "Redundant Connection"입니다.
3. 문제에서 "정답이 여러 개인 경우 마지막에 등장하는 간선을 반환하라"고 했으므로, `edges`를 순서대로 처리하다가 처음으로 사이클을 만드는 간선을 발견하면 바로 반환하면 됩니다.

**핵심 아이디어:** 두 노드를 연결하려는데 이미 연결되어 있다면(같은 루트를 공유한다면), 그 간선이 사이클을 만드는 주범입니다.

### 시간 복잡도
**`O(N * α(N))`** (거의 `O(N)`)

- `N`은 간선의 개수(노드의 개수와 동일)입니다.
- 유니온 파인드 연산(경로 압축 사용 시)의 시간 복잡도는 아커만 함수의 역함수 `α(N)`으로, 실제로는 거의 상수 시간(`O(1)`)에 가깝습니다.
- 따라서 전체 간선을 순회하는 데 걸리는 시간은 `O(N)`입니다.

### 공간 복잡도
**`O(N)`**

- 부모 노드를 저장하기 위한 `parent` 배열에 `O(N)` 공간이 필요합니다.

