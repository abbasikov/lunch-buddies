import { UserModel } from '../database/users/users.model';
import { connect, disconnect } from '../database/database';
(async () => {
	connect();

	const users = [
		{
			firstName: 'John',
			lastName: 'Nowman',
			age: 23,
			email: 'john.nowman@test.com',
			designation: 'designer',
		},
		{
			firstName: 'Zain',
			lastName: 'Malik',
			age: 25,
			email: 'zain.malik@test.com',
			designation: 'tester',
		},
		{
			firstName: 'Shahmen',
			lastName: '',
			age: 30,
			email: 'shahmen@test.com',
			designation: 'singer',
		},
		{
			firstName: 'John',
			lastName: 'Legend',
			age: 22,
			email: 'john.legend@test.com',
			designation: 'singer',
		},
		{
			firstName: 'Umair',
			lastName: 'Abbasi',
			age: 31,
			email: 'umair.abbasi@test.com',
			designation: 'software engineer',
		},
		{
			firstName: 'Bill',
			lastName: 'Gates',
			age: 24,
			email: 'bill.gates@test.com',
			designation: 'intern',
		},
		{
			firstName: 'Elon',
			lastName: 'Musk',
			age: 26,
			email: 'elon.musk@test.com',
			designation: 'intern',
		},
		{
			firstName: 'Lionel',
			lastName: 'Messi',
			age: 27,
			email: 'lionel.messi@test.com',
			designation: 'entertainer',
		},
		{
			firstName: 'Cristiano',
			lastName: 'Ronaldo',
			age: 28,
			email: 'cr7@test.com',
			designation: 'ententainer',
		},
		{
			firstName: 'Tupac',
			lastName: 'Shakur',
			age: 29,
			email: 'tupac@test.com',
			designation: 'RIP',
		},
	];

	try {
		for (const user of users) {
			await UserModel.findOneOrCreate(user);
			console.log(
				`Created a dummy user named ${user.firstName} ${user.lastName}`
			);
		}
		disconnect();
	} catch (e) {
		console.error(e);
	}
})();
