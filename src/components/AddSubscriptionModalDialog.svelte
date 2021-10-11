<script lang="ts">
    import { subscribeByToken } from "../api/api";
    import LoadingSpinner from "./LoadingSpinner.svelte";

    export let onClose: VoidFunction;
    export let token: string;

    let isLoading = false;
    let fields = { organization: "", repository: "" };
    let errors = { organization: "", repository: "" };

    const onSubmit = async () => {
        if (fields.organization.trim().length == 0) {
            errors.organization = "Owner / Organization is required";
        } else {
            errors.organization = "";
        }

        if (fields.repository.trim().length == 0) {
            errors.repository = "Repository is required";
        } else {
            errors.repository = "";
        }

        if (errors.organization || errors.repository) {
            return;
        }

        isLoading = true;

        const result = await subscribeByToken(fields.organization.trim(), fields.repository.trim(), token);

        if (result.data == "Repository not found") {
            errors.repository = "Repository could not be found";
            isLoading = false;
            return;
        }

        fields = { organization: "", repository: "" };
        isLoading = false;
        onClose();
    };
</script>

<div
    class="flex fixed text-gray-500 items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0 p-5"
>
    <div class="p-5 pt-0 border shadow-lg rounded-md bg-white max-w-full w-96">
        <div class="w-full pt-4 pb-5">
            <svg
                class="fill-current text-gray-400 float-right cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                on:click={onClose}
            >
                <path
                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
            </svg>
        </div>
        <div class="mb-4">
            <label class="block text-gray-400 text-sm font-medium  mb-2" for="organization">Owner / Organization</label>
            <input
                class="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="organization"
                type="text"
                placeholder="pihole"
                class:border-red-500={errors.organization}
                bind:value={fields.organization}
            />
            {#if errors.organization}
                <p class="text-red-500 text-xs mt-1.5">{errors.organization}</p>
            {/if}
        </div>
        <div class="mb-6">
            <label class="block text-gray-400 text-sm font-medium mb-2" for="repository">Repository</label>
            <input
                class="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="repository"
                type="text"
                placeholder="pihole"
                class:border-red-500={errors.repository}
                bind:value={fields.repository}
            />
            {#if errors.repository}
                <p class="text-red-500 text-xs mt-1.5">{errors.repository}</p>
            {/if}
        </div>
        <button
            class="{isLoading
                ? 'bg-blue-300 cursor-default'
                : 'bg-blue-500 animate hover:bg-blue-700'} text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition flex items-center justify-center"
            type="button"
            on:click={onSubmit}
        >
            {#if isLoading}
                <div class="mr-1">
                    <LoadingSpinner />
                </div>
            {/if}
            Subscribe
        </button>
    </div>
</div>
