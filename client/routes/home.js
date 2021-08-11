import PrimaryButton from '../components/buttons/primary-button';
import React from 'react';

export default function Index() {
    return (
        <div className={'content'}>
            <h2
                style={{
                    marginTop: '10vh',
                    fontSize: '68px',
                    fontWeight: '200',
                    marginBottom: '1.7rem'
                }}>
                Welcome back!
            </h2>
            <div>
                <PrimaryButton
                    text={'View my exhibits'}
                    width={'200px'}
                    height={'45px'}
                    fontSize={'14px'}
                    rm={'30px'}
                />
                <PrimaryButton
                    text={'Add an exhibit'}
                    width={'200px'}
                    height={'45px'}
                    fontSize={'14px'}
                />
            </div>
        </div>
    );
}
