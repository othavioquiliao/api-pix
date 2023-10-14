<script lang="ts">
	import CardDoPix from '$lib/components/Card/CardDoPix.svelte';
	import TableUsers from '$lib/components/TableUsers/TableUsers.svelte';

	export let data;
	console.log(data.body.users);

	let users = data.body.users;
	let usersPix = data.body.usersPix;

	console.log(usersPix);

	let userReceiver: { recipientId: string; recipientName: string } = {
		recipientId: '',
		recipientName: ''
	};
	let userSender: { senderId: string; senderName: string } = {
		senderId: '',
		senderName: ''
	};
</script>

<div class="container h-full mx-auto flex justify-center items-center flex-col">
	<h2 class="h2 font-extrabold mb-10">Consumindo API PIX</h2>
	<div class="flex w-5/6 gap-5 flex-wrap justify-center">
		<CardDoPix {users} {userSender} {userReceiver} />
		<TableUsers {usersPix} />
	</div>
</div>
