import { cwd } from "node:process";
import { createReadStream, existsSync, createWriteStream, unlink } from 'node:fs';
import {basename, join} from "path";

export const moveFile = (userArguments) => {
	try {
		const path_to_file = join(cwd(), userArguments[0]);
		const path_to_new_directory = join(cwd(), userArguments[1]);

		if (!existsSync(path_to_file) && !existsSync(path_to_new_directory)) {
			throw Error('FS operation failed');
		}

		const rs = createReadStream(path_to_file);
		const writeStream = createWriteStream(path_to_new_directory + '/' + basename(path_to_file));

		rs.pipe(writeStream);

		rs.on("error", err => console.error(err.message));
		writeStream.on("error", err => console.error(err.message));

		return new Promise((resolve) => {
			writeStream.on("finish", () => {
				resolve();
			});
		}).then(() => {
			return unlink(path_to_file, (err) => {
				if (err) {
					console.error('Error removing file:', err.message);
				} else {
					console.log('File successfully moved');
				}
			});
		});
	} catch (err) {
		console.error(err);
	}
};
