const { Sequelize } = require('sequelize');
const config = require('./config/config.json')["development"];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port || 3306,
  dialect: config.dialect
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión establecida correctamente.');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
