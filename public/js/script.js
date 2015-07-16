$(function(){
	$.get(
		'/jobs',
		function(data){
			console.log(data);
		}
	);
})