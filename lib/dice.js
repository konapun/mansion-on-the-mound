/*
 * A six-sided die, but die sounds scarier than dice even though it's more correct...
 */
module.exports = {
	roll: function() {
		return Math.floor(Math.random() * 6) + 1; // number between 1 and 6
	}
};
