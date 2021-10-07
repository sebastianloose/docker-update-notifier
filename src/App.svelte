<script lang="ts">
	  import { Router, Route } from "svelte-routing";
	  import Home from "./routes/Home.svelte";
</script>

<div class="max-w-6xl m-auto p-8">
	<Router>
		<Route path="/" component={Home}/>
	</Router>
</div>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>