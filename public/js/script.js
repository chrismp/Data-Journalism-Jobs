$(function(){
	// var tr = 'tr';
	// var th = 'th';
	var $listings = $('#listings');
	var headersArray = [
		'Job',
		'Company',
		'Location',
		'Skills',
		'Education',
		'Years of experience',
		'Job description'
	];
	
	$listings.append('<tr id="header-row"></tr>');
	var $headerRow = $('#header-row');
	
	for (var i=0; i<headersArray.length; i++) {
		var header = headersArray[i];
		$headerRow.append('<th>'+header+'</th>');	
	}

	$.get(
		'/jobs',
		function(data){
			var jobsDataArray = JSON.parse(data);
			for (var i=0; i<jobsDataArray.length; i++) {
				var job = jobsDataArray[i];
				var tdArray = [
					job.jobTitle,
					'<a href="'+job.companyURL+'" target="_blank">'+job.company+'</a>',
					job.jobLocation,
					job.skills,
					job.education,
					job.yearsExp,
					job.jobDescription
				];
				$listings.append()
			}
		}
	)
})