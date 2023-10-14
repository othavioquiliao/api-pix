<script lang="ts">
	import { CircleDollarSign } from 'lucide-svelte';

	export let users: {
		id: string;
		name: string;
	}[] = [];

	export let userReceiver: { recipientId: string; recipientName: string } = {
		recipientId: '',
		recipientName: ''
	};

	export let userSender: { senderId: string; senderName: string } = {
		senderId: '',
		senderName: ''
	};

	let valor: string = '';

	let feedbackMessage: string = 'Algo deu errado';

	async function enviarPIX(): Promise<void> {
		const selectReceiver = document.querySelector('.select-receiver') as HTMLSelectElement;
		const selectSender = document.querySelector('.select-sender') as HTMLSelectElement;
		const inputValor = document.querySelector('.input') as HTMLInputElement;

		if (!selectReceiver.value || !selectSender.value || !inputValor.value) {
			feedbackMessage = 'Por favor, preencha todos os campos.';
			return;
		}

		userReceiver.recipientId = selectReceiver.value;
		userReceiver.recipientName = selectReceiver.options[selectReceiver.selectedIndex].text;
		userSender.senderId = selectSender.value;
		userSender.senderName = selectSender.options[selectSender.selectedIndex].text;

		valor = inputValor.value;

		// Realizar a lógica real para enviar PIX com os dados coletados
		// (substitua este comentário pela lógica real)

		feedbackMessage = `PIX de ${valor} para ${userReceiver.recipientName} enviado com sucesso de ${userSender.senderName}.`;
	}
</script>

<div class="card flex w-1/3 h-fit text-center pb-5 flex-col items-center">
	<label class="label p-5">
		<span class="label-text crieColor text-lg font-bold">Quem enviar o PIX:</span>
		<select class="select text-center select-sender">
			<option value="">Escolha um nome</option>
			{#each users as user}
				<option value={user.id}> {user.name} </option>
			{/each}
		</select>
	</label>
	<label class="label p-5">
		<span class="label-text crieColor text-lg font-bold">Quem receber o PIX:</span>
		<select class="select text-center select-receiver">
			<option value="">Escolha um nome</option>
			{#each users as user}
				<option value={user.id}> {user.name} </option>
			{/each}
		</select>
	</label>
	<label class="label flex flex-col md:flex-row items-center p-4">
		<span class="pr-5 crieColor text-lg font-bold">Valor:</span>
		<input class="input w-24" title="valor" type="number" placeholder="0" />
	</label>

	<button type="button" class="btn variant-ghost min-w-min w-1/3 mt-5" on:click={enviarPIX}>
		<span class="crieColor"><CircleDollarSign /> </span>
		<span>Enviar PIX</span>
	</button>

	<p class="mt-8">{feedbackMessage}</p>
</div>
