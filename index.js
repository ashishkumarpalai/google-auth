
const express = require('express');
const { passport } = require("./configs/google_Oauth")
const cors = require("cors");
require("dotenv").config();

const app = express()
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("google auth backend")
    console.log("Working");
})

// Google Oauth
app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate('google', {
        failureRedirect: '/auth/google/failure',
        session: false
    }),
    function (req, res) {
        let user = req.user;
        // localStorage.setItem('user', user)
        res.send(user)
        console.log(user);
        // res.redirect("/") //idhar after login kidhar jaana hai uska dedo
    }
);


app.listen(process.env.port, () => {
    try {
        console.log(`Server is running at port ${process.env.port}`);
    } catch (error) {
        console.log(error.message);
    }
    
});
