const express = require('express');
const dialer = require('dialer').Dialer;
const bodyParser = require('body-parser');
const app = express();
const url = 'https://uni-call.fcc-online.pl';

var _bridge = null;

const configuration = { login: 'focus21', password: 'jfhgd7uhgdb', url: url };

dialer.configure(configuration);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

app.use(bodyParser.text());
app.use(bodyParser.json());

app.post('/call', async (req, res) => {
    let data = req.body;
    _bridge = await dialer.call('514541201', data.number);
    console.log('Calling...');
    res.json({ id: '123', status: _bridge.STATUSES.NEW });
});
app.get('/status', async function (req, res) {
    let status = await _bridge.getStatus();
    res.json({ id: '123', status: status });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
