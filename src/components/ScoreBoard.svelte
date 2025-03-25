<script lang="ts">
import { PUBLIC_GOOGLE_SHEET_API_KEY, PUBLIC_GOOGLE_SHEET_LAN_SOLO } from "$env/static/public";
import { GoogleSheetConfig } from "../lib/config"
import { GoogleSpreadsheet, type GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { onMount } from "svelte";
import { Chasing } from 'svelte-loading-spinners';

const { board } = $props<{ board: string }>();
type ScoreRow = { Pseudo: string; Score: string; Classement: string };
type Sheet = {
	title: string;
	rows: Partial<ScoreRow>[];
}

let title = $state("");
// biome-ignore lint/style/useConst: used in widget
let activeSheet = $state(0);
const sheets: Sheet[] = $state([]);
let isLoading = $state(true);

onMount(async () => {
  const doc = new GoogleSpreadsheet(board, {
    apiKey: GoogleSheetConfig.API_KEY,
  });

  await doc.loadInfo();
  title = doc.title;
  for (const sheet of doc.sheetsByIndex){
  	sheets.push({
		  	title: sheet.title,
		  	rows: (await sheet.getRows<ScoreRow>()).map((e) => e.toObject()),
	  });
  }
  isLoading = false;
});

$inspect(sheets);
</script>

{#if isLoading}
	<Chasing size="60" color="#6c00eb" unit="px" />
{:else}

{title}
{#each sheets as sheet, i}
	<button onclick={() => activeSheet = i} disabled="{activeSheet === i}">{sheet.title}</button>
{/each}
{#if sheets.length > 0}
	<table>
		<thead>
			<tr>
				<td>Pseudo</td>
				<td>Score</td>
				<td>Classement</td>
			</tr>
		</thead>
		<tbody>
		{#each sheets[activeSheet].rows as row}
			<tr>
				<td>{row.Pseudo}</td>
				<td>{row.Score}</td>
				<td>{row.Classement}</td>
			</tr>
		{/each}
		</tbody>
	</table>
{/if}

{/if}
