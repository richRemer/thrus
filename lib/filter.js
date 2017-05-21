const thru = require("./thru");

/**
 * Create transform stream to filter input.
 * @param {function} filter
 * @returns {Transform}
 */
function filter(filter) {
    return thru(function(chunk) {
        if (filter(chunk)) this.push(chunk);
    });
}

module.exports = filter;
