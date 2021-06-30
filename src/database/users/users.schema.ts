import { Schema } from 'mongoose';
import {
	findOneOrCreate,
	findByAvailability,
	updateAvailability,
	getUserAvailability,
	getRandomAvailableUser,
} from './users.statics';
import {
	setToAvailable,
	setToNotAvailable,
	getAvailableUsers,
} from './users.methods';

const UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	age: Number,
	designation: String,
	availabilityStatus: {
		type: Boolean,
		default: true,
	},
});

UserSchema.statics.findOneOrCreate = findOneOrCreate;
UserSchema.statics.findByAvailability = findByAvailability;
UserSchema.statics.updateAvailability = updateAvailability;
UserSchema.statics.getUserAvailability = getUserAvailability;
UserSchema.statics.getRandomAvailableUser = getRandomAvailableUser;

UserSchema.methods.setToAvailable = setToAvailable;
UserSchema.methods.setToNotAvailable = setToNotAvailable;
UserSchema.methods.getAvailableUsers = getAvailableUsers;

export default UserSchema;
