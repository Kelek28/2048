
var Board = [

    [2, 2, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
]
var Score = 0
const RowNumber = Board.length
const ColumnNumber = Board[0].length
function init() {
    renderBoard(Board)

    window.addEventListener("keyup", keyClick(event));

}
function ScoreBox() {
    var scoreBox = document.getElementById("score")
    if (scoreBox.style.display == "block")
        scoreBox.style.display = "none"
    else {

        scoreBox.style.display = "block"
    }

}
function checkBoard() {
    var possibleMove = []
    for (let column = 0; column < ColumnNumber; column++) {
        for (let row = 0; row < RowNumber; row++) {

            possibleMove.push(!!Board[column][row])

        }
    }
    return possibleMove.some(Element => Element === false)
}
function renderBoard(boardToRender, sum) {
    // remove old board
    var board = document.getElementById("board")
    var table = document.getElementById("table")
    board.removeChild(table)
    var table = document.createElement("table")
    table.id = "table"
    board.appendChild(table)
    // render new one
    for (let i = 0; i < RowNumber; i++) {
        var row = document.createElement("tr")
        table.appendChild(row)
        for (let j = 0; j < RowNumber; j++) {
            var child = document.createElement("td")
            child.id = `[${i}][${j}]`
            child.classList = "BoxEmpty"
            if (boardToRender[i][j] != 0)
                child.innerHTML = boardToRender[i][j]
            child.classList.add(`Box${boardToRender[i][j]}`)
            row.appendChild(child)
        }
    }
    console.log(moveArray(Board))
    document.getElementById("scorePlace").innerHTML = Score
}
function SpawnAnotherNumber(boardToChange) {
    let randomRow, randomColumn
    if (checkBoard()) {

        while (1) {
            randomColumn = Math.floor(Math.random() * ColumnNumber)
            randomRow = Math.floor(Math.random() * RowNumber)
            if (boardToChange[randomRow][randomColumn] == 0)
                break
        }
        if (Math.random() < 0.8) {
            boardToChange[randomRow][randomColumn] = 2
        }
        else {
            boardToChange[randomRow][randomColumn] = 4

        }
    }





    return boardToChange
}
function compareBoard(leftBoard, rightBoard) {
    for (let row = 0; row < RowNumber; row++) {
        for (let column = 0; column < ColumnNumber; column++) {
            if (leftBoard[row][column] !== rightBoard[row][column]) {
                return true
            }
        }
    }
    return false
}

function moveArray(toMove) {
    var toMoveAfterMove;
    // board is full
    if (!checkBoard()) {
        toMoveAfterMove = moveBottom(false)
        if (compareBoard(toMove, toMoveAfterMove)) {
            return true
        }
        toMoveAfterMove = moveLeft(false)
        if (compareBoard(toMove, toMoveAfterMove)) {
            return true
        }
        toMoveAfterMove = moveRight(false)
        if (compareBoard(toMove, toMoveAfterMove)) {
            return true
        }
        toMoveAfterMove = moveUp(false)
        if (compareBoard(toMove, toMoveAfterMove)) {
            return true
        }
        console.log(toMove, toMoveAfterMove)
        return false
    }
}
// Movement section
//    0  1  2  3      
// 0 [1][0][0][0]
// 1 [0][0][0][0]
// 2 [0][0][0][0]
// 3 [0][0][0][0]

// Move numbers up 
// loop go from top to bottom
function moveUp(render) {
    for (let row = 0; row < RowNumber; row++) {
        for (let column = 0; column < ColumnNumber; column++) {
            var maxField = 0
            if (Board[row][column] != 0) {
                for (let goUpField = row; goUpField > maxField; goUpField--) {
                    if (Board[goUpField][column] == Board[goUpField - 1][column]) {
                        Board[goUpField - 1][column] = Board[goUpField][column] + Board[goUpField - 1][column]
                        Board[goUpField][column] = 0
                        Score += Board[goUpField - 1][column]
                    }
                    else {
                        if (Board[goUpField][column] != Board[goUpField - 1][column] && Board[goUpField - 1][column] != 0) {
                            maxField++;
                            break;
                        }
                        Board[goUpField - 1][column] = Board[goUpField][column]
                        Board[goUpField][column] = 0

                    }
                }
            }
        }
    }
    if (render) {

        return renderBoard(SpawnAnotherNumber(Board))
    }
    return Board
}
// move numbers down
// loop go from down to top 
function moveBottom(render) {
    for (let row = RowNumber - 1; row >= 0; row--) {
        for (let column = 0; column < ColumnNumber; column++) {
            var maxField = RowNumber - 1
            if (Board[row][column] != 0) {
                for (let goUpField = row; goUpField < maxField; goUpField++) {
                    if (Board[goUpField][column] == Board[goUpField + 1][column]) {
                        Board[goUpField + 1][column] = Board[goUpField][column] + Board[goUpField + 1][column]
                        Board[goUpField][column] = 0
                        Score += Board[goUpField + 1][column]

                    }
                    else {
                        if (Board[goUpField][column] != Board[goUpField + 1][column] && Board[goUpField + 1][column] != 0) {
                            maxField--;
                            break;

                        }
                        Board[goUpField + 1][column] = Board[goUpField][column]
                        Board[goUpField][column] = 0
                    }
                }
            }
        }
    }
    if (render) {

        return renderBoard(SpawnAnotherNumber(Board))
    }
    return Board
}
// move numbers right
// loop go from right to left
function moveRight(render) {

    for (let row = 0; row < RowNumber; row++) {
        var maxField = ColumnNumber - 1
        for (let column = 3; column >= 0; column--) {
            // if field is number
            if (Board[row][column] != 0) {
                // move it to edge 
                for (let field = column; field < maxField; field++) {
                    // if they are the same sum it
                    if (Board[row][field + 1] == Board[row][field]) {
                        Board[row][field + 1] = Board[row][field] + Board[row][field + 1]
                        Board[row][field] = 0
                        Score += Board[row][field + 1]

                    }
                    else {
                        // if next number is not empty and can't sum it break loop
                        if (Board[row][field + 1] != Board[row][field] && Board[row][field + 1] != 0) {
                            maxField--
                            break;

                        }
                        Board[row][field + 1] = Board[row][field]
                        Board[row][field] = 0

                    }
                }

            }
        }
    }
    if (render) {

        return renderBoard(SpawnAnotherNumber(Board))
    }
    return Board
}
// move numbers left
// loop go from left to right
function moveLeft(render) {
    for (let row = 0; row < RowNumber; row++) {
        var maxField = 0
        for (let column = 0; column < RowNumber; column++) {
            // if field is number
            if (Board[row][column] != 0) {
                // move it to edge 
                for (let field = column; field > maxField; field--) {
                    // if they are the same sum it
                    if (Board[row][field - 1] == Board[row][field]) {
                        Board[row][field - 1] = Board[row][field] + Board[row][field - 1]
                        Board[row][field] = 0
                        Score += Board[row][field - 1]
                    }
                    else {
                        // if next number is not empty and can't sum it break loop
                        if (Board[row][field - 1] != Board[row][field] && Board[row][field - 1] != 0) {
                            maxField++
                            break;

                        }
                        Board[row][field - 1] = Board[row][field]
                        Board[row][field] = 0

                    }
                }

            }
        }
    }
    if (render) {

        return renderBoard(SpawnAnotherNumber(Board))
    }
    return Board
}

function keyClick(event) {
    switch (event.keyCode) {
        // arrow Up
        case 38:
            moveUp(true)
            break
        // arrow Down
        case 40:
            moveBottom(true)
            break;
        // arrow Left
        case 37:
            moveLeft(true)
            break;
        case 39:
            moveRight(true)
            break;


    }
}