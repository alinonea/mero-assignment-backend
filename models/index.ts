const dbConfig = require("../config/db.config.ts");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const user = require("./user.model.ts")(sequelize, Sequelize);
const salon = require("./salon.model.ts")(sequelize, Sequelize);
const review = require("./review.model.ts")(sequelize, Sequelize);

const db = {sequelize: sequelize, Sequelize: Sequelize, user: user, salon: salon, review:review };

module.exports = db;