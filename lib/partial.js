const thru = require("./thru");

/**
 * Create partially applied transform.  Chunks that don't pass the filter are
 * passed through unchanged.
 * @param {function} filter
 * @param {function} transform
 * @param {function} [flush]
 * @returns {Transform}
 */
function partial(filter, transform, flush) {
    return thru(function(chunk, enc, done) {
        if (filter(chunk)) {
            if (transform.length < 2) {
                transform.call(this, chunk);
                done();
            } else if (transform.length > 2) {
                transform.call(this, chunk, enc, done);
            } else {
                transform.call(this, chunk, done);
            }
        } else {
            this.push(chunk);
            done();
        }
    }, flush);
};

module.exports = partial;
