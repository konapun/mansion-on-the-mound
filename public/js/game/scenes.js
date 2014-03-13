
/*
 * Main game loop
 */
Crafty.scene('Game', function() {
	var testPlayer = Crafty.e('Player'),
	    players = [testPlayer];
	    
	// build the initial map setup
	var entranceHall = Crafty.e('EntranceHallTile'),
	    foyer = Crafty.e('FoyerTile'),
	    staircase = Crafty.e('GrandStaircaseTile'),
	    landing = Crafty.e('UpperLandingTile'),
	    blank = Crafty.e('BlankTile');
	
	entranceHall.setPosition(0, 0);
	
	foyer.connectTile(Directions.LEFT, staircase);
	entranceHall.connectTile(Directions.LEFT, foyer);
	foyer.connectTile(Directions.LEFT, staircase);
	staircase.connectTile(Directions.LEFT, blank);
	blank.connectTile(Directions.LEFT, landing);
	
	/*
	// Place all players onto the starting tile
	var spawnX = 138,
	    spawnY = 94;
	Game.players.forEach(function(player) {
		player.setPosition(entranceHall, spawnX, spawnY);
		spawnX += player._w;
		spawnY += player._y;
	});
	*/
	testPlayer.setPosition(entranceHall, 138, 94);
	
	Crafty.audio.play('theme', -1); // -1: repeat forever
	Crafty.viewport.follow(testPlayer, 0, 0); // http://craftyjs.com/api/Crafty-viewport.html
});

/*
 * Scene triggered when a player moves to a different tile
 */
Crafty.scene('SwitchRoom', function() {
	
});

/*
 * Scene to play before game starts
 */
Crafty.scene('Intro', function() {
	Crafty.e('2D, DOM, Text')
		.text('A Mystery at the Mansion on the Mound')
		.attr({
			x: 0,
			y: Game.height() / 2 - 24,
			w: Game.width()
		});
});

/*
 * Scene to play when player has won
 */
Crafty.scene('Win', function() {

});

/*
 * Scene to play when player has lost
 */
Crafty.scene('Lose', function() {

});

/* Loading scene
 *
 * Handles the loading of binary assets such as images and audio files
 */
Crafty.scene('Loading', function() {
	Crafty.e('2D, DOM, Text')
		.text('Loading; please wait...')
		.attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
		.css($text_css);
 
    // Load spritemaps
	Crafty.load([
		'images/characters/hunter.png',
		'sound/music/main-theme.mp3',
		'sound/music/main-theme.ogg'
	], function() { // after the images are loaded, define sprites from the map        
		Crafty.sprite(16, 'images/characters/hunter.png', {
			spr_player:  [0, 2]
		}, 0, 2);
	 
		// Define audio with fallback formats
		Crafty.audio.add({
			theme:    ['sound/music/main-theme.mp3', 'sound/music/main-theme.ogg']
		});
	 
		// Loading complete; start game scene
		Crafty.scene('Game');
	});
});
