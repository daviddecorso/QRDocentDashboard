import { Container, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ExhibitForm from './exhibitForm';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';

function EditExhibit({ exhibits, setOpenSuccess, setSnackbarText }) {
    const [exhibit, setExhibit] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        exhibits.forEach(e => {
            if (Number(id) === e.exhibitID) {
                setExhibit(e);
            }
        });
    }, []);

    return (
        <>
            <div className="content">
                <Container maxWidth="md">
                    <Typography
                        component="h1"
                        variant="h4"
                        style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        EDIT EXHIBIT
                    </Typography>
                </Container>
            </div>

            <ExhibitForm
                isEdit={true}
                id={id}
                exhibit={exhibit}
                setOpenSuccess={setOpenSuccess}
                setSnackbarText={setSnackbarText}
            />
        </>
    );
}

EditExhibit.propTypes = {
    exhibits: PropTypes.shape({
        forEach: PropTypes.func
    }),
    setOpenSuccess: PropTypes.func,
    setSnackbarText: PropTypes.func
};

export default EditExhibit;
