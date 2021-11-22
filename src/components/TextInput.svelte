<script lang="ts">
    import { onMount } from "svelte";

    export let onChange: string;
    export let label: string = "";
    export let error: string = "";
    export let placeholder: string = "";
    export let type: "text" | "email" = "text";

    let ref: HTMLInputElement;

    onMount(() => {
        if (ref) {
            ref.type = type;
        }
    });
</script>

{#if label != ""}
    <label class="block text-gray-400 text-sm font-medium mb-2" for={label}>{label}</label>
{/if}
<input
    bind:this={ref}
    bind:value={onChange}
    class="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight placeholder-gray-400 border-gray-300 focus:outline-none focus:shadow-outline focus:border-blue-500"
    class:border-red-500={error}
    id={label}
    {placeholder}
/>
{#if error}
    <p class="text-red-500 text-xs mt-1.5">{error}</p>
{/if}
