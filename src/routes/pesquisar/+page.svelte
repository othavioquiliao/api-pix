<script lang="ts">
	import { SlideToggle, type PaginationSettings, Paginator } from '@skeletonlabs/skeleton';

	export let data;

	let originalUsersPix = data.body.usersPix; // Mantenha uma cópia dos dados originais

	let usersPix = originalUsersPix.slice(); // Use uma cópia dos dados originais para filtragem
	// ---------- FILTROS DE PESQUISA
	let pesquisar = '';
	let enviados = false;
	let recebidos = false;

	$: usersPix = originalUsersPix.filter(
		(pix: { sender: { name: string }; recipient: { name: string }; id: any }) => {
			return (
				pix.sender.name.toLowerCase().includes(pesquisar.toLowerCase()) ||
				pix.recipient.name.toLowerCase().includes(pesquisar.toLowerCase()) ||
				pix.id.toString().toLowerCase().includes(pesquisar.toLowerCase())
			);
		}
	);
	$: if (enviados) {
		usersPix = usersPix.filter((pix: { sender: { name: string } }) => {
			return pix.sender.name.toLowerCase().includes(pesquisar.toLowerCase());
		});
	}
	$: if (recebidos) {
		usersPix = usersPix.filter((pix: { recipient: { name: string } }) => {
			return pix.recipient.name.toLowerCase().includes(pesquisar.toLowerCase());
		});
	}
	$: if (enviados && recebidos) {
		usersPix = originalUsersPix.filter(
			(pix: { sender: { name: string }; recipient: { name: string }; id: any }) => {
				return (
					pix.sender.name.toLowerCase().includes(pesquisar.toLowerCase()) ||
					pix.recipient.name.toLowerCase().includes(pesquisar.toLowerCase()) ||
					pix.id.toString().toLowerCase().includes(pesquisar.toLowerCase())
				);
			}
		);
	}
	$: if (recebidos === false && enviados === false) {
		usersPix = originalUsersPix.filter(
			(pix: { sender: { name: string }; recipient: { name: string }; id: any }) => {
				return (
					pix.sender.name.toLowerCase().includes(pesquisar.toLowerCase()) ||
					pix.recipient.name.toLowerCase().includes(pesquisar.toLowerCase()) ||
					pix.id.toString().toLowerCase().includes(pesquisar.toLowerCase())
				);
			}
		);
	}
	// ----------- PAGINAÇÃO DA TABELA----------

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: usersPix.length,
		amounts: [5, 10, 15, 25]
	} satisfies PaginationSettings;
	$: paginatedSource = usersPix.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
</script>

<div class="w-full table-container flex justify-center flex-col items-center">
	<div class="flex w-4/5 p-3 justify-center gap-8 items-center">
		<input
			class="input input-bordered w-1/4"
			type="text"
			placeholder="Pesquisar..."
			bind:value={pesquisar}
		/>
		<SlideToggle name="slide" active="crieBgColor" bind:checked={enviados}>Enviados</SlideToggle>
		<SlideToggle name="slide" active="crieBgColor" bind:checked={recebidos}>Recebidos</SlideToggle>
	</div>
	<table class="table table-hover w-4/5 min-h-fit">
		<thead>
			<tr class="crieColor">
				<th class="w-5">ID</th>
				<th class="w-2/5">Remetente</th>
				<th class="w-2/5">Destinatario</th>
				<th class="w-5">Data</th>
				<th class="w-5">Valor</th>
			</tr>
		</thead>
		<tbody>
			{#each paginatedSource as pix, i}
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
			<tr />
		</tfoot>
	</table>
	<div class="flex w-full justify-center gap-8 items-center p-5">
		<Paginator
			bind:settings={paginationSettings}
			showFirstLastButtons={true}
			showPreviousNextButtons={true}
			justify="flex"
		/>
		<span>TOTAL: <span class="crieColor">{usersPix.length}</span> </span>
	</div>
</div>
