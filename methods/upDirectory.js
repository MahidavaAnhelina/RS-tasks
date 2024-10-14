import process from "node:process";
import {resolve} from "path";

export const upDirectory = (defaultDirectory) => {
	const newDirectory = resolve(process.cwd(), '../');
	if (newDirectory.startsWith(defaultDirectory)) {
		process.chdir('../');
	}
};
