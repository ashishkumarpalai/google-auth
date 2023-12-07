
const express = require('express');
const { passport } = require("./configs/google_Oauth")

const app = express()
app.use(express.json());


app.get("/", (req, res) => {
    res.send("good to go")
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



app.listen(3000, () => {
    console.log("connected to server");
})