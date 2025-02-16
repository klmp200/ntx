<script lang="ts">
	import ScoreBoard from "../../components/ScoreBoard.svelte"
	import { GoogleSheetConfig } from "../../lib/config"
</script>

<h2>Scores</h2>
<ScoreBoard board={GoogleSheetConfig.BOARDS.SOLO}/>