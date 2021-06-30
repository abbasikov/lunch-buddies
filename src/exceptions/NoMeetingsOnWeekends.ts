import HttpException from './HttpException';

class NoMeetingsOnWeekends extends HttpException {
	constructor() {
		super(
			400,
			`Sorry we do not schedule lunch with buddies on weekends, please try on a week day.`
		);
	}
}

export default NoMeetingsOnWeekends;
