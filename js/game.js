function game(img,imgR,imgG){
	//INIZIALIZZO
	var canvas1 = $("#tavola")[0];
	var ctx1 = canvas1.getContext('2d');
	var canvas2 = $("#game")[0];
	var ctx2 = canvas2.getContext('2d');
	var w = $("#opt").innerWidth();
	var h = $("#opt").innerHeight();
	canvas1.width = canvas2.width = w ;
	canvas1.height = canvas2.height = h;
	
	//$("#endgame")
	ctx1.strokeStyle='#0000FF';

	ctx1.fillStyle = "rgba(255, 255, 255, 0)";
	ctx1.fillRect(0, 0, w, h);
    ctx1.fill();

	//var turno = (Math.floor(Math.random()*10)%2);
	//var giocatore = turno;
	//var ia = (turno+1)%2;
	var turno = 0;
	var giocatore = turno;
	var ia = 1;
	var touchX = null;
	var touchY = null;
	var moveX = null;
	var moveY =null;
	var tavola = new Array(7);
	for(var i = 0; i<7;i++){
		tavola[i] = new Array(7);
	}
	var z = w/h;
	var dim;
	var mq = window.matchMedia("(min-width:800px)");

	if (!(mq.matches)){					
		dim = ((w-w/3)/7)/(1.12*z);
	}else{
		dim = ((w-w/3)/7)/z;
	}

	var offset = ((w-dim*7)/2);
	var disco = creaDisco(3);

	//CREAO LA TAVOLA
	for(var i=0,cont=0;i<7;i++){		
		for(var j=0 ;j<7;j++){
			var cella = {};
			cella.x = dim*j+dim/2+offset;
			cella.y = dim*i+(dim*3)/2;
			cella.giocatore = -1;
			tavola[i][j]=cella;
			cont++;
		}
	}

	//DISEGNO TAVOLA
	img.onload = function(){
		ctx1.beginPath();
		for(var i=0;i<6;i++){
			for(var j=0;j<7;j++){
				ctx1.strokeRect(tavola[i][j].x-dim/2,tavola[i][j].y-dim/2,dim,dim);
				ctx1.drawImage(img,tavola[i][j].x-dim/2,tavola[i][j].y-dim/2,dim,dim);
			}		
		}
	}	

	disco.img.onload = function(){
		ctx2.drawImage(disco.img,disco.x,disco.y,dim,dim);
	}

	$(document).keypress(function(evt){
		if(!disco.cade){
			switch(evt.keyCode){

				case 37: // <-
					sinistra();
				break;

				case 39: // ->
					destra();
				break;

				case 40:
				cadi();
				break;
			}
			calcolaPosizione();
		}

	});

	document.getElementById("opt").addEventListener('touchstart',function(evt){
		touchX = evt.touches[0].clientX;
		touchY = evt.touches[0].clientY;
	},false);

	document.getElementById("opt").addEventListener('touchmove',function(evt){
		moveX = evt.touches[0].clientX;
		moveY = evt.touches[0].clientY;
	},false);

	document.getElementById("opt").addEventListener('touchend',function(evt){
		if(touchX != null && touchY != null && moveX != null && moveY != null){
			var diffX = touchX - moveX;
			var diffY = touchY - moveY;
			if(!disco.cade){
				if(Math.abs(diffX) > Math.abs(diffY)){	// ORIZZONTALE
					if(moveX > touchX){
							destra();
					}
					else{
							sinistra();		
					}
				}else{					//VERTICALE
					if(moveY > touchY)
						cadi();
				}
			}
		}
	});

	function creaDisco(z){
		var disc = {
		x : offset+z*dim, 
		y : 0,
		img : turno==1 ? imgR : imgG,
		giocatore : turno==1 ? 1 : 0,
		posizioneY : 0,
		posizioneX : 3,
		cade : false
		};
		return disc;
	}

	function cambiaTurno(){
		if(turno==1)
			turno=2;
		else
			turno=1;
	}

	function calcolaPosizione(){
		disco.posizioneY = Math.floor((disco.y-dim/2)/dim);
		disco.posizioneX = Math.floor((disco.x-dim/2-offset)/dim)+1;
		if(disco.posizioneY < 0)
			disco.posizioneY = 0;
		if(disco.posizioneY > 5)
			disco.posizioneY = 5;
	}

	function cadi(){
		if(tavola[0][disco.posizioneX].giocatore == -1){
			disco.cade = true;
			var velocita = 5;
			var gravity = 2;
			var spostamento =0;
			move(spostamento,velocita,gravity);
		}
		//iainsert(tavola,ia,giocatore,7);
	}

	function move(spostamento,velocita,gravity){
		cancellaDisco();
		calcolaPosizione();
		disco.y = disco.y + velocita;
		spostamento += velocita;
		velocita += gravity;
		disegnaDisco();
		
		if( disco.posizioneY < 5 && tavola[disco.posizioneY+1][disco.posizioneX].giocatore == -1){
			setTimeout(function(){
				move(spostamento,velocita,gravity);
			},10);
		}else{
			inserisci();
		}		
	}

	function inserisci(){
		tavola[disco.posizioneY][disco.posizioneX].giocatore = disco.giocatore;
		disegnaGiocatori();
		var vincitore = testVittoria(tavola);
		if(vincitore == -1 ){
			cambiaTurno();
			disco = creaDisco(disco.posizioneX);
			disegnaDisco();
			/*if(turno==ia){
				console.log("ia");
				IA();
			}else{
				disco = creaDisco(disco.posizioneX);
				disegnaDisco();
			}*/
		}else{
			$("#endgame").css("display","block");
			if(vincitore == 0)
				$("#endgame").text("YELLOW PLAYER WINS!");
			else
				$("#endgame").text("RED PLAYER WINS!");
			$("endGame").append("</br></br>");
			$("#endgame").append("<button class='recommend' id='new'>New Game</button>");
			$("#new").css("width","95%");
		}
	}

	function disegnaGiocatori(){
		ctx2.clearRect(0,0,w,h);
		for(var i=0;i<6;i++){
			for(var j=0;j<7;j++){
				if(tavola[i][j].giocatore==1){
					ctx2.drawImage(imgR,tavola[i][j].x-dim/2,tavola[i][j].y-dim/2,dim,dim);
				}else{
					if(tavola[i][j].giocatore==0){
						ctx2.drawImage(imgG,tavola[i][j].x-dim/2,tavola[i][j].y-dim/2,dim,dim);
					}
				}
			}
		}
	}

	function IA(){
		var pos=turnoIA(tavola,ia,1,imgR,imgG,ctx2);
		console.log(pos);
		disco = creaDisco(pos);
		//creaDisco(pos);
		disegnaDisco();
		cadi();
	}

	function destra(){
		cancellaDisco();
			if(disco.x<tavola[0][5].x){
				disco.x = disco.x + dim;
			}
		disegnaDisco();
	}

	function sinistra(){
		cancellaDisco();
			if(disco.x>tavola[0][0].x){
				disco.x = disco.x - dim;
			}
		disegnaDisco();
	}

	function cancellaDisco(){
		ctx2.clearRect(disco.x,disco.y,dim-1,dim-1);
	}

	function disegnaDisco(){
		ctx2.drawImage(disco.img,disco.x,disco.y,dim,dim);
	}
}

