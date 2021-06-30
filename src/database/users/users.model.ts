import * as Mongoose from 'mongoose';
import { IUserDocument, IUserModel } from './users.types';
import UserSchema from './users.schema';

export const UserModel = Mongoose.model<IUserDocument>(
	'user',
	UserSchema
) as IUserModel;
