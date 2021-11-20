import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Image Card
function ImageCard(props) {
    // State for showing the image description
    const [showDesc, setShow] = useState(false);
    const styles = {
        container: {
            width: 250,
            height: 230,
            borderRadius: 20,
            display: 'flex',
            maxHeight: 454,
            maxWidth: 525,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 15,
            marginBottom: 15
        },
        image: {
            borderRadius: 20,
            width: '100%',
            height: '100%',
            backgroundImage: `url("${props.src.URL}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
        },
        imageContainer: {
            width: '100%',
            height: '100%',
            borderRadius: 20,
            backgroundColor: showDesc ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0)',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        },
        content: {
            width: 304,
            height: 267,
            borderRadius: 20,
            position: 'absolute',
            bottom: 0,
            padding: 25
        },
        desc: {
            color: 'white',
            fontSize: 15.5,
            lineHeight: 1.2,
            fontWeight: 'bold',
            position: 'absolute',
            top: 30,
            left: 21
        }
    };

    return (
        <div style={styles.container}>
            {/* show the description on click */}
            <div style={styles.image} onClick={() => setShow(!showDesc)}>
                <div style={styles.imageContainer}>
                    {/* Show description when showDesc is true*/}
                    {showDesc && <p style={styles.desc}>{props.src.description}</p>}
                </div>
            </div>
        </div>
    );
}

ImageCard.propTypes = {
    src: PropTypes.shape({
        URL: PropTypes.any,
        description: PropTypes.any
    })
};

export default ImageCard;
