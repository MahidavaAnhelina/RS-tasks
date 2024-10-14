export const getCommandAndParams = (input) => {
	const [command, ...userArguments] = input.replace(/\s+/g, ' ').split(' ');

	return [command, userArguments];
};
