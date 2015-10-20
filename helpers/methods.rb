def addHTTP(str)
	(str.length>0)  ?  return (str.downcase[0..3]==='http') ? str : 'http://'+str  :  return nil
end