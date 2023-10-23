<script lang="ts">
	import TableUsers from '$lib/components/TableUsers/TableUsers.svelte';
	import { CircleDollarSign } from 'lucide-svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	const toastStore = getToastStore();

	// Typing for data
	interface User {
		id: string;
		name: string;
	}

	interface Data {
		body: {
			users: User[];
			usersPix: any; // Add the appropriate type for usersPix
		};
	}

	export let data: Data;

	// User data
	let users: User[] = data.body.users;
	let usersPix = data.body.usersPix;

	// Data of who sent or received the PIX
	let userReceiver: User = {
		id: '',
		name: ''
	};
	let userSender: User = {
		id: '',
		name: ''
	};

	// Value
	let valor: string = '';

	// Mensagem de validação dos input
	const validationMessages = {
		emptyFields: 'Por favor, preencha todos os campos.',
		sameUser: 'Não é possível enviar PIX para você mesmo.',
		zeroOrLessValue: 'Não é possível fazer um Pix de R$0,00 ou menos.',
		userNotFound: 'Remetente ou destinatário não encontrado.'
	};

	// Function to validate and send the PIX and find to locate the user's name
	async function handleSubmit(): Promise<void> {
		if (!userReceiver.id || !userSender.id || !valor) {
			toastStore.trigger({ message: validationMessages.emptyFields, timeout: 5000 });
		} else if (userReceiver.id === userSender.id) {
			toastStore.trigger({ message: validationMessages.sameUser, timeout: 5000 });
		} else if (Number(valor) <= 0) {
			toastStore.trigger({ message: validationMessages.zeroOrLessValue, timeout: 5000 });
		} else {
			const senderUser = users.find((user) => user.id === userSender.id);
			const receiverUser = users.find((user) => user.id === userReceiver.id);

			if (senderUser && receiverUser) {
				userSender.name = senderUser.name;
				userReceiver.name = receiverUser.name;
				toastStore.trigger({
					message: `PIX de ${valor} enviado de ${userSender.name} para ${userReceiver.name} com sucesso!`,
					timeout: 5000
				});
			} else {
				toastStore.trigger({ message: validationMessages.userNotFound, timeout: 5000 });
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
