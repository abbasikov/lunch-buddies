import { IUser, IUserDocument, IUserModel } from './users.types';

export async function findOneOrCreate(
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
): Promise<IUserDocument> {
	const record = await this.findOne({
		firstName,
		lastName,
		email,
		designation,
		age,
	});
	if (record) {
		return record;
	} else {
		return await this.create({
			firstName,
			lastName,
			email,
			designation,
			age,
		});
	}
}

export async function findByAvailability(
	this: IUserModel
): Promise<IUserDocument[]> {
	return await this.find({ availabilityStatus: true });
}

export async function getUserAvailability(
	this: IUserModel,
	id: string
): Promise<IUserDocument> {
	return await this.findOne({ _id: id }, 'availabilityStatus');
}

export async function getRandomAvailableUser(
	this: IUserModel
): Promise<IUserDocument> {
	let record: IUserDocument;
	await this.count(async (err, count) => {
		var rand = Math.floor(Math.random() * count);
		record = await this.findOne({ availabilityStatus: true })
			.skip(rand)
			.exec();
	});
	return record;
}

export async function getUserIdByEmail(
	this: IUserModel,
	email: string
): Promise<string> {
	return await this.findOne({ email }, '_id').toString();
}

export async function updateAvailability(
	this: IUserModel,
	availability: boolean,
	id: string
): Promise<IUserDocument> {
	return await this.findOneAndUpdate(
		{ _id: id },
		{ availabilityStatus: availability }
	);
}
