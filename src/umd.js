(function (root, factory) {
    'use strict';


    var _name = 'di',
        _global = typeof window === 'undefined' ? global : window,
        _module = {
            exports: {}
        };

    factory(_global, _module, _module.exports);

    if (_global[_name] == null) {
        _global[_name] = _module.exports;
    }

    if (typeof module === 'object' && module.exports) {
        module.exports = _module.exports;
        return;
    }
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return _module.exports;
        });
    }

}(this, function (global, module, exports) {
    'use strict';

    /**MODULE**/

}));
