<script lang="ts">
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import { Search } from 'lucide-svelte';

	export let usersPix: any;

	$: paginatedSource = usersPix.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	let paginationSettings = {
		page: 0,
		limit: 7,
		size: usersPix.length,
		amounts: [7, 10, 15]
	} satisfies PaginationSettings;
</script>

<!-- Responsive Container (recommended) -->
<div class="table-container w-1/2">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr class="crieColor">
				<th class="w-4">ID</th>
				<th class="w-2/4">Remetente</th>
				<th class="w-2/4">Destinatario</th>
				<th class="w-14">Valor</th>
			</tr>
		</thead>
		<tbody>
			{#each paginatedSource as pix, i}
				<tr>
					<td>{pix.id}</td>
					<td>{pix.sender.name}</td>
					<td>{pix.recipient.name}</td>
					<td>{pix.value}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="flex justify-center items-center gap-16 p-3">
		<Paginator
			bind:settings={paginationSettings}
			showFirstLastButtons={false}
			showPreviousNextButtons={true}
			class="flex justify-between items-center w-full"
		/>
		<a href="/pesquisar" class="btn h-10 variant-ghost-surface">
			<span class="crieColor"><Search /></span>
			<span>Pesquisar</span>
		</a>
	</div>
</div>
