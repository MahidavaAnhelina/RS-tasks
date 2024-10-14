import {isAbsolute, resolve, dirname} from "path";
import process from "node:process";
import { open, mkdir } from 'node:fs/promises';

export const createEmptyFile = async (userArguments) => {
	try {
		const fullPath = isAbsolute(userArguments[0]) ? userArguments[0] : resolve(process.cwd(), userArguments[0]);
		const dirPath = dirname(fullPath);
		await mkdir(dirPath, { recursive: true });
		const fileHandle = await open(fullPath, 'w');
		await fileHandle.close();
	} catch (err) {
		console.error(err);
	}
};
