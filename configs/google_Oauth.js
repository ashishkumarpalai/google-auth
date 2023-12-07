const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { v4: uuidv4 } = require("uuid");

require("dotenv").config()

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://google-auth-5vq1.onrender.com/auth/google/callback" //port ye hi rakhlo
        },
        async function (request, accessToken, refreshToken, profile, cb) {
            let email = profile._json.email;
            let name = profile._json.name;
            
            console.log(email, name,accessToken);
            const user = {
                name,
                email,
                pass: uuidv4(),
                request:request,
                accessToken: accessToken,
                refreshToken:refreshToken
            }; // idahr mongo ka userModel pe save kardo
            // await user.save();
            return cb(null,user);
        }
    )
);

module.exports = {passport}