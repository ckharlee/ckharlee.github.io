$(document).ready(function () {
	//reduce sound of money 
	$('#moneymoney').prop("volume", 0.4);

  $("#playbtn").click(function(){
    let username = $("#text").val()
    console.log(username)
    sessionStorage.setItem("username", username);
  })
	makewheel();
	game.start();
	// $("g text").html("SPIN")
	$(".letterbtn").click(function(){
		if(game.canGuessLetter){
			let letter = $(this).children().html();
			console.log(letter)
			let correct = game.guess(letter);
			if(!correct){
				$(this).children().effect( "shake", {times:5}, 1000 );
				playsound("#bankrupt");
			}
			$(this).addClass("disabled");
			disabledbtn.push(this);
		}else{
			//if they need to click on wheel first, it will toggle this.
			$("#spinthewheelmessage").show()
		}
	})
	$("#wheel g:last text").html("Spin!")
	$("#wheel g:last text").click(function(){
		if(game.canGuessLetter){
			return;
		}
		$("#spinthewheelmessage").hide()
		playsound("#spinwheelSound")
	})
	$("#nextword").click(function(){
		game.nextword()
	})
	$("#closeinstructions").click(function(){
		$("#instructionsdiv").hide();
	})
})
let disabledbtn = []



let wheelobj;
function makewheel(){
let wheel = new Wheel({
		limit : 1,
		el: document.getElementById('wheel'),
		radius:220,
		data: [{
			text: '900',
		}, {
			text: '800',
		}, {
			text: '600',
		}, {
			text: '1200',
		},{
			text: '600',
		}, {
			text: 'BR',
		}, {
			text: '700',
		}, {
			text: '200',
		}, {
			text: '1200',
		},{
			text: '900',
		}, {
			text: '800',
		},{
			text: '700',
		}],
		onSuccess(data) {
			$("#spinthewheelmessage").hide()
			game.canGuessLetter=true;
			game.updateCurrentPrize(data.text);
			wheelobj = this;
		}
	});
}

let game = {
	answer: "morty_rick",
	randomAnswer:["morty_rick","pickle_rick","birdperson","portal_gun","summer","portal","scientist","Meeseeks"],
	money:0,
	currentprize:0,
	canGuessLetter:false,
	correctLetter: 0,
	guess:function(guess){
		let correctguess = false;
		for(let i =0;i<this.answer.length; i++){
			//this checks if that index contains the letter
			if(this.answer[i].toLowerCase()==guess.toLowerCase()){
				//puts the guess inside the placeholder at the correct index
				$(`#ph${i}`).html(guess);
				//increase the amount of correct letters by 1
				this.correctLetter++
				//play the money sound
				playsound("#moneymoney")
				//increase money
				this.money+=this.currentprize;
				correctguess = true;
				this.updatemoney();
				if(this.correctLetter>=this.answer.length){
					$("#leavegamemessage").show()
					$("#nextword").toggle();
					if(this.money>=3000){
						$("#endgame").show()
					}
				}

			}
		}
		//if the guess was incorrect
		if(!correctguess){
			this.money-=this.currentprize/2;	
			this.updatemoney();
		}
		this.canGuessLetter=false;
		wheelobj.limit+=1;
		return correctguess;
	},
	nextword:function(){
		$("#endgame").hide()
		$("#nextword").hide()
		$("#leavegamemessage").hide()
		$("#placeholder").empty()
		this.generate()
		for(let i = 0; i < disabledbtn.length; i++){
			$(disabledbtn[i]).toggleClass("disabled");
		}
		disabledbtn=[];
	},
	win:function(){
		console.log("you won!")
	},
	generate:function(){
		this.answer = this.randomAnswer[Math.floor(Math.random() * this.randomAnswer.length)]
		this.correctLetter=0;
		for (let i = 0; i < this.answer.length; i++) {
			if(this.answer[i]=="_"){
				this.correctLetter=1;
				$("#placeholder").append(`<div id= 'ph${i}' class='greyout'   class=placeholders>?</div>`)
			}else{
				$("#placeholder").append(`<div id= 'ph${i}'   class=placeholders>?</div>`)
			}		
		}	
	},
	start:function(){
		var username = sessionStorage.getItem("username");
		$(".username").html(username)
		this.generate()
	},
	updateCurrentPrize:function(prize){
		if(prize=="BR"){
			playsound("#bankrupt")
			this.money=0;
			this.canGuessLetter=false;
			this.updatemoney();
			wheelobj.limit+=1;
			return;
		}
		this.currentprize=parseInt(prize);
		this.canGuessLetter=true;
	},
	updatemoney:function(){
		$(".money").html(`$${this.money}`)
	}
}

function playsound(id){
	$(id)[0].pause();
  	$(id)[0].load();
	$(id)[0].play();
}
// guess: function(){
//   let guess = prompt("Select a letter please");
//   let incorrectLetter = true;
//   for(let a=0; a<this.answer.length; a++){
//     if(this.answer[a]==guess){
//       this.placeholder[a]=guess;
//       this.correctLetter++
//       this.points++
//       incorrectLetter = false;
//     }
//   }
// }

// bankrupt: function() {
//   this.wheel_selectBankrupt
//   .loseMoney--
//   .points--
//   return result as 0
// } 

// loseAturn: function{
//   this.wheel_selectLoseAturn
//   .points == .points 
// }

// spinWheel: function(){
//   this.wheel, spin
//   if .points["bankrupt",3500,"wild",900,"EXPRESS 1000$",600, 650,"Gift", 700,1000000, 600, 550, 500,600,"bankrupt,"650,"FREE PLAY",700,"loseAturn", 800, 500,650,500,900"bankrupt", 3500,]

//   if select bankrupt

//   if select loseAturn

// }


// correctLetter: function{
//   while(this.tries > 0 && this.correctLetter != this.answer.length){
//        this.guess(); && .ponts++
//   }
// }

// incorrectLetter: function{
//   this.points == same 
// }


// points: function{
//   .correct letters == select.points++
//   .bankrupt == 0--
// }

// display: function{

// }