const mongoose = require('mongoose');
const dotenv = require('dotenv');
const GridFsStorage = require('multer-gridfs-storage');
const Gridfs = require('gridfs-stream');
Promise = require('bluebird');
dotenv.config();

const expressApp = require('../loaders/express');
const routes = require('../routes/index');

mongoose.Promise = Promise;
const mongoURL = process.env.DATABASE;
const loader = async (app) => {
	/**
	 * Mongo db connection using mongoose.
	 */
	mongoose.connect(mongoURL, {
		useCreateIndex: true,
		useNewUrlParser: true,
		promiseLibrary: Promise,
		useUnifiedTopology: true,
		useFindAndModify: false
	});

	mongoose.connection.on('error', () => {
		throw new Error(`unable to connect to database: ${mongoURL}`);
	})
	mongoose.connection.on('connected', async () => {
		const connection = mongoose.connection;
		const mongoDriver = mongoose.mongo;
		/**
		 * Configuring grid stream.
		 */
		const gfs = new Gridfs(connection.db, mongoDriver);

		/**
		 * Configuring grid storage.
		 */
		const storage = new GridFsStorage({
			url: mongoURL, file: (req, file) => {
				return new Promise((resolve, reject) => {
					resolve({
						filename: file.originalname,
					})
				})
			}
		});
		/**
		 * Configuring express app with essential middlewares.
		 */
		await expressApp(app);
		await routes(app, storage, gfs);
		console.log("Mongodb connected")
	})
}

module.exports = loader;