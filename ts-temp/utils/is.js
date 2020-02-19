"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Is = {
    Object: function (mix) {
        return mix != null
            && typeof mix === 'object'
            && mix.toString() === '[object Object]';
    }
};
