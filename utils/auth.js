console.log("withAuth is being executed");
const withAuth = (req, res, next )=> {
    if (!req.session.loggedIn){
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;