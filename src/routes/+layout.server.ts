import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ fetch }) => {
	const users = await fetch('http://177.44.248.24/pix-api/users').then((r) => r.json());
	const usersPix = await fetch('http://177.44.248.24/pix-api/pix').then((r) => r.json());

	return {
		status: 200,
		body: {
			users,
			usersPix
		}
	};
};
