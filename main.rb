[
	'sinatra',
	'open-uri',
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
	jobListingDataArray.each{|jobData|
		g = 'gsx$'
		t = '$t'

		returnHash = {
			:jobTitle => jobData[g+'jobtitle'][t],
			:company => jobData[g+'company'][t],
			:jobDescription => jobData[g+'jobdescription'][t],
			# :skillsArray => jobData[g+'skillsrequired'][t].split(',').map{|skill| skill.strip},
			:skills => jobData[g+'skillsrequired'][t],
			:location => jobData[g+'location'][t],
			:url => jobData[g+'websiteurl'][t],
			:apply => jobData[g+'howtoapply'][t],
			:reqEducation => jobData[g+'minimumeducationrequired'][t],
			:reqYearsExp => jobData[g+'minimumyearsofexperiencerequired'][t],
			:internship => jobData[g+'isthisaninternship'][t],
			:closed => jobData[g+'closed'][t],
			:approved => jobData[g+'approved'][t]
		}
		returnArray << returnHash
	}

	returnJSON = returnArray.to_json
	return returnJSON
end