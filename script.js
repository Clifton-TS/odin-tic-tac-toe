function CreatePlayer (name, symbol, score) {
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

function CreateBoard (playerX, playerO) {
    return {
        board : [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],

        currentPlayer : playerX,

        timesPlayed: 0,

        resetBoard() {
            this.board = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]
            this.currentPlayer = playerX
            this.timesPlayed = 0
        },
        
        insertSymbol(x, y) {
            if (this.board[x][y] == 0) {
                this.board[x][y] = this.currentPlayer.symbol
                this.timesPlayed++



                if(this.currentPlayer == playerX) {
                    this.currentPlayer = playerO
                } else if(this.currentPlayer == playerO) {
                    this.currentPlayer = playerX
                }
            }
        },

        checkForWin(player) {
            console.log("rodou esse LIXO com o " + player.symbol)
            trips = player.symbol.repeat(3)
            if (this.board[0][0] + this.board[0][1] + this.board[0][2] == trips
                || this.board[1][0] + this.board[1][1] + this.board[1][2] == trips
                || this.board[2][0] + this.board[2][1] + this.board[2][2] == trips
                || this.board[0][0] + this.board[1][0] + this.board[2][0] == trips
                || this.board[0][1] + this.board[1][1] + this.board[2][1] == trips
                || this.board[0][2] + this.board[1][2] + this.board[2][2] == trips
                || this.board[0][0] + this.board[1][1] + this.board[2][2] == trips
                || this.board[0][2] + this.board[1][1] + this.board[2][0] == trips){
                    console.log("retornou" + player.symbol)
                    player.score++
                    this.resetBoard()
                    return player.symbol
                }else if (this.timesPlayed >= 9) {
                    console.log("retornou draw" )
                    return "draw"
                }
                console.log("retornou foi PORRA")
                console.log(this.board)
        },

        showHTML() {
            var containerDiv = document.createElement("div");
            containerDiv.classList.add("container");
        
            var h1Element = document.createElement("h1");
            h1Element.textContent = `${this.currentPlayer.name}'s Turn`;
        
            var boardDiv = document.createElement("div");
            boardDiv.classList.add("board");
        
            var square00 = document.createElement("div");
            square00.id = "00";
            square00.classList.add("square", "c1");
            boardDiv.appendChild(square00);
        
            var square01 = document.createElement("div");
            square01.id = "01";
            square01.classList.add("square");
            boardDiv.appendChild(square01);
        
            var square02 = document.createElement("div");
            square02.id = "02";
            square02.classList.add("square", "c2");
            boardDiv.appendChild(square02);
        
            var square10 = document.createElement("div");
            square10.id = "10";
            square10.classList.add("square");
            boardDiv.appendChild(square10);
        
            var square11 = document.createElement("div");
            square11.id = "11";
            square11.classList.add("square");
            boardDiv.appendChild(square11);
        
            var square12 = document.createElement("div");
            square12.id = "12";
            square12.classList.add("square");
            boardDiv.appendChild(square12);
        
            var square20 = document.createElement("div");
            square20.id = "20";
            square20.classList.add("square", "c3");
            boardDiv.appendChild(square20);
        
            var square21 = document.createElement("div");
            square21.id = "21";
            square21.classList.add("square");
            boardDiv.appendChild(square21);
        
            var square22 = document.createElement("div");
            square22.id = "22";
            square22.classList.add("square", "c4");
            boardDiv.appendChild(square22);
        
            containerDiv.appendChild(h1Element);
            containerDiv.appendChild(boardDiv);
        
            var mainDiv = document.querySelector(".main");
        
            mainDiv.appendChild(containerDiv);
        
            var scoreDiv = document.createElement("div");
            scoreDiv.classList.add("score");
            var xScoreH1 = document.createElement("h1");
            xScoreH1.classList.add("xScore");
            xScoreH1.textContent = `${playerX.name}:${playerX.score}`;
            var oScoreH1 = document.createElement("h1");
            oScoreH1.classList.add("oScore");
            oScoreH1.textContent = `${playerO.name}:${playerO.score}`;
            scoreDiv.appendChild(xScoreH1);
            scoreDiv.appendChild(oScoreH1);
            mainDiv.appendChild(scoreDiv);
        
            var victoryDiv = document.createElement("div");
            victoryDiv.classList.add("victory");
            var victoryH1 = document.createElement("h1");
            victoryH1.textContent = "AAAAAAAAAAAAAAAAAAAA WINS!";
            var playAgainH1 = document.createElement("h1");
            playAgainH1.textContent = "Click here to play again.";
            victoryDiv.appendChild(victoryH1);
            victoryDiv.appendChild(playAgainH1);
            //mainDiv.appendChild(victoryDiv);
        
            squares = document.querySelectorAll(".square")
            console.log(squares)
            squares.forEach(squareDiv => {
                squareDiv.addEventListener("click", () => {
                    if (this.checkForWin(this.currentPlayer) == this.currentPlayer.symbol) {
                        squares.forEach(squareDiv => {
                            squareDiv.textContent = ""
                        })
                    }

                    if (squareDiv.textContent == ""){
                        squareDiv.textContent = this.currentPlayer.symbol
                    }

                    this.insertSymbol(squareDiv.id.charAt(0), squareDiv.id.charAt(1))
                    h1Element.textContent = `${this.currentPlayer.name}'s Turn`;

                    if (this.checkForWin(this.currentPlayer) == this.currentPlayer.symbol) {
                        console.log("deu if")
                        victoryH1.textContent = `${this.currentPlayer.name} WINS!`;
                        mainDiv.appendChild(victoryDiv);
                        squares.forEach(squareDiv => {
                            squareDiv.textContent = ""
                        })
                    }
                    
                })
            })
        }
    }
}


form = document.getElementById("playerNames")

board = false

form.addEventListener("submit", (e) => {
    e.preventDefault()

    if(!board) {
    XInput = document.getElementById("XName")
    OInput = document.getElementById("OName")

    playerX = CreatePlayer(XInput.value, "X", 0)
    playerO = CreatePlayer(OInput.value, "O", 0)

    board = CreateBoard(playerX, playerO)
    board.showHTML()
    }
})