/* 
1. loop through each cell
2. assign eventlistener to each one
*/
//global variables
const gameCells = document.querySelectorAll(".cell");
let playerChoices = ["X","Y"];
let player;
//

function cellHandler(cell) {
    cell.innerHTML = 'BYE';
}

gameCells.forEach((cell)=> {
    cell.addEventListener("click", cellHandler.bind(this,cell));
})

function gameStart() {
    //randomize starting player
}

//helper function
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//appendix
// gameCells.forEach((cell)=> {
//     cell.addEventListener("click", () => {
//         cell.innerHTML = "Hi";
//     });
// })

//testing
for (let i = 0; i < 100; i++){
    console.log(getRandomInt(2));
}