import { cwd } from "node:process";
import { existsSync, unlink } from 'node:fs';
import { join } from "path";

export const deleteFile = (userArguments) => {
	try {
		const path_to_file = join(cwd(), userArguments[0]);
		if (!existsSync(path_to_file)) {
			throw Error('File not exists');
		}

		unlink(path_to_file, (err) => {
			if (err) {
				console.error('Error removing file:', err.message);
			} else {
				console.log('File successfully deleted');
			}
		})
	} catch (err) {
		console.error(err);
	}
};
