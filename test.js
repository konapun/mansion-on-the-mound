var entity = require('./lib/entity').entity,
    attributes = require('./lib/player').attributes,
    directions = require('./lib/directions'),
    Tile = require('./lib/tile').Tile;

var start = new Tile(20, 20),
    left = new Tile(20, 20),
    right = new Tile(20, 20),
    up = new Tile(20, 20),
    down = new Tile(20, 20);
    
start.connect(directions.UP, up);
start.connect(directions.DOWN, down);
start.connect(directions.LEFT, left);
start.connect(directions.RIGHT, right);

console.log("---ENTITY---");
var guy = entity.extend({
  name: 'guy'
});
guy.setPosition(start, 10, 10);
console.log("Name: " + guy.name);
console.log("Position: (" + guy.position.x + ", " + guy.position.y + ")");

console.log();
console.log("---PROF---");
var prof = require('./lib/players/professorLongfellow');
prof.setPosition(start, 10, 10);

console.log("Before: " + prof.getAttributeValue(attributes.SPEED));
prof.actions.takeDamage(attributes.SPEED);
console.log("After: " + prof.getAttributeValue(attributes.SPEED));

//prof.actions.move(directions.LEFT);
//prof.actions.move(directions.LEFT);
prof.actions.move(directions.LEFT);
prof.actions.move(directions.LEFT);
console.log("POS: (" + prof.position.x + ", " + prof.position.y + ")");
console.log("Done");
