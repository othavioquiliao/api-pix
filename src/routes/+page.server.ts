import type { Actions } from './$types';

export const actions = {
	enviarPix: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());

		console.log(formData);
	}
} satisfies Actions;
