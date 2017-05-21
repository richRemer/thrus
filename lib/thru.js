const Transform = require("stream").Transform;

/**
 * Create transform stream.
 * @param {function} transform
 * @param {function} [flush]
 * @returns {Transform}
 */
function thru(transform, flush) {
    const t = new Transform({objectMode: true});

    if (transform.length < 1 || transform.length > 3) {
        throw new Error("unexpected transform length");
    }

    if (flush && flush.length > 1) {
        throw new Error("unexpected flush length");
    }

    t._transform = function(chunk, enc, done) {
        switch (transform.length) {
            case 1: transform.call(this, chunk); done(); break;
            case 2: transform.call(this, done); break;
            case 3: transform.call(this, chunk, enc, done); break;
            default:
                throw new Error("unexpected transform length");
        }
    };

    if (flush) t._flush = function(done) {
        switch (flush.length) {
            case 0: flush.call(this); done(); break;
            case 1: flush.call(this, done); break;
            default:
                throw new Error("expected flush length");
        }
    };

    return t;
}

module.exports = thru;
