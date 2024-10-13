import {join} from "path";
import process from "node:process";
import fs from 'node:fs';

export const createEmptyFile = (userArguments) => {
	try {
		fs.closeSync(fs.openSync(join(process.cwd(), userArguments[0]), 'w'));
	} catch (err) {
		console.error(err.message);
	}
};
