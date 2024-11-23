var board =[
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
];
var numtoadd;
var index1;
var index2;
var fault1=0;
var fault2 = 0;
var fault3 = 0;
var issolved = false;
var solve = false;
var empty = false;
var solve3 = false;
window.onload=function()
{
	makeboard();
	funid("newboard").addEventListener("click",emptyboard);
	for(let i=0;i<10;i++)
	{
		funid("number").children[i].addEventListener("click",function()
		{
			if(this.classList.contains("selected")){
				this.classList.remove("selected");
				numtoadd = undefined;
			}
			else
			{
				for(let i=0;i<10;i++)
				{
					funid("number").children[i].classList.remove("selected");

				}
				this.classList.add("selected");
				numtoadd = funid('number').children[i].innerHTML;
			}
		});
	}
}
function makeboard()
{
	//emptyboard();
	let id = 0;
	for(let i=0;i<81;i++)
	{
		const idnum = String(i);
		let square = document.createElement("p");
		square.textContent = '';
		square.classList.add("square");
		square.id = idnum;
		if(i>=0 && i<9){square.classList.add("bordertop");}
		if(i >=72 && i<81){square.classList.add("borderbottom")}
		if((i+1)%9 == 0){square.classList.add("borderright")}
		if(i%9 == 0){square.classList.add("borderleft")}
		if((i+1)%3 ==0){square.classList.add("borderright")} // to change 
		if((i>17 && i<27) || (i>44 && i<54) || (i>71 && i<81)) {square.classList.add("borderbottom")}
		funid("board").appendChild(square);
		funid("board").children[i].addEventListener("click",async function()
		{
			const numid = parseInt(funid("board").children[i].id) +1; // = i;
			if(numid%9 !=0){
				index1 = Math.floor(numid/9);
				index2 = (numid%9)-1;
			}
			else
			{
				index1 = (Math.floor(numid/9))-1;
				index2 = 8;
			}
			if((checkdup(board,parseInt(numtoadd),index1,index2) == false) && solve == false)
			{
				funid("RowWar").classList.remove("war1");
				funid("ColWar").classList.remove("war2");
				funid("SqWar").classList.remove("war3");
				await sleep();
				if(fault1 == 1)
				{
					funid("RowWar").classList.add("war1");
					fault1 = 0;
				}
				if(fault2 == 1)
				{
					funid("ColWar").classList.add('war2');
					fault2 = 0;
				}	
				if(fault3 == 1)
				{
					funid("SqWar").classList.add('war3');
					fault3 = 0;
				}
			}
			if((checkdup(board,parseInt(numtoadd),index1,index2) == true) && numtoadd != 'del' && numtoadd != undefined && solve == false)
			{
				funid("board").children[i].innerHTML = numtoadd;
				funid("board").children[i].classList.add("add");
				board[index1][index2] = parseInt(numtoadd);
			}

			if(numtoadd == 'del' && solve == false)
			{
				funid("board").children[i].innerHTML = '';
				funid("board").children[i].classList.remove('solved');
				board[index1][index2] = 0;
			}
		}
		);
	}
	funid("solve").addEventListener("click",function()
	{
		if(solve == false){
			console.log("in call");
		solve1(board,0,0);
		solve3 = false;
		empty = false;
	}
	});
	funid("speedsolve").addEventListener("click",function()
		{
			let id = 0;
			solve2(board,0,0);
			if(solve == false){
			for(let i=0;i<9;i++)
			{
				for(let j = 0;j<9;j++)
				{
					funid("board").children[id].innerHTML = String(board[i][j]);
					funid("board").children[id].classList.add("solved");
					id++;
				}
			}
			console.log(q);
		}
		});
}
function emptyboard()
{
	if(solve == true)
	{
	empty = true;
	}
	let square = document.querySelectorAll(".square");
	for(let i=0;i<81;i++)
	{
		funid("board").children[i].innerHTML = "";
		funid("board").children[i].classList.remove("add");
		funid("board").children[i].classList.remove("solved");
	}
	for(let i=0;i<9;i++)
	{
		for(let j=0;j<9;j++)
		{
			board[i][j] = 0;
		}
	}
	fault1=0;
	fault2=0
	fault3=0;
	issolved = false;
	//solve = false;
}
function funid(id)
{
	return document.getElementById(id);
}
function sleep()
{
	return new Promise(resolve => setTimeout(resolve,25));
}
function sleep1()
{
	return new Promise(resolve => setTimeout(resolve,5));
}
var q = 0;
var l;
var m;
var n;
async function solve1(board,index1,index2)
{
	console.log("in fun");
	if(solve3 == true)
	{
		//solve3 = false;
		return;
	}
	solve = true;
	if(empty == true)
	{
		if(index1 == 0 && index2 == 1){
		solve = false;
		empty = false;
		solve3 = true;
		return;
	}
		return;
	}
	if(index1<9){
	if(board[index1][index2] == 0){
	for(let i=1;i<10;i++)
	{
		if(checkdup(board,i,index1,index2) == true)
		{
            board[index1][index2] = i;
            l = (index1+1)*9;
            m = 9-(index2+1);
            n = l-m-1;
            funid("board").children[n].classList.remove("solved");
            await sleep1();
            funid("board").children[n].classList.add("solved");
            funid("board").children[n].innerHTML = String(i);
			var a = index1;
			var b = index2;
			if((index2+1)%9 == 0)
			{
				index1++;
				index2 = 0;
			}
			else
			{
				index2++;
			}
			await solve1(board,index1,index2);
			index1 = a;
			index2 = b;
		}
		if(issolved !=true){
		board[index1][index2] = 0;
        l = (index1+1)*9;
        m = 9-(index2+1);
        n = l-m-1;
        funid("board").children[n].classList.add("solved");  
        await sleep1();
        funid("board").children[n].classList.remove("solved");  
		funid('board').children[n].innerHTML = "";
    }
	}

}
	else
	{
		if((index2+1)%9 == 0)
		{
			index1++;
			index2 = 0;
		}
		else
		{
			index2++;
		}
		await solve1(board,index1,index2);
	}
}
else
{
	issolved = true;
	solve = false;
}

}
function solve2(board,index1,index2)
{
	if(solve == true){
		return;
	}
	q++;
	if(index1<9){
	if(board[index1][index2] == 0){
	for(let i=1;i<10;i++)
	{
		if(checkdup(board,i,index1,index2) == true)
		{
			board[index1][index2] = i;
			var a = index1;
			var b = index2;
			if((index2+1)%9 == 0)
			{
				index1++;
				index2 = 0;
			}
			else
			{
				index2++;
			}
			solve2(board,index1,index2);
			index1 = a;
			index2 = b;
		}
		if(issolved !=true && i==9 ){
		board[index1][index2] = 0;
		}
	}

}
	else
	{
		if((index2+1)%9 == 0)
		{
			index1++;
			index2 = 0;
		}
		else
		{
			index2++;
		}
		solve2(board,index1,index2);
	}
}
else
{
	issolved = true;
}

}
function checkdup(board,num,index1,index2)
{
	fault1 = 0;
	fault2 = 0;
	fault3 = 0;
	for(let i=0;i<9;i++)
	{
		if(board[index1][i] == num)
		{
			fault1 = 1;
			return false;
		}
	}
	for(let i=0;i<9;i++)
	{
		if(board[i][index2] == num)
		{
			fault2 = 1;
			return false;
		}
	}
	let a= index1;
	let b = index2;
	if(a<3)
	{
		a = 0;
	}
	else if(a<6)
	{
		a = 3;
	}
	else
	{
		a = 6;
	}
	if(b<3)
	{
		b = 0;
	}
	else if(b<6)
	{
		b = 3;
	}
	else
	{
		b = 6;
	}
	for(let i = a;i<a+3;i++)
	{
		for(let j =b;j<b+3;j++)
		{
			if(board[i][j] == num)
			{
				fault3 = 1;
				return false;
			}
		}
	}
	return true;
}
