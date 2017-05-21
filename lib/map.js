const thru = require("./thru");

/**
 * Create transform stream to map input values.
 * @param {function} map
 * @returns {Transform}
 */
function map(map) {
    return thru(function(chunk) {
        this.push(map(chunk));
    });
}

module.exports = map;
