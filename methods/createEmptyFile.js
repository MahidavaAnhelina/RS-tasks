import {isAbsolute, resolve, dirname} from "path";
import process from "node:process";
import { mkdirSync, closeSync, openSync } from 'node:fs';

export const createEmptyFile = (userArguments) => {
	try {
		const fullPath = isAbsolute(userArguments[0]) ? userArguments[0] : resolve(process.cwd(), userArguments[0]);
		const dirPath = dirname(fullPath);
		mkdirSync(dirPath, { recursive: true });
		closeSync(openSync(fullPath, 'w'));
	} catch (err) {
		console.error(err.message);
	}
};
