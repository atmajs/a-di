var obj = require('./obj');
var Arr = require('../utils/arr');

module.exports = {
	create: createClassFactory(obj.extendDefaults)
};

function createClassFactory(extendDefaultsFn) {
	return function(){
		var args = Arr.from(arguments),
			Proto = args.pop();
		if (Proto == null)
			Proto = {};

		var Ctor;

		if (Proto.hasOwnProperty('constructor')) {
			Ctor = Proto.constructor;
			if (Ctor.prototype === void 0) {
				var es6Method = Ctor;
				Ctor = function ClassCtor () {
					var imax = arguments.length, i = -1, args = new Array(imax);
					while (++i < imax) args[i] = arguments[i];
					return es6Method.apply(this, args);
				};
			}
		}
		else {
			Ctor = function ClassCtor () {};
		}

		var i = args.length,
			BaseCtor, x;
		while ( --i > -1 ) {
			x = args[i];
			if (typeof x === 'function') {
				BaseCtor = wrapFn(x, BaseCtor);
				x = x.prototype;
			}
			extendDefaultsFn(Proto, x);
		}
		return createClass(wrapFn(BaseCtor, Ctor), Proto);
	};
}

function createClass(Ctor, Proto) {
	Proto.constructor = Ctor;
	Ctor.prototype = Proto;
	return Ctor;
}
function wrapFn(fnA, fnB) {
	if (fnA == null) {
		return fnB;
	}
	if (fnB == null) {
		return fnA;
	}
	return function(){
		var args = Arr.from(arguments);
		var x = fnA.apply(this, args);
		if (x !== void 0)
			return x;

		return fnB.apply(this, args);
	};
}
