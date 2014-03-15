// Grunt browserify task pulls in all game scripts
/*
var socket = io.connect('http://localhost');
socket.on('news', function(data) {
	alert(data);
	socket.emit('my other event', {
		my: 'data'
	});
});
*/

var players = [

];
window.addEventListener('load', Game.start(players));
