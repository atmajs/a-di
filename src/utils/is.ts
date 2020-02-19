export const Is  = {
	Object (mix) {
		return mix != null 
			&& typeof mix === 'object' 
			&& mix.toString() === '[object Object]';
	}
};