import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function VideoCard(props) {
    const [showDesc, setShow] = useState(false);
    const [hideButtons, setButtons] = useState(false);

    const [imageURL, setImageURL] = useState(null);

    let videoID;

    async function checkImage() {
        try {
            const imageRes = await axios
                .get('https://img.youtube.com/vi/' + videoID + '/maxresdefault.jpg', {
                    headers: { 'Access-Control-Allow-Origin': '*' }
                })
                .catch(err => console.log(err));
            console.log(imageRes);
            setImageURL('https://img.youtube.com/vi/' + videoID + '/maxresdefault.jpg');
        } catch (err) {
            setImageURL('https://img.youtube.com/vi/' + videoID + '/hqdefault.jpg');
        }
    }

    /* Get the video ID from the youtube link */
    if (props.src.includes('youtube.com')) {
        const arr = props.src.split('v=');
        videoID = arr[1].split('&')[0];
        checkImage();
    } else if (props.src.includes('youtu.be')) {
        const arr = props.src.split('be/');
        videoID = arr[1].split('&')[0];
        checkImage();
    }

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
            backgroundImage: `url("${imageURL}")`,
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
            flexDirection: 'row',
            display: 'flex'
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
            <div style={styles.image}>
                <div
                    style={styles.imageContainer}
                    onClick={() => {
                        if (hideButtons) {
                            setButtons(false);
                            return setShow(!showDesc);
                        }
                    }}>
                    {!hideButtons && <PlayButton />}
                    {!hideButtons && (
                        <div
                            onClick={() => {
                                setButtons(true);
                                return setShow(!showDesc);
                            }}>
                            <InfoButton />
                        </div>
                    )}

                    {showDesc && <p style={styles.desc}>{props.description}</p>}
                </div>
            </div>
        </div>
    );
}

VideoCard.propTypes = {
    description: PropTypes.any,
    src: PropTypes.shape({
        includes: PropTypes.func,
        split: PropTypes.func
    })
};

function InfoButton(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="prefix__icon prefix__icon-tabler prefix__icon-tabler-info-circle"
            width={44}
            height={44}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#fff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}>
            <path d="M0 0h24v24H0z" stroke="none" />
            <circle cx={12} cy={12} r={9} />
            <path d="M12 8h.01M11 12h1v4h1" />
        </svg>
    );
}

function PlayButton(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="prefix__icon prefix__icon-tabler prefix__icon-tabler-player-play"
            width={44}
            height={44}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#fff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}>
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M7 4v16l13-8z" />
        </svg>
    );
}

export default VideoCard;
