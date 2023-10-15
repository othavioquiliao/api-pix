<script lang="ts">
	export let data;
	let originalUsersPix = data.body.usersPix; // Mantenha uma cópia dos dados originais
	let usersPix = originalUsersPix.slice(); // Use uma cópia dos dados originais para filtragem
	console.log(usersPix);

	let pesquisar = '';

	$: usersPix = originalUsersPix.filter(
		(pix: { sender: { name: string }; recipient: { name: string }; id: any }) => {
			return (
				pix.sender.name.toLowerCase().includes(pesquisar.toLowerCase()) ||
				pix.recipient.name.toLowerCase().includes(pesquisar.toLowerCase()) ||
				pix.id.toString().toLowerCase().includes(pesquisar.toLowerCase())
			);
		}
	);
</script>

<div class="table-container flex flex-col items-center w-full min-w-fit">
	<input
		class="input input-bordered w-1/4 mb-5 ml-auto mr-44 min-w-fit"
		type="text"
		placeholder="Pesquisar..."
		bind:value={pesquisar}
	/>
	<table class="table table-hover w-4/5 min-h-fit">
		<thead>
			<tr class="crieColor">
				<th>ID</th>
				<th>Remetente</th>
				<th>Destinatario</th>
				<th>Data</th>
				<th>Valor</th>
			</tr>
		</thead>
		<tbody>
			{#each usersPix as pix, i}
				<tr>
					<td>{pix.id}</td>
					<td>{pix.sender.name}</td>
					<td>{pix.recipient.name}</td>
					<td>{pix.createdAt}</td>
					<td>{pix.value}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th colspan="2" class="text-center"
					>TOTAL: <span class="crieColor">{usersPix.length}</span>
				</th>
			</tr>
		</tfoot>
	</table>
</div>
