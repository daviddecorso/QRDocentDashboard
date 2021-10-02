import generate from './utility/generateToken';

module.exports = (req, res) => {
    //const { name = 'default' } = req.query;
    const pass = "apple";
    const hashedPass = generate.encrypt(pass);

    const pass2 = "apple2asdasdadsaasasdsaasdsadsadasds";
    const hashedPassed2 = generate.encrypt(pass2);
    const areTheyEqual = hashedPass === hashedPassed2;
    res.status(200).send(`pass1: ${pass}\thashedPass1: ${hashedPass}\npass2: ${pass2}\thashedPass2: ${hashedPassed2}\n\nAre they equal?: ${areTheyEqual}\n\nLength of hashedPass1: ${hashedPass.length}\tLength of hashedPass2: ${hashedPassed2.length}`);
};
