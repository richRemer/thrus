const thru = require("./thru");

/**
 * Create transform stream injecting chunks after the input.
 * @param {array} chunks
 * @returns {Transform}
 */
function after(chunks) {
    const append = chunks.slice();

    return thru(function(chunk) {
        this.push(chunk);
    }, function() {
        while (append.length) this.push(append.shift());
    });
}

module.exports = after;
