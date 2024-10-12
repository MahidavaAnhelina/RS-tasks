import { createInterface } from 'node:readline';
import {fileURLToPath} from "node:url";
import { getArgument } from "./utils/getArgument.js";
import {dirname} from "path";

const main = () => {
	const username = getArgument('username');

	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.on('line', (input) => {

		const __dirname = dirname(fileURLToPath(import.meta.url));
		console.log(`You are currently in ${__dirname}`)
	});

	rl.on('SIGINT', (input) => {
		console.log(`Thank you for using File Manager, ${username}, goodbye!`);
		rl.close();
	});
};

await main();
