const jwt = require('jsonwebtoken');

exports.cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    // Check if the token exists
    if (!token) {
        return res.redirect("/");
    }
    try {
        const user = jwt.verify(token, process.env.JTW_SECRET);
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie("token");
        return res.redirect("/");
    }
};
