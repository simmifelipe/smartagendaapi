import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import Appointment from '../app/models/Appointment';
import File from '../app/models/File';
import User from '../app/models/User';
import databaseConfig from '../config/database';
import Service from '../app/models/Service';

const models = [User, File, Appointment, Service];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConncetion = mongoose.connect(
      'mongodb://localhost:27017/smartagenda',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
