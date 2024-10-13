import fs from 'node:fs';
import process from "node:process";
import { join } from "path";

export const readFiles = (userArguments) => {
	try {
		const rs = fs.createReadStream(join(process.cwd(), userArguments[0]));

		rs.pipe(process.stdout);

		rs.on('error', (err) => {
			console.error('Error reading file:', err.message);
		});
	} catch (err) {
		console.error(err.message);
	}
};
