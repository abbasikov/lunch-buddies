import { Document, Model } from 'mongoose';

export interface IUser {
	firstName?: string;
	lastName?: string;
	age?: number;
	email: String;
	designation?: String;
	availabilityStatus?: Boolean;
}

export interface IUserDocument extends IUser, Document {
	setToNotAvailable: (this: IUserDocument) => Promise<void>;
	setToAvailable: (this: IUserDocument) => Promise<void>;
	getAvailableUsers: (this: IUserDocument) => Promise<Document[]>;
}

export interface IUserModel extends Model<IUserDocument> {
	findOneOrCreate: (
		this: IUserModel,
		{
			firstName,
			lastName,
			age,
			email,
			designation,
		}: {
			firstName: string;
			lastName: string;
			age: number;
			email: string;
			designation: string;
		}
	) => Promise<IUserDocument>;

	findByAvailability: (this: IUserModel) => Promise<IUserDocument[]>;

	updateAvailability: (
		this: IUserModel,
		availability: boolean,
		userId: string
	) => Promise<IUserDocument>;

	getUserIdByEmail: (this: IUserModel, email: string) => Promise<string>;
	getUserAvailability: (
		this: IUserModel,
		id: string
	) => Promise<IUserDocument>;
	getRandomAvailableUser: (this: IUserModel) => Promise<IUserDocument>;
}
