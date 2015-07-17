[
	'sinatra',
	'open-uri',
	'openssl',
	'json'
].each{|g|
	require g
}

require_relative 'models/classes.rb'

get '/' do 
	erb :index
end

get '/jobs' do 
	returnArray = []
	newGSheet = GSheet.new
	newGSheet.sheetId = ENV['JOBS_GSHEET_ID']
	jobListingDataArray = newGSheet.showData
	# return jobListingDataArray.to_json
	jobListingDataArray.each{|jobData|
		g = 'gsx$'
		t = '$t'
		
		if(jobData[g+'closed'][t].to_i===1 && jobData[g+'approved'][t].to_i!=1)
			next
		end

		returnHash = {
			:jobTitle => jobData[g+'jobtitle'][t],
			:company => jobData[g+'company'][t],
			:jobDescription => jobData[g+'jobdescription'][t],
			# :skillsArray => jobData[g+'skillsrequired'][t].split(',').map{|skill| skill.strip},
			:skills => jobData[g+'skillsrequired'][t],
			:jobLocation => jobData[g+'location'][t],
			:companyURL => jobData[g+'companywebsiteurl'][t],
			:apply => jobData[g+'howtoapply'][t],
			# :education => jobData[g+'minimumeducationrequired'][t],
			# :yearsExp => jobData[g+'minimumyearsofexperiencerequired'][t],
			# :internship => jobData[g+'isthisaninternship'][t],
			:closed => jobData[g+'closed'][t],
			:approved => jobData[g+'approved'][t],
			:submitted => jobData[g+'timestamp'][t].match(/.*(?=\s)/).to_s
		}
		returnArray << returnHash
	}

	returnJSON = returnArray.to_json
	return returnJSON
end