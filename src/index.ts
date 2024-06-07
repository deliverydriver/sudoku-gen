import { SudokuSolver } from './SudokuSolver';
import { SudokuGenerator } from './SudokuGenerator';

const seedPuzzle: number[][] = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const generator = new SudokuGenerator(seedPuzzle);
const newPuzzle = generator.generate();
console.log("Generated Puzzle:");
console.table(newPuzzle);

const solver = new SudokuSolver(newPuzzle);
const solved = solver.solve();
if (solved) {
    console.log("Solved Puzzle:");
    console.table(solver.getBoard());
} else {
    console.log("Puzzle could not be solved.");
}

