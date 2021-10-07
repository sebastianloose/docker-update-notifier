<script lang="ts">
  import { onMount } from "svelte";
  import { verifyEmail } from "../api/api";
  import { navigate } from "svelte-routing";
  export let id;

  onMount(async () => {
    await verifyEmail(id);
    navigate("/", { replace: true });
  });
</script>
