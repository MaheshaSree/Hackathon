var head = document.createElement('div')
head.setAttribute('style', 'font-family: Brush Script MT, cursive, Times New Roman; font-size: 35px; margin-bottom: 40px')
head.innerHTML="SUDOKU"

var newGame = document.createElement('button')
newGame.setAttribute('value', 'newGame')
newGame.setAttribute('style', 'margin-right: 20px; font-family: Monaco, cursive, Times New Roman; font-size: 15px; border-radius:10px;')
newGame.innerHTML="NEW GAME"

var resetbtn = document.createElement('button')
resetbtn.setAttribute('value', 'reset')
resetbtn.setAttribute('style', 'margin-right: 130px; font-family: Monaco, cursive, Times New Roman; font-size: 15px; border-radius:10px;')
resetbtn.innerHTML="RESET"

var solvebtn = document.createElement('button')
solvebtn.setAttribute('value', 'solve')
solvebtn.setAttribute('style', 'margin-right: 20px; font-family: Monaco, cursive, Times New Roman; font-size: 15px; border-radius:10px;')
solvebtn.innerHTML="SOLVE"

var checkbtn = document.createElement('button')
checkbtn.setAttribute('value', 'check')
checkbtn.setAttribute('style', 'font-family: Monaco, cursive, Times New Roman; font-size: 15px; border-radius:10px;')
checkbtn.innerHTML="CHECK"

var sudoku = document.createElement('form')
sudoku.setAttribute('id','sudoku')
sudoku.setAttribute('style','margin-left:330px;')
var linebreak1 = document.createElement("br");

document.body.append(head, newGame, resetbtn, solvebtn, checkbtn, sudoku);
sudoku.appendChild(linebreak1);

function sudokuTable() {
  var i, j, tr, td, input,
      table = document.querySelector('form#sudoku'),
      tbody = document.createElement('tbody');
  table.appendChild(tbody);
  for (i = 0; i < 9; i++) {
    tr = document.createElement('tr');
    tbody.appendChild(tr);
    for (j = 0; j < 9; j++) {   
      td = document.createElement('td');
      tr.appendChild(td);
      input = document.createElement('input');
	  input.setAttribute('maxlength','1');
	  input.setAttribute('id','inputs');
	  input.setAttribute('style','margin: -1px; border:1px solid #f0f0f0;');
      input.type = 'text';
	  if((i< 3 && j< 3) || (i> 5 && j> 5) || (i< 3 && j> 5) || (i> 5 && j< 3) || ((i>2 && i<6) && (j>2 && j<6)))
		  input.setAttribute('style', 'background-color: #f0f0f0; border: 1px solid white');
      input.size = 1;
      td.appendChild(input);
    }
  }
  document.querySelector('button[value=solve]').addEventListener('click', test);
  document.querySelector('button[value=newGame]').addEventListener('click', qn);
  document.querySelector('button[value=reset]').addEventListener('click', rset);
  document.querySelector('button[value=check]').addEventListener('click', check);
}
sudokuTable();

var timer = document.createElement('div');
timer.setAttribute('id', 'time');
timer.innerHTML="000 second";

var timercount;
var tottime= 240;
document.body.append(timer)

function startTimer() {
    timercount = timercount-1;
	if(timercount < tottime){
		timer.innerHTML= timercount;
	}
	if(timercount < 1){
		window.clearInterval(update);
		alert("Time up");
		var winlose = check();
		for(i=0;i<81;i++){
			var form = document.querySelector('form#sudoku')
			form[i].disabled=true;
			disabled='yes'
		}
		if(winlose)
			alert("YOU LOSE");
		else{
			var spenttime= timercount;
			var score = (240-spenttime)*0.1 +10;
			console.log(score);
			alert("YOU WIN \n Your score : " + score);
		}
	}
}
var update;
function solve(matrix) {
  var i, j, b, digit;
  for (i = 0; i <= 8; i++) {
    for (j = 0; j <= 8; j++) {
      if (!matrix[i][j]) {
        for (digit = 1; digit <= 9; digit++) {
          if (insert(matrix, i, j, digit)) {
            matrix[i][j] = digit;
            b = solve(matrix);
            if (b) { return true; }
            matrix[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function insert(matrix, i, j, digit) {
  var a, b;
  for (a = 0; a <= 8; a++) {
    if (a != i && matrix[a][j] == digit) {
      return false;
    }
  }
  for (a = 0; a <= 8; a++) {
    if (a != j && matrix[i][a] == digit) {
      return false;
    }
  }
  var y = Math.floor((i / 3)) * 3,
      x = Math.floor((j / 3)) * 3;
  for (a = 0; a < 3; a++) {
    for (b = 0; b < 3; b++) {
      if (a != i && b != j && matrix[y + a][x + b] == digit) {
        return false;
      }
    }
  }
  return true;
}
var input = [[[0,0,0,8,0,0,7,0,0],[0,0,9,6,2,0,0,0,0],[1,0,2,7,0,9,0,6,0],[8,0,0,0,0,0,0,9,0],[0,2,0,0,1,0,0,7,0],[0,1,0,0,0,0,0,0,4],[0,5,0,9,0,7,2,0,3],[0,0,0,0,8,3,5,0,0],[0,0,1,0,0,5,0,0,0]]
, [[0,0,1,4,9,0,0,0,6],[0,2,6,8,0,0,0,0,4],[0,0,4,0,6,0,0,9,0],[8,6,0,9,0,0,0,0,0],[0,0,0,6,0,4,0,0,0],[0,0,0,0,0,8,0,3,2],[0,7,0,0,8,0,4,0,0],[1,0,0,0,0,3,8,6,0],[5,0,0,1,4,6,7,0,0]]
, [[0,0,0,1,0,5,0,8,7],[0,5,0,4,0,9,6,0,0],[0,0,6,7,0,3,0,0,9],[0,0,0,0,0,0,0,5,0],[0,1,4,0,7,0,2,9,0],[0,3,0,0,0,0,0,0,0],[8,0,0,3,0,6,4,0,0],[0,0,3,8,0,7,0,1,0],[5,7,0,2,0,1,0,0,0]]
, [[9,4,0,1,0,0,0,8,7],[3,0,0,4,0,0,0,2,1],[0,0,0,7,0,3,0,0,9],[7,0,0,0,0,0,0,5,0],[0,1,0,5,0,8,2,0,0],[0,0,0,0,0,0,0,6,8],[0,2,0,3,0,0,4,0,5],[0,0,3,8,0,7,0,1,0],[0,0,9,0,0,1,0,3,6]]
, [[6,0,4,1,0,0,0,0,0],[0,2,0,0,0,0,0,0,1],[8,9,0,4,0,0,3,0,5],[9,0,5,2,0,0,0,0,4],[0,0,0,0,0,0,0,0,0],[4,0,0,0,0,3,9,0,8],[7,0,6,0,0,2,0,4,3],[1,0,0,0,0,0,0,9,0],[0,0,0,0,0,7,5,0,2]]
, [[0,7,0,1,3,0,0,0,9],[5,2,0,0,7,0,0,0,0],[8,9,0,4,0,0,0,0,0],[0,0,0,0,0,1,7,3,0],[2,0,0,0,0,0,0,0,6],[0,0,7,5,6,0,0,2,0],[0,0,0,9,1,2,0,0,0],[0,0,0,0,5,8,0,0,7],[3,0,0,0,0,7,0,1,2]]
, [[6,5,0,0,0,1,7,3,2],[0,1,0,0,3,0,0,5,0],[0,0,0,9,0,0,0,0,1],[0,0,0,0,0,0,0,0,0],[2,4,0,0,5,0,0,1,9],[0,0,0,8,0,0,0,0,0],[5,0,0,0,0,7,0,0,0],[0,7,0,0,9,0,0,4,0],[8,9,1,6,0,0,0,7,5]]
, [[0,2,0,0,0,0,5,0,8],[6,0,3,0,0,8,0,0,0],[0,0,9,0,2,0,0,6,0],[1,5,0,9,0,0,2,0,0],[9,0,0,0,0,0,0,0,1],[0,0,7,0,0,2,0,5,6],[0,7,0,0,6,0,4,0,0],[0,0,0,8,0,0,7,0,9],[3,0,8,0,0,0,0,1,0]]
, [[0,0,1,4,9,0,0,0,6],[0,2,6,8,0,0,0,0,4],[0,0,4,0,6,0,0,9,0],[8,6,0,9,0,0,0,0,0],[0,0,0,6,0,4,0,0,0],[0,0,0,0,0,8,0,3,2],[0,7,0,0,8,0,4,0,0],[1,0,0,0,0,3,8,6,0],[5,0,0,1,4,6,7,0,0]]
, [[0,0,0,1,0,5,0,8,7],[0,5,0,4,0,9,6,0,0],[0,0,6,7,0,3,0,0,9],[0,0,0,0,0,0,0,5,0],[0,1,4,0,7,0,2,9,0],[0,3,0,0,0,0,0,0,0],[8,0,0,3,0,6,4,0,0],[0,0,3,8,0,7,0,1,0],[5,7,0,2,0,1,0,0,0]]
, [[9,4,0,1,0,0,0,8,7],[3,0,0,4,0,0,0,2,1],[0,0,0,7,0,3,0,0,9],[7,0,0,0,0,0,0,5,0],[0,1,0,5,0,8,2,0,0],[0,0,0,0,0,0,0,6,8],[0,2,0,3,0,0,4,0,5],[0,0,3,8,0,7,0,1,0],[0,0,9,0,0,1,0,3,6]]
, [[6,0,4,1,0,0,0,0,0],[0,2,0,0,0,0,0,0,1],[8,9,0,4,0,0,3,0,5],[9,0,5,2,0,0,0,0,4],[0,0,0,0,0,0,0,0,0],[4,0,0,0,0,3,9,0,8],[7,0,6,0,0,2,0,4,3],[1,0,0,0,0,0,0,9,0],[0,0,0,0,0,7,5,0,2]]
, [[0,7,0,1,3,0,0,0,9],[5,2,0,0,7,0,0,0,0],[8,9,0,4,0,0,0,0,0],[0,0,0,0,0,1,7,3,0],[2,0,0,0,0,0,0,0,6],[0,0,7,5,6,0,0,2,0],[0,0,0,9,1,2,0,0,0],[0,0,0,0,5,8,0,0,7],[3,0,0,0,0,7,0,1,2]]
, [[6,5,0,0,0,1,7,3,2],[0,1,0,0,3,0,0,5,0],[0,0,0,9,0,0,0,0,1],[0,0,0,0,0,0,0,0,0],[2,4,0,0,5,0,0,1,9],[0,0,0,8,0,0,0,0,0],[5,0,0,0,0,7,0,0,0],[0,7,0,0,9,0,0,4,0],[8,9,1,6,0,0,0,7,5]]
, [[0,2,0,0,0,0,5,0,8],[6,0,3,0,0,8,0,0,0],[0,0,9,0,2,0,0,6,0],[1,5,0,9,0,0,2,0,0],[9,0,0,0,0,0,0,0,1],[0,0,7,0,0,2,0,5,6],[0,7,0,0,6,0,4,0,0],[0,0,0,8,0,0,7,0,9],[3,0,8,0,0,0,0,1,0]]];


var disabled='';
function test() {
	
	window.clearInterval(update);
	timercount='-';
  var form = document.querySelector('form#sudoku'),
      matrix,
      holder = [],
      i, j, k, z;
  for (i = 0; i < 81; i++) {
    holder[i] = form[i].value;
    matrix = [];
    k = -1;
    for (j = 0; j < holder.length; j++) {
      if (j % 9 === 0) {
        k++;
        matrix[k] = [];        
      }
      matrix[k].push(holder[j]);
    }
  }
  
  solve(matrix);

  z = 0;
  for (i = 0; i < matrix.length; i++) {
    for (j = 0; j < matrix[i].length; j++) {  
      form[z].value = matrix[i][j];
      z++;
    }
  }
  var alertmsg = alert("You used Solution. You lose")
  for(i=0;i<81;i++){
	  form[i].disabled=true;
	disabled='yes'
  }
}

var times=0;
function qn(){
	over();
	timercount = tottime;
	update = setInterval("startTimer()", 1000);
	disabled='no';
	if(times>= input.length){
		var alertmsg = alert("Game over")
		var alertmsg = prompt("Rate this Game")
		over();
	}
	else{
	var matrix, form = document.querySelector('form#sudoku');
	matrix=[];
	var count=0;
	for(i=0;i<81;i++)
	  form[i].disabled=false;
	for(i=0;i<9;i++)
	{
		matrix[i]=[]
		for(j=0;j<9;j++){
			matrix[i][j]= 0
		}
	}
	for(i=0;i<9;i++)
	{
		for(j=0;j<9;j++){
			matrix[i][j]= input[times][i][j]
		}
	}
	 //solve(matrix);
	 z = 0;
  for (i = 0; i < matrix.length; i++) {
    for (j = 0; j < matrix[i].length; j++) {  
		if(matrix[i][j] != 0)
			form[z].value = matrix[i][j];
		else
			form[z].value = '';
		z++
    }
  }
	times++;}
	
}

function check(){
	if(disabled=='yes'){
		alert("you lost. Play NEW GAME");
		return;
	}
	var form = document.querySelector('form#sudoku'), samedigit,
      matrix,
      holder = [],
      i, j, k, z;
  for (i = 0; i < 81; i++) {
    holder[i] = form[i].value;
    matrix = [];
    k = -1;
    for (j = 0; j < holder.length; j++) {
      if (j % 9 === 0) {
        k++;
        matrix[k] = [];        
      }
      matrix[k].push(holder[j]);
    }
  }
  var val=0;
	for(i=0;i<9;i++){
		for(j=0;j<9;j++)
		{
			var digicheck = samedigit = checkDigit(matrix, matrix[i][j], i, j);
			if(digicheck){
				if(timercount >1){
				alert("Please check the entry at row "+ (1+i) + " and column "+ (1+j))}
				return true;
			}
		}		
	}
	/*if(val){
			
			break;
		}*/
	var spenttime= timercount;
	var score = (240-spenttime)*0.1 +10;
	console.log(score);
	alert("YOU WIN \n Your score : " + score)
	if(timercount>1)
		over();
	return false;
}

function checkDigit(matrix, digit, row, col){
	var rowcount=-1, colcount=-1, blockcount=-1, temprow, tempcol;
	for(i=0;i<9;i++){
		if(matrix[row][i]==digit){
			rowcount++;
		}
	}
	for(i=0;i<9;i++){
		if(matrix[i][col]==digit){
			colcount++;
		}
	}
	if(row<3)
		temprow=0;
	else if(row<6)
		temprow=3;
	else
		temprow=6;
	if(col<3)
		tempcol=0;
	else if(col<6)
		tempcol=3;
	else
		tempcol=6;
	
	for(i=temprow; i< temprow+3; i++){
		for(j=tempcol; j< tempcol+3; j++){
			if(matrix[i][j]==digit)
				blockcount++;
		}
	}
		
	if(rowcount!=0 || colcount!=0 || blockcount!=0){
		console.log("same digit")
		return true;
	}
	return false;
}



function rset(){
	over();
	timercount = tottime;
	update = setInterval("startTimer()", 1000);
	disabled='no';
	times--;
	if(times>= input.length){
		var alertmsg = alert("Game over")
		var alertmsg = prompt("Rate this Game")
	}
	else{
	var matrix, form = document.querySelector('form#sudoku');
	matrix=[];
	var count=0;
	for(i=0;i<81;i++)
	  form[i].disabled=false;
	for(i=0;i<9;i++)
	{
		matrix[i]=[]
		for(j=0;j<9;j++){
			matrix[i][j]= 0
		}
	}
	for(i=0;i<9;i++)
	{
		for(j=0;j<9;j++){
			matrix[i][j]= input[times][i][j]
		}
	}
	 //solve(matrix);
	 z = 0;
  for (i = 0; i < matrix.length; i++) {
    for (j = 0; j < matrix[i].length; j++) {  
		if(matrix[i][j] != 0)
			form[z].value = matrix[i][j];
		else
			form[z].value = '';
		z++
    }
  }
	times++;}
}

var play = document.createElement('div')
play.setAttribute('style', 'text-align: left; margin-left: 30px; margin-top:80px; font-family: Monaco, cursive, Times New Roman;')
play.innerHTML="How to Play"

var ul1 = document.createElement('ul')
	var li1 = document.createElement('li')
	li1.innerHTML="Fill cells with numbers from 1 to 9"
	var li2 = document.createElement('li')
	li2.innerHTML="Enter a number using keyboard"
	var li3 = document.createElement('li')
	li3.innerHTML="Delete a number using backspace"
	var li4 = document.createElement('li')
	li4.innerHTML="The board has 9 regions, each has 9 cells"
	var li5 = document.createElement('li')
	li5.innerHTML="Rule 1 - each Region consist of unique numbers (1-9)"
	var li6 = document.createElement('li')
	li6.innerHTML="Rule 2 - each Row of the board consist of unique numbers (1-9"
	var li7 = document.createElement('li')
	li7.innerHTML="Rule 3 - each Column of the board consist of unique numbers (1-9)"
	
var a = document.createElement('a');
      var linkText = document.createTextNode("Solving methods");
	  a.setAttribute('style','color:#784510')
      a.appendChild(linkText);
      a.title = "Solving methods";
      a.href = "https://homepages.cwi.nl/~aeb/games/sudoku/solving1.html";
      

var process = document.createElement('div')
process.setAttribute('style', 'text-align: left; margin-left: 30px; margin-top:40px; font-family: Monaco, cursive, Times New Roman;')
process.innerHTML="What's happening here"	

var ul2 = document.createElement('ul')
	var li8 = document.createElement('li')
	li8.innerHTML="Empty board is generated"
	var li9 = document.createElement('li')
	li9.innerHTML="Board is populated with the input, if new game is selected"
	var li10 = document.createElement('li')
	li10.innerHTML="Board is populated with the same previous input, if reset is selected"
	var li11 = document.createElement('li')
	li11.innerHTML="Board is solved, if solve is selected"
	var li12 = document.createElement('li')
	li12.innerHTML="Board is checked for perfection, if check is selected"
	var li13 = document.createElement('li')
	li13.innerHTML="Timer runs for 4 minutes. The time taken to complete one board is used to calculate the score"

document.body.append(play)
play.appendChild(ul1)
ul1.appendChild(li1)
ul1.appendChild(li2)
ul1.appendChild(li3)
ul1.appendChild(li4)
ul1.appendChild(li5)
ul1.appendChild(li6)
ul1.appendChild(li7)
play.appendChild(a);
document.body.append(process)
process.appendChild(ul2)
ul2.appendChild(li8)
ul2.appendChild(li9)
ul2.appendChild(li10)
ul2.appendChild(li11)
ul2.appendChild(li12)
ul2.appendChild(li13)

function over(){
	window.clearInterval(update);
	timercount='-';
}

 