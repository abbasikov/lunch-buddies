import { connect, disconnect } from '../database/database';
(async () => {
	const db = connect();

	// test static methods
	const newUser = await db.UserModel.findOneOrCreate({
		firstName: 'Frank',
		lastName: 'Dustin',
		age: 57,
		email: 'frank.dustin@test.com',
		designation: 'Software Engineer',
	});
	const existingUser = await db.UserModel.findOneOrCreate({
		firstName: 'Umair',
		lastName: 'Abbasi',
		age: 31,
		email: 'umair.abbasi@test.com',
		designation: 'software engineer',
	});
	const numOfUsers = (await db.UserModel.find()).length;
	console.log({ newUser, existingUser, numOfUsers });

	// test instance methods
	await existingUser.setToNotAvailable();
	const availableUsers = await existingUser.getAvailableUsers();
	console.log({ availableUsers });

	await existingUser.setToAvailable();
	const allAvailableUsers = await existingUser.getAvailableUsers();
	console.log({ allAvailableUsers });

	disconnect();
})();
