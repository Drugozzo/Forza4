	
function testVittoria(t){

	for(var i=0;i<7;i++){
		for(var j=0;j<4;j++){
			if(t[i][j].giocatore!=-1){
				if(t[i][j].giocatore==t[i][j+1].giocatore && t[i][j].giocatore==t[i][j+2].giocatore && t[i][j].giocatore==t[i][j+3].giocatore){
					console.log("righe");
					console.log("riga: "+i);
					return t[i][j].giocatore;
				}
			}
		}
	}
	for(var i=3;i<7;i++){
		for(var j=0;j<7;j++){
			if(t[i][j].giocatore!=-1 && t[i][j].giocatore==t[i-1][j].giocatore && t[i][j].giocatore==t[i-2][j].giocatore && t[i][j].giocatore==t[i-3][j].giocatore){
				console.log("colonne");
				return t[i][j].giocatore;
			}
		}
	}
	for(var i=0;i<3;i++){
		for(var j=0;j<4;j++){
			if(t[i+3][j].giocatore!=-1 && t[i+3][j].giocatore==t[i+2][j+1].giocatore && t[i+3][j].giocatore==t[i+1][j+2].giocatore && t[i+3][j].giocatore==t[i][j+3].giocatore){
				console.log("obliquo dx");
				return t[i+3][j].giocatore;
			}
			if(t[i+3][6-j].giocatore!=-1 && t[i+3][6-j].giocatore==t[i+2][6-j-1].giocatore && t[i+3][6-j].giocatore==t[i+1][6-j-2].giocatore && t[i+3][6-j].giocatore==t[i][6-j-3].giocatore){
				console.log("obliquo sx");
				
				return t[i+3][6-j].giocatore;
			}
		}
	}	
return -1;
}

/*
function remove(t,c,r){
	t[r][c].giocatore=0;
}

function insert(t,pl,posizioneX){
	for(var i=5;i>=0;i--){
		if(t[i][posizioneX].giocatore==0)
			t[i][posizioneX].giocatore=pl;
			return i;
	}
	return -1;
}

function rating(t,pl){
	if(ia==testVittoria(t)) return 1;
	if(giocatore==testVittoria(t)) return -3.5;
	return 0;
}

function simulate(t,ia,giocatore,depth){
	var last_insert, posizioneX;
	var valutazione = 0;

	valutazione+=rate(t,ia,giocatore);

	if (valutazione==1 || valutazione==-1) 
		return valutazione;

	if(depth){
		for(posizioneX = 0; posizioneX<7;posizioneX++){
			if((last_insert=insert(t,ia,giocatore))!=-1){
				valutazione+=simulate(t,giocatore,ia,depth-1);
				remove(posizioneX,last_insert);
			}	
		}
	}
	return valutazione;
}

function iainsert(t,ia,giocatore,depth){
	var colonna,inserisci,last_pos;
  	var valutazione[COL];
	
	for (colonna=0;colonna<7;colonna++){
		if((last_pos=insert(ia,colonna))!=-1){
			valutazione[colonna]=simulate(t,ia,giocatore,depth-1)/7;
			remove(colonna,last_pos);
		}
	}
	while(1){
		inserisci=0;
		for(colonna=0;colonna<COL;colonna++){
			if(valutazione[colonna]>=valutazione[inserisci]) 
				inserisci=colonna;
		}
		if(insert(giocatore,ia,inserisci)==-1) 
			valutazione[inserisci]-=2;
	else break;
  }
 }
}
*/

/*function rate(t,ia,current_player){
	if(current_player==testVittoria(t)){
		if(ia==current_player)
			return 1;
		if(ia!=current_player)
			return -3.5;
	}
	return 0;
}

function insert(t,current_player,colonna){
	for(var i=5;i>=0;i++){
		if(t[i][colonna].giocatore==-1){
			t[i][colonna].giocatore = current_player;
			return i;
		}
	}
	return -1;
}

function remove(t,r,c){
	t[r][c].giocatore=-1;
}

function simulate(t,ia,current_player,depth){
	var last, colonna, valutazione = 0;

	valutazione += rate(t,ia,current_player);

	if(depth>0){
		for(colonna=0;colonna<7;colonna++){
			last = insert(current_player,colonna);
			if(last!=-1){
				valutazione += simulate(t,(ia==current_player)?(ia+1)%2:ia,depth-1);
				remove(t,last,colonna);
			}
		}
	}
	return valutazione;
}

function iainsert(t,ia,current_player,depth){
	var colonna,inserisci,last;
	var valutazione = new Array(7);

	for(colonna=0;colonna<7;colonna++){
		last = insert(current_player,colonna);
		if(last!=-1){
			valutazione[colonna] = simulate(ia,current_player,depth);
			remove(t,last,c);
		}
	}
	while(1){
		inserisci = 0;
		for(colonna = 0;colonna<7;colonn++){
			if(valutazione[colonna]>=valutazione[inserisci])
				inserisci=colonna;
		}
		if (insert((current_player==1?current_player:ai),inserisci)==-1) 
			valutazione[inserisci]-=2;
   		else break;
	}
}*/

/*function rate(t,ia){
	var v = testVittoria(t);
	if(v!=-1){
		if(ia==v)
			return 1;
		if(ia!=current_player)
			return -3.5;
	}
	return 0;
}

function insert(t,pl,colonna){
	for(var row=5;row>=0;row--){
		if(t[row][colonna].giocatore==-1){
			t[row][colonna].giocatore==pl;
			return 1;
		}
	}
	return -1;
}

function rimuovi(t,r,c){
	t[r,c].giocatore=-1;
}
function simulate(t,ia,current_player,depth){
	var colonna,valutazione=0,last,pl;
	
	if(ia==current_player)
		pl=(current_player+1)%2;

	valutazione+=rate(t,ia);
	if(valutazione==1 || valutazione==-1)
		return valutazione;
	
	if(depth>0){
		for(colonna=0;colonna<7;colonna++){
			last=insert(t,pl,colonna);
			if(last!=-1){
				valutazione+=simulate(t,ia,pl,depth-1);
				rimuovi(t,last,colonna);
			} 
		}
	}
	console.log("valutazione "+rate(t,ia));
	/*
	if(ia==current_player)
		pl=(current_player+1)%2;
	valutazione+=rate(t,ia);
	if(valutazione==1 || valutazione==-1)
		return valutazione;

	if(depth>0)
		for(colonna=0;colonna<7;colonna++){
		
		}
	
}

/*function turnoIA(t,ia,depth){
	var last,colonna,pos;
	var valutazione = new Array(7);

	for(colonna=0;colonna<7;colonna++){
		if((last=insert(t,ia,colonna))!=-1){
			valutazione[colonna]=simulate(t,ia,ia,depth);
			rimuovi(t,last,colonna);
		}
	}

	for(colonna=0,pos=0;colonna<7;colonna++){
		
		}
		if(valutazione[colonna]>=valutazione[pos]){
			pos=colonna;
		/*if(valutazione[colonna]>=valutazione[pos])
			pos=colonna
			if((last=insert(t,ia,coonna))"=-1){
				valutazione[colonna]=simulate(t,ia,ia,depth);
				rimuovi(t,last,colonna);
		function turnoIA(t,ia,depth){
			var last, colonna,pos;
			var valutazione = new Array(7);

			for(colonna=0;colonna<7;colonna++){
				if((last=insert(t,ia,colonna);
					console.log("valutazione "+rate(t,ia));
					if(depth>0){
						for(colonna=0;colonna<7;colonna++)[
							last=insert+=
		

	}

	return pos;
}*/





































function turnoIA(t,player,difficolta){
	var colonna, truno, valutazione = new Array(6);
	var max, ris;
	for(colonna = 0; colonna<7;colonna++){
		if(t[0][colonna].giocatore == -1)
			valutazione[colonna] = simula(t,player, difficolta, 0);
		console.log("vector val "+valutazione[colonna])
	}
	for(colonna = 0, max = 0; colonna < 7;  colonna++){
		//console.log("valutazione colonna "+valutazione[colonna]);
		if(valutazione[colonna] >= max){
			max = valutazione[colonna];
			ris = colonna;
			//console.log("colonna "+colonna);
		}
	}
	//console.log("colonna "+colonna);
	//console.log(ris)
	return ris;

}

function simula(t, player, difficolta, valutazione){
	var colonna, riga;
	//console.log(valutazione)
	if(difficolta > 0){
		for(colonna = 0; colonna <7; colonna++){
			if((riga = inserisci(t,player,colonna)) != -1){
				player = (player+1)%2;
				valutazione += valuta(t);
				//console.log("difficolta "+difficolta);
				valutazione += simula(t,player,difficolta-1,valutazione);
				rimuovi(t,riga,colonna);
				//console.log("valutazine"+valutazione);
			}
		}

	}else{
		console.log("val finale "+valutazione);
		return valutazione;
	}
}

function inserisci(t,player,colonna){
	var riga;
	for(riga = 5; riga >= 0; riga--){
		if(t[riga][colonna].giocatore == -1){
			t[riga][colonna].giocatore == player;
			//console.log("riga insert "+riga);
			return riga;
		}
	}
	return -1;
}

function rimuovi(t,riga,colonna){
	t[riga][colonna].giocatore = -1;
}

function valuta(t){
	var p = testVittoria(t);
	console.log("p "+p)
	if(p == 0)
		return -2;
	else{
		if(p == 1)
			return 1;
		else
			return 0;
	}
}	


