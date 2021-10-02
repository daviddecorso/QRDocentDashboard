import argon2 from './utility/argon2';

module.exports = async(req, res) => {
    //const { name = 'default' } = req.query;
    const pass = "apple";
    const hashedPass = await argon2.hash(pass);

    const pass2 = "applesdfsfdssfsdsdfdsdsfsdsdfdsfsfdsfdsfdsfdsdsfsfsdfdsdsf";
    const hashedPassed2 = await argon2.hash(pass2);

    const areTheyEqual = await argon2.verify(hashedPassed2, pass2);
    res.status(200).send(`pass1: ${pass}\nhashedPass1: ${hashedPass}\n\npass2: ${pass2}\nhashedPass2: ${hashedPassed2}\n\nAre they equal?: ${areTheyEqual}\n\nLength of hashedPass1: ${hashedPass.length}\nLength of hashedPass2: ${hashedPassed2.length}`);
};
