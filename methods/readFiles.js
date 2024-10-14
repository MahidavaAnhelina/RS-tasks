import { createReadStream } from 'node:fs';
import process from "node:process";
import { isAbsolute, resolve } from "path";
import {lstat} from 'node:fs/promises';

export const readFiles = async (userArguments) => {
	try {
		const fullPath = isAbsolute(userArguments[0]) ? userArguments[0] : resolve(process.cwd(), userArguments[0]);
		const stats = await lstat(fullPath);
		if (stats.isFile()) {
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
