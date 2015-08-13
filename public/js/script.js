$(function(){
	// var tr = 'tr';
	// var th = 'th';
	var $listings = $('#listings');
	var headersArray = [
		'Job',
		'Company',
		'Location',
		'Skills',
		// 'Education',
		// 'Years of experience',
		'Details',
		'Apply',
		'Date submitted'
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
				var applyString = job.apply;
				var applyHref = validateEmail(applyString)===true ? '"mailto:'+applyString+'"' : '"'+applyString+'" target="_blank"';
				applyString = validateEmail(applyString)===true ? applyString : "Apply here";
				var jobDescription = job.jobDescription;
				var jobDescriptionLite = jobDescription.match(/.*?\./);
				var singleJobDataArray = [
					'<a href="'+job.moreInfoURL+'" target="_blank">'+job.jobTitle+'</a>',
					'<a href="'+job.companyURL+'" target="_blank">'+job.company+'</a>',
					job.jobLocation,
					job.skills.replace(/\,/g, ', '),
					// job.education,
					// job.yearsExp,
					'<span class="job-description-wrapper">'+
						jobDescriptionLite+' <a href="#" id="'+i+'" class="job-description-opener">More</a>'+
					'</span>',
					'<a href='+applyHref+'>'+applyString+'</a>',
					job.submitted
				];
				var singleJobTDArray = singleJobDataArray.map(function(tdContent){
					return '<td>'+tdContent+'</td>';
				});

				$listings.append('<tr>'+singleJobTDArray+'</td>');

				var jobDescriptionOpenerClicked = false;
				$('#'+i).click(moreLessText(i, jobDescriptionOpenerClicked, jobDescriptionLite, jobDescription));
			}
	// $('.'+jobDescriptionOpener).each(
	// 	function(i,obj){
	// 		var 
	// 	}
	// );
		}
	);
})