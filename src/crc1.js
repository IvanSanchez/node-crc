import defineCrc from './define_crc';

const crc1 = defineCrc('crc1', function (buf, previous) {
  let crc = ~~previous;
  let accum = 0;

  for (let index = 0; index < buf.length; index++) {
    const byte = buf[index];
    accum += byte
  }

  crc += accum % 256
  return crc % 256;
});

export default crc1;
