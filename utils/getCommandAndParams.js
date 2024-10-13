export const getCommandAndParams = (input) => {
	const [command, ...userArguments] = input.split(' ');

	return [command, userArguments];
};
