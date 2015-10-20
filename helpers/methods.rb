def addHTTP(str)
	return (str.downcase[0..3]==='http' && str.length>0) ? str : 'http://'+str 
end