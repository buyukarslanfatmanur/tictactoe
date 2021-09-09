var gameArray =new Array(9).fill(0);
var playerIndex = "X";
const winnerList= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6], 
] 
$(".action-button").click(makeMove);
let scoreX=0;
let scoreO=0;
var computerP ;
var resultX;
var resultO;

function gameArrayCount(){
    resultX= gameArray.filter(i => i === "X").length;
    resultO= gameArray.filter(i => i === "O").length;
}

function playerComputer(){
    $("#opponent").text("Computer:");
    endGame();
    newGame();
    computerP= true;
}
 
var randomList=[0,1,2,3,4,5,6,7,8];
function selectButton(item){  //seçilen butona x||y bilgisi al
    item.innerHTML = "<span>" + playerIndex + "</span>";
}

function makeMove(e){ 
    if(playerIndex=="X"){
        selectButton(e.target);
        e.target.disabled = true;
        gameArray[e.target.id]=playerIndex;
    }
    if(playerIndex=="O" && computerP==true){
        if((gameArray[0]=="O" && gameArray[8]=="O") || (gameArray[2]=="O" && gameArray[6]=="O") || (gameArray[3]=="O" && gameArray[5]=="O") || (gameArray[1]=="O" && gameArray[7]=="O")){
            if(gameArray[4]=="0") {
                $("#4").text("O");
                $("#4").prop("disabled",true);
                gameArray[4]="O";
            }
            gameArrayCount();
        } 
        if((resultX != resultO) && (gameArray[0]=="X" && gameArray[8]=="X") || (gameArray[2]=="X" && gameArray[6]=="X") || (gameArray[3]=="X" && gameArray[5]=="X") || (gameArray[1]=="X" && gameArray[7]=="X")){
            if(gameArray[4]=="0") {
                $("#4").text("O");
                $("#4").prop("disabled",true);
                gameArray[4]="O";
            }

        } 
        gameArrayCount();      
        if(resultX != resultO && gameArray[0]== "X" && gameArray[2]=="X"){
            if(gameArray[4]=="0") {
                $("#4").text("O");
                $("#4").prop("disabled",true);
                gameArray[4]="O";
            }
            gameArrayCount();
        }         
        if(resultX != resultO && gameArray[0]== "X" && gameArray[1]=="X"){
            if(gameArray[2]=="0") {
                $("#2").text("O");
                $("#2").prop("disabled",true);
                gameArray[2]="O";
            }
            gameArrayCount();
        } 
        if(resultX != resultO && gameArray[1]== "X" && gameArray[2]=="X"){
            if(gameArray[0]=="0") {
                $("#0").text("O");
                $("#0").prop("disabled",true);
                gameArray[0]="O";
            }
            gameArrayCount();
        }        
        if(resultX != resultO && gameArray[6]=="X" && gameArray[7]=="X"){
            if(gameArray[8]=="0") {
                $("#8").text("O");
                $("#8").prop("disabled",true);
                gameArray[8]="O";
            }
            gameArrayCount();
        }       
        if(resultX != resultO && gameArray[6]=="X" && gameArray[8]=="X"){
            if(gameArray[7]=="0") {
                $("#7").text("O");
                $("#7").prop("disabled",true);
                gameArray[7]="O";
            }
            gameArrayCount();
        }       
        if(resultX != resultO && gameArray[7]=="X" && gameArray[8]=="X"){
            if(gameArray[6]=="0") {
                $("#6").text("O");
                $("#6").prop("disabled",true);
                gameArray[6]="O";
            }
            gameArrayCount();
        }   
        if(resultX != resultO){
            nB=$(".action-button:enabled");
            var randomId= Math.floor(Math.random() * nB.length)
            $("#"+ (nB[randomId].id)).text("O");
            $("#"+ (nB[randomId].id)).prop("disabled",true);
            gameArray[(nB[randomId].id)]=playerIndex;          
        }
    }
    else{
        selectButton(e.target);
        e.target.disabled = true;
        gameArray[e.target.id]=playerIndex;
    }
    var gameOver=false;
    for(let i=0;i<winnerList.length;i++){
        //winStatus ,checkWinStatus ten kazanan x ve y alıyor
        var winStatus=checkWinStatus(winnerList[i]);
        console.log(winStatus);
        if(winStatus!=false){
            handleWinStatus(winStatus,winnerList[i]);
            gameOver=true;
        }   
    }
    

    nB=$(".action-button:enabled");
    if(gameOver==false && nB.length==0){  //oyunda kazanan yok
        var resultOverModal = new bootstrap.Modal(document.getElementById('resultModal'), {
            //keyboard: false
        });
        resultOverModal.show();
        $(".end").text("GAME DRAW !");
        gameOver=true;
    }
    if(gameOver==false){
        playerTurn(); 
    }     
}

function handleWinStatus(winner,indexList){   
    for(let i=0;i<indexList.length;i++){//indexListtekii kutuları boya "kazanan"
        $("#"+indexList[i]).addClass("win-button");
    }   
    $(".action-button").prop("disabled",true)  ;   //tüm düğmeler disabled
    //kazanan oyuncu skoru artır
    if (winner=='X'){
        scoreX++;
        $("#score1").text(scoreX);
    }
    if (winner=='O'){
        scoreO++;
        $("#score2").text(scoreO);
    }
    winnerMessage(winner,computerP); 
}

function winnerMessage(winner,computerP){
    var resultModal = new bootstrap.Modal(document.getElementById('resultModal'), {
        //keyboard: false
      });
    resultModal.show();
    if (winner=='O' && computerP==true){
        $(".end").text("Congratulations !!! Player Computer won ");
    }
    else{
        $(".end").text("Congratulations !!! Player " + winner + " won " );            
    } 
}
function checkWinStatus(indexList){  //indexListin tüm elemanları X || y mi
    var counterX= 0;
    var counterO= 0;
    for (var i=0;i<indexList.length;i++){
        var j= indexList[i];
        if (gameArray[j]=='X'){
            counterX++ ;
        }
        else if(gameArray[j]=='O'){
            counterO++ ; 
        }
    }
    if(counterX==indexList.length){
        return 'X' ;              
    }
    if(counterO==indexList.length){
        return 'O' ;
    }
    return false ;
}

function playerTurn(){ 
    if(playerIndex=="X"){
        playerIndex="O" ;
        if(computerP==true){
        makeMove(null);
        }
    }
    else{
        playerIndex="X" ;
    }
}

function restart_button(){
    history.go(0); //sayfayı yeniliyor
}


function endGame(){
    $(".btn").removeClass("win-button");
    gameArray =new Array(9).fill(0);
}

function newGame(){
    for(i = 0; i< 9;i++){
        $("#" +i).addClass("btn btn-outline-light btn-sm action-button");
        document.getElementById(i).innerHTML = "";
    }    
    $(".action-button").prop("disabled",false)  ;  
}

function continue_button(){ 
    $(".btn-group").show();
    var scoreXChange= scoreX;
    var scoreOChange = scoreO;
    endGame(); //oyunu sil
    newGame();  //oyunu başlat
    //sayfayı sıfırlayıp değerleri yazdı
    $("#score1").text(scoreXChange);
    $("#score2").text(scoreOChange);
}
