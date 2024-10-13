export const getCommandAndParams = (input) => {
	const command = input.slice(0, 2);

	const userArguments = input.slice(3).split(' ');

	return [command, userArguments];
};
