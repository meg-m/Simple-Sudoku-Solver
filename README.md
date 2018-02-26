# Simple-Sudoku-Solver

Sudoku-solving algorithm that uses recursion to go through every possible combination of legal values, until it finds the solution.

Also has one additional check. See if a legal possible value in the current box is the sole value that can be inputted in some box in the column, row or section. If so, it's removed from the legal values to be inputted into the current spot.
