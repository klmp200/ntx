<script lang="ts">
	import { computePosition, autoUpdate, autoPlacement } from "@floating-ui/dom";
	import type { EventClickArg } from "@fullcalendar/core";
	const { event } = $props<{ event: EventClickArg }>();
	import { onMount } from 'svelte';

	let popup: HTMLElement;
	const calEvent = event.event;

	export function contains(node: Node): boolean {
		return popup?.contains(node);
	}

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat("fr", {
			dateStyle: "medium",
			timeStyle: "short",
		}).format(date);
	}

	onMount(() => {
		const updatePosition = () => {
			computePosition(event.el, popup, {
				middleware: [autoPlacement(
					{
						allowedPlacements: ["bottom", "top"],
					}
				)],
			}).then(({x, y}) => {
				Object.assign(popup.style, {
					left: `${x}px`,
					top: `${y}px`,
				})
			});
		}
		autoUpdate(event.el, popup, updatePosition);
	});

</script>

<style type="text/css">
	:root {
		--popup-background-color: white;
		--popup-padding: 20px;
		--popup-border: 1px solid #EEEEEE;
		--popup-border-radius: 4px;
		--popup-box-shadow: 0px 6px 20px 4px rgb(0 0 0 / 16%);
		--popup-max-width: 600px;
	}

	.popup {
		z-index: 10;
		max-width: 1151;
		position: absolute;
		x: 0;
		y: 0;
	}

	.container {
		display: flex;
		color: black;
		flex-direction: column;
		min-width: 200px;
		max-width: var(--popup-max-width);
		padding: var(--popup-padding);
		border: var(--popup-border);
		border-radius: var(--popup-border-radius);
		background-color: var(--popup-background-color);
		box-shadow: var(--popup-box-shadow);
		gap: 20px;
	}

	.row-icon {
		margin-left: 10px;
		margin-right: 20px;
		align-content: center;
		align-self: center;
	}

	.details-row {
		display: flex;
		align-items: start;
	}

	.row-icon {
		margin-left: 10px;
		margin-right: 20px;
		align-content: center;
		align-self: center;
	}

	.row-details {
		display: flex;
		align-items: start;
	}

	.row-content {
		display: flex;
		align-items: start;
		flex-direction: row;
		background-color: var(--popup-background-color);
		margin-top: 0px;
		margin-bottom: 4px;
	}
</style>

<div class="popup" bind:this={popup}>
	<div class="container">
		<div class="details-row">
			<i class="row-icon fa-xl fa-solid fa-calendar-days"></i>
			<div>
				<h4 class="row-content">{calEvent.title}</h4>
				<span class="row-details">
					{formatDate(calEvent.start)} - {formatDate(calEvent.end)}
				</span>
			</div>
		</div>
		{#if calEvent.extendedProps.location}
			<div class="details-row">
				<i class="row-icon fa-xl fa-solid fa-location-dot"></i>
				<div>
					<span class="row-details">
						<a
							href="https://www.google.com/maps/search/?api=1&query={new URLSearchParams(calEvent.extendedProps.location).toString()}"
							target="_blank" rel="nofollow"
						>
							{calEvent.extendedProps.location}
						</a>
					</span>
				</div>
			</div>
		{/if}
	</div>
</div>