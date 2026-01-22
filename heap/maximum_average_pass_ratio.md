# Maximum Average Pass Ratio

**난이도:** Medium  
**문제 링크:** [LeetCode - Maximum Average Pass Ratio](https://leetcode.com/problems/maximum-average-pass-ratio/)

## 문제 설명

학교에 `n`개의 클래스가 있습니다. 각 클래스는 `[passᵢ, totalᵢ]`로 표시되며, `passᵢ`는 시험에 합격한 학생 수, `totalᵢ`는 전체 학생 수를 나타냅니다.

클래스 `i`의 pass ratio는 `passᵢ / totalᵢ`입니다.

당신은 `extraStudents`명의 **똑똑한 학생**들을 배정할 수 있습니다. 이 학생들은 어느 클래스에 배정되든 **무조건 시험에 합격**합니다.

학생들을 배정한 후 모든 클래스의 **평균 pass ratio의 최대값**을 반환하세요.

답과 정답의 차이가 `10⁻⁵` 이내면 정답으로 인정됩니다.

## 제약 조건

- `1 <= classes.length <= 10⁵`
- `classes[i].length == 2`
- `1 <= passᵢ <= totalᵢ <= 10⁵`
- `1 <= extraStudents <= 10⁵`

## 예제

### 예제 1
**입력:** `classes = [[1,2],[3,5],[2,2]], extraStudents = 2`  
**출력:** `0.78333`  
**설명:**
- 클래스 0에 1명 배정: `[1,2]` → `[2,3]`, ratio = 2/3
- 클래스 0에 또 1명 배정: `[2,3]` → `[3,4]`, ratio = 3/4
- 평균: (3/4 + 3/5 + 2/2) / 3 = 0.78333

### 예제 2
**입력:** `classes = [[2,4],[3,9],[4,5],[2,10]], extraStudents = 4`  
**출력:** `0.53485`

## 솔루션

### 코드
```typescript
class _MaxHeap {
    heap: number[][] = [];

    // 학생 1명을 추가했을 때 pass ratio의 증가량 계산
    private value(c: number[]) {
        const [pass, total] = c;
        return (total - pass) / (total * (total + 1));
    }

    push(c: number[]) {
        this.heap.push(c);
        this.bubbleUp(this.heap.length - 1);
    }

    pop(): number[] {
        const top = this.heap[0];
        const last = this.heap.pop()!;
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }
        return top;
    }

    private bubbleUp(i: number) {
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (this.value(this.heap[p]) >= this.value(this.heap[i])) break;
            [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
            i = p;
        }
    }

    private bubbleDown(i: number) {
        const n = this.heap.length;
        while (true) {
            let largest = i;
            const l = i * 2 + 1;
            const r = i * 2 + 2;

            if (l < n && this.value(this.heap[l]) > this.value(this.heap[largest])) {
                largest = l;
            }
            if (r < n && this.value(this.heap[r]) > this.value(this.heap[largest])) {
                largest = r;
            }
            if (largest === i) break;
            [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
            i = largest;
        }
    }
}

function maxAverageRatio(classes: number[][], extraStudents: number): number {
    const heap = new _MaxHeap();

    // 모든 클래스를 힙에 추가
    for (const c of classes) heap.push(c);

    // extraStudents만큼 반복
    while (extraStudents-- > 0) {
        // 증가량이 가장 큰 클래스를 꺼냄
        const best = heap.pop();
        best[0]++; // pass 증가
        best[1]++; // total 증가
        heap.push(best); // 다시 힙에 추가
    }

    // 최종 평균 pass ratio 계산
    return classes.reduce((sum, [p, t]) => sum + p / t, 0) / classes.length;
}
```

### 접근 방법

**우선순위 큐(Priority Queue / Max Heap)**와 **그리디(Greedy)** 접근법을 사용합니다.

1. **증가량 계산**: 
   - 클래스에 학생 1명을 추가했을 때 pass ratio의 증가량은:
     ```
     (pass + 1) / (total + 1) - pass / total
     = (total - pass) / (total * (total + 1))
     ```
   - 이 공식으로 각 클래스의 "효율성"을 계산합니다.

2. **Max Heap**: 
   - 증가량이 가장 큰 클래스가 항상 힙의 top에 위치하도록 합니다.
   - `value()` 함수로 우선순위를 결정합니다.

3. **그리디 선택**: 
   - `extraStudents`번 반복하면서 매번 증가량이 가장 큰 클래스에 학생을 배정합니다.
   - 학생을 배정한 후 다시 힙에 추가하여 우선순위를 갱신합니다.

**핵심 아이디어:** 
- 매 단계마다 pass ratio 증가량이 가장 큰 클래스에 학생을 배정하는 것이 전체 평균을 최대화합니다.
- 이는 그리디 선택이지만, 우선순위 큐를 사용하여 매번 최선의 선택을 효율적으로 찾습니다.

### 시간 복잡도
**`O((n + k) log n)`**

- `n`은 클래스 개수, `k`는 `extraStudents`입니다.
- 힙 생성: `O(n log n)`
- `k`번 pop & push: `O(k log n)`
- 전체: `O((n + k) log n)`

### 공간 복잡도
**`O(n)`**

- 힙에 `n`개의 클래스를 저장하므로 `O(n)`입니다.
