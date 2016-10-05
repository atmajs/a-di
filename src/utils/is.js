module.exports = {
	Object: function(mix){
		return mix != null 
			&& typeof mix === 'object' 
			&& mix.toString() === '[object Object]';
	}
};