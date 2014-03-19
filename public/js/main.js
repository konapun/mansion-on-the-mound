// TODO Grunt browserify task pulls in all game scripts
var socket = io.connect('http://localhost');
socket.on('connect', function(data) {
	alert("GOT CONNECT");
});


var players = [

];
window.addEventListener('load', Game.start(players));
