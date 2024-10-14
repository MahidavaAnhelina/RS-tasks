import {isAbsolute, resolve} from "path";
import process from "node:process";
import fs from 'node:fs';

export const openFolder = (defaultDirectory, userArguments) => {
	try {
		const newPath = isAbsolute(userArguments[0]) ? userArguments[0] : resolve(process.cwd(), userArguments[0]);
		if (fs.lstatSync(newPath).isDirectory()) {
			const newDirectory = resolve(process.cwd(), newPath);
			if (newDirectory.startsWith(defaultDirectory)) {
				process.chdir(newPath);
			}
		}
	} catch (err) {
		console.error(err.message);
	}
};
