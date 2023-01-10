import React, { useState } from 'react';
import ExternalLink from './previewCards/externalLink.js';
import ImageCard from './previewCards/imageCard';
import PropTypes from 'prop-types';
import SongCard from './previewCards/songCard';
import VideoCard from './previewCards/videoCard';
import '../styles/previewStyles.css';

function PreviewContainer(props) {
    // State for the BIO height
    const [bioHeight, setBioHeight] = useState(151);

    // function for setting the BIO height
    function seeBio() {
        if (bioHeight === 151) {
            setBioHeight('100%');
        } else {
            setBioHeight(151);
        }
    }

    // switch for mapping the content to the proper Cards
    const contents = props?.exhibit.contents.map((data, index) => {
        switch (data.contentTypeID) {
            case 1:
                return (
                    <div key={index}>
                        <ImageCard src={data} />
                    </div>
                );
            case 2:
                return (
                    <div key={index}>
                        <VideoCard src={data.URL} description={data.description} />
                    </div>
                );
            case 3:
                return (
                    <div key={index}>
                        <SongCard src={data} name={props.exhibit.name} />
                    </div>
                );
            case 4:
                return (
                    <div key={index}>
                        <ExternalLink src={data} />
                    </div>
                );
            default:
                return <></>;
        }
    });
    const styles = {
        phone: {
            border: '4px solid black',
            width: 310,
            height: 580,
            borderRadius: 20,
            display: 'flex',
            overflowY: 'hidden',
            overflowX: 'hidden'
        },
        container: {
            flex: 1,
            backgroundColor: '#282B33',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            position: 'relative',
            overflowY: 'overlay',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        },
        image: {
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: 210,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },
        name: {
            color: 'white',
            fontSize: 25,
            pTransform: 'uppercase',
            fontWeight: 'bold',
            marginLeft: 18,
            marginBottom: 5
        },
        heading: {
            fontSize: 20,
            color: 'white',
            marginBottom: 0,
            marginTop: 0,
            alignSelf: 'flex-start'
        },
        text: {
            fontSize: 15,
            color: 'white',
            lineHeight: 1.3
        },
        bio: {
            height: bioHeight,
            marginTop: 1,
            minHeight: 100,
            marginHorizontal: 25,
            overflow: 'hidden',
            alignItems: 'flex-start',
            width: '100%',
            marginBottom: 17.5
        }
    };

    return (
    !props.museumPreview ?
        <div style={styles.phone}>
            <div className="wrap">
                <div style={styles.container} className="section">
                    <div
                        style={{
                            backgroundImage: `url("${props?.exhibit.mainImage}")`,
                            ...styles.image
                        }}>
                        <div
                            style={{
                                flex: 1,
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                            <div
                                style={{
                                    height: 190,
                                    width: '100%',
                                    alignItems: 'flex-end',
                                    display: 'flex',
                                    paddingTop: 25
                                }}>
                                <p style={styles.name}>{props.exhibit.name}</p>
                            </div>

                            <div
                                style={{
                                    backgroundColor: '#282B33',
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    paddingRight: 15,
                                    paddingLeft: 15
                                }}>
                                <div style={styles.bio} onClick={seeBio}>
                                    <p style={styles.heading}>Bio</p>
                                    <p style={styles.text}>{props.exhibit.description}</p>
                                    {bioHeight === 151 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                height: 170,
                                                left: 0,
                                                right: 0,
                                                background:
                                                    'linear-gradient(rgba(40, 43, 51,0), rgba(40, 43, 51,1))'
                                            }}
                                        />
                                    )}
                                </div>
                                {contents}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    :
    <div style={styles.phone}>
        <div className="wrap">
            <div style={styles.container} className="section">
                <div
                    style={{
                        backgroundImage: `url("${props.museum.mainImage}")`,
                        ...styles.image
                    }}>
                    <div
                        style={{
                            flex: 1,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        <div
                            style={{
                                height: 190,
                                width: '100%',
                                alignItems: 'flex-end',
                                display: 'flex',
                                paddingTop: 25
                            }}>
                            <p style={styles.name}>{props.museum.name}</p>
                        </div>

                        <div
                            style={{
                                backgroundColor: '#282B33',
                                alignSelf: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                paddingRight: 15,
                                paddingLeft: 15
                            }}>
                            <div style={styles.bio} onClick={seeBio}>
                                <p style={styles.heading}>Bio</p>
                                <p style={styles.text}>{props.museum.description}</p>
                                {bioHeight === 151 && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            height: 170,
                                            left: 0,
                                            right: 0,
                                            background:
                                                'linear-gradient(rgba(40, 43, 51,0), rgba(40, 43, 51,1))'
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

PreviewContainer.propTypes = {
    exhibit: PropTypes.shape({
        contents: PropTypes.shape({
            map: PropTypes.func
        }),
        description: PropTypes.any,
        mainImage: PropTypes.any,
        name: PropTypes.any
    }),
    museum: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        mainImage: PropTypes.any,
        hours: PropTypes.string,
        address: PropTypes.string
    })
};

export default PreviewContainer;
