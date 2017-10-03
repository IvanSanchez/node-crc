'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var createBuffer = void 0;

if (typeof Uint8Array !== 'undefined' && Uint8Array.from) {
    createBuffer = Uint8Array.from;
} else {
    var Buffer = require('buffer').Buffer;

    createBuffer = Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow ? Buffer.from

    // support for Node < 5.10
    : function (val) {
        return new Buffer(val);
    };
}

exports.default = createBuffer;