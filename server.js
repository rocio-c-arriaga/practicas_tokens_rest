var bodyParser = require('body-parser')
var Sequelize = require('sequelize');
var tokenController = require('./app/controllers/tokenController');
var userModel = require('./app/models/userModel')

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

    app.use(bodyParser.json())

    const sequelize = new Sequelize('token_practica', 'root', '5678', {
        host: 'localhost',
        dialect: 'mysql'
    });

    sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            }).catch(err => {
                console.error('Unable to connect to the database', err);
    });

    tokenController(app, userModel(sequelize));

    app.listen(port, () => console.log(`App listening on port ${port}`));

    console.log('todo bien API server started on: ' + port);