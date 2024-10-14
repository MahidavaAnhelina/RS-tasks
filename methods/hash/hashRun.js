import { lstatSync, createReadStream } from 'node:fs';
import { cwd } from "node:process";
import {isAbsolute, join, resolve} from "path";
import { createHash } from 'node:crypto';

export const hashRun = (userArguments) => {
	try {
		const fileToRead = isAbsolute(userArguments[0]) ? userArguments[0] : resolve(cwd(), userArguments[0]);
		if (lstatSync(fileToRead).isFile()) {
			const hash = createHash('sha256');
			const rs = createReadStream(fileToRead);
			rs.on('error', err => console.log(err));
			rs.on('data', chunk => hash.update(chunk));
			rs.on('end', () => console.log(hash.digest('hex')));
		} else {
			throw Error('Enter file name');
		}
	} catch (err) {
		console.error(err.message);
	}
};
