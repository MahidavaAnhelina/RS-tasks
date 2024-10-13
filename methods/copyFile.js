import { cwd } from "node:process";
import { createReadStream, existsSync, createWriteStream } from 'node:fs';
import { join } from "path";

export const copyFile = (userArguments) => {
	try {
		const path_to_file = join(cwd(), userArguments[0]);
		const path_to_new_directory = join(cwd(), userArguments[1]);

		if (!existsSync(path_to_file)) {
			throw Error('FS operation failed');
		}

		const rs = createReadStream(path_to_file);
		const writeStream = createWriteStream(path_to_new_directory);

		rs.pipe(writeStream);

		rs.on("error", err => console.error(err.message));
		writeStream.on("error", err => console.error(err.message));

		return new Promise((resolve) => {
			writeStream.on("finish", resolve);
		});
	} catch (err) {
		console.error(err.message);
	}
};
