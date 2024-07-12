import express from "express";
import env from "dotenv";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;
const saltcrypt = 10;

app.use(cors());
env.config();

const registeredAccounts = [];

//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.json());

app.post("/register", async (req, res) => {
    const { email, password, confirm_password } = req.body;

    console.log(email, password, confirm_password);

    try {
        const result = registeredAccounts.findIndex(regEmail => {email === regEmail});

        if (result >= 0) {
            console.log("Email already exists");
            return res.status(400).send("Email already exists");
        }

        if (password === confirm_password) {
            bcrypt.hash(password, saltcrypt, async (err, hash) => {
                if (err) {
                    console.log("Unable to hash password");
                    return res.status(500).send("Unable to hash password");
                }

                try {
                    registeredAccounts.push({email: email, password: hash});
                    res.redirect("/login");
                } catch (err) {
                    console.error("Error inserting user:", err);
                    return res.status(500).send("Unable to register");
                }
            });
        } else {
            console.log("Password dont match");
            return res.status(400).send("Passwords do not match");
        }
    } catch (err) {
        console.error("Error checking email:", err);
        return res.status(500).send("Unable to register");
    }
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = registeredAccounts.findIndex(logEmail => logEmail.email === email);

        if (result === -1) {
          console.log("User not found");
            return res.status(400).send("User not found");
        }

        const user = registeredAccounts[result];
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).send("Unable to login");
            }

            if (result) {
                console.log("Correct password");
                return res.json({loggedin: true});
            } else {
                console.log("Wrong password");
                return res.status(400).send("Incorrect password");
            }
        });
    } catch (err) {
        console.error("Error logging in:", err);
        return res.status(500).send("Unable to login");
    }
});


app.listen(port, () => {
    console.log(`Running on port: ${port}`);
});

