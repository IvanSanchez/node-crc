'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (model, calc) {
    var fn = function fn(buf, previous) {
        return calc(castToBytes(buf), previous) >>> 0;
    };
    fn.signed = calc;
    fn.unsigned = fn;
    fn.model = model;

    return fn;
};

var castToBytes = void 0;

if (typeof Uint8Array !== 'undefined' && Uint8Array.from && typeof TextDecoder !== 'undefined') {

    var utf8Decoder = new TextDecoder('utf-8');

    castToBytes = function castToBytes(arr) {
        if (arr instanceof Uint8Array) {
            return arr;
        } else if (typeof arr === 'string') {
            return utf8Decoder(arr);
        } else {
            return Uint8Array.from(arr);
        }
    };
} else {
    var Buffer = require('buffer').Buffer;

    castToBytes = Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow ? function (arr) {
        return Buffer.isBuffer(arr) ? arr : Buffer.from(arr);
    }

    // support for Node < 5.10
    : function (arr) {
        return Buffer.isBuffer(arr) ? arr : new Buffer(arr);
    };
}