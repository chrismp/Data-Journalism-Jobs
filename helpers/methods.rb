def addHTTP(str)
	return (str.downcase[0..3]==='http') ? str : 'http://'+str 
end