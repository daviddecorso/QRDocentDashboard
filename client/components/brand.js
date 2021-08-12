import Button from '@material-ui/core/Button';
import { IconQrcode } from '@tabler/icons';
import { Link } from 'react-router-dom';
import React from 'react';

function Brand() {
    return (
        <div
            style={{
                positon: 'fixed',
                left: '0',
                top: '0',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '20px'
            }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <Button
                    size="large"
                    startIcon={<IconQrcode size={24} color="white" />}
                    disableRipple={true}
                    style={{
                        fontWeight: '500',
                        fontSize: '18px',
                        paddingBottom: '0px',
                        paddingRight: '0px',
                        zIndex: '5',
                        backgroundColor: 'transparent'
                    }}>
                    QR DOCENT
                </Button>
            </Link>
        </div>
    );
}

export default Brand;
