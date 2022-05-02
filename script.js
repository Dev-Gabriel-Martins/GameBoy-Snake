window.onload = function(){

  var tela = document.getElementById('tela');
  var context = tela.getContext("2d");

  /*Evento esperando as teclas serem precionadas:*/
  document.addEventListener('keydown', keyPush);

  /*taxa de atualização do tela*/
  setInterval(game, 120);

  /*Quantos campos ela pode andar a cada 80ms de ataulização de tela:*/
  const velocidade = 1;

  /*Velocidade X e Y:*/
  var veloX = veloY = 0;

  /*Posição inicial no eixo X e Y:*/
  var posicaoX = 1;
  var posicaoY = 1;
  /*Tamanho do lado do campo, tendo o canvas 240x240, sendo 12 o lado de cada campo, vamos ter quadriculado de 20x20:*/ 
  var tamanhoCampo = 8;


  /*Mapa:*/

  /*Quantidade de campos:*/
  var QuantCampo = 25;

  /*Posição inicial da Maça */
  var macaX = Math.floor(Math.random()*QuantCampo);
  var macaY = Math.floor(Math.random()*QuantCampo);

  /* o tamanho inicial da calda da cobra:*/
  var rastro = []; /*um vetor para quantidade de casas por onde a cobra passa*/
  calda = 3; /*o tamanho da cobra */

  function game(){
   posicaoX += veloX;
   posicaoY += veloY;

   /*Conectando as parades do campo:*/
    if (posicaoX < 0 ){
         posicaoX = QuantCampo - 1;
       }

    if (posicaoX > QuantCampo -1){
      posicaoX = 0;
    }

    if(posicaoY < 0 ){
      posicaoY = QuantCampo -1;
    }

    if(posicaoY > QuantCampo -1 ){
      posicaoY = 0;
    }

  /*Cor de fundo da tela:*/
  context.fillStyle = "#8da600";
  context.fillRect(0,0, tela.width, tela.height); /* quatos parâmetros para cada lado do retangulo*/

  /*Cor da Maça:*/
  context.fillStyle = "#265d28";
  context.fillRect(macaX*tamanhoCampo, macaY*tamanhoCampo, tamanhoCampo,tamanhoCampo); 

 /*Cobra:*/
  context.fillStyle = "#265d28";
  for (var i = 0; i < rastro.length; i++){
  context.fillRect(rastro[i].x*tamanhoCampo, rastro[i].y*tamanhoCampo, tamanhoCampo, tamanhoCampo)

  /*Caso a cabeça encoste no corpo*/
  if (rastro[i].x == posicaoX && rastro[i].y == posicaoY){
        veloX, veloY = 0; /*Game Over*/
        calda=5;
        console.log("Gamer Over");
    }
}
    rastro.push({x:posicaoX,y:posicaoY})

     while (rastro.length > calda){
    rastro.shift();
}

/*Caso o cobra coma a maça:*/ 
  if (macaX == posicaoX && macaY == posicaoY){
    calda++;
    /*Criando uma nova maça em lugar novo aleatorio no mapa:*/
    macaX = Math.floor(Math.random()*QuantCampo)
    macaY = Math.floor(Math.random()*QuantCampo)
  }
  
} 

/*Direcionais das teclas:*/
/*Como descobrir o numero de cada tecla: https://docs.microsoft.com/pt-br/dotnet/api/system.windows.forms.keys?view=net-5.0 */
    function keyPush (event){

    switch (event.keyCode) {
			case 37: /*Esquerda */
      veloX = -velocidade;
      veloY = 0;
      break;

      case 38: /*Cima*/
      veloX = 0;
      veloY = -velocidade;
      break;

      case 39: /*Direita*/
      veloX = velocidade;
      veloY = 0;
      break;

      case 40: /*Baixo*/
      veloX = 0;
      veloY = velocidade;
      break;

      default:
      break;
		  }

    }

}
