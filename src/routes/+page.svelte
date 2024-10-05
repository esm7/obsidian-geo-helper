<script lang="ts">
	import { page } from '$app/stores';
	import Paper, { Title, Subtitle, Content } from '@smui/paper';
	import LinearProgress from '@smui/linear-progress';
	import Button, { Icon, Label } from '@smui/button';
	import Snackbar, { Actions, Label as SnackLabel } from '@smui/snackbar';
	import IconButton, { Icon as IconButtonIcon } from '@smui/icon-button';
	import Accordion, { Panel, Header, Content as AccordionContent } from '@smui-extra/accordion';
	import TopAppBar, {
		Row,
		Section,
		Title as BarTitle,
	} from '@smui/top-app-bar';
	import { Capacitor } from '@capacitor/core';
	import { App } from '@capacitor/app'
	import { Geolocation } from '@capacitor/geolocation';
	import type { Position } from '@capacitor/geolocation';
	import { Clipboard } from '@capacitor/clipboard';
	import { MapPin, Copy, Edit, ChevronUp, ChevronDown, Plus, Type } from 'lucide-svelte';
	import TextField from '@smui/textfield';

	let working = false;
	let success = true;
	let errorMessage = '';
	let foundLocation: Position | null = null;
	let locationName = '';
	let topBar: TopAppBar;
	const isMobile = Capacitor.getPlatform() != 'web';
	let copySnack: Snackbar;
	let instructionsOpen = false;

	App.addListener('appUrlOpen', data => {
		const url = new URL(data.url);
		getLocation(url);
	});

	function sendLocationToObsidian(pos: Position, params: Params) {
		let url = `obsidian://mapview?centerLat=${pos.coords.latitude}&centerLng=${pos.coords.longitude}&accuracy=${pos.coords.accuracy}&source=geohelper`;
		if (locationName && locationName.length > 0)
			url += `&label=${locationName}`;
		// The context is meant to be returned to Map View
		if (params?.mvaction) url += `&mvaction=${params.mvaction}`;
		if (params?.mvcontext) url += `&mvcontext=${params.mvcontext}`;
		open(url);
	}

	function copyAsInlineLocation() {
		if (!foundLocation) return;
		const s = `[${locationName}](geo:${foundLocation.coords.latitude},${foundLocation.coords.longitude})`;
		if (isMobile) Clipboard.write({ string: s });
		else navigator.clipboard.writeText(s);
		//@ts-ignore
		copySnack.open();
	}

	function sendLocationWithAction(mvaction: MapViewGpsAction) {
		const params: Params = { mvaction: mvaction };
		if (foundLocation)
			sendLocationToObsidian(foundLocation, params);
	}

// Should be the same between obsidian-map-view and obsidian-geo-helper
	type GeoHelperAction = 'locate';
	type MapViewGpsAction =
		| 'showonmap'
		| 'newnotehere'
		| 'addtocurrentnotefm'
		| 'addtocurrentnoteinline'
		| 'copyinlinelocation';

	// Should be the same between obsidian-map-view and obsidian-geo-helper
	type Params = {
		// Action required by Geohelper
		geoaction?: GeoHelperAction | null;
		// Action required by Map View when it receives the location
		mvaction?: MapViewGpsAction | null;
		// Additional context Map View may want to receive
		mvcontext?: string | null;
	};

	function getParams(calledWithUrl: URL): Params {
		const searchParams = calledWithUrl.searchParams;
		if (!searchParams) return {};
		return {
			geoaction: searchParams.get('geoaction') as GeoHelperAction,
			mvaction: searchParams.get('mvaction') as MapViewGpsAction,
			mvcontext: searchParams.get('mvcontext')
		}
	}

	async function getLocation(calledWithUrl: URL | null = null) {
		working = true;
		success = false;
		try {
			if (!isMobile) {
				console.log('Asked for web-based location');
				const webPosition: GeolocationPosition = await new Promise((resolve, reject) =>
					navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true }));
				foundLocation = webPosition;
			} else {
				console.log('Asked for mobile-based location');
				const geolocation: Position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
				foundLocation = geolocation;
			}
			working = false;
			success = true;
			if (calledWithUrl) {
				const params = getParams(calledWithUrl);
				sendLocationToObsidian(foundLocation, params);
			}
		} catch (e) {
			working = false;
			success = false;
			errorMessage = 'Unable to determine your location: ' + (e as any)?.message;
		}
	}

	// On mobile we wait for an incoming URL (in addListener above) for finding the location.
	// On web we start when the page is loaded.
	if (!isMobile && $page?.url && $page.url?.searchParams.get('geoaction')) {
		getLocation($page.url);
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
				<p>This app provides your location to Map View from outside Obsidian (because Obsidian's permissions don't allow it to be fetched internally).</p>
				<p>It runs completely locally and does not send anything to any server.</p>
				<p><b>Location and popup permissions must be enabled for this to work.</b></p>
				<Accordion>
					<Panel bind:open={instructionsOpen}>
						<Header>
							Instructions
							<IconButton slot="icon" toggle pressed={instructionsOpen}>
								<IconButtonIcon on><ChevronUp/></IconButtonIcon>
								<IconButtonIcon><ChevronDown/></IconButtonIcon>
							</IconButton>
						</Header>
						<Content>
							{#if isMobile}
								<p>
									Either click "Find Location" below, or launch this from the various GPS-enabled Map View commands in Obsidian.
								</p>
								<p>
									You may need to permit location access and later also the launching of the `obsidian://` link that calls back Map View.
								</p>
							{:else}
							<ol>
								<li>Allow the location permission when asked.</li>
								<li>When a location is found, allow the browser popup (you may need to find the "popup is blocked" notification) and allow opening the `obsidian://` link.</li>
								<li>If you 'always allow' both of these, it will be smoother next time.</li>
							</ol>
							<p>Some browsers and platforms receive location better than others. See the <a href="https://github.com/esm7/obsidian-geo-helper">documentation</a> for more information.</p>
							<p>Also, if you're using Android, consider downloading this as an app for the best results.</p>
						{/if}
						</Content>
					</Panel>
				</Accordion>
			</Paper>
			{#if working}
				<p>Trying to get your location, you may close this window/tab if you want to cancel...</p>
				<LinearProgress indeterminate />
			{:else}
				<p>
					{#if success && foundLocation}
						<Paper>
							Found location: <Label>{foundLocation.coords.latitude}, {foundLocation.coords.longitude}</Label>
							(accuracy = {foundLocation.coords.accuracy})
							<br>
							<div class="text-field-container">
								<TextField variant="filled" bind:value={locationName} label="Location label (optional)">
									<Icon slot="leadingIcon"><Type/></Icon>
								</TextField>
							</div>
							<div class="button-container">
								<Button variant="outlined" class="iconbutton" on:click={() => sendLocationWithAction('showonmap')}>
									<Icon><MapPin/></Icon>
									<Label>Focus in Map View</Label>
								</Button>
								<br>
								<Button variant="outlined" class="iconbutton" on:click={() => copyAsInlineLocation()}>
									<Icon><Copy/></Icon>
									<Label>Copy as Inline Location</Label>
								</Button>
								<br>
								<Button variant="outlined" class="iconbutton" on:click={() => sendLocationWithAction('addtocurrentnoteinline')}>
									<Icon><Plus/></Icon>
									<Label>Add to Current Note (inline)</Label>
								</Button>
								<br>
								<Button variant="outlined" class="iconbutton" on:click={() => sendLocationWithAction('newnotehere')}>
									<Icon><Edit/></Icon>
									<Label>New Note Here (front matter)</Label>
								</Button>
								<br>
								<Button variant="outlined" class="iconbutton" on:click={() => sendLocationWithAction('addtocurrentnotefm')}>
									<Icon><Plus/></Icon>
									<Label>Add to Current Note (front matter)</Label>
								</Button>
							</div>
						</Paper>
					{:else if !success}
						<Paper color="custom-red">
							{errorMessage}
						</Paper>
					{/if}
				</p>
				<p>
				<Button variant="raised" on:click={() => getLocation()}>
					<Label>Find Location</Label>
				</Button>
				</p>
			{/if}
		</Content>
	</Paper>

	<Snackbar bind:this={copySnack}>
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

	:global(.iconbutton span) {
		margin-left: 5px;
	}
	:global(.iconbutton i) {
		top: -3px;
	}

	:global(.button-container .iconbutton) {
		margin: 1px;
		height: auto;
		min-height: 2.5em;
	}
</style>

