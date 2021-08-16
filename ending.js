$(document).ready(function(){
	$(this).click(function(){
		playsound("#victorysound");
		$("#cofefe").show()
		let width = $("html").width();
		let move = width-100-($("#swag").width())
		$
		$("#swagcontainer").animate({
			left: "+="+move
		},5000)
	})
	
})
function playsound(id){
	$(id)[0].pause();
  	$(id)[0].load();
	$(id)[0].play();
}