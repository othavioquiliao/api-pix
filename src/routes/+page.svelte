<script lang="ts">
	import TableUsers from '$lib/components/TableUsers/TableUsers.svelte';
	import { CircleDollarSign } from 'lucide-svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	const toastStore = getToastStore();

	// Tipagem para dados
	interface User {
		id: string;
		name: string;
	}

	interface Data {
		body: {
			users: User[];
			usersPix: any; // Adicione o tipo apropriado para usersPix
		};
	}

	export let data: Data;

	// Dados do usuário
	let users: User[] = data.body.users;
	let usersPix = data.body.usersPix;

	// Dados de quem enviou ou recebeu o pix
	let userReceiver: User = {
		id: '',
		name: ''
	};
	let userSender: User = {
		id: '',
		name: ''
	};
	// Valor
	let valor: string = '';

	// Função para validar e enviar o Pix e find para encontrar o nome do usuário
	async function handleSubmit(): Promise<void> {
		let t: any;
		if (!userReceiver.id || !userSender.id || !valor) {
			t = {
				message: 'Por favor, preencha todos os campos.',
				timeout: 5000
			};
		} else if (userReceiver.id === userSender.id) {
			t = {
				message: 'Não é possível enviar PIX para você mesmo.',
				timeout: 5000
			};
		} else if (Number(valor) <= 0) {
			t = {
				message: 'Não é possivel fazer um Pix de R$0,00 ou menos.',
				timeout: 5000
			};
			toastStore.trigger(t);
		} else {
			const senderUser = users.find((user) => user.id === userSender.id);
			const receiverUser = users.find((user) => user.id === userReceiver.id);

			if (senderUser && receiverUser) {
				userSender.name = senderUser.name;
				userReceiver.name = receiverUser.name;
				t = {
					message: `PIX de ${valor} enviado de ${userSender.name} para ${userReceiver.name} com sucesso!`,
					timeout: 5000
				};
				toastStore.trigger(t);
			} else {
				t = {
					message: 'Remetente ou destinatário não encontrado.',
					timeout: 5000
				};
				toastStore.trigger(t);
			}
		}
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center flex-col">
	<h2 class="h2 font-extrabold mb-10">Consumindo API PIX</h2>
	<div class="flex w-5/6 gap-5 flex-wrap justify-center">
		<form
			method="post"
			use:enhance
			action="?/enviarPix"
			class="card flex w-1/3 h-fit text-center pb-5 flex-col items-center"
		>
			<label class="label p-5">
				<span class="label-text crieColor text-lg font-bold">Quem enviar o PIX:</span>
				<select
					class="select text-center select-sender"
					name="senderId"
					required
					bind:value={userSender.id}
				>
					<option value="">Escolha um nome</option>
					{#each users as user (user.id)}
						<option value={user.id}>{user.name}</option>
					{/each}
				</select>
			</label>
			<label class="label p-5">
				<span class="label-text crieColor text-lg font-bold">Quem receber o PIX:</span>
				<select
					class="select text-center select-receiver"
					name="recipientId"
					bind:value={userReceiver.id}
				>
					<option value="">Escolha um nome</option>
					{#each users as user (user.id)}
						<option value={user.id}>{user.name}</option>
					{/each}
				</select>
			</label>
			<label class="label flex flex-col md:flex-row items-center p-4">
				<span class="pr-5 crieColor text-lg font-bold">Valor:</span>
				<input
					class="input w-24"
					title="valor"
					type="number"
					placeholder="0"
					name="value"
					bind:value={valor}
				/>
			</label>

			<button type="submit" class="btn variant-ghost min-w-min w-1/3 mt-5" on:click={handleSubmit}>
				<span class="crieColor"><CircleDollarSign /></span>
				<span>Enviar PIX</span>
			</button>
		</form>

		<TableUsers {usersPix} />
	</div>
</div>
