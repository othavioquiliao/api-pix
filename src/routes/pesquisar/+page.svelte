<script lang="ts">
	export let data;
	let originalUsersPix = data.body.usersPix; // Mantenha uma cópia dos dados originais
	let usersPix = originalUsersPix.slice(); // Use uma cópia dos dados originais para filtragem
	console.log(usersPix);

	let pesquisarField = '';

	$: usersPix = originalUsersPix.filter(
		(pix: { sender: { name: string }; recipient: { name: string } }) => {
			return (
				pix.sender.name.toLowerCase().includes(pesquisarField.toLowerCase()) ||
				pix.recipient.name.toLowerCase().includes(pesquisarField.toLowerCase())
			);
		}
	);
</script>

<div class="table-container">
	<input
		class="input input-bordered w-1/3 mb-5"
		type="text"
		placeholder="Search..."
		bind:value={pesquisarField}
	/>
	<!-- Native Table Element -->
	<table class="table table-hover">
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
