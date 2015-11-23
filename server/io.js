
function socketIO(server){
	require('socket.io').listen(server);
}

exports = module.exports = socketIO