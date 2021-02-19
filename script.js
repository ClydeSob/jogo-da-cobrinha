let canvas = document.getElementById("cobrinha");
let context = canvas.getContext("2d"); 
let caixa = 32;
let cobrinha = []; 
cobrinha[0] ={
    x: 8 * caixa,
    y: 8 * caixa
}
let direcao = "right";
let comida ={
    x: Math.floor(Math.random() * 15 + 1) * caixa,
    y: Math.floor(Math.random() * 15 + 1) * caixa
}

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*caixa, 16*caixa); 
}

function criarCobrinha (){
    for(i = 0; i < cobrinha.length; i++){
        context.fillStyle = "green";
        context.fillRect(cobrinha[i].x, cobrinha[i].y, caixa, caixa);
    }
}

function drawcomida (){
    context.fillStyle = "red";
    context.fillRect(comida.x, comida.y, caixa, caixa);
}


document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direcao != 'right') direcao = 'left';
    if(event.keyCode == 38 && direcao != 'down') direcao = 'up';
    if(event.keyCode == 39 && direcao != 'left') direcao = 'right';
    if(event.keyCode == 40 && direcao != 'up') direcao = 'down';
}

function iniciarJogo(){    

    if(cobrinha[0].x > 15*caixa && direcao == "right") cobrinha[0].x = 0;
    if(cobrinha[0].x < 0 && direcao == 'left') cobrinha[0].x = 16 * caixa;
    if(cobrinha[0].y > 15*caixa && direcao == "down") cobrinha[0].y = 0;
    if(cobrinha[0].y < 0 && direcao == 'up') cobrinha[0].y = 16 * caixa;
    
    for(i = 1; i < cobrinha.length; i++){
        if(cobrinha[0].x == cobrinha[i].x && cobrinha[0].y == cobrinha[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawcomida();

    let cobrinhaX = cobrinha[0].x;
    let cobrinhaY = cobrinha[0].y;

    if(direcao == "right") cobrinhaX += caixa;
    if(direcao == "left") cobrinhaX -= caixa;
    if (direcao == "up") cobrinhaY -= caixa;
    if(direcao == "down") cobrinhaY += caixa;

    if(cobrinhaX != comida.x || cobrinhaY != comida.y){
        cobrinha.pop(); 
    }else{
        comida.x = Math.floor(Math.random() * 15 +1) * caixa;
        comida.y = Math.floor(Math.random() * 15 +1) * caixa;
    }
    
    let newHead ={
        x: cobrinhaX,
        y: cobrinhaY
    }

    cobrinha.unshift(newHead); 
}

let jogo = setInterval(iniciarJogo, 100);