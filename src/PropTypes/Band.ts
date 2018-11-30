import * as PropTypes from "prop-types";

export default PropTypes.shape({
  _id: PropTypes.string.isRequired,
  dateCreated: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.instanceOf(Date)
	]).isRequired,
  dateModified: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.instanceOf(Date)
	]).isRequired,
  name: PropTypes.string.isRequired,
  website: PropTypes.string,
  email: PropTypes.string,
  cityName: PropTypes.string,
  cityPlaceID: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
  photos: PropTypes.arrayOf(PropTypes.string),
  owners: PropTypes.arrayOf(PropTypes.string),
  facebook: PropTypes.string,
  twitter: PropTypes.string,
  google: PropTypes.string,
  metadata: PropTypes.string,
  facebookPageId: PropTypes.string,
  facebookPageName: PropTypes.string,
  facebookPageToken: PropTypes.string
});