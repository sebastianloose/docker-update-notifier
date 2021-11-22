<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { subscribeByEmail } from "../api/api";
    import ModalDialog from "../components/ModalDialog.svelte";
    import OfficialImageCheckbox from "../components/OfficialImageCheckbox.svelte";
    import TextInput from "../components/TextInput.svelte";
    import LoadingBtn from "../components/LoadingBtn.svelte";
    import GithubLink from "../components/GithubLink.svelte";

    let isLoading = false;
    let showSuccessModalDialog = false;
    let showVerifiedModalDialog = false;
    let showUserExistsDialog = false;
    let fields = { email: "", organization: "", repository: "", officalImage: false };
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

        if (fields.organization.trim().length == 0 && !fields.officalImage) {
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
            fields.officalImage ? "library" : fields.organization.trim(),
            fields.repository.trim(),
            fields.email.trim(),
        );

        isLoading = false;

        if (result.status == "success") {
            fields = { email: "", organization: "", repository: "", officalImage: false };
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
        <GithubLink />
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
            <TextInput
                label="E-Mail"
                bind:onChange={fields.email}
                error={errors.email}
                placeholder="example@domain.com"
                type="email"
            />
        </div>
        {#if !fields.officalImage}
            <div class="mb-4">
                <TextInput
                    label="Owner / Organization"
                    bind:onChange={fields.organization}
                    error={errors.organization}
                    placeholder="pihole"
                />
            </div>
        {/if}
        <div class="mb-4">
            <TextInput
                label="Repository"
                bind:onChange={fields.repository}
                error={errors.repository}
                placeholder="pihole"
            />
        </div>
        <div class="mb-4">
            <OfficialImageCheckbox bind:onClick={fields.officalImage} />
        </div>
        <LoadingBtn {isLoading} onClick={onSubmit} title="Sign Up" />
    </div>
</div>
