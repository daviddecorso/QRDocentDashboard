module.exports = (req, res) => {
    const { name = 'default' } = req.query;
    res.status(200).send(`Hello ${name}!`);
}