module.exports = (sequelize:any, Sequelize:any) => {
    const Salon:any = sequelize.define("salons", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },    
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        
        },
    
        image_link: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },  {
      timestamps: false
    });
    return Salon;
}