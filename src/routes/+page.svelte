<script lang="ts">
	import { page } from '$app/stores';
	import Paper, { Title, Subtitle, Content } from '@smui/paper';
	import LinearProgress from '@smui/linear-progress';
	import Button, { Label } from '@smui/button';
	import Snackbar, { Actions, Label as SnackLabel } from '@smui/snackbar';
	import TopAppBar, {
		Row,
		Section,
		Title as BarTitle,
	} from '@smui/top-app-bar';
	import { Capacitor } from '@capacitor/core';
	import { App } from '@capacitor/app'
	import { Geolocation } from '@capacitor/geolocation';
	import type { Position } from '@capacitor/geolocation';

	let working = true;
	let success = false;
	let errorMessage = '';
	let foundLocation: Position | null = null;
	let topBar: TopAppBar;

	getLocation();

	App.addListener('appUrlOpen', data => {
		alert('URLopen with:' + data.url);
		console.log('data:', data);
	});

	function sendLocationToObsidian(pos: Position) {
		const params = getParams();
		let url = `obsidian://mapview?centerLat=${pos.coords.latitude}&centerLng=${pos.coords.longitude}&accuracy=${pos.coords.accuracy}&source=geohelper`;
		// The context is meant to be returned to Map View
		if (params?.mvaction) url += `&mvaction=${params.mvaction}`;
		if (params?.mvcontext) url += `&mvcontext=${params.mvcontext}`;
		open(url);
	}

	type Params = {
		// Action required by Geohelper
		geoaction?: string | null;
		// Action required by Map View when it receives the location
		mvaction?: string | null;
		// Additional context Map View may want to receive
		mvcontext?: string | null;
	};

	function getParams(): Params {
		const searchParams = $page?.url?.searchParams;
		if (!searchParams) return {};
		return {
			geoaction: searchParams.get('geoaction'),
			mvaction: searchParams.get('mvaction'),
			mvcontext: searchParams.get('mvcontext')
		}
	}

	async function getLocation() {
		working = true;
		success = false;
		try {
			const platform = Capacitor.getPlatform();
			if (platform === 'web') {
				console.log('Asked for web-based location');
				const webPosition: GeolocationPosition = await new Promise((resolve, reject) =>
					navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true }));
				foundLocation = webPosition;
			} else {
				console.log('Asked for mobile-based location');
				const geolocation: Position = await Geolocation.getCurrentPosition();
				foundLocation = geolocation;
			}
			working = false;
			success = true;
			sendLocationToObsidian(foundLocation);
		} catch (e) {
			working = false;
			success = false;
			errorMessage = (e as any)?.message;
		}
	}
</script>

<svelte:head>
	<title>Map View GeoHelper</title>
</svelte:head>

<main>
	<div class="top-app-bar-container flexor">
		<TopAppBar bind:this={topBar} color='primary' variant="static">
			<Row>
				<Section>
					<BarTitle>Map View Geo-Helper</BarTitle>
				</Section>
			</Row>
		</TopAppBar>
	</div>
	<Paper square>
		<Content>
			<Paper color="primary" variant="outlined">
				<p>This tiny app provides your location to Map View from outside Obsidian (because Obsidian's permissions don't allow it to be fetched internally).</p>
				<p>It runs completely locally and does not send anything to any server.</p>
			</Paper>
			<Paper color="primary" variant="outlined">
				<p>For this to work:</p>
				<ol>
					<li>Allow the location permission when asked.</li>
					<li>When a location is found, allow the browser popup (you may need to find the "popup is blocked" notification) and allow opening the `obsidian://` link.</li>
					<li>If you 'always allow' both of these, it will be smoother next time.</li>
				</ol>
			</Paper>
			{#if working}
				<p>Trying to get your location, you may close this window/tab if you want to cancel...</p>
				<LinearProgress indeterminate />
			{:else}
				<p>
					{#if success && foundLocation}
						Found location:
						<Button>
							<Label>{foundLocation.coords.latitude}, {foundLocation.coords.longitude}</Label>
						</Button>
						(accuracy = {foundLocation.coords.accuracy})
					{:else}
						<Paper color="custom-red">
							Unable to determine your location: {errorMessage}
						</Paper>
					{/if}
				</p>
				<p>
					<Button variant="raised" on:click={() => getLocation()}>
						<Label>Refresh</Label>
					</Button>
				</p>
			{/if}
		</Content>
	</Paper>

	<Snackbar>
	  <Label>Copied to clipboard</Label>
	</Snackbar>

</main>

<style>
	:global(.smui-paper--color-custom-red) {
		background-color: #ff3e00 !important;
		color: white !important;
	}
	  /* Hide everything above this component. */
  :global(#smui-app),
  :global(body),
  :global(html) {
    display: block !important;
    height: auto !important;
    width: auto !important;
    position: static !important;
  }
</style>

