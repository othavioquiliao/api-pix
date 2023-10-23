import type { Actions } from './$types';
import { API_KEY_PIX } from '$env/static/private';

export const actions = {
	enviarPix: async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData.entries());
		console.log(data);

		try {
			const response = await fetch(API_KEY_PIX, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json' // Defina o tipo de conteúdo conforme necessário
				},
				body: JSON.stringify(data) // Converte os dados em JSON e envia no corpo da requisição
			});

			if (!response.ok) {
				throw new Error('Erro na requisição da API');
			}

			const responseData = await response.json();
			console.log('Resposta da API:', responseData);
		} catch (error) {
			console.error('Ocorreu um erro:', error);
		}
	}
} satisfies Actions;
