import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('http://177.44.248.24/pix-api/users');
	const users = await res.json();
	return {
		status: 200,
		body: {
			users
		}
	};
};
