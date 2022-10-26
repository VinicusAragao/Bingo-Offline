const squares0 = document.getElementsByClassName("square1")
const squares1 = document.getElementsByClassName("square2")
const squareTexts0 = document.getElementsByClassName("squareText1")
const squareTexts1 = document.getElementsByClassName("squareText2")
const btnSortear = document.getElementById("sortear")
const ballEl = document.getElementById("ball")
const sorteadosEl = document.getElementById("sorteados")
const victoryEl = document.getElementById('victoryConteiner')
let letterEl = document.getElementsByClassName('letter')
let numbers = [[[],[]],[[],[]]]
let newNumbers = []
let lastIndex
let msg = 'Números Sorteados:' + '<br>'
let position0
let position1
let counter = 0
let blockRollBall = false
let winned = false

function random(col){return [rando((col*15)+1,(15+(col*15))),0]}

function generateNumbers(){
	for(let p = 0; p < 2; p++){
		console.log(`Player${p+1}`)
		for(let i = 0; i < 5; i++){
				console.log("coluna " + (i+1))
			for(let j = 0; j < 5; j++){
				if((i*5)+j === 12){
					numbers[p][0].push(null)
					numbers[p][1].push(null)
					continue
				}
				let ramdomNum = random(i)
				numbers[p][0].push(Number(ramdomNum[0]))
				numbers[p][1].push(Number(ramdomNum[1]))
				if(p === 0){
					squareTexts0[j+(i*5)].textContent = ramdomNum[0]
				}else if(p === 1){
					squareTexts1[j+(i*5)].textContent = ramdomNum[0]
				}
			} 		 
			for(let j = i*5; j < (i*5)+5; j++){ 		
				for(let l = i*5; l < (i*5)+5; l++){ 	
					if(j !== l){
						if(j === 12 || l === 12){continue}	
						if(numbers[p][0][j] === numbers[p][0][l]){
							// console.log('%cUm número mudou!', 'color:red;')
							// console.log('%ccoluna = ' + (i+1) + ' ' + 'celula = ' + (l-(i*5)+1),'color:gray;')
							// console.log('%cAntes era = '+numbers[0][l],'color:gray;')
							ramdomNum = random(i)
							numbers[p][0][l] = ramdomNum[0]
							if(p === 0){
								squareTexts0[l].textContent = ramdomNum[0]
							}else{
								squareTexts1[l].textContent = ramdomNum[0]
							}
							// console.log('%cFoi mudado para = ' + ramdomNum[0],'color:gray;')
							l = i*5
							j = i*5
							break
						}
					}
				}
			}
		}
	}
}
function changeColor(background,conteiner,hover,border,text,shadow,selected,player,ball){
	if(!winned){
		const root = document.querySelector(':root')
		const balls = document.getElementsByClassName(`circles${player}`)
		 	root.style.setProperty(`--ColorBackground${player}` ,background)
		 	root.style.setProperty(`--colorConteiner${player}`, conteiner)
		 	root.style.setProperty(`--colorHover${player}`, hover)
		 	root.style.setProperty(`--border${player}`, border)
		 	root.style.setProperty(`--colorText${player}`, text)
			root.style.setProperty(`--colorShadow${player}`, shadow)
			root.style.setProperty(`--colorSelected${player}`, selected)
		for(let i = 0; i < balls.length; i++){
			balls[i].style.border = 'solid black 2px'
			balls[i].style.padding = '6%'
		}
		ball.style.border = 'solid black 3px'
		ball.style.padding = '6.5%'
	}
}
function rollBall(){
	if(!blockRollBall&&!winned){
		blockRollBall = true
		ballEl.textContent = ''
		ballEl.style.animation = 'spinnn 350ms 5 alternate-reverse'
		newNumbers.push(rando(1,75))
		lastIndex = newNumbers.length - 1
		setTimeout(result,500) //velocidade padrão = 1750
	}
}
window.addEventListener('keyup', function space(event){
	if(event.keyCode === 32){
		rollBall()
	}
}) 
function result(){
	checkNumbers()
	msg += '<span class="letter">' + ball(newNumbers[lastIndex])[0] + '</span>' + '<span>' + ball(newNumbers[lastIndex])[1] + ',' + '</span>' 
	letterEl = document.getElementsByClassName('letter')
	sorteadosEl.innerHTML = msg
	resizeFont()
	ballEl.innerHTML = '<span class="letter">' + ball(newNumbers[lastIndex])[0] + '</span>'+'<span>' + ball(newNumbers[lastIndex])[1]
	ballEl.style.animation = ''
	blockRollBall = false
}
function resizeFont(){
	if(newNumbers.length % 7 === 0){
		// let compNum = getComputedStyle(sorteadosEl)
		// sorteadosEl.style.fontSize = (parseFloat(compNum.fontSize)-1) + "px"
		// counter += 1.5
		// for(let i = 0; i < letterEl.length; i++){
		// 	let compLetter = getComputedStyle(letterEl[i])
		// 	letterEl[i].style.fontSize = (parseFloat(compLetter.fontSize)-counter) + "px"
		// 	console.log(letterEl[i].style.fontSize)
		// }
		msg += '\n'
	}
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
			// console.log(lastIndex +' '+ i)
			if(newNumbers[lastIndex] === newNumbers[i]){
				// console.log('%cO número era ' + newNumbers[lastIndex],'color: gray')
				newNumbers.pop()
				newNumbers.push(rando(1,75))
				// console.log('%cAgora é ' + newNumbers[lastIndex],'color: gray')
				i = -1
			}
		}
	}
	position0 = numbers[0][0].indexOf(newNumbers[lastIndex])
	position1 = numbers[1][0].indexOf(newNumbers[lastIndex])
	if(position0 !== -1){
		if(numbers[0][1][position0] !== 2){
			numbers[0][1][position0] = 1
			squares0[position0].addEventListener('click', clicked)
		}
	}
	if(position1 !== -1){
		if(numbers[1][1][position1] !== 2){
			numbers[1][1][position1] = 1
			squares1[position1].addEventListener('click', clicked)
		}
	}
}
function clicked(){
	if(!winned){
		let squareClass = this.className
		let span = this.children[0]
		let spanText = Number(span.textContent)
		let player
		if(squareClass === 'square1'){
			player = 0
		}
		else if(squareClass === 'square2'){
			player = 1
		}
		position = numbers[player][0].indexOf(spanText)
		numbers[player][1][position] = 2;
		span.style.backgroundColor = `var(--colorSelected${player+1})`
		this.removeEventListener('click', clicked)
		checkEnd()
	}
}
function checkEnd(){
	console.log('fim')
	let check = [[],[]]
	for(let p = 0; p < 2; p++){
		for(let i = 0; i < 5; i++){
			if(numbers[p][1][0+i] === 2 && numbers[p][1][5+i] === 2 &&
			numbers[p][1][10+i] === 2 && numbers[p][1][15+i] === 2 &&
			numbers[p][1][20+i] === 2){//Checa todas as fileiras na horizontal
				console.log('Jogador 1 ganhou!!!!!')
				console.log(i,i+5,i+10,i+15,i+20)
				check[0].push(1)
				check[1].push(i)
				break;
			}
		}
		for(let i = 0; i < 21; i+=5){
			if(numbers[p][1][i] === 2 && numbers[p][1][i+1] === 2 && 
			numbers[p][1][i+2] === 2 && numbers[p][1][i+3] === 2 &&
			numbers[p][1][i+4] === 2){//Checa todas as fileiras na vertical
				console.log('Jogador 2 ganhou!!!!!')
				console.log(i,i+1,i+2,i+3,i+4)
				check[0].push(2)
				check[1].push(i)
				break
			}	
		}
	}
	if(check[0].length !== 0){
		winned = true	
		victoryRow(check)
	}
}
function victoryRow(info){
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
	victoryEl.style.display = "flex"
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
	counter = 0
	document.getElementById('conteiner').style.opacity = "1"
	victoryEl.style.display = "none"
	winned = false
	generateNumbers()
}
generateNumbers()
				// A fazer:
// Terminar o algoritmo de corrigir repetições no sorteio;
// Escolher uma imagem para colocar no meio;
// Completar a comemoração para vitoria;
// Encontrar o bug da diminuição da fonte das letras;