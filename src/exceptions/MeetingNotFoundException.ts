import HttpException from './HttpException';

class MeetingNotFoundException extends HttpException {
	constructor(email: string, id: string) {
		if (email !== null) {
			super(
				404,
				`No active meeting with associated email ${email} found!`
			);
		} else {
			super(404, `No active meeting with id ${id} found!`);
		}
	}
}

export default MeetingNotFoundException;
