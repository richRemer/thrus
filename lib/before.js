const thru = require("./thru");

/**
 * Create transform stream injecting chunks before the input.
 * @param {array} chunks
 * @returns {Transform}
 */
function before(chunks) {
    const prepend = chunks.slice();

    return thru(function(chunk) {
        while (prepend.length) this.push(prepend.shift());
        this.push(chunk);
    }, function() {
        while (prepend.length) this.push(prepend.shift());
    });
}

module.exports = before;
