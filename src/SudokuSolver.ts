export class SudokuSolver {
    private board: number[][];

    constructor(board: number[][]) {
        this.board = board;
    }

    public solve(): boolean {
        const emptyCell = this.findEmpty();
        if (!emptyCell) return true; // puzzle solved
        const [row, col] = emptyCell;

        for (let num = 1; num <= 9; num++) {
            if (this.isValid(num, row, col)) {
                this.board[row][col] = num;
                if (this.solve()) return true;
                this.board[row][col] = 0; // backtrack
            }
        }

        return false; // trigger backtracking
    }

    private findEmpty(): [number, number] | null {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j] === 0) return [i, j];
            }
        }
        return null;
    }

    private isValid(num: number, row: number, col: number): boolean {
        for (let i = 0; i < 9; i++) {
            if (this.board[row][i] === num || this.board[i][col] === num) return false;
        }

        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[boxRow + i][boxCol + j] === num) return false;
            }
        }

        return true;
    }

    public getBoard(): number[][] {
        return this.board;
    }
}

