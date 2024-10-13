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
import {operationSystemRun} from "./methods/os/operationSystemRun.js";
import {hashRun} from "./methods/hash/hashRun.js";
import {compressFile} from "./methods/compressFile.js";
import {decompressFile} from "./methods/decompressFile.js";

const main = () => {
	const username = getArgument('username');
	const defaultDirectory = dirname(fileURLToPath(import.meta.url));

	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.on('line', (input) => {
		if (validatePrompt(input)) {
			const [command, userArguments] = getCommandAndParams(input);

			console.log(command, userArguments, 'command, userArguments');

			switch (command) {
				case UP: {
					upDirectory(defaultDirectory);
					break;
				}
				case CD: {
					openFolder(defaultDirectory, userArguments);
					break;
				}
				case LS: {
					printFoldersInTerminal();
					break;
				}
				case CAT: {
					readFiles(userArguments);
					break;
				}
				case ADD: {
					createEmptyFile(userArguments);
					break;
				}
				case RN: {
					renameFile(userArguments);
					break;
				}
				case CP: {
					copyFile(userArguments);
					break;
				}
				case MV: {
					moveFile(userArguments);
					break;
				}
				case RM: {
					deleteFile(userArguments);
					break;
				}
				case OS: {
					operationSystemRun(userArguments);
					break;
				}
				case HASH: {
					hashRun();
					break;
				}
				case COMPRESS: {
					compressFile();
					break;
				}
				case DECOMPRESS: {
					decompressFile();
					break;
				}
			}

		} else {
			console.error('Invalid input');
		}

		console.log(`You are currently in ${process.cwd()}`)
	});

	rl.on('SIGINT', (input) => {
		console.log(`Thank you for using File Manager, ${username}, goodbye!`);
		rl.close();
	});
};

await main();
