module.exports = function(InServer) {
	
	//checking if validation methods are available in server/models/model.js
	InServer.validatesLengthOf('name', { min: 5, message: { min: 'Name should be 5+ characters' } });

};
