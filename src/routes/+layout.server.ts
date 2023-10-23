import type { LayoutServerLoad } from './$types';
import { API_KEY_PIX, API_KEY_USERS } from '$env/static/private';

export const load: LayoutServerLoad = async ({ fetch }) => {
	try {
		const responseUsers = await fetch(API_KEY_USERS);
		const responseUsersPix = await fetch(API_KEY_PIX);

		if (!responseUsers.ok || !responseUsersPix.ok) {
			throw new Error('Falha em realizar o fetch dos dados!');
		}

		const users = await responseUsers.json();
		const usersPix = await responseUsersPix.json();

		return {
			status: 200,
			body: {
				users,
				usersPix
			}
		};
	} catch (error) {
		console.error('Occorreu um erro:', error);
		return {
			status: 500, // Internal Server Error
			body: {
				error: 'Falha ao carregar os dados!'
			}
		};
	}
};
