<script lang="ts">
    import LoadingSpinner from "./LoadingSpinner.svelte";

    export let isLoading: boolean;
    export let onClick: VoidFunction;
    export let title: string = "";
</script>

<button
    class="{isLoading
        ? 'bg-blue-300 cursor-default'
        : 'bg-blue-500 animate hover:bg-blue-700'} text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition flex items-center justify-center"
    type="button"
    on:click={onClick}
>
    {#if isLoading}
        <div class="mr-1">
            <LoadingSpinner />
        </div>
    {/if}
    {title}
</button>
