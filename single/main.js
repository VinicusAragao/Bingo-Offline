const squares = document.getElementsByClassName("square")
const squareTexts = document.getElementsByClassName("squareText")
const btnSortear = document.getElementById("sortear")
const ballEl = document.getElementById("ball")
const sorteadosEl = document.getElementById("sorteados")
const painelEl = document.getElementById('painelConteiner')
const colorBtn = document.getElementById('inputColor')
const finaleAudio = document.getElementById('finale')
let letterEl
let numbers = [[],[]]
let newNumbers = []
let lastIndex
let msg = 'Números Sorteados:' + '<br>'
let position
let blockRollBall = false
let winned = false
let isOpen = false
function random(column){
	return [rando((column*15)+1,(15+(column*15))),0]
}
function generateNumbers(){
	for(let i = 0; i < 5; i++){
		for(let j = 0; j < 5; j++){
			if((i*5)+j === 12){
				numbers[0].push(null)
				numbers[1].push(null)
				continue
			}
			let ramdomNum = random(i)
			numbers[0].push(Number(ramdomNum[0]))
			numbers[1].push(Number(ramdomNum[1]))
			squareTexts[(i*5)+j].textContent = ramdomNum[0]
		} 		 
		for(let j = i*5; j < (i*5)+5; j++){ 		
			for(let l = i*5; l < (i*5)+5; l++){ 	
				if(j !== l){
					if(j === 12 || l === 12){continue}	
					if(numbers[0][j] === numbers[0][l]){
						ramdomNum = random(i)
						numbers[0][l] = ramdomNum[0]
						squareTexts[l].textContent = ramdomNum[0]
						l = i*5
						j = i*5
						break
					}
				}
			}
		}
	}
}
function changeColor(ball,conteiner,hover,border,text,shadow,selected){
	if(!winned){
	 	const root = document.querySelector(':root')
	 	const balls = document.getElementsByClassName('circles')
	 		root.style.setProperty('--colorConteiner', conteiner)
	 		root.style.setProperty('--colorHover', hover)
	 		root.style.setProperty('--border', border)
	 		root.style.setProperty('--colorText', text)
	 		root.style.setProperty('--colorShadow', shadow)
	 		root.style.setProperty('--colorSelected', selected)
	 	for(let i = 0; i < balls.length; i++){
	 		balls[i].style.border = 'solid black 2px'
	 		balls[i].style.padding = '5%'
	 	}
	 	ball.style.border = 'solid black 3px'
	 	ball.style.padding = '5.5%'
	}
}
function rollBall(){
	if(!blockRollBall&&!winned){
		blockRollBall = true
		ballEl.textContent = ''
		ballEl.style.animation = 'spinnn 350ms 5 alternate-reverse'
		newNumbers.push(rando(1,75))
		lastIndex = newNumbers.length - 1
		setTimeout(result,500)
	}
}
window.addEventListener('keyup', function space(event){
	if(event.keyCode === 32){
		rollBall()
	}
}) 
function result(){
	checkNumbers()
	msg += '<span class="letterSorteio">' + ball(newNumbers[lastIndex])[0] + '</span><span>' + ball(newNumbers[lastIndex])[1] + ',</span>\n' 
	letterEl = document.querySelectorAll('.letterSorteio')
	console.log(letterEl)
	sorteadosEl.innerHTML = msg
	if(newNumbers.length % 8 === 0){
		let compNum = getComputedStyle(sorteadosEl)
		sorteadosEl.style.fontSize = (parseFloat(compNum.getPropertyValue('font-size'))-1) + 'px'
		for(let i = 0; i < letterEl.length; i++){
			let compLetter = getComputedStyle(letterEl[i])
			letterEl[i].style.fontSize = (parseFloat(compLetter.getPropertyValue('font-size'))-2) + 'px'
			console.log(letterEl[i].style.fontSize)
		}
	}
	ballEl.innerHTML = '<span class="letter">' + ball(newNumbers[lastIndex])[0] + '</span><span>' + ball(newNumbers[lastIndex])[1]
	ballEl.style.animation = ''
	blockRollBall = false
}
function ball(number){
	if(number > 0 && number < 16){return ['B',number]}
	if(number > 15 && number < 31){return ['I',number]}
	if(number > 30 && number < 46){return ['N',number]}
	if(number > 45 && number < 61){return ['G',number]}
	if(number > 60){return ['O',number]}
}
function checkNumbers(){
	lastIndex = newNumbers.length - 1
	for(let i = 0; i < newNumbers.length; i++){
		if(lastIndex !== i){
			if(newNumbers[lastIndex] === newNumbers[i]){
				newNumbers.pop()
				newNumbers.push(rando(1,75))
				i = -1
			}
		}
	}	
	position = numbers[0].indexOf(newNumbers[lastIndex])
	if(position !== -1){
		numbers[1][position] = 1
		squares[position].addEventListener('click', clicked)
	}
}
function clicked(){
	if(!winned){
		let span = this.children[0]
		let spanText = Number(span.textContent)
		position = numbers[0].indexOf(spanText)
		span.style.backgroundColor = 'var(--colorSelected)'
		numbers[1][position] = 2;
		this.removeEventListener('click', clicked)
		checkEnd()
	}
}
function checkEnd(){
	let check = [[],[]]
	for(let i = 0; i < 5; i++){
		if(numbers[1][0+i] === 2 && numbers[1][5+i] === 2 &&
		numbers[1][10+i] === 2 && numbers[1][15+i] === 2 &&
		numbers[1][20+i] === 2){//Checa todas as fileiras na horizontal
			check[0].push(1)
			check[1].push(i)
			break;
		}
	}
	for(let i = 0; i < 21; i+=5){
		if(numbers[1][i] === 2 && numbers[1][i+1] === 2 && 
		numbers[1][i+2] === 2 && numbers[1][i+3] === 2 &&
		numbers[1][i+4] === 2){//Checa todas as fileiras na vertical
			check[0].push(2)
			check[1].push(i)
			break
		}	
	}
	if(check[0].length !== 0){
		winned = true	
		victoryRow(check)
	}
}
function victoryRow(info){
	finaleAudio.play()
	for(let j = 0;j < squares.length;j++){
		squares[j].style.opacity = '0.2'
	}
	if(info[0].length === 1){
		if(info[0][0] === 1){ //Horizontal
			for(let num = 0; num < 21; num+=5){
				squares[num+info[1][0]].style.opacity = '1'
			}
		}else if(info[0][0] === 2){	//Vertical
			for(let num = 0; num < 5; num++){
				squares[num+info[1][0]].style.opacity = '1'
			}
		}
	}else if(info[0].length === 2){ //Horizontal e Vertical
		for(let num = 0; num < 21; num+=5){//Horizontal
			squares[num+info[1][0]].style.opacity = '1'
		}
		for(let num = 0; num < 5; num++){ //Vertical
			squares[num+info[1][1]].style.opacity = '1'
		}
	}
	setTimeout(victory, 4000)
}
function victory(){
	document.getElementById('conteiner').style.opacity = "0.2"
	painelEl.innerHTML = '<h1 id="victoryMsg">Você Ganhou!</h1><label for="name">Escreva seu nome para o placar:<input id="name" onchange="updateRecords(this)"></label><div id="row"><a href="../index.html"><button id="backMenu">Voltar ao Menu</button></a><button id="playAgain" onclick="reset()">Jogar Novamente</button></div>'
	painelEl.style.display = "flex"
	painelEl.style.animation = "appearing 200ms,pulseShadow 1000ms alternate infinite"	
}
function reset(){
	for(let i = 0; i < squares.length; i++){
		squareTexts[i].style.backgroundColor = "transparent"
		squares[i].style.opacity = '1'
		squares[i].removeEventListener('click', clicked)
		console.log(squares[i])
	}
	ballEl.textContent = ''
	sorteadosEl.textContent = ''
	numbers[0].length = 0
	numbers[1].length = 0
	newNumbers.length = 0
	msg = 'Números Sorteados:<br>'
	lastIndex = 0
	position = 0
	document.getElementById('conteiner').style.opacity = "1"
	painelEl.innerHTML = '<label for="inputColor">Cor de Fundo:<input id="inputColor" type="color" onchange="inputColor()"></label></ul>'
	painelEl.style.display = "none"
	winned = false
	generateNumbers()
}function config(){
	if(!isOpen && !winned){
		painelEl.style.display = "flex"
		painelEl.style.animation = "appearing 100ms"
		isOpen = true
	}else if(isOpen && !winned){
		painelEl.style.display = "none"
		isOpen = false
	}
}
colorBtn.addEventListener('input', inputColor,false)
function inputColor(){
	document.getElementsByTagName('html')[0].style.backgroundColor = this.value
	document.getElementsByTagName('body')[0].style.backgroundColor = this.value
	console.log(this.value)
}
function updateRecords(name){
	localStorage.setItem(`players${(localStorage.length)+1}`, `${name.value}`)
	name.removeAttribute('onchange')
	console.log(localStorage)
}
generateNumbers()
				// A fazer:
// Escolher uma imagem para colocar no meio;
// Encontrar o bug da diminuição da fonte das letras;