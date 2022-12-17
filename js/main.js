//each item can be either null (empty), 0 (player1), or 1 (player2)
//9 nulls
const boardState = [
    null, null, null,
    null, null, null,
    null, null, null
];

//the win conditon array
//only 8 possible wins 
//imainge the tick tac toe box goes 0 1 2 on the first row, 3 4 5 on the next and so on
//a row of 3 is a win, Below are the boxes needed to be aligned to win
const winConditions = [
    //rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //colums
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //digaonials
    [0, 4, 8],
    [6, 4, 2]

];

//the Active Player
//mutable val because player will change. Ex player 1 turns end player 2 is now active
//each item can be either null (empty), 0 (player1), or 1 (player2)
/// === is equal to
let activePlayer = 0;

//cells
const cells = document.querySelectorAll("td");

//add event listeners to cells
//hover should be done in css this was a in class example of js
cells.forEach(function (cell, index) {
    cell.dataset.index = index;

    cell.onmouseover = function () {
        cell.style.backgroundColor = "#ccc";
        cell.style.transition = "1s"

    }
    cell.onmouseout = function () {
        cell.style.backgroundColor = "#fff";
    }


    cell.addEventListener("click", clicked);
});

//clicked function defintion
//event tracks what is happening with the element ex clicked
function clicked(event) {
    //makes cells numbers
    const index = Number(event.target.dataset.index);

    //if activeplayer is false on default so it will be x here
    const letter = activePlayer ? "o" : "x";

    //change value in sqaure
    const cell = event.target;

    cell.textContent = letter;
    boardState[index] = activePlayer;

    cell.removeEventListner("click", clicked);

    cell.onmouseover = null;

    if (hasWon()){
        window.location = "./winner.html";
    }
    if (hasDrawn()){
        window.location = "./draw.html";
    }
    //if active player is true return 0 otherwise return 1
    activePlayer = activePlayer ? 0 : 1;


}

//the win detector
function hasWon() {
    for (const conditon of winConditions) {
        const boardValues = conditon.map(function (item) {
            return boardState[item];

        });
        const playerPieces = boardValues.filter(function(item){
            
            return item === activePlayer;

        });
        if (playerPieces.length === 3 ) return true;

    }
    return false;
}
function hasDrawn (){
    const boardCapacity = boardState.filter(function(item){
        return item !== null;

    });
    return boardCapacity.length === boardState.length;

}
const again = document.querySelector("#again");
if(again){
    again.onclick = (event) => {
        event.preventDefault();
        window.location = "./";
    }
}