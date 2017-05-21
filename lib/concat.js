const thru = require("./thru");

/**
 * Create transform stream to concatenate consecutive string input.
 * @returns {Transform}
 */
function concat() {
    var s = "";

    return thru(function(chunk) {
        if (typeof chunk === "string") {
            s += chunk;
        } else {
            if (s) this.push(s);
            s = "";
            this.push(chunk);
        }
    }, function() {
        if (s) this.push(s);
    });
}

module.exports = concat;
