import { pipeline } from 'node:stream';
import { lstatSync, createReadStream, createWriteStream } from 'node:fs';
import { createUnzip } from 'node:zlib';
import {isAbsolute, join, resolve} from "path";
import { cwd, exitCode } from "node:process";

export const decompressFile = (userArguments) => {
	try {
		if (!userArguments[0] || !userArguments[1]) {
			throw Error('No enough arguments');
		}
		const path_to_file = isAbsolute(userArguments[0]) ? userArguments[0] : resolve(cwd(), userArguments[0]);
		const path_to_destination = isAbsolute(userArguments[1]) ? userArguments[1] : resolve(cwd(), userArguments[1]);
		if (lstatSync(path_to_file).isFile()) {
			const source = createReadStream(path_to_file);
			const unzip = createUnzip();
			const destination = createWriteStream(path_to_destination);

			pipeline(source, unzip, destination, (err) => {
				if (err) {
					console.error('An error occurred:', err);
				}
			});
		}
	} catch (err) {
		console.error(err.message);
	}
};
