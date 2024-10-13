import fs from 'node:fs';
import process from "node:process";

export const printFoldersInTerminal = () => {
	let structData = [];
	fs.readdirSync(process.cwd(), { withFileTypes: true }).forEach(file => {

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
