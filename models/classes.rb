# [
# 	'open-uri',
# 	'openssl',
# 	'json'
# ].each{|g|
# 	require g
# }

class GSheet
	def sheetId= sheetId
		@sheetId = sheetId
	end

	def showData
		url1 = 'https://spreadsheets.google.com/feeds/list/'
		url2 = '/1/public/values?alt=json'
		fullURL = url1+@sheetId+url2
		responseJSON = open(
			fullURL, 
			:ssl_verify_mode=>OpenSSL::SSL::VERIFY_NONE
		).read

		responseHash = JSON.parse(responseJSON)
		rowsArray = responseHash['feed']['entry']
		return rowsArray
	end
end