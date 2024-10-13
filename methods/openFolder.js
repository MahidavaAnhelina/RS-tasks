import {resolve} from "path";
import process from "node:process";
import fs from 'node:fs';

export const openFolder = (defaultDirectory, userArguments) => {
	try {
		const newPath = userArguments[0];
		if (fs.lstatSync(newPath).isDirectory() ) {
			const newDirectory = resolve(process.cwd(), newPath);
			if (newDirectory.startsWith(defaultDirectory)) {
				process.chdir(newPath);
			}
		}
	} catch (err) {
		console.error(err.message);
	}
};
