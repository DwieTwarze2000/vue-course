const express = require('express');
fs = require('fs');
const path = require('path');
const settingsFile = 'settings.json';
const settingDb = path.join(__dirname, settingsFile);

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

function loadSettingsData() {
    if (fs.existsSync(settingDb)) return JSON.parse(fs.readFileSync(settingDb));
    return [];
}

const server = app.listen(3000, function () {
    console.log('Sitecall app listening on port 3000!');
});

const io = new Server(server);

let defaultConfig = loadSettingsData();
let configuration = { login: defaultConfig.login, password: defaultConfig.password, url: url };
dialer.configure(configuration);
app.post('/settings', async (req, res) => {
    let data = req.body;
    fs.writeFileSync(settingDb, JSON.stringify(data));
    configuration = { login: data.login, password: data.password, url: url };
    dialer.configure(configuration);
});

app.get('/settings', (req, res) => {
    const settingsData = loadSettingsData();
    res.json({ login: settingsData.login, password: settingsData.password, number: settingsData.number });
});

let currentStatus;
app.post('/call', async function (req, res) {
    let data = req.body;
    let settings = loadSettingsData();
    console.log(settings.number, data.number, configuration);
    _bridge = await dialer.call(settings.number.replace(/\s/g, ''), data.number.replace(/\s/g, ''));
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
