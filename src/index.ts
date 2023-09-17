const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const DB = require("../models");

DB.sequelize.sync({alter: true})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err: Error) => {
    console.log("Failed to sync db: " + err.message);
  });

DB.user.hasOne(DB.review)
DB.salon.hasOne(DB.review)
DB.review.belongsTo(DB.user)
DB.review.belongsTo(DB.salon)

const salonController = require('../controllers/salon.controller')
const reviewController = require('../controllers/review.controller')
const userController = require('../controllers/user.controller')


app.get('/', (request: any, response: any) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/salons', salonController.findAll)
app.get('/salons/:id/reviews', reviewController.findAll)
app.get('/users/:username', userController.findUser)
app.post('/salons/:id/reviews', reviewController.addOrUpdateReview)
app.get('/salons/:id/review', reviewController.findReviewBySalon)
app.post('/users', userController.createUser)
app.post('/salons', salonController.createSalon)


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});