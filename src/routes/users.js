const router = require('express').Router();

router.get('/signin', (req, res) => {
    res.send('Entering to the app.');
});

router.get('/signup', (req, res) => {
    res.send('Authentication Form');
});

module.exports = router;