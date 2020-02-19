"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = require("../utils/is");
var EmptyParamResolver_1 = require("./EmptyParamResolver");
var ObjectParamResolver_1 = require("./ObjectParamResolver");
var BaseParamResolver_1 = require("./BaseParamResolver");
exports.ParamResolver = {
    create: function (di, mix) {
        if (mix == null) {
            return new EmptyParamResolver_1.EmptyParamResolver();
        }
        if (is_1.Is.Object(mix)) {
            return new ObjectParamResolver_1.ObjectParamResolver(di, mix);
        }
        return new BaseParamResolver_1.BaseParamResolver(di, mix);
    },
    createMany: function (di, arr) {
        var out = new Array(arr.length), i = arr.length;
        while (--i !== -1) {
            out[i] = exports.ParamResolver.create(di, arr[i]);
        }
        return out;
    }
};
