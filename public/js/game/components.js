/*
 * Components around which the game is built.
 *
 * Author: Bremen Braun
 */

var Directions = MansionApp.Directions;

/*
 * An entity that is drawn in 2D on a canvas
 */
Crafty.c('Actor', {
	init: function() {
		this.requires('2D, Canvas');
	},
});

/* This is the player-controlled character. Characters controlled by other
 * players will be NPCs
 */
Crafty.c('Player', {
	init: function() {
		this.requires('Actor, Fourway, Collision, spr_player, SpriteAnimation')
		    .fourway(2)
		
		var player = this;
		var stopMovement = function() {
			player._speed = 0;
			player.pauseAnimation();
			if (player._movement) {
				player.x -= player._movement.x;
				player.y -= player._movement.y;				
			}
		};
		this.onHit('Solid', stopMovement);
		this.onHit('Door', function() {
			console.log("Hit door with " + this.roomsLeft + " rooms left");
			if (this.roomsLeft === 0) {
				console.log("Stopping movement");
				stopMovement();
			}
			else {
				this.roomsLeft--;
			}
		});
		this.onHit('Teleporter', function(results) {
			var teleporter = results[0].obj,
			    destination = teleporter.destination,
			    tilePos = destination.tile.getPosition();
			
			this.x = tilePos.x + destination.x;
			this.y = tilePos.y + destination.y;
		});
		
		this.z = 1; // Tile has a z-index of 0, so draw one layer above
		
		var animation_speed = 200;
		this.reel('PlayerMovingUp',    animation_speed, [[0, 0], [1, 0], [2, 0]])
		    .reel('PlayerMovingRight', animation_speed, [[0, 1], [1, 1], [2, 1]])
		    .reel('PlayerMovingDown',  animation_speed, [[0, 2], [1, 2], [2, 2]])
		    .reel('PlayerMovingLeft',  animation_speed, [[0, 3], [1, 3], [2, 3]]);
		
		
    // Watch for a change of direction and switch animations accordingly
		this.bind('NewDirection', function(data) {
			if (data.x > 0) {
				this.animate('PlayerMovingRight', -1);
			}
			else if (data.x < 0) {
				this.animate('PlayerMovingLeft', -1);
			}
			else if (data.y > 0) {
				this.animate('PlayerMovingDown', -1);
			}
			else if (data.y < 0) {
				this.animate('PlayerMovingUp', -1);
			}
			else {
				stopMovement();
			}
		});
	},
	
	/*
	 * Set character's x and y coords relative to a given tile
	 */
	setPosition: function(tile, x, y) {
		var tilepos = tile.getPosition();
		
		this.x = tilepos.x + x;
		this.y = tilepos.y + y;
	},
	
	/*
	 * Check each health attribute. If any attribute's index is 0, the player
	 * is not alive.
	 */
	isAlive: function() {
		var alive = true;
		['sanity', 'strength', 'speed', 'knowledge'].some(function(el, ind) {
			if (this[el].index === 0) {
				alive = false;
				return true; // premature break from `some` loop
			}
		});
		
		return alive;
	},
	
	getSanity: function() {
		return this._getPropValue('sanity');
	},
	
	incrementSanity: function(levels) {
		return this._runPropChange('sanity', levels);
	},
	
	decrementSanity: function(levels) {
		return this._runPropChange('sanity', levels, true);
	},
	
	getKnowledge: function() {
		return this._getPropValue('knowledge');
	},
	
	incrementKnowledge: function(levels) {
		return this._runPropChange('knowledge', levels);
	},
	
	decrementKnowledge: function(levels) {
		return this._runPropChange('knowledge', levels, true);
	},
	
	getSpeed: function() {
		return this._getPropValue('speed');
	},
	
	incrementSpeed: function(levels) {
		return this._runPropChange('strength', levels);
	},
	
	decrementSpeed: function(levels) {
		return this._runPropChange('strength', levels, true);
	},
	
	getStrength: function() {
		return this._getPropValue('strength');
	},
	
	incrementStrength: function(levels) {
		return this._runPropChange('strength', levels);
	},
	
	decrementStrength: function(levels) {
		return this._runPropChange('strength', levels, true);
	},
	
	rollDice: function(ndice) {
		ndice = typeof ndice === 'undefined' ? 1 : ndice;
		
		var total = 0;
		for (var i = 0; i < ndice; i++) {
			total += Dice.roll();
		}
		
		return total;
	},
	
	/*
	 * Increment or decrement a health attribute
	 */
	_runPropChange: function(attr, levels, minus) {
		levels = typeof levels === 'undefined' ? 1 : levels;
		minus = typeof minus === 'undefined' ? false : minus;
		
		if (levels == 0) {
			return this._getPropValue(attr);
		}
		else {
			if (minus) { // decrement prop index
				if (this[attr].index > 0) {
					this[attr].index--;
				}
				else {
					levels = 0;
				}
			}
			else { // increment prop index
				if (this[attr].index < this[attr].values.length-2) {
					this[attr].index++;
				}
				else {
					levels = 0;
				}
			}
			this._runPropChange(attr, levels-1, minus);
		}
	},
	
	/*
	 * Get the value for a health attribute
	 */
	_getPropValue: function(attr) {
		return this[attr].values[this[attr].index];
	}
});

/*
 * Through the game, a player has a chance to gain a minion which follows the
 * player around and can do additional things
 */
Crafty.c('Minion', {
	init: function() {
		this.requires('Actor'); //TODO: should create a component for anything that can move/collide
		this.attr({
			following: false,
			owner: null, // the player who owns this minion
		});
		
		var owner = this.owner;
		if (owner) {
			this.follow(owner); // automatically follow if minion has an owner
		}
		
		if (this.following) {
			
		}
	},
	
	/*
	 * Follow a player as they move about
	 */
	follow: function(player) {
		this.owner = player;
		this.following = true;
	},
	
	unfollow: function() {
		this.following = false;
	},
	
	disown: function() {
		this.owner = null;
		this.following = false;
	},
	
	/*
	 * Attempt to go to coords (x, y) relative to the given tile
	 */
	goToPoint: function(tile, x, y) {
		//TODO
	}
});

/*
 * An entity which can be placed on a tile for the sole purpose of generating a
 * collision event
 */
Crafty.c('Block', {
	init: function() {
		this.requires('2D, Collision');
		this.attr({ // coordinates relative to their position on the tile, default: top left corner of tile
			_relx: 0,
			_rely: 0
		});
	}
});

/*
 * When creating blocks on concrete tile initialization, each block which
 * represents a door should consume this component in order to limit a player's
 * movement on the board to their incrementor, which decreases each time a door
 * is moved through
 */
Crafty.c('Door', {
	init: function() {
		this.requires('Block');
	}
});

/*
 * A block that when collided with sends the player to a different location.
 * This is used with the grand staircase and upper landing blocks, for instance,
 * to make it appear as if the player has traversed the staircase
 */
Crafty.c('Teleporter', {
	init: function() {
		this.requires('Block');
		this.attr({
			destination: {
				tile: undefined,
				x: 0,
				y: 0
			}
		});
	},
	
	/*
	 * Create a teleporter entity which, when touched, will send the character
	 * to tile `tile` with coordinates (x, y) relative to the tile
	 */
	teleporter: function(tile, x, y) {
		this.destination.tile = tile;
		this.destination.x = x;
		this.destination.y = y;
	}
});

/*
 * Gameplay takes place in a random-discovery fashion facilitated by tiles.
 * Each turn, there's a possibilty for a new tile to be revealed and placed
 * onto the game board
 */
Crafty.c('Tile', {
	init: function() {
		this.requires('Actor, Image');
		this.attr({ // the consumer of this component should set these on in its init
			exits: [], // array of Directions
			floors: [], // where in the mansion the tile is allowed to be placed (some tiles may be allowed on more than one floor)
			blocks: [], // blocks on the tile with given properties (e.g. mapping out areas the player collides with, walls, doors,  etc
			links: { // connections to other tiles, set via `this.connectTile()`. There may only be links in directions contained in the exits array
				left: null,
				right: null,
				up: null,
				down: null
			},
			
			// attrs needed for certain scenarios 
			hasWindows: false,
			isOutdoors: false
		});
		
		this.w = 188;
		this.h = 188;
		this.z = 0; // nothing should draw below the tile
	},
	
	/*
	 * Return the coordinates of this tile relative to the game board
	 */
	getPosition: function() {
		return {
			x: this._x,
			y: this._y
		};
	},
	
	/*
	 * Allow tile's blocks to be re-placed dynamically each time the tile is
	 * moved.
	 */
	setPosition: function(x, y) {
		this.x = x;
		this.y = y;
		this._recalculateBlockPositions();
		
		// reposition each tile attached to this
		// TODO
	},
	
	/*
	 * Create a rectangular area with a given set of properties (such as z-index
	 * or collidable). A block's position is relative to this tile and is
	 * updated as the tile is rotated. Since the tiles are provided as single
	 * images, most blocks will be transparent and placed over areas on the tile
	 * image to provide the illusion of actual objects.
	 */
	createRectangle: function(x, y, width, height, attrs) {
		attrs = typeof attrs === 'undefined' ? {} : attrs;
		
		var block = Crafty.e('2D');
		block._relx = x;
		block._rely = y;
		block.x = this._x + block._relx;
		block.y = this._y + block._rely;
		block.w = width;
		block.h = height;
		
		this.blocks.push(this._assignBlockAttrs(block, attrs));
		return block;
	},
	
	/*
	 * If a property starts with a capital letter, assume it's a component
	 * to compose into the block. Else, assume it's a property
	 */
	_assignBlockAttrs: function(block, attrs) {
		for (var prop in attrs) {
			var val = attrs[prop];
			
			if (/[A-Z]/.test(prop[0])) {
				if (val) {
					block.addComponent(prop);
				}
				else {
					block.removeComponent(prop);
				}
			}
			else {
				block[prop] = val;
			}
		}
		
		return block;
	},
	
	/*
	 * Shortcut method for creating blocks to act as walls with gap(s) for
	 * door(s). Uses `createBlock` behind the scenes
	 */
	createWalls: function(thickness, gaps) {
		gaps = typeof gaps === 'undefined' ? [] : gaps;
		
		// TODO
	},

	/*
	 * Rotate a tile clockwise by default
	 */
	rotate: function(counterclockwise) {
		counterclockwise = typeof counterclockwise === 'undefined' ? false : counterclockwise;
		
		// Rotate the exits
		var newExits = [];
		this.exits.forEach(function(el) {
			newExits.push(Directions.rotate(el, counterclockwise));
		});
		this.exits = newExits;
		
		// Rotate the blocks FIXME
		this.blocks.forEach(function(el) {
			var oldX = el._x,
			    oldY = el._y;
			
			//TODO
		});
		
		// Rotate the graphic
		this.rotation += counterclockwise ? -90 : 90;
	},
	
	/*
	 * Return whether or not an exit exits in a given direction.
	 * This method is sensitive to the tile's rotation for ease of use 
	 */
	hasExit: function(direction) {
		return this.exits.indexOf(direction) >= 0;
	},
	
	/*
	 * Connect this tile to another tile in a given direction.
	 * By default, bidirectional linking is performed between the two tiles. The
	 * bidirectional linking is done by connecting the given direction of the
	 * current tile to the direction's reverse on the target tile.
	 * (ex: `this.connectTile(Directions.LEFT, tile2)` connects this to the
	 * RIGHT edge of tile2). Enforces the condition that both tiles must be
	 * able to be placed on the same floor.
	 */
	connectTile: function(direction, tile, bidirectional) {
		bidirectional = typeof bidirectional === 'undefined' ? true : bidirectional;
		
		// Make sure these tiles are on the same floor
		var areSameFloor = false;
		for (var i in this.floors) {
			if (tile.floors.indexOf(this.floors[i]) > -1) {
				areSameFloor = true;
				break;
			}
		}
		if (!areSameFloor) return false;
		
		// Make sure there's an exit in the given direction, and that direction's reverse for bidirectional connects on the other tile
		if (!this.hasExit(direction)) {
			return false;
		}
		if (bidirectional) {
			var reversed = Directions.reverse(direction);
			if (!tile.hasExit(reversed)) {
				return false;
			}
			
			tile.links[reversed] = this;
		}
		
		// TODO: Clean this up
		if (direction === Directions.LEFT) {
			tile.x = this._x - this._w;
			tile.y = this._y;
		}
		else if (direction === Directions.RIGHT) {
			tile.x = this._x + this._w;
			tile.y = this._y;
		}
		else if (direction === Directions.UP) {
			tile.x = this._x;
			tile.y = this._y - this._h;
		}
		else if (direction === Directions.DOWN) {
			tile.x = this._x;
			tile.y = this._y + this._h;
		}
		
		this.links[direction] = tile;
		tile._recalculateBlockPositions();
		return true;
	},
	
	/*
	 * When a tile is rotated or placed somewhere else on the board, its blocks
	 * have to be updated as well
	 */
	_recalculateBlockPositions: function() {
		var tile = this;
		this.blocks.forEach(function(block) {
			block.x = tile._x + block._relx;
			block.y = tile._y + block._rely;
		});
	}
});

Crafty.c('Card', {
	init: function() {
		this.requires('Actor, Color').color('rgb(20, 125, 40)');
		this.attr({
			isFaceUp: false
		});
	},
	
	/*
	 * Flipping a card from front to back or vice versa
	 */
	flip: function() {
		//TODO
		this.isFaceUp = !this.isFaceUp;
	}
	
});

/*
 * Heads-up-display for showing user stats and anything else that should persist
 * over other on-screen elements
 *
 * https://groups.google.com/forum/#!msg/craftyjs/fDf1BTzs9pM/xt_0NFptCqcJ
 */
Crafty.c('HUD', {
	init: function() {
		this.requires('2D');
		this.attr({
			hidden: false
		});
	},
	
	show: function() {
	
	},
	
	hide: function() {
	
	},
	
	toggle: function() {
		if (this.hidden) {
			this.show();
		}
		else {
			this.hide();
		}
	}
});

/*
 * The player's attributes meter
 */
Crafty.c('PlayerAttributesHUD', {
	init: function() {
		this.requires('HUD');
		this.attr({
			player: null // player this attributes meter represents
		});
	}
	
	// TODO
});

/*
 * A floating map
 */
Crafty.c('MapHUD', {
	init: function() {
		this.requires('HUD');
		
		var players = Crafty('Player');
		players.forEach(function(player) {
			var px = player.x,
			    py = player.y;
				
			//TODO
		});
	}
});

/*
 * UI Area for drawn cards
 */
Crafty.c('CardsHUD', {

});
