<script lang="ts">
import { PUBLIC_GOOGLE_SHEET_API_KEY } from "$env/static/public";
import { GoogleSpreadsheet, type GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { onMount } from "svelte";

type ScoreRow = { Pseudo: string; Score: string; Classement: string };
type Sheet = {
	title: string;
	rows: Partial<ScoreRow>[];
}

let title = "";
let activeSheet = $state(0);
const sheets: Sheet[] = $state([]);

onMount(async () => {
  const doc = new GoogleSpreadsheet("1hMC42H-ss_utlOH4TD457p4dJkTpMLO16rOb9aubBrM", {
    apiKey: PUBLIC_GOOGLE_SHEET_API_KEY,
  });

  await doc.loadInfo();
  title = doc.title;
  const sheet = doc.sheetsByIndex[0];
  for (const sheet of doc.sheetsByIndex){
  	sheets.push({
		  	title: sheet.title,
		  	rows: (await sheet.getRows<ScoreRow>()).map((e) => e.toObject()),
	  });
  }
  console.log(doc.sheetsByIndex)
});

$inspect(sheets);
</script>

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
