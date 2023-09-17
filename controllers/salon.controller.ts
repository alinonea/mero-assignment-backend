const salonDB = require('../models')
const Salon = salonDB.salon

exports.findAll = (req: any, res: any) => {
  Salon.findAll()
    .then((data:any) => {
       res.send(data); 
    }).catch((err: Error) => {
        res.status(500).send({
            message: err.message || 'Some error occured while retrieving salons.'
        });
    })
};

exports.createSalon = (req: any, res: any) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Missing name from body."
        })
        return
    }

    if (!req.body.image_link) {
        res.status(400).send({
            message: "Missing image_link from body."
        })
        return
    }
    Salon.create(req.body)
        .then((data: any) => {
            res.status(200).send({
                message: "The salon was succesfully created."
            })
        }).catch((error: Error) => {
            res.status(500).send({
                message: error.message || "Some error occured while creating the salon."
            })
        })
}