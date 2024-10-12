import {argv} from 'node:process';

export const getArgument = (argumentName) => {
	try {
		const usernameArg = argv.find(arg => arg.startsWith(`--${argumentName}=`));

		let username = 'Unknown';
		if (usernameArg) {
			username = usernameArg.split('=')[1];
		}
		console.log(`Welcome to the File Manager, ${username}!`);
	}  catch (err) {
		console.error(err.message);
	}
};
