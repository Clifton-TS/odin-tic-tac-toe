function createPlayer (name, symbol, score) {
    return {
        name: name, 
        symbol: symbol,
        score: score, 
        getFullName() {
            return `${symbol}: ${name}. Score: ${score}`;
        },
        addScore() {
            score++
        }
    }
}

function createBoard () {
    return {
        board : [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],

        timesPlayed: 0,
        
        insertSymbol(player, x, y) {
            if (this.board[x][y] == 0) {
                this.board[x][y] = player.symbol
                this.timesPlayed++
            }
        },

        checkForWin(player) {
            trips = player.symbol.repeat(3)
            if (this.board[0][0] + this.board[0][1] + this.board[0][2] == trips
                || this.board[1][0] + this.board[1][1] + this.board[1][2] == trips
                || this.board[2][0] + this.board[2][1] + this.board[2][2] == trips
                || this.board[0][0] + this.board[1][0] + this.board[2][0] == trips
                || this.board[0][1] + this.board[1][1] + this.board[2][1] == trips
                || this.board[0][2] + this.board[1][2] + this.board[2][2] == trips
                || this.board[0][0] + this.board[1][1] + this.board[2][2] == trips
                || this.board[0][2] + this.board[1][1] + this.board[2][0] == trips){
                    return player.symbol
                }else if (this.timesPlayed >= 9) {
                    return "draw"
                }
        }

    }
}

playerX = createPlayer("birunda", "X", 0)
playerO = createPlayer("peixola", "O", 0)

board = createBoard()
board.insertSymbol(playerX, 0, 1)
board.insertSymbol(playerX, 1, 1)
board.insertSymbol(playerO, 2, 1)
board.insertSymbol(playerO, 2, 0)
// board.insertSymbol(playerX, 2, 2)
board.insertSymbol(playerO, 0, 0)
board.insertSymbol(playerO, 0, 2)
board.insertSymbol(playerX, 1, 0)
board.insertSymbol(playerO, 1, 2)
console.log(board.board)
console.log(board.board[0][1] + board.board[1][1] + board.board[2][1])
console.log(board.checkForWin(playerO))
