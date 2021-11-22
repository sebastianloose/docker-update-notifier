<script lang="ts">
    export let onClick: boolean;
</script>

<label class="inline-flex items-center align-middle">
    <input
        class="text-blue-500 w-5 h-5 mr-2 focus:ring-transparent border border-gray-300 rounded cursor-pointer"
        type="checkbox"
        bind:checked={onClick}
    />
    <a
        href="https://hub.docker.com/search?q=&type=image&image_filter=store%2Cofficial"
        target="_blank"
        rel="noreferrer"
        class="text-gray-400 text-sm underline transition animate hover:text-blue-500 "
        >Offical Image / Verified Publisher</a
    >
</label>
