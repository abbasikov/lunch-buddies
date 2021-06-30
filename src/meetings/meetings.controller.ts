import * as express from 'express';
import HttpException from '../exceptions/HttpException';
import MeetingNotFoundException from '../exceptions/MeetingNotFoundException';
import NoMeetingsOnWeekends from '../exceptions/NoMeetingsOnWeekends';
import UserNotAvailable from '../exceptions/UserNotAvailable';
import meetingModel from './meetings.model';
import validationMiddleware from '../middleware/validation.middleware';
import CreateMeetingDto from './meetings.dto';
import { UserModel } from '../database/users/users.model';
import { IUserDocument } from '../database/users/users.types';

class MeetingController {
	public path = '/meeting';
	public router = express.Router();

	constructor() {
		this.intializeRoutes();
	}

	public intializeRoutes() {
		this.router.get(this.path, this.getAllActiveMeetings);
		this.router.post(
			this.path,
			validationMiddleware(CreateMeetingDto),
			this.createMeeting
		);
		this.router.get(`${this.path}/:id`, this.getMeetingById);
		this.router.patch(`${this.path}/:id`, this.cancelMeeting);
		this.router.get(`${this.path}/:email`, this.getLunchBuddy);
	}

	getAllActiveMeetings = (
		request: express.Request,
		response: express.Response
	) => {
		meetingModel.find({ meetingActive: true }).then((meetings) => {
			response.send(meetings);
		});
	};

	getMeetingById = (
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) => {
		const id = request.params.id;
		meetingModel.findById({ id }).then((meeting) => {
			if (meeting) {
				response.send(meeting);
			} else {
				next(new HttpException(404, 'Meeting not found'));
			}
		});
	};

	getLunchBuddy = (
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) => {
		const email = request.params.email;
		meetingModel
			.findOne({ email, meetingActive: true }, 'participants')
			.then((participants) => {
				if (participants) {
					response.send(participants);
				} else {
					next(new MeetingNotFoundException(email, null));
				}
			});
	};

	cancelMeeting = async (
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) => {
		const id = request.params.id;
		const updatedmeeting = await meetingModel
			.findByIdAndUpdate(
				{ _id: id },
				{ meetingActive: false },
				{ useFindAndModify: true }
			)
			.then(async (meeting) => {
				if (meeting) {
					await UserModel.updateAvailability(
						true,
						meeting.participants[0]
					);
					await UserModel.updateAvailability(
						true,
						meeting.participants[1]
					);
					const savedMeeting = await meetingModel.findOne({
						_id: meeting._id,
					});
					await savedMeeting.populate('participants').execPopulate();
					response.send(savedMeeting);
				} else {
					next(new MeetingNotFoundException(null, id));
				}
			});
	};

	createMeeting = async (
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) => {
		let today = new Date();
		if (today.getDay() == 6 || today.getDay() == 0) {
			next(new NoMeetingsOnWeekends());
		}

		const availability = await UserModel.getUserAvailability(
			request.body.participant
		);

		if (!availability.availabilityStatus) {
			next(new UserNotAvailable());
		}

		const count = await UserModel.count();
		let random = Math.floor(Math.random() * count);
		const randomUser: IUserDocument = await UserModel.findOne({
			availabilityStatus: true,
		})
			.skip(random)
			.exec();
		console.log('Random user ', randomUser);

		const createdMeeting = new meetingModel({
			participants: [request.body.participant, randomUser._id],
			meetingDate: today.toISOString().split('T')[0],
			meetingActive: true,
		});

		await UserModel.updateAvailability(false, request.body.participant);
		await UserModel.updateAvailability(false, randomUser._id);

		const savedMeeting = await createdMeeting.save();
		await savedMeeting.populate('participants').execPopulate();
		response.send(savedMeeting);
	};
}

export default MeetingController;
