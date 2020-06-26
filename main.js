//Buttoons
let startbutton = document.getElementById("start-button")
let inflateButton = document.getElementById("inflate-button")

// #region GAME LOGIC AND DATA



//DATA
let clickCount = 0 
let height = 120
let width = 100
let inflationRate = 20
let maxsize = 300
let highestPopCount = 0
let currentPopCount = 0
let gameLength = 5000
let clockID = 0
let timeRemaining = 0
let currentPlayer = {}


function startGame(){

  startbutton.setAttribute("disabled", "true")
  inflateButton.removeAttribute("disabled")
startClock()
  setTimeout(stopGame, gameLength)
}

function startClock(){
  timeRemaining = gameLength 
  drawClock()
 clockID = setInterval(drawClock, 1000)
}
function stopClock(){
  clearInterval(clockID)
}

function drawClock(){
 let countdownElem = document.getElementById("countdown")
 countdownElem.innerText = timeRemaining.toString()
 timeRemaining -= 1000
}

function inflate(){
  clickCount++
  height += inflationRate
  width += inflationRate
  if(height >= maxsize){  
    console.log("pop the balloon")
    currentPopCount++
    height = 0
    width = 0
  }
  draw()
}



function draw(){
  let balloonElement = document.getElementById("balloon")
  let clickCountElem = document.getElementById("click-count")
  let popCountElem = document.getElementById("pop-count")
  let highPopCountElem = document.getElementById("high-pop-count")
  
  balloonElement.style.height = height + "px"
  balloonElement.style.width = width + "px"
  
  clickCountElem.innerText = clickCount.toString()
  popCountElem.innerText = currentPopCount.toString()
  highPopCountElem.innerText = currentPlayer.topScore.toString()
  
}


function stopGame() {
  console.log("the game is over")

  inflateButton.setAttribute("disabled", "true")
  startbutton.removeAttribute("disabled")
  
  clickCount = 0
  height = 120
  width = 100

  if(currentPopCount > currentPlayer.topScore){
    currentPlayer.topScore = currentPopCount
    savePlayers()
  }

  currentPopCount = 0

  stopClock()
  draw()
}

//#endregion


let players = []
loadPlayers()

function setPlayer(){
event.preventDefault()
let form = event.target

  let playerName = form.playerName.value

  currentPlayer = players.find(player => player.name == playerName)

  if(!currentPlayer){
    currentPlayer = {name : playerName, topScore: 0 }
    players.push(currentPlayer)
    savePlayers()

}

form.reset()

draw()
}

function savePlayers(){
  window.localStorage.setItem("players" , JSON.stringify(players))
}

function loadPlayers(){
  let playersData = JSON.parse(window.localStorage.getItem("players"))
    if(!playersData){
      players = playersData
    }
}

