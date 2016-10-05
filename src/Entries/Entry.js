var ParamResolver = require('../Params/ParamResolver');
var opts = require('../const');
var Arr = require('../utils/arr');
var { create: class_create } = require('../utils/class');

module.exports = class_create({
	
	constructor (di) {
		this.di = di;

		this._as = [];
		this._using = [];
		this._params = [];
		this._resolvers = [];

		this.cfg_arguments = opts.args.OVERRIDE;

		this.onActivated = null;
	},

	config (key, value) {
		var prop = 'cfg_' + key;
		if (this[prop] === void 0) {
			throw new Error('Configuration key is not supported: ' + key);
		}
		this[prop] = value;
		return this;
	},

	using () {
		var args = Arr.from(arguments);
		this._using.push.apply(this._using, args);


		var resolvers = new Array(args.length),
			imax = args.length,
			i = -1;
		while( ++i < imax ) {
			resolvers[i] = ParamResolver.create(this.di, args[i]);
		}

		this._resolvers.push.apply(this._resolvers, resolvers);	
		return this;
	},

	as () {
		var args = Arr.from(arguments);
		this._as.push.apply(this._as, args);

		var i = args.length, entries = this.di.entries;
		while(--i > -1) {
			entries.registerFor(args[i], this);			
		}
		return this;
	},

	register () {
		var coll = this.di.entries;
		coll.removeFor(this.Entry());
		coll.add(this);
		return this;
	},

	asSelf () {
		this.di.entries.registerFor(this.Entry(), this);
		return this;
	},

	resolve () {
		throw new Error('Not implemented');
	},

	onActivated (fn) {
		this.onActivated = fn;
	},

	Entry () {
		throw new Error('Not implemented')
	}
});