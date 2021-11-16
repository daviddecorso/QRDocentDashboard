import PropTypes from 'prop-types';
import React from 'react';

// Card Styles
const styles = {
    container: {
        width: 190,
        maxWidth: 220,
        height: 74,
        borderRadius: 20,
        display: 'flex',
        backgroundColor: '#2F333C',
        justifyContent: 'center',
        position: 'relative',

        paddingLeft: 15,
        paddingRight: 60,
        flexDirection: 'column',
        marginTop: 15,
        marginBottom: 15
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17
    },
    desc: {
        color: 'white',
        fontSize: 10
    },
    icon: {
        position: 'absolute',
        right: 27.6
    }
};

// Song Card
const SongCard = props => (
    <div style={styles.container}>
        <div style={styles.title}>{props.src.description}</div>
        <div style={styles.desc}>{props.name}</div>

        <SpotifyIcon style={styles.icon} stroke="#1DB954" />
    </div>
);

SongCard.propTypes = {
    name: PropTypes.any,
    src: PropTypes.shape({
        description: PropTypes.any
    })
};

// Spotify Icon SVG
function SpotifyIcon(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="prefix__icon prefix__icon-tabler prefix__icon-tabler-brand-spotify"
            width={35}
            height={35}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}>
            <path d="M0 0h24v24H0z" stroke="none" />
            <circle cx={12} cy={12} r={9} />
            <path d="M8 11.973c2.5-1.473 5.5-.973 7.5.527M9 15c1.5-1 4-1 5 .5M7 9c2-1 6-2 10 .5" />
        </svg>
    );
}
export default SongCard;
