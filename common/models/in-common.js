module.exports = function(InCommon) {
//checking if validation methods are available in common/models/model.js
	InCommon.validatesLengthOf('name', { min: 5, message: { min: 'Name should be 5+ characters' } });
};
