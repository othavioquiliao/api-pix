<script lang="ts">
	import { CircleDollarSign } from 'lucide-svelte';

	export let users: {
		id: string;
		name: string;
	}[] = [];

	let userReceiver: { recipientId: string; recipientName: string } = {
		recipientId: '',
		recipientName: ''
	};

	let userSender: { senderId: string; senderName: string } = {
		senderId: '',
		senderName: ''
	};

	let valor: string = '';

	let feedbackMessage: string = 'Algo deu errado';

	function enviarPIX(): void {
		// Obter os valores selecionados dos elementos <select>
		userReceiver.recipientId = (
			document.querySelector('.select-receiver') as HTMLSelectElement
		).value;
		userReceiver.recipientName = (
			document.querySelector('.select-receiver') as HTMLSelectElement
		).options[(document.querySelector('.select-receiver') as HTMLSelectElement).selectedIndex].text;
		userSender.senderId = (document.querySelector('.select-sender') as HTMLSelectElement).value;
		userSender.senderName = (document.querySelector('.select-sender') as HTMLSelectElement).options[
			(document.querySelector('.select-sender') as HTMLSelectElement).selectedIndex
		].text;

		// Obter o valor do PIX do campo de entrada
		valor = (document.querySelector('.input') as HTMLInputElement).value;

		// Realizar a lógica real para enviar PIX com os dados coletados
		// (substitua este comentário pela lógica real)

		// Exibir feedback ao usuário
		feedbackMessage = `PIX de ${valor} para ${userReceiver.recipientName} enviado com sucesso de ${userSender.senderName}.`;
	}
</script>

<div class="card flex w-1/3 text-center flex-col items-center">
	<label class="label p-5">
		<span class="label-text">Enviar PIX:</span>
		<select class="select text-center select-sender">
			<option value="">Escolha um nome</option>
			{#each users as user}
				<option value={user.id}> {user.name} </option>
			{/each}
		</select>
	</label>
	<label class="label p-5">
		<span class="label-text">Receber PIX:</span>
		<select class="select text-center select-receiver">
			<option value="">Escolha um nome</option>
			{#each users as user}
				<option value={user.id}> {user.name} </option>
			{/each}
		</select>
	</label>
	<label class="label flex items-center p-4">
		<span class="pr-10">Valor:</span>
		<input class="input" title="Input (number)" type="number" />
	</label>

	<button type="button" class="btn variant-ghost w-1/3 mt-16" on:click={enviarPIX}>
		<span><CircleDollarSign /> </span>
		<span>Enviar PIX</span>
	</button>

	<p class="mt-8">{feedbackMessage}</p>
</div>
