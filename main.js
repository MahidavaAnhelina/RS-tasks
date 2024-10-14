import { createInterface } from 'node:readline';
import {fileURLToPath} from "node:url";
import { getArgument } from "./utils/getArgument.js";
import {dirname} from "path";
import {validatePrompt} from "./utils/validatePrompt.js";
import {getCommandAndParams} from "./utils/getCommandAndParams.js";
import {ADD, CAT, CD, COMPRESS, CP, DECOMPRESS, HASH, LS, MV, OS, RM, RN, UP} from "./constants.js";
import {upDirectory} from "./methods/upDirectory.js";
import {openFolder} from "./methods/openFolder.js";
import {printFoldersInTerminal} from "./methods/printFoldersInTerminal.js";
import {readFiles} from "./methods/readFiles.js";
import {createEmptyFile} from "./methods/createEmptyFile.js";
import {renameFile} from "./methods/renameFile.js";
import {copyFile} from "./methods/copyFile.js";
import {moveFile} from "./methods/moveFile.js";
import {deleteFile} from "./methods/deleteFile.js";
import {operationSystemRun} from "./os/operationSystemRun.js";
import {hashRun} from "./methods/hash/hashRun.js";
import {compressFile} from "./methods/compressFile.js";
import {decompressFile} from "./methods/decompressFile.js";
import { cwd } from "node:process";

const main = () => {
	const username = getArgument('username');
	const defaultDirectory = dirname(fileURLToPath(import.meta.url));

	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.on('line', async (input) => {
		if (validatePrompt(input)) {
			const [command, userArguments] = getCommandAndParams(input);

			switch (command) {
				case UP: {
					await upDirectory(defaultDirectory);
					break;
				}
				case CD: {
					await openFolder(defaultDirectory, userArguments);
					break;
				}
				case LS: {
					await printFoldersInTerminal();
					break;
				}
				case CAT: {
					await readFiles(userArguments);
					break;
				}
				case ADD: {
					await createEmptyFile(userArguments);
					break;
				}
				case RN: {
					await renameFile(userArguments);
					break;
				}
				case CP: {
					await copyFile(userArguments);
					break;
				}
				case MV: {
					await moveFile(userArguments);
					break;
				}
				case RM: {
					await deleteFile(userArguments);
					break;
				}
				case OS: {
					await operationSystemRun(userArguments);
					break;
				}
				case HASH: {
					await hashRun(userArguments);
					break;
				}
				case COMPRESS: {
					await compressFile(userArguments);
					break;
				}
				case DECOMPRESS: {
					await decompressFile(userArguments);
					break;
				}
			}

		} else {
			console.error('Invalid input');
		}

		console.log(`You are currently in ${cwd()}`)
	});

	rl.on('SIGINT', (input) => {
		console.log(`Thank you for using File Manager, ${username}, goodbye!`);
		rl.close();
	});
};

await main();
