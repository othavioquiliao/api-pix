<script lang="ts">
	import { Search } from 'lucide-svelte';

	export let usersPix: any;
	console.log('usersPix', usersPix);
</script>

<div class="card w-1/2">
	<!-- Responsive Container (recommended) -->
	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table table-hover">
			<thead>
				<tr class="crieColor">
					<th>ID</th>
					<th>Remetente</th>
					<th>Destinatario</th>
					<th>Valor</th>
				</tr>
			</thead>
			<tbody>
				{#each usersPix as pix, i}
					<tr>
						<td>{pix.id}</td>
						<td>{pix.sender.name}</td>
						<td>{pix.recipient.name}</td>
						<td>{pix.value}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<th colspan="2"
						><a href="/pesquisar" class="btn variant-ghost-surface">
							<span class="crieColor"><Search /></span>
							<span>Pesquisar</span>
						</a>
					</th>
					<td class=" text-center">TOTAL: <span class="crieColor">{usersPix.length}</span> </td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
