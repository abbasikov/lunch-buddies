import HttpException from './HttpException';

class UserNotAvailable extends HttpException {
	constructor() {
		super(400, `You already have a lunch scheduled with a buddy!`);
	}
}

export default UserNotAvailable;
