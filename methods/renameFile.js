import process from "node:process";
import fs from 'node:fs';
import {rename} from 'node:fs/promises';
import {isAbsolute, resolve} from "path";

export const renameFile = async (userArguments) => {
	try {
		if (!userArguments[0] || !userArguments[1]) {
			throw Error('No enough arguments');
		}
		const path_to_file = isAbsolute(userArguments[0]) ? userArguments[0] : resolve(process.cwd(), userArguments[0]);
		const new_filename = isAbsolute(userArguments[1]) ? userArguments[1] : resolve(process.cwd(), userArguments[1]);
		if (!path_to_file || !new_filename) {
			throw Error('No enough arguments');
		}

		try {
			if (fs.existsSync(new_filename) || !fs.existsSync(path_to_file)) {
				throw Error('FS operation failed');
			}
			await rename(path_to_file,new_filename);
			console.log('File renamed successfully!');
		} catch (error) {
			console.log(error.message);
		}
	} catch (err) {
		console.error(err.message);
	}
};
