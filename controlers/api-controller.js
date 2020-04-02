const db = require('../config/database');
const Stat = require('../models/stat');
const User = require('../models/user');
const Sequelize = require('sequelize');

exports.getUsers = (req, res) => {
    db.query("SELECT `user`.`id`, `user`.`first_name`, `user`.`last_name`, `user`.`email`, `user`.`gender`, `user`.`ip_address`, sum(`clicks`) AS `total_clicks`, sum(`page_views`) AS `total_views` FROM `users` AS `user` LEFT OUTER JOIN `stats` AS `stats` ON `user`.`id` = `stats`.`user_id` GROUP BY `User`.`id`;")
        .then( result => {
        res.status(200).json(result[0]);
    }).catch(err => {
        res.status(500).json({message: 'Server error'});
    });
};

exports.getStats = (req, res) => {
    if (typeof(+req.query.id) != 'number') {
        res.status(406).json({message: 'Invalid data'});
        return;
    }
    Stat.findAll({where: {'user_id': req.query.id }}).then( result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({message: 'Server error'});
    }); 
};

exports.getAllUsers = (req, res) => {
    User.findAll({
        group: ['User.id'],
        include: 
            { model: Stat, attributes: [
                [Sequelize.fn('sum', Sequelize.col('clicks')), 'totalclicks'], 
                [Sequelize.fn('sum', Sequelize.col('page_views')), 'totalviews']
            ]}
    }).then( result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({message: 'Server error'});
    });
};
