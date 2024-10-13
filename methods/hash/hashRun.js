import { lstatSync, createReadStream } from 'node:fs';
import { cwd } from "node:process";
import { join } from "path";
import { createHash } from 'node:crypto';

export const hashRun = (userArguments) => {
	try {
		const fileToRead = userArguments[0];
		if (lstatSync(join(cwd(),fileToRead)).isFile()) {
			const hash = createHash('sha256');
			const rs = createReadStream(fileToRead);
			rs.on('error', err => console.log(err));
			rs.on('data', chunk => hash.update(chunk));
			rs.on('end', () => console.log(hash.digest('hex')));
		}
	} catch (err) {
		console.error(err.message);
	}
};
