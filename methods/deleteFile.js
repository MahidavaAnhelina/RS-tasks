import { cwd } from "node:process";
import { existsSync, unlink } from 'node:fs';
import {isAbsolute, resolve} from "path";

export const deleteFile = (userArguments) => {
	try {
		const path_to_file = isAbsolute(userArguments[0]) ? userArguments[0] : resolve(cwd(), userArguments[0]);
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
