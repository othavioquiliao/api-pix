<script lang="ts">
	import '../app.css';
	import { AppShell, AppBar, Toast } from '@skeletonlabs/skeleton';
	import Footer from '$lib/components/Footer/Footer.svelte';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import HeaderCrie from '$lib/components/HeaderCrie/HeaderCrie.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<Toast />

<AppShell>
	<svelte:fragment slot="header"><HeaderCrie /></svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<svelte:fragment slot="footer"><Footer /></svelte:fragment>
</AppShell>
