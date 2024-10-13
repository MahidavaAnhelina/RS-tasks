import { pipeline } from 'node:stream';
import { lstatSync, createReadStream, createWriteStream } from 'node:fs';
import { createUnzip } from 'node:zlib';
import { join } from "path";
import { cwd, exitCode } from "node:process";

export const decompressFile = (userArguments) => {
	try {
		const path_to_file = userArguments[0];
		const path_to_destination = userArguments[1];
		if (lstatSync(join(cwd(), path_to_file)).isFile()) {
			const source = createReadStream(path_to_file);
			const unzip = createUnzip();
			const destination = createWriteStream(join(cwd(), path_to_destination));

			pipeline(source, unzip, destination, (err) => {
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
