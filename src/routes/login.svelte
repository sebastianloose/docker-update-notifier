<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { sendLoginToken } from "../api/api";
    import ModalDialog from "../components/ModalDialog.svelte";
    import LoadingSpinner from "../components/LoadingSpinner.svelte";

    let fields = { email: "" };
    let errors = { email: "" };
    let isLoading = false;
    let showModalDialog = false;

    onMount(() => {
        setLoginCookie();
    });

    const setLoginCookie = () => {
        const token = new URLSearchParams(window.location.search).get("token");
        if (!token) {
            return;
        }
        document.cookie = `token=${token};samesite=lax;secure;path=/docker-update-notifier/`;
        goto("/docker-update-notifier/home");
    };

    const onSubmit = async () => {
        const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

        if (fields.email.trim().length == 0) {
            errors.email = "E-Mail is required";
        } else if (!emailRegex.test(fields.email.trim())) {
            errors.email = "E-Mail is malformed";
        } else {
            errors.email = "";
        }

        if (errors.email) {
            return;
        }

        isLoading = true;

        const result = await sendLoginToken(fields.email.trim());
        if (result.status == "success") {
            showModalDialog = true;
        }

        fields = { email: "" };
        isLoading = false;
    };
</script>

<div>
    {#if showModalDialog}
        <ModalDialog
            onClose={() => (showModalDialog = false)}
            icon="success"
            title="We have sent you a login link by email"
        />
    {/if}
    <div class="w-full h-8">
        <div
            class="float-right border border-blue-500 rounded-lg text-blue-500 hover:text-white px-5 py-1.5 cursor-pointer hover:bg-blue-500 transition"
            on:click={() => goto("/docker-update-notifier/")}
        >
            Sign Up
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
            Login
        </button>
    </div>
</div>
