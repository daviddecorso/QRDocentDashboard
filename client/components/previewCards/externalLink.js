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

// External Link Card
const ExternalLink = props => {
    // show the url without https and/or a www subdomain
    const url = new URL(props.src.URL);
    let link;
    if (url.hostname.includes('www.')) {
        link = url.hostname.replace('www.', '');
    } else {
        link = url.hostname;
    }

    return (
        <div style={styles.container}>
            <div style={styles.title}>{link}</div>
            <div style={styles.desc}>{props.src.description}</div>
            <ExternalLinkIcon style={styles.icon} />
        </div>
    );
};

ExternalLink.propTypes = {
    src: PropTypes.shape({
        URL: PropTypes.any,
        description: PropTypes.any
    })
};

// External Link Icon SVG
function ExternalLinkIcon(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-external-link"
            width={25}
            height={25}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}>
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M11 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-5" />
            <path d="M10 14L20 4" />
            <path d="M15 4L20 4 20 9" />
        </svg>
    );
}

export default ExternalLink;
