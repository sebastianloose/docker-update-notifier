<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    onMount(() => {
        setTimeout(() => goto("/docker-update-notifier/"), 2500);
    });
</script>

<h1>Verified</h1>
