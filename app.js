const express = require("express");
const fs = require('fs');
const cors = require('cors');

const db = require('./config/database');
const Stat = require('./models/stat');
const User = require('./models/user');
const apiRoutes = require('./routes/api');

const app = express();

app.use(cors());
app.use('/api', apiRoutes);

User.hasMany(Stat, {foreignKey: 'user_id'});
Stat.belongsTo(User, {foreignKey : 'user_id', constraints: true, onDelete: 'CASCADE'});

function loadStat() {
    fs.readFile('./data/users_statistic.json', 'utf-8', (err, data) => {
        if (err) throw err;
        let userStat = JSON.parse(data);
        Stat.bulkCreate(userStat, { validate: true }).then( result => {
            console.log('Files load success...')
        }).catch(err => {
            throw err;
        });
    });
}

function loadUsers() {
    fs.readFile('./data/users.json', 'utf-8', (err, data) => {
        if (err) throw err;
        let userData = JSON.parse(data);
        User.bulkCreate(userData, { validate: true }).then( result => {
            loadStat();
        }).catch(err => {
            throw err;
        });
    });
}

// {force: true}
db.sync().then( result => {
    console.log('Connection has been established successfully.');

    app.listen(process.env.PORT || 3000, () => {
        console.log('Server started on port 3000...');
    });

    return User.findAll();
})
.then(users => {
    if (!users.length) {
        loadUsers();
    }
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist/client'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'dist', 'client', 'index.html'));
    });
}