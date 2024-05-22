// Import CSS file

// Import Express
import express from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import cors from 'cors';


const app = express();
const port = 3001;

const tokenSecret = 'sekretny_klucz';
let refreshToken;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World - simple api with JWT!');
});

app.post('/token', function (req, res) {
    const expTime = req.body.exp || 60;
    const userid = req.body.user;
    const token = generateToken(+expTime, userid);
    refreshToken = generateToken(60 * 60);
    res.status(200).send({ token, refreshToken });
});
app.post('/refreshToken', function (req, res) {
    const refreshTokenFromPost = req.body.refreshToken;
    if (refreshToken !== refreshTokenFromPost) {
        res.status(400).send('Bad refresh token!');
    }
    const expTime = req.headers.exp || 60;
    const token = generateToken(+expTime);
    //sa
    refreshToken = generateToken(60 * 60);
    setTimeout(() => {
        res.status(200).send({ token, refreshToken });
    }, 3000);
});
app.get('/protected/:id/:delay?', verifyToken, (req, res) => {
    const id = req.params.id;
    const delay = req.params.delay ? +req.params.delay : 1000;
    const userId = req.user.userid;

    setTimeout(() => {
        res.status(200).send(`{"userId": "${userId}", "message": "protected endpoint ${id}"}`);
    }, delay);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

function generateToken(expirationInSeconds, userid) {
    const exp = Math.floor(Date.now() / 1000) + expirationInSeconds;
    const token = jwt.sign({ exp, userid }, tokenSecret, {
        algorithm: 'HS256',
    });
    return token;
}

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) return res.sendStatus(403);

    jwt.verify(token, tokenSecret, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(401).send(err.message);
        }
        req.user = "ale";
        next();
    });
}