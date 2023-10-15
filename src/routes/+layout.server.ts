import type { LayoutServerLoad } from './$types';
import { API_KEY_PIX, API_KEY_USERS } from '$env/static/private';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const users = await fetch(API_KEY_USERS).then((r) => r.json());
	const usersPix = await fetch(API_KEY_PIX).then((r) => r.json());

	return {
		status: 200,
		body: {
			users,
			usersPix
		}
	};
};
