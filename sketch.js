function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}// Simulação de movimento - Tabuleiro de Xadrez Interativo (p5.js)
// Autor: Aurélio Amaral (projeto de programação front-end)

let boardSize = 8;
let cellSize;
let board = [];
let selectedPiece = null;
let moveSpeed = 0.1;

function setup() {
  createCanvas(600, 600);
  cellSize = width / boardSize;
  textAlign(CENTER, CENTER);
  textSize(cellSize * 0.7);
  initializeBoard();
}

function draw() {
  background(240);
  drawBoard();
  drawPieces();
  updateMovingPieces();
}

// Cria o tabuleiro e posiciona as peças
function initializeBoard() {
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
      board[i][j] = null;
    }
  }

  // Peças brancas (inferior)
  board[0][0] = new Piece("♜", 0, 0, color(0));
  board[0][1] = new Piece("♞", 0, 1, color(0));
  board[0][2] = new Piece("♝", 0, 2, color(0));
  board[0][3] = new Piece("♛", 0, 3, color(0));
  board[0][4] = new Piece("♚", 0, 4, color(0));
  board[0][5] = new Piece("♝", 0, 5, color(0));
  board[0][6] = new Piece("♞", 0, 6, color(0));
  board[0][7] = new Piece("♜", 0, 7, color(0));
  for (let j = 0; j < 8; j++) {
    board[1][j] = new Piece("♟", 1, j, color(0));
  }

  // Peças pretas (superior)
  board[7][0] = new Piece("♖", 7, 0, color(255));
  board[7][1] = new Piece("♘", 7, 1, color(255));
  board[7][2] = new Piece("♗", 7, 2, color(255));
  board[7][3] = new Piece("♕", 7, 3, color(255));
  board[7][4] = new Piece("♔", 7, 4, color(255));
  board[7][5] = new Piece("♗", 7, 5, color(255));
  board[7][6] = new Piece("♘", 7, 6, color(255));
  board[7][7] = new Piece("♖", 7, 7, color(255));
  for (let j = 0; j < 8; j++) {
    board[6][j] = new Piece("♙", 6, j, color(255));
  }
}

// Classe de peça
class Piece {
  constructor(symbol, row, col, colr) {
    this.symbol = symbol;
    this.row = row;
    this.col = col;
    this.x = col * cellSize + cellSize / 2;
    this.y = row * cellSize + cellSize / 2;
    this.targetX = this.x;
    this.targetY = this.y;
    this.color = colr;
  }

  moveTo(row, col) {
    this.row = row;
    this.col = col;
    this.targetX = col * cellSize + cellSize / 2;
    this.targetY = row * cellSize + cellSize / 2;
  }

  update() {
    this.x = lerp(this.x, this.targetX, moveSpeed);
    this.y = lerp(this.y, this.targetY, moveSpeed);
  }

  draw() {
    push();
    fill(0, 50);
    text(this.symbol, this.x + 3, this.y + 3); // sombra
    fill(this.color);
    text(this.symbol, this.x, this.y);
    pop();
  }
}

// Desenha o tabuleiro quadriculado
function drawBoard() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      let isLight = (i + j) % 2 == 0;
      fill(isLight ? color(240, 217, 181) : color(181, 136, 99));
      noStroke();
      rect(j * cellSize, i * cellSize, cellSize, cellSize, 8);

      // Destaque da peça selecionada
      if (selectedPiece && selectedPiece.row === i && selectedPiece.col === j) {
        fill(255, 255, 0, 80);
        rect(j * cellSize, i * cellSize, cellSize, cellSize, 8);
      }
    }
  }
}

// Desenha as peças
function drawPieces() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      let piece = board[i][j];
      if (piece) piece.draw();
    }
  }
}

// Atualiza o movimento animado
function updateMovingPieces() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      let piece = board[i][j];
      if (piece) piece.update();
    }
  }
}

// Interação do mouse (seleção e movimento)
function mousePressed() {
  let col = floor(mouseX / cellSize);
  let row = floor(mouseY / cellSize);

  if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) return;

  if (selectedPiece === null && board[row][col]) {
    selectedPiece = board[row][col];
  } else if (selectedPiece) {
    if (board[row][col] === null) {
      board[selectedPiece.row][selectedPiece.col] = null;
      board[row][col] = selectedPiece;
      selectedPiece.moveTo(row, col);
    }
    selectedPiece = null;
  }
}