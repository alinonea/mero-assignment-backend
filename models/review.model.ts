module.exports = (sequelize:any, Sequelize:any) => {
    const Review:any = sequelize.define("reviews", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },    
        text: {
            type: Sequelize.STRING,
        },
        stars: {
            type: Sequelize.ENUM("1","2","3","4","5"),
            allowNull: false,
        }
    },  {
      timestamps: false
    });
    return Review;
}