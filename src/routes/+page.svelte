<script lang="ts">
	import CardDoPix from '$lib/components/Card/CardDoPix.svelte';
	import CardListPix from '$lib/components/Card/CardListPix.svelte';

	export let data;
	console.log(data.body.users);

	let users = data.body.users;
</script>

<div class="container h-full mx-auto flex justify-center items-center flex-col">
	<h2 class="h2 font-extrabold mb-10">Consumindo API PIX</h2>
	<div class="flex w-4/5 gap-5 h-2/3 flex-wrap justify-center">
		<CardDoPix {users} />
		<CardListPix />
	</div>
</div>
