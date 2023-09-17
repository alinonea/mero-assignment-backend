
module.exports = (sequelize:any, Sequelize:any) => {
  const User:any = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },   
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  
    full_name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },  {
    timestamps: false
  });
  return User;
}
