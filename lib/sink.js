const Writable = require("stream").Writable;
const assign = Object.assign;

/**
 * Create writable stream, which saves written chunks to the .chunks property
 * and corresponding encodings to the .encodings property.
 * @returns {Writable}
 */
function sink() {
    const chunks = [];
    const encodings = [];

    return assign(new Writable({objectMode: true}), {
        _write: function(chunk, enc, done) {
            chunks.push(chunk);
            encodings.push(enc);
            done();
        },
        chunks: chunks,
        encodings: encodings
    });
}

module.exports = sink;
