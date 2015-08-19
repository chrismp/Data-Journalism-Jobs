$(function(){
	var $listings = $('#listings');
	var headersArray = [
		'Job',
		'Company',
		'Location',
		'Salary',
		'Skills',
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
				var jobTitle = job.jobTitle;
				var moreInfoURLHrefArray;

				if(job.moreInfoURL===''){
					moreInfoURLHrefArray = ['',''];
				} else {
					moreInfoURLHrefArray = [
						'<a href="'+job.moreInfoURL+'" target="_blank">',
						'</a>'
					];
				}

				if(job.internship==='Yes, paid'){
					jobTitle+=' <b>(Paid internship)</b>';
				} else if(job.internship==='Yes, unpaid'){
					jobTitle+=' <b>(Unpaid internship)</b>';
				}
				
				if(job.partTime==='Part time'){
					jobTitle+=' <b>(Part time)</b>';
				}

				var salary = job.pay==='' ? '' : numeral(job.pay).format('$0,0')+'/'+job.payPeriod
				var applyString = job.apply;
				var applyHref = validateEmail(applyString)===true ? '"mailto:'+applyString+'"' : '"'+applyString+'" target="_blank"';
				applyString = validateEmail(applyString)===true ? applyString : "Apply here";
				var jobDescription = job.jobDescription;
				var jobDescriptionLite = jobDescription.match(/.*?\./);
				var singleJobDataArray = [
					moreInfoURLHrefArray[0]+job.jobTitle+moreInfoURLHrefArray[1],
					'<a href="'+job.companyURL+'" target="_blank">'+job.company+'</a>',
					job.jobLocation,
					salary,
					job.skills.replace(/\,/g, ', '),
					'<span class="job-description-wrapper">'+
						// jobDescriptionLite+' <a href="#" id="'+i+'" class="job-description-opener">More</a>'+
						jobDescription+
					'</span>',
					'<a href='+applyHref+'>'+applyString+'</a>',
					job.submitted
				];
				var singleJobTDArray = singleJobDataArray.map(function(tdContent){
					return '<td>'+tdContent+'</td>';
				});

				$listings.append('<tr>'+singleJobTDArray+'</td>');

				var jobDescriptionOpenerClicked = false;
				// $('#'+i).click(moreLessText(i, jobDescriptionOpenerClicked, jobDescriptionLite, jobDescription));
			}
	// $('.'+jobDescriptionOpener).each(
	// 	function(i,obj){
	// 		var 
	// 	}
	// );
		}
	);
})