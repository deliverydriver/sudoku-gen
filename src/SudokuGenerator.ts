export class SudokuGenerator {
    private seed: number[][];

    constructor(seed: number[][]) {
        this.seed = seed;
    }

    public generate(): number[][] {
        let board = this.copyBoard(this.seed);
        board = this.rotateBoard(board, this.randomInt(0, 3));
        board = this.shuffleGroups(board, 'row');
        board = this.shuffleGroups(board, 'column');
        board = this.shuffleCells(board, 'row');
        board = this.shuffleCells(board, 'column');
        board = this.swapNumbers(board);
        return board;
    }

    private copyBoard(board: number[][]): number[][] {
        return board.map(row => row.slice());
    }

    private rotateBoard(board: number[][], times: number): number[][] {
        for (let i = 0; i < times; i++) {
            board = board[0].map((_, index) => board.map(row => row[index])).reverse();
        }
        return board;
    }

    private shuffleGroups(board: number[][], type: 'row' | 'column'): number[][] {
        const indices = this.shuffle([0, 1, 2]);
        if (type === 'row') {
            const newBoard = indices.flatMap(index => board.slice(index * 3, (index + 1) * 3));
            return newBoard;
        } else {
            const newBoard = board[0].map((_, colIndex) =>
                indices.flatMap(index => board.map(row => row[index * 3 + colIndex % 3]))
            );
            return newBoard;
        }
    }

    private shuffleCells(board: number[][], type: 'row' | 'column'): number[][] {
        if (type === 'row') {
            for (let i = 0; i < 9; i += 3) {
                const indices = this.shuffle([0, 1, 2]);
                for (let j = 0; j < 3; j++) {
                    const temp = board[i + j];
                    board[i + j] = board[i + indices[j]];
                    board[i + indices[j]] = temp;
                }
            }
        } else {
            for (let i = 0; i < 9; i += 3) {
                const indices = this.shuffle([0, 1, 2]);
                for (let j = 0; j < 3; j++) {
                    for (let k = 0; k < 9; k++) {
                        const temp = board[k][i + j];
                        board[k][i + j] = board[k][i + indices[j]];
                        board[k][i + indices[j]] = temp;
                    }
                }
            }
        }
        return board;
    }

    private swapNumbers(board: number[][]): number[][] {
        const numbers = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const numMap = new Map<number, number>();
        for (let i = 0; i < 9; i++) {
            numMap.set(i + 1, numbers[i]);
        }
        return board.map(row => row.map(num => numMap.get(num)!));
    }

    private shuffle(array: number[]): number[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    private randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

