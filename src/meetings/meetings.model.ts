import * as mongoose from 'mongoose';
import Meeting from './meetings.interface';

const meetingSchema = new mongoose.Schema({
	participants: [
		{
			ref: 'user',
			type: mongoose.Schema.Types.ObjectId,
		},
	],
	meetingDate: Date,
	meetingActive: Boolean,
});

const meetingModel = mongoose.model<Meeting & mongoose.Document>(
	'meeting',
	meetingSchema
);

export default meetingModel;
