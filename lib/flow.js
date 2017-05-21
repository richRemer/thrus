const Readable = require("stream").Readable;
const assign = Object.assign;

/**
 * Create readable stream from array of chunks.
 * @param {array} chunks
 * @param {string} encoding
 * @returns {Readable}
 */
function flow(chunks) {
    var readable = new Readable({objectMode: true});

    if (encoding) readable.setEncoding(encoding);

    assign(readable, {
        _read: function() {
            chunks.forEach(chunk => this.push(chunk));
            this.push(null);
        }
    });

    return readable;
}

module.exports = flow;
