import { lstatSync, createReadStream } from 'node:fs';
import process from "node:process";
import { isAbsolute, resolve } from "path";

export const readFiles = (userArguments) => {
	try {
		const fullPath = isAbsolute(userArguments[0]) ? userArguments[0] : resolve(process.cwd(), userArguments[0]);
		if (lstatSync(fullPath).isFile()) {
			const rs = createReadStream(fullPath);

			rs.pipe(process.stdout);

			rs.on('error', (err) => {
				console.error('Error reading file:', err.message);
			});
		} else {
			throw Error('Error with file');
		}
	} catch (err) {
		console.error(err.message);
	}
};
