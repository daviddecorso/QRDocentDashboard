import React from 'react';

function HelloWorld() {
    // Only using inline styles because this is the hello world page.
    return (
        <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginTop: '30vh', fontSize: '5rem' }}>Hello World!</h2>
            <p style={{ fontSize: '2rem' }}>This is the admin dashboard for the QR docent app!</p>
        </div>
    );
}

export default HelloWorld;
