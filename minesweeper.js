document.addEventListener('DOMContentLoaded', startGame);

var board;

//select board size
let boardSize = 4;
var boardSizeNew = 4;
var radioButtons = document.getElementsByClassName("radio");


for(let i = 0; i < radioButtons.length; i++){
  radioButtons[i].addEventListener('change',function(){
    boardSizeNew = parseInt(this.id, 10);
    
  
  });
}

//set new board size and difficulty
for(let i = 0; i < document.getElementsByClassName("reset").length; i++){
  var resetButton = document.getElementsByClassName("reset")[i];
  resetButton.addEventListener('click',function(){
  
  
  boardSize = boardSizeNew;
  boardDifficulty = boardDifficultyNew;

  
  resetBoard(boardSize);

});
}

// set board difficulty
let boardDifficulty = 1;
let boardDifficultyNew = 1;
var radioButtons1 = document.getElementsByClassName("radio1");


for(let i = 0; i < radioButtons.length; i++){
  radioButtons1[i].addEventListener('change',function(){
    boardDifficultyNew = parseInt(this.value, 10);
    
    
  });
}

function resetBoard(){
  clearBoard();
  startGame();
  
}
function clearBoard(){
  
  lib.boardDestroy();
 
 
}
function makeMine(cell){
  cell.isMine = true;
}

function makeMines(size,board){

  let mineCount = size;
  
  
  
  
  if(boardDifficulty === 0){
    mineCount = Math.floor(size/2);
    document.getElementById("difficulty").innerHTML = "<h1>Mushroom Sweeper Easy " + size + "x" + size + " </h1>" ;
  }
  else if(boardDifficulty === 1){
    mineCount = size;
    document.getElementById("difficulty").innerHTML = "<h1>Mushroom Sweeper Medium " + size + "x" + size + " </h1>" ;
  }
  else if(boardDifficulty === 2){
    mineCount = Math.floor(size*1.5);
    document.getElementById("difficulty").innerHTML = "<h1>Mushroom Sweeper Hard " + size + "x" + size + " </h1>" ;
  }
  else if(boardDifficulty === 3){
   
    mineCount = size*2;
    document.getElementById("difficulty").innerHTML = "<h1>Mushroom Sweeper Impossible " + size + "x" + size + " </h1>" ;
    
    
  }
  let cellsCount = 0;

  for(let i = 0; i < size; i++){
    for(let j = 0; j < size; j++){

      

      if(mineCount > 0){

        let random = Math.floor(Math.random()*10);

        if(random <= 10/size && board.cells[cellsCount].isMine == false){
          makeMine(board.cells[cellsCount]);
          mineCount--;
        }

      }
      if(i === size - 1 && j === size - 1){
        if(mineCount > 0){
        
          cellsCount = 0;    
          i = 0;
          j = 0;
        }
      }
      cellsCount++;
    }
  }

}
function MakeBoard(size){

  this.cells = [];
  let cellsCount = 0;
 
  
  
  for(let i = 0; i < size; i++){
    for(let j = 0; j < size; j++){

      this.cells[cellsCount] = {
        row:i,
        col:j,
        isMine:false,
        hidden:true,
        surroundingMines:0,
        isMarked:false
      };
      cellsCount++;
    }
  }

  makeMines(size,this);
  
}
function startGame () {
  // Don't remove this function call: it makes the game work!
  
  board = new MakeBoard(boardSize);
  
  
  lib.initBoard();
  for(let i = 0; i < board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  document.addEventListener("click",checkForWin);
  document.addEventListener("contextmenu",checkForWin);
  
  
  
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   
  let mineCount = 0;
  let emptyCount = 0;
  let markedMines = 0;
  let markedEmpty = 0;

  for(let i = 0; i < board.cells.length; i++ ){
    if(board.cells[i].isMine == true){
      mineCount++;
      if(board.cells[i].isMarked == true){
        markedMines++;
      }
    }

    if(board.cells[i].isMine == false){
      emptyCount++;
      if(board.cells[i].hidden == false){
        markedEmpty++;
      }
    }
  }

  if(mineCount === markedMines && emptyCount === markedEmpty){
    lib.displayMessage('You have escaped Teemo\'s minefield. Congratulations!');
    document.getElementById("win").play();
    document.removeEventListener("click",checkForWin);
    document.removeEventListener("contextmenu",checkForWin);
    
  }
  return -1
} 

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {

  var surroundingCells = getSurroundingCells(cell.row, cell.col);
  let count = 0;
  for(let i = 0; i < surroundingCells.length; i++){
    if(surroundingCells[i].isMine == true){
      count++;
    }
  }
  
  return count;
}

function selectBoardSize(){


}


