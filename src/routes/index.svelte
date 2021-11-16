<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { subscribeByEmail } from "../api/api";
    import LoadingSpinner from "../components/LoadingSpinner.svelte";
    import ModalDialog from "../components/ModalDialog.svelte";

    let isLoading = false;
    let showSuccessModalDialog = false;
    let showVerifiedModalDialog = false;
    let showUserExistsDialog = false;
    let fields = { email: "", organization: "", repository: "" };
    let errors = { email: "", organization: "", repository: "" };

    onMount(() => {
        showVerifiedModalDialog = new URLSearchParams(window.location.search).get("verified") == "1";
    });

    const onSubmit = async () => {
        const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

        if (fields.email.trim().length == 0) {
            errors.email = "E-Mail is required";
        } else if (!emailRegex.test(fields.email.trim())) {
            errors.email = "E-Mail is malformed";
        } else {
            errors.email = "";
        }

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

        if (errors.email || errors.organization || errors.repository) {
            return;
        }

        isLoading = true;

        const result = await subscribeByEmail(
            fields.organization.trim(),
            fields.repository.trim(),
            fields.email.trim(),
        );

        isLoading = false;

        if (result.status == "success") {
            fields = { email: "", organization: "", repository: "" };
            showSuccessModalDialog = true;
        }

        if (result.data == "Repository not found") {
            errors.repository = "Repository could not be found";
        }

        if (result.data == "User does already exist") {
            showUserExistsDialog = true;
        }
    };
</script>

<div>
    {#if showVerifiedModalDialog}
        <ModalDialog
            onClose={() => (showVerifiedModalDialog = false)}
            icon="success"
            title="Verified"
            content="You will now receive an email when there is an update for your containers."
        />
    {/if}
    {#if showSuccessModalDialog}
        <ModalDialog
            onClose={() => (showSuccessModalDialog = false)}
            icon="success"
            title="Subscribed!"
            content="Please verify your Email to receive notifications"
        />
    {/if}
    {#if showUserExistsDialog}
        <ModalDialog
            onClose={() => (showUserExistsDialog = false)}
            icon="error"
            title="The user does already exist"
            content="The user does already exist. Please log in to subscribe to new containers."
        />
    {/if}
    <div class="w-full h-8">
        <div
            class="float-right border border-blue-500 rounded-lg text-blue-500 hover:text-white px-5 py-1.5 cursor-pointer hover:bg-blue-500 transition"
            on:click={() => goto("/docker-update-notifier/login")}
        >
            Login
        </div>
    </div>
    <div class="max-w-3xl m-auto mt-10">
        <h1 class="text-5xl tracking-wide font-bold text-gray-800">
            Docker Update Notifier<span class="text-blue-500">.</span>
        </h1>
        <p class="mb-5 mt-2 text-gray-400">
            A small tool that notifies you via email when there is an update for your favorite Docker Hub image.
        </p>
        <div class="my-4">
            <label class="block text-gray-400 text-sm font-medium  mb-2" for="username">E-Mail</label>
            <input
                class="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="email"
                placeholder="example@domain.com"
                class:border-red-500={errors.email}
                bind:value={fields.email}
            />
            {#if errors.email}
                <p class="text-red-500 text-xs mt-1.5">{errors.email}</p>
            {/if}
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
            Sign Up
        </button>
    </div>
</div>
