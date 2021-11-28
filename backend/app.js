const express = require('express');
const settingsData = require('./settings.json');
fs = require('fs');
const dialer = require('dialer').Dialer;
const bodyParser = require('body-parser');
const app = express();
const url = 'https://uni-call.fcc-online.pl';

var _bridge = null;
const { Server } = require('socket.io');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

app.use(bodyParser.text());
app.use(bodyParser.json());

const server = app.listen(3000, function () {
    console.log('Sitecall app listening on port 3000!');
});

const io = new Server(server);

app.post('/settings', async (req, res) => {
    let data = req.body;
    login = data.login;
    password = data.password;
    number = data.number.replace(/\s/g, '');
    fs.writeFile('settings.json', `{"login":"${login}", "password":"${password}","number":"${number}"}`, (err) => {
        if (err) return console.log(err);
    });
});

app.get('/settings', (req, res) => {
    res.json({ login: settingsData.login, password: settingsData.password, number: settingsData.number });
});

const configuration = { login: settingsData.login, password: settingsData.password, url: url };

dialer.configure(configuration);

let currentStatus;
app.post('/call', async function (req, res) {
    let data = req.body;
    _bridge = await dialer.call(settingsData.number, data.number.replace(/\s/g, ''));

    let interval = setInterval(async () => {
        let status = await _bridge.getStatus();
        console.log({ status });
        if (currentStatus !== status) {
            currentStatus = status;
            io.emit('status', status);
            console.log({ status });
        }

        if (
            currentStatus === 'ANSWERED' ||
            currentStatus === 'FAILED' ||
            currentStatus === 'BUSY' ||
            currentStatus === 'NO ANSWER'
        ) {
            console.log('stop');
            clearInterval(interval);
        }
    }, 1000);

    res.json({ id: '123', status: _bridge.STATUSES.NEW });
});

app.get('/status', async function (req, res) {
    let status = await _bridge.getStatus();
    res.json({ id: '123', status: status });
});
