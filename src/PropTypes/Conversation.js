const PropTypes = require("prop-types");

module.exports =  PropTypes.shape({
	_id: PropTypes.string.isRequired,
	dateCreated: PropTypes.object.isRequired,
	dateModified: PropTypes.object.isRequired,
	users: PropTypes.arrayOf(PropTypes.string.isRequired),
	events: PropTypes.arrayOf(
		PropTypes.shape({
			user: PropTypes.string.isRequired,
			message: PropTypes.string.isRequired,
			dateTimePosted: PropTypes.string.isRequired
		})
	)
});
