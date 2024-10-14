import {ARCHITECTURE, AVAILABLE_OS_OPERATIONS, CPUS, EOL_op, HOMEDIR, USERNAME} from "../constants.js";
import { EOL, cpus, homedir, userInfo, arch } from 'node:os';

export const operationSystemRun = (userArguments) => {
	try {
		const operation = userArguments[0];
		if (AVAILABLE_OS_OPERATIONS.includes(operation)) {
			switch (operation) {
				case EOL_op: {
					console.log(JSON.stringify(EOL));
					break;
				}
				case CPUS: {
					const data = cpus();
					console.log(`Total CPUs: ${data.length}`);
					data.forEach(({ model, speed }, index) => {
						const clockRateGHz = (speed / 1000).toFixed(2);
						console.log(`CPU ${index + 1}: Model: ${model}, Clock Rate: ${clockRateGHz} GHz`);
					});
					break;
				}
				case HOMEDIR: {
					console.log(homedir());
					break;
				}
				case USERNAME: {
					const userData = userInfo();
					if (userData && userData.username) {
						console.log(userData.username);
					} else {
						console.log('Username is undefined!')
					}
					break;
				}
				case ARCHITECTURE: {
					const architecture = arch();
					console.log(architecture);
					break;
				}
			}

		} else {
			throw Error('Operation not available');
		}
	} catch (err) {
		console.error(err);
	}
};
