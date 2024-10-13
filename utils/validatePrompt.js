import {ADD, CAT, CD, COMPRESS, CP, DECOMPRESS, HASH, LS, MV, OS, RM, RN, UP} from "../constants.js";

export const LIST_AVAILABLE_OPERATIONS = [
	UP, CD, LS, CAT, ADD, RN, CP, MV, RM, OS, HASH, COMPRESS, DECOMPRESS
];

export const validatePrompt = (input) => {
	return !!LIST_AVAILABLE_OPERATIONS.includes(input.split(' ')[0]);
};


