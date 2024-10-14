import {readdir} from 'node:fs/promises';
import process from "node:process";

export const printFoldersInTerminal = async () => {
	let structData = [];
	const data = await readdir(process.cwd(), { withFileTypes: true });
	data.forEach(file => {

		structData.push({ Name: file.name, Type: file.isDirectory() ? 'directory' : 'file' });
	});

	structData.sort((a, b) => {
		if (a.Type === b.Type) {
			return a.Name.localeCompare(b.Name);
		}
		return a.Type === 'directory' ? -1 : 1;
	});

	console.table(structData);
};
