const router = require("express").Router();
const passport = require("passport");


// auth logout
router.get("/logout", (req, res) => {
    req.logout();
    res.clearCookie('s', { httpOnly: true , secure: true});
    res.redirect("/");
});


router.get("/twitter", passport.authenticate("twitter"));


router.get("/twitter/redirect", passport.authenticate("twitter"), (req, res) => {    
    let c = req.cookies.s;
    if(c) res.redirect('/search?searchField='+c);
    else res.redirect("/");
});

module.exports = router;
