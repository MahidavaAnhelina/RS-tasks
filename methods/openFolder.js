import {isAbsolute, resolve} from "path";
import process from "node:process";
import {lstat} from 'node:fs/promises';

export const openFolder = async (defaultDirectory, userArguments) => {
	try {
		const newPath = isAbsolute(userArguments[0]) ? userArguments[0] : resolve(process.cwd(), userArguments[0]);
		const stats = await lstat(newPath);
		if (stats.isDirectory()) {
			const newDirectory = resolve(process.cwd(), newPath);
			if (newDirectory.startsWith(defaultDirectory)) {
				process.chdir(newPath);
			}
		} else {
			console.error('Not a directory');
		}
	} catch (err) {
		console.error(err.message);
	}
};
