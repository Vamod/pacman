const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
let squares = []
let score = 0
const restart = document.querySelectorAll('.restart')
const gameover = document.querySelector('.gameover')
const gameoverScore = document.querySelector('#gameover-score')
const walls = []

// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,2,2,2,2,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

//create board
function createBoard() {
    //for loop 
    for (let i = 0; i < layout.length; i++) {
        //create a square 
        const square = document.createElement('div')
        //put square in grid 
        grid.appendChild(square)
        //put square in squares array
        squares.push(square)

        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
            walls.push(squares[i])
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        }
        
    }
}
createBoard()
// down - 40
// up key - 38
// left - 37
// right - 39

console.log(walls);
//starting position of pacman 
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pacman')

document.addEventListener('keyup', control)

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

//draw my ghosts onto my grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

//move the ghosts
ghosts.forEach(ghost => moveGhost(ghost))

// refresh page to restart Game Over
restart[0].addEventListener('click', refreshPage)
//refresh page during game 
restart[1].addEventListener('click', refreshPage)


//FUNCTIONS
function control(e) {
    switch(e.keyCode) {
        case 40:
        console.log('pressed down')
        resetPacman()
        if (
            !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
            pacmanCurrentIndex + width < width * width
            )
            pacmanCurrentIndex += width
            if((Math.floor(pacmanCurrentIndex / width)) % 2 === 0){
                squares[pacmanCurrentIndex].classList.add('eat-down')
            } else {
                squares[pacmanCurrentIndex].classList.add('pacman')
            } 
       break
        case 38:
        console.log('pressed up')
        resetPacman()
        if (
            !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
            pacmanCurrentIndex - width >=0
            ) 
            pacmanCurrentIndex -= width
            if((Math.floor(pacmanCurrentIndex / width)) % 2 === 0){
                squares[pacmanCurrentIndex].classList.add('eat-up')
            } else {
                squares[pacmanCurrentIndex].classList.add('pacman')
            }                      
            
            
        break
        case 37: 
        console.log('pressed left')
        resetPacman()
        if( 
            !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
            pacmanCurrentIndex % width !==0
            ) 
            pacmanCurrentIndex -=1
            if(pacmanCurrentIndex % 2 === 0){                         
                squares[pacmanCurrentIndex].classList.add('eat-left')
            } else {
                squares[pacmanCurrentIndex].classList.add('pacman')
            }
            squares[pacmanCurrentIndex + 1].classList.remove('eat-left')
         
            if (pacmanCurrentIndex === 364) {
                pacmanCurrentIndex = 391
            }
        break
        case 39:
        console.log('pressed right')
        resetPacman()
        if(
            !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
            pacmanCurrentIndex % width < width -1
            ) 
            pacmanCurrentIndex +=1
          
            if(pacmanCurrentIndex % 2 === 0){                         
                squares[pacmanCurrentIndex].classList.add('eat-right')
            } else {
                squares[pacmanCurrentIndex].classList.add('pacman')
            }

            squares[pacmanCurrentIndex - 1].classList.remove('eat-right')
                    
            if (pacmanCurrentIndex === 391) {
                pacmanCurrentIndex = 364
            }
        break
    }
    // squares[pacmanCurrentIndex].classList.add('pacman')
    pacDotEaten()
    powerPelletEaten()
    checkForWin()
    checkForGameOver()
}

function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]
    console.log(direction)
    
    ghost.timerId = setInterval(function() {
        //all our code
        //if the next square does NOT contain a wall and does not contain a ghost
        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
        ) {
                //remove any ghost
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        // //add direction to current Index
        ghost.currentIndex += direction
        // //add ghost class
        squares[ghost.currentIndex].classList.add(ghost.className)  
        squares[ghost.currentIndex].classList.add('ghost')  
        } else direction = directions[Math.floor(Math.random() * directions.length)]

        //if the ghost is currently scared 
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }
        
        //if the ghost is current scared AND pacman is on it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            //remove classnames - ghost.className, 'ghost', 'scared-ghost'
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            // change ghosts currentIndex back to its startIndex
            ghost.currentIndex = ghost.startIndex
            //add a score of 100
            score +=100
            //re-add classnames of ghost.className and 'ghost' to the ghosts new postion  
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        checkForGameOver()
    }, ghost.speed)
}

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisplay.innerHTML = score
    }
}

function powerPelletEaten() {
    //if square pacman is in contains a power pellet
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        //remove power pellet class
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        //add a score of 10
        score +=10
        //change each of the four ghosts to isScared
        ghosts.forEach(ghost => ghost.isScared = true)
        //use setTimeout to unscare ghosts after 10 seconds   
        setTimeout(unScareGhosts, 10000)    
    }
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}


//check for game over
function checkForGameOver() {
    //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost 
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') && 
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost') 
     ) {
     //for each ghost - we need to stop it moving
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    //remove eventlistener from our control function
    document.removeEventListener('keyup', control)
    //tell user the game is over   
    scoreDisplay.innerHTML = 'You LOSE'
    for(wall of walls){
        wall.style.backgroundColor = 'black'
    }
    setTimeout(function(){
         gameover.style.display = 'block' 
         gameoverScore.textContent = score
        }, 1000)
    }
}

//check for win
function checkForWin() {
    if (score >= 74) {
        //stop each ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        //remove the eventListener for the control function
        document.removeEventListener('keyup', control)
        //tell our user we have won
        scoreDisplay.innerHTML = 'You WON!'
        scoreDisplay.classList.add('glow')
        for(wall of walls){
            wall.style.backgroundColor = 'yellow'
        }
    }
}

function refreshPage(){
    window.location.reload();
} 

function resetPacman(){ 
    squares[pacmanCurrentIndex].classList.remove('pacman')
    squares[pacmanCurrentIndex].classList.remove('eat-left')
    squares[pacmanCurrentIndex].classList.remove('eat-right')
    squares[pacmanCurrentIndex].classList.remove('eat-up')
    squares[pacmanCurrentIndex].classList.remove('eat-down')
}
