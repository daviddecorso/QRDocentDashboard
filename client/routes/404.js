import React from 'react';

function PageNotFound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '30vh' }}>
            <h1 style={{ fontSize: '80px', fontWeight: '500' }}>404</h1>
            <h2 style={{ fontSize: '40px', fontWeight: '200' }}>
                Error: We couldn&apos;t find the page you&apos;re looking for... sorry about that!
            </h2>
        </div>
    );
}

export default PageNotFound;
