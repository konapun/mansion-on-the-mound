/*
 * Directions and operations on directions for player movement, tile connection
 */
module.exports = {
  
	/*
	 * Enum for directions
	 */
	RIGHT: 'right',
	LEFT: 'left',
	DOWN: 'down',
	UP: 'up',
	ABOVE: 'above',
	BELOW: 'below',
	
	/*
	 * Return the reverse of any direction
	 */
	reverse: function(direction) {
		if (direction === this.RIGHT) {
			return this.LEFT;
		}
		if (direction === this.LEFT) {
			return this.RIGHT;
		}
		if (direction === this.UP) {
			return this.DOWN;
		}
		if (direction === this.DOWN) {
			return this.UP;
		}
		
		return direction; // ABOVE and BELOW won't change
	},
	
	/*
	 * Rotate a direction either clockwise (default) or counterclockwise
	 */
	rotate: function(direction, counterclockwise) {
		counterclockwise = typeof counterclockwise === 'undefined' ? false : counterclockwise;
		
		var rotated = direction;
		if (direction === this.RIGHT) {
			rotated = this.DOWN;
		}
		else if (direction === this.LEFT) {
			rotated = this.UP;
		}
		else if (direction === this.UP) { 
			rotated = this.RIGHT;
		}
		else if (direction === this.DOWN) {
			rotated = this.LEFT;
		}
		
		if (counterclockwise) {
			rotated = this.reverse(rotated);
		}
		
		return rotated;
	}
};
