const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {

    const token = req.header('auth-token');
    if (!token) return res.json(false);

    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verified;
        res.json(true);
        next();
    }catch {
        return res.json(false);
    }
});

module.exports = router;