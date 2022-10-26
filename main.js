const music = document.getElementsByTagName('audio')[0]
music.play()
const painel = document.getElementById('leaderBoardPainel')
const leaderBoard = document.getElementById('leaderBoard')
const content = document.getElementById('leaderBoardContent')
let vazio
function top10(){
	if(localStorage.length !== 0){
		for(let i = 0; i < localStorage.length; i++){
			content.innerHTML += `<div class="row">Jogador ${i+1}: <span class='names'>` + localStorage.getItem(`players${i+1}`) + '</span></div>'
		}  
	}else if(localStorage.length === 0){
		vazio = true
		content.style.justifyContent = 'center'
		content.style.alignItems = 'center'
		content.innerHTML = "<span class='msg'>O placar parece estar vazio</span>"
	}
}
function erase(){
	content.style.alignItems = 'center'
	leaderBoard.style.justifyContent = 'center'
	if(!vazio){
		localStorage.clear()
		content.innerHTML = '<span class="msg">Apagado para Sempre ;-;</span>'
	}
	else if(vazio){
		content.innerHTML = '<span class="msg">Não tem nada para apagar</span>'
	}
}
top10()
