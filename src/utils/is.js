var is_Object;
(function(){
	is_Object = function(mix){
		return mix != null 
			&& typeof mix === 'object' 
			&& mix.toString() === '[object Object]';
	};
}());
