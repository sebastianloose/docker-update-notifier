<script lang="ts">
    export let onClose: VoidFunction;
    export let title: string;
    export let content: string;
    export let icon: "success" | "error";
</script>

<div
    class="flex fixed text-gray-500 items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0 p-5"
    on:click={onClose}
>
    <div class="p-5 border shadow-lg rounded-md bg-white max-w-full w-96">
        <div class="mt-3 text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                {#if icon == "success"}
                    <svg
                        class="h-6 w-6 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                {:else if icon == "error"}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#3b83f6"
                        ><path d="M0 0h24v24H0z" fill="none" /><path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                        /></svg
                    >
                {/if}
            </div>
            <h3 class="text-lg font-medium text-gray-800 mt-2">{title}</h3>
            <p class="text-sm text-gray-500">{content}</p>
            <button
                class="bg-blue-500 animate hover:bg-blue-700 text-white font-medium mt-4 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition flex items-center justify-center"
                on:click={onClose}
            >
                OK
            </button>
        </div>
    </div>
</div>
