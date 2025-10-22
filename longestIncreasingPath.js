class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number}
     */
    longestIncreasingPath(matrix) {
        const ROWS = matrix.length,
            COLS = matrix[0].length;
        const directions = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
        ];
        let indegree = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                for (const [dr, dc] of directions) {
                    const nr = r + dr,
                        nc = c + dc;
                    if (
                        nr >= 0 &&
                        nr < ROWS &&
                        nc >= 0 &&
                        nc < COLS &&
                        matrix[nr][nc] < matrix[r][c]
                    ) {
                        indegree[r][c]++;
                    }
                }
            }
        }

        let q = new Queue();
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (indegree[r][c] === 0) {
                    q.push([r, c]);
                }
            }
        }

        let LIS = 0;
        while (!q.isEmpty()) {
            const size = q.size();
            for (let i = 0; i < size; i++) {
                const [r, c] = q.pop();
                for (const [dr, dc] of directions) {
                    const nr = r + dr,
                        nc = c + dc;
                    if (
                        nr >= 0 &&
                        nr < ROWS &&
                        nc >= 0 &&
                        nc < COLS &&
                        matrix[nr][nc] > matrix[r][c]
                    ) {
                        indegree[nr][nc]--;
                        if (indegree[nr][nc] === 0) {
                            q.push([nr, nc]);
                        }
                    }
                }
            }
            LIS++;
        }
        return LIS;
    }
}
