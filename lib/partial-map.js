const thru = require("./thru");

/**
 * Create transform stream to map filtered input values, and pass through the
 * rest.
 * @param {function} filter
 * @param {function} map
 * @returns {Transform}
 */
function partialMap(filter, map) {
    return thru(function(chunk) {
        this.push(filter(chunk) ? map(chunk) : chunk);
    });
}

module.exports = partialMap;
