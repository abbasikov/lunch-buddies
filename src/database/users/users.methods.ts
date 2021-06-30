import { Document } from 'mongoose';
import { IUserDocument } from './users.types';

export async function setToNotAvailable(this: IUserDocument): Promise<void> {
	this.availabilityStatus = false;
	await this.save();
}

export async function setToAvailable(this: IUserDocument): Promise<void> {
	this.availabilityStatus = true;
	await this.save();
}

export async function getAvailableUsers(
	this: IUserDocument
): Promise<Document[]> {
	return this.model('user').find({ availabilityStatus: true });
}
