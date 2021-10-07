<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import Verify from "./routes/Verify.svelte";
</script>

<div class="max-w-6xl m-auto p-8">
  <Router>
    <Route path="/verify/:id" let:params>
      <Verify id={params.id} />
    </Route>
    <Route path="/" component={Home} />
  </Router>
</div>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
