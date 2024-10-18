const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.post('/api/saveTasks', (req, res) => {
const tasks = req.body.tasks;
const data = JSON.stringify({ tasks });
fs.writeFile('tasks.json', data, (err) => {
if (err) {
console.error('Error saving tasks: ' + err);
res.status(500).send('Error saving tasks');
} else {
console.log('Tasks saved to tasks.json');
res.sendStatus(200);
}
});
});
app.get('/api/getTasks', (req, res) => {
fs.readFile('tasks.json', 'utf8', (err, data) => {
if (err) {
console.error('Error loading tasks: ' + err);
res.status(500).send('Error loading tasks');
} else {
const tasksData = JSON.parse(data);
res.json(tasksData);
}
});
});
const port = 3000;
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});