var divElement = document.querySelector('div'),
    tableElement = document.querySelector('table');

var Game = {
    symbols: {
        player1: 'X',
        player2: 'O'
    },
    start() {
        this.field = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.currentPlayer = this.symbols.player1;
        this.isFinished = false;
        this.round = 0;
        this.render();
    },
    nextPlayer() {
        this.currentPlayer = this.currentPlayer === this.symbols.player1 ? this.symbols.player2 : this.symbols.player1;
    },
    setField(line, column) {
        if (!this.isFinished && this.field[line][column] === '') {
            this.field[line][column] = this.currentPlayer;
            this.nextPlayer();
            this.round++;
            this.render();
        }
    },
    isGameOver() {
        let field = this.field,
            rows = 3,
            cols = 3,
            allRows = 0,
            allCols = 0;

        for (let i = 0; i < rows; i++) {
            allRows = 0;
            allCols = 0;
            for (let j = 0; j < cols; j++) {
                if (field[i][j] === this.symbols.player1) allRows++;
                if (field[i][j] === this.symbols.player2) allRows--;
                if (field[j][i] === this.symbols.player1) allCols++;
                if (field[j][i] === this.symbols.player2) allCols--;
            }
            if (allRows === 3 || allCols === 3) return this.symbols.player1;
            if (allRows === -3 || allCols === -3) return this.symbols.player2;
        }
        if (field[0][0] !== '' && field[0][0] === field[1][1] && field[1][1] === field[2][2]) return field[0][0];
        if (field[0][2] !== '' && field[0][2] === field[1][1] && field[1][1] === field[2][0]) return field[0][2];
        if (this.round === rows * cols) return 'Empate';
    },
    render() {
        let winner = this.isGameOver();
        divElement.textContent = winner ? `Vencedor(a): ${winner}` : `Vez do(a) jogador(a): ${this.currentPlayer}`;
        this.isFinished = winner;
        let template = '';
        this.field.forEach((line, lineIndex) => {
            template += '<tr>';
            line.forEach((column, columnIndex) => {
                template += `<td class="tableItems" onclick="Game.setField(${lineIndex}, ${columnIndex})">${column}</td>`;
            })
            template += '</tr>';
        })
        tableElement.innerHTML = template;
    }
};

Game.start();
