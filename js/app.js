$(document).on("click",".icon-back",endGame);

$(document).on("click","#option",function(){
	$("[data-position='current']").attr("class","current-to-left");
	$("[data-position='right']").attr("class","right-to-current");
	$("#opt").append("<button class='recommend' id='easy'>Easy</button>");
	$("#title").append("Option");
});

$(document).on("click","#start",newGame);//{
	/*$("[data-position='current']").attr("class","current-to-left");
	$("[data-position='right']").attr("class","right-to-current");
	$("#title").append("Game");
	$("#opt").append("<canvas id='tavola' style='position : absolute; z-index : 2;'></canvas>");
	$("#opt").append("<canvas id='game' style='position : absolute; z-index : 1;'></canvas>");
	$("#opt").height($("#art").height());
	$("#opt").append("<div id='endgame' style='position : absolute; text-align : center;  z-index : 3'>ciao</div>");
	$("#endgame").css("box-shadow", "10px 10px 5px #888888");
	$("#endgame").css("background","#F2F2F2");
	$("#endgame").css("width","40%");
	$("#endgame").css("height","10%");
	$("#endgame").css("left","30%");
	$("#endgame").css("top","25%");
	$("#endgame").append("<button class='recommend' id='new'>New Game</button>");
	var img = new Image();
	img.src = "img/cella.png";
	var imgR = new Image();
	imgR.src = "img/rosso.png"
	var imgG = new Image();
	imgG.src = "img/giallo.png";
	game(img,imgR,imgG);
});*/

$(document).on("click","#new",function(){
	endGame();
	newGame();
})

function newGame(){
	$("[data-position='current']").attr("class","current-to-left");
	$("[data-position='right']").attr("class","right-to-current");
	$("#title").append("Game");
	$("#opt").append("<canvas id='tavola' style='position : absolute; z-index : 2;'></canvas>");
	$("#opt").append("<canvas id='game' style='position : absolute; z-index : 1;'></canvas>");
	$("#opt").height($("#art").height());
	$("#opt").append("<div id='endgame' style='position : absolute; text-align : center; display : none; z-index : 3'></div>");
	$("#endgame").append("<button class='recommend' id='new'>New Game</button>");
	$("#endgame").css("box-shadow", "10px 10px 5px #888888");
	$("#endgame").css("background","#F2F2F2");
	$("#endgame").css("width","90%");
	$("#endgame").css("height","15%");
	$("#endgame").css("left","5%");
	$("#endgame").css("top","75%");
	$("#endgame").css("border-radius", "10px");
	$("#endgame").css("padding-top","2%");
	var img = new Image();
	img.src = "img/cella.png";
	var imgR = new Image();
	imgR.src = "img/rosso.png"
	var imgG = new Image();
	imgG.src = "img/giallo.png";
	game(img,imgR,imgG);
}

function endGame(){
	$("#opt").empty();
	$("#title").empty();
	$("[data-position='current']").attr("class","left-to-current");
	$("[data-position='right']").attr("class","current-to-right");
}
