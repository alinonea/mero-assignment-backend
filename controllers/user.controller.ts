const userDB = require('../models')
const User = userDB.user

exports.findUser = (req: any, res: any) => {
    const username = req.params.username
    User.findOne({where: {username: username}})
        .then((data:any) => {
            res.send(data); 
        }).catch((err: Error) => {
            res.status(500).send({
                message: err.message || 'Some error occured while retrieving user.'
            });
        })
};

exports.createUser = (req: any, res: any) => {
    if (!req.body.username) {
        res.status(400).send({
            message: "Missing username from body."
        })
        return
    }

    if (!req.body.full_name) {
        res.status(400).send({
            message: "Missing full_name from body."
        })
        return
    }

    User.create(req.body)
        .then((data: any) => {
            res.status(200).send({
                message: "The user was succesfully created."
            })
        }).catch((error: Error) => {
            res.status(500).send({
                message: error.message || "Some error occured while creating the user."
            })
        })
}