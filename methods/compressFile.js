import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import {isAbsolute, resolve} from "path";
import { cwd, exitCode } from "node:process";
import {lstat} from 'node:fs/promises';

export const compressFile = async (userArguments) => {
	try {
		if (!userArguments[0] || !userArguments[1]) {
			throw Error('No enough arguments');
		}
		const path_to_file = isAbsolute(userArguments[0]) ? userArguments[0] : resolve(cwd(), userArguments[0]);
		const path_to_destination = isAbsolute(userArguments[1]) ? userArguments[1] : resolve(cwd(), userArguments[1]);
		const stats = await lstat(path_to_file);
		if (stats.isFile()) {
			const source = createReadStream(path_to_file);
			const gzip = createGzip();
			const destination = createWriteStream(path_to_destination);

			pipeline(source, gzip, destination, (err) => {
				if (err) {
					console.error('An error occurred:', err);
					exitCode = 1;
				}
			});
		}
	} catch (err) {
		console.error(err.message);
	}
};
