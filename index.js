import path from 'node:path';

import express from 'express';

const PORT = 3000;

import globalPath from './utils/globalPath.js';
const { __dirname } = globalPath(import.meta.url);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/:packageName', (req, res) => {
	const packageName = req.params.packageName;
	res.send(`${packageName}`);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
