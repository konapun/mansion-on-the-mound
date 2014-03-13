/*
 * A stack of cards. Will have a separate stack for each card type
 */
function CardStack(cards) {
	cards = typeof cards === 'undefined' ? [] : cards;
	this.cards = cards;
};

/*
 * Draw from the top of this stack
 */
CardStack.prototype.draw = function() {
	return this.cards.pop();
};

/*
 * Shuffle this stack of cards
 */
CardStack.prototype.shuffle = function() { // adapted from http://jsfromhell.com/array/shuffle
	var cards = this.cards;
	for (var j, x, i = cards.length; i; j = Math.floor(Math.random() * i), x = cards[--i], cards[i] = cards[j], cards[j] = x);
	this.cards = cards;
	return cards;
};

function Card() {
  // TODO
};

exports.CardStack = CardStack;
exports.Card = Card;
