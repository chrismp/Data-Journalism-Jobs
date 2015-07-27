function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function moreLessText(i, jobDescriptionOpenerClicked, jobDescriptionLite, jobDescription){
	return function(){
		if(jobDescriptionOpenerClicked===false){
			this.parentNode.innerHTML = jobDescription+' <a href="#" id="'+i+'" class="job-description-opener">Less</a>';
			// jobDescriptionOpenerClicked = true;
			// this.onclick = function(){moreLessText(jobDescriptionOpenerClicked, jobDescriptionLite, jobDescription)};
		} else {
			this.parentNode.innerHTML = jobDescriptionLite+' <a href="#" id="'+i+'" class="job-description-opener">More</a>';
			jobDescriptionOpenerClicked = false;
		}
		
	}
}

