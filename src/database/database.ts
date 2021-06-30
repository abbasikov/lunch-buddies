import * as Mongoose from 'mongoose';
import { UserModel } from './users/users.model';
import meetingModel from '../meetings/meetings.model';

let database: Mongoose.Connection;

export const connect = () => {
	const uri =
		'mongodb+srv://t_user_1:Simple_Password123@cluster0.awxvy.mongodb.net/lunch_buddies?retryWrites=true&w=majority';

	if (database) {
		return;
	}

	Mongoose.connect(uri, {
		useNewUrlParser: true,
		useFindAndModify: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});

	database = Mongoose.connection;
	database.once('open', async () => {
		console.log('Connected to database');
	});

	database.on('error', () => {
		console.log('Error connecting to database');
	});

	return {
		UserModel,
		meetingModel,
	};
};

export const disconnect = () => {
	if (!database) {
		return;
	}
	Mongoose.disconnect();
};
