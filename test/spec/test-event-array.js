var assert = require('assert'),
    EventArray = require('../../lib/util/event-array');

var array = new EventArray();
array.onAddElement(function(element) {
  console.log("Added element " + element);
});

array.push(1, 2, 3);
console.log("DONE");
/*
 * Make sure EventArray is working properly
 */
/*
describe('EventArray', function() {
  describe('#ctor()', function() {
    it('should list prototype props', function() {
      
    });
  });
});
*/
