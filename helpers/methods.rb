def addHTTP(str)
	if(str.length>0) 
		return (str.downcase[0..3]==='http') ? str : 'http://'+str 
	end
end