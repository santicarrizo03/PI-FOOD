const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    imagen: {
      type: DataTypes.STRING,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.FLOAT,
    },
    steps: {
      type: DataTypes.TEXT
    },
    score: {
      type: DataTypes.FLOAT,
    }
  });
};
