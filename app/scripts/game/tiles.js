/*
 * A blank (invisible) tile used as a spacer
 */
Crafty.c('BlankTile', {
	init: function() {
		this.requires('Tile');
		
		this._w = 20; // no use in wasting all that space...
		this._h = 20;
		
		// Can place this tile anywhere
		this.exits = [Directions.LEFT, Directions.RIGHT, Directions.UP, Directions.DOWN];
		this.floors = [Floors.BASEMENT, Floors.GROUND, Floors.UPPER];
	}
});

/* These four tiles are connected to begin the start state */
Crafty.c('EntranceHallTile', {
	init: function() {
		this.requires('Tile');
		
		this.image("images/tiles/entrancehall.jpg");
		this.exits = [Directions.LEFT, Directions.UP, Directions.DOWN];
		this.floors = [Floors.GROUND];
	}
});
Crafty.c('FoyerTile', {
	init: function() {
		this.requires('Tile');
		
		this.image("images/tiles/foyer.jpg");
		this.exits = [Directions.LEFT, Directions.RIGHT, Directions.UP, Directions.DOWN];
		this.floors = [Floors.GROUND];
	}
});
Crafty.c('GrandStaircaseTile', {
	init: function() {
		this.requires('Tile');
		
		this.image("images/tiles/grand-staircase.jpg");
		this.exits = [Directions.LEFT, Directions.RIGHT];
		this.floors = [Floors.GROUND, Floors.UPPER]; // even though this won't be on the upper floor, it connects to the upper
		
		this.createRectangle(0, 0, 60, 60, { // TEST!!
			Door: true
		});
		/*
		var landingWarp = this.createRectangle(0, 49, 15, 91, {
			Teleporter: true
		});
		
		landingWarp.destination.tile = this;
		landingWarp.destination.x = 188;
		landingWarp.destination.y = 188;
		*/
	}
});
Crafty.c('UpperLandingTile', {
	init: function() {
		this.requires('Tile');
		
		this.image("images/tiles/upper-landing.jpg");
		this.exits = [Directions.LEFT, Directions.RIGHT, Directions.UP, Directions.DOWN];
		this.floors = [Floors.UPPER];
	}
});

Crafty.c('ConservatoryTile', {
	init: function() {
		this.requires('Tile');
		
		this.image("images/tiles/conservatory.jpg");
		this.exits = [Directions.LEFT, Directions.UP];
		this.floors = [Floors.UPPER];
		
		// Objects in the room
		this.createRectangle(62, 65, 66, 66, { // the well TODO: change to createCircle
			Solid: true,
			visible: false
		});
		this.createRectangle(18, 128, 37, 42, { // the bench TODO: change to createPolygon
			Solid: true,
			visible: false
		});
		this.createRectangle(81, 152, 24, 24, { // the statue pedestal thing
			Solid: true,
			visible: false
		});
		
		/*
		this.createRectangle(81, 152, 24, 24, { // the window thing
			Actor: true,
			Canvas: true,
			Color: true,
			Tint: true,
			color: "#ffffff",
			strength: 0.3,
			z: 2 // one level above the player
		});
		*/
		
	}
});
