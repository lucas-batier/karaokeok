import PropTypes from "prop-types";

export const songShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    uuid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    featuring_artist: PropTypes.arrayOf(PropTypes.string).isRequired,
    youtube_url: PropTypes.string.isRequired,
    thumbnail_url: PropTypes.string.isRequired,
    created_at: PropTypes.string,
})