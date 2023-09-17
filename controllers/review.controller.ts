const reviewDB = require('../models')
const Review = reviewDB.review

exports.findAll = (req: any, res: any) => {
    const id = req.params.id
    Review.findAll({where: {salonId: id}, include: reviewDB.user})
        .then((data:any) => {
            res.status(200).send(data); 
        }).catch((err: Error) => {
            res.status(500).send({
                message: err.message || 'Some error occured while retrieving reviews.'
            });
        })
};

exports.findReviewBySalon = (req: any, res: any) => {
    const salonId = req.params.id
    if(!req.header('userId')){
        res.status(400).send({
            message: "Missing userId from header."
        })
        return
    }
    const userId = req.header('userId')

    Review.findOne({where : {salonId: salonId, userId: userId}})
        .then((data: any) => {
            res.status(200).send(data)
        })
        .catch((error: Error) => {
            res.status(500).send({
                message: error.message || 'Some error occured while retrieving the review.'
            })
        })
}

exports.addOrUpdateReview = (req: any, res: any) => {
    const salonId = req.params.id
    if(!req.header('userId')){
        res.status(400).send({
            message: "Missing userId from header."
        })
        return
    }
    const userId = req.header('userId')
    const text = req.body.text
    const stars = req.body.stars

    if (!stars) {
        res.status(400).send({
            message: "Missing stars from body."
        })
        return
    }

    const review = {
        text:text,
        stars: stars,
        userId: userId,
        salonId: salonId
    }

    Review.findOne({where : {salonId: salonId, userId: userId}})
        .then((data: any) => {
            if(data){
                Review.update({stars: stars, text: text},
                    {where : {salonId: salonId, userId: userId}})
                    .then((data: any) => {
                        res.status(200).send({
                            message: "The review was succesfully updated."
                        })
                    })
                    .catch((error: Error) => {
                        res.status(500).send({
                            message: error.message || "Some error occured while saving the review."
                        })
                    });
            } else {
                Review.create(review)
                    .then((data: any) => {
                        res.status(200).send({
                            message: "The review was succesfully saved."
                        })
                    }).catch((error: Error) => {
                        res.status(500).send({
                            message: error.message || "Some error occured while saving the review."
                        })
                    })
            }
            
        }).catch((error: Error) => {
            console.log(error.message)
            return
        })

    

}