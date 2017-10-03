
let castToBytes;

if (typeof Uint8Array !== 'undefined' && Uint8Array.from &&
    typeof TextDecoder !== 'undefined') {

    const utf8Decoder = new TextDecoder('utf-8');

    castToBytes = function (arr) {
        if (arr instanceof Uint8Array) {
            return arr;
        } else if (typeof arr === 'string') {
            return utf8Decoder(arr);
        } else {
            return Uint8Array.from(arr);
        }
    }
} else {
    const Buffer = require('buffer').Buffer;

    castToBytes = Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow
        ? (arr) => Buffer.isBuffer(arr) ? arr : Buffer.from(arr)

        // support for Node < 5.10
        : (arr) => Buffer.isBuffer(arr) ? arr : new Buffer(arr)
        ;
}


export default function (model, calc) {
  const fn = (buf, previous) => calc(castToBytes(buf), previous) >>> 0;
  fn.signed = calc;
  fn.unsigned = fn;
  fn.model = model;

  return fn;
}
