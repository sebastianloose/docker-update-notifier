<script lang="ts">
    import { subscribeByToken } from "../api/api";

    import OfficialImageCheckbox from "./OfficialImageCheckbox.svelte";
    import TextInput from "./TextInput.svelte";
    import LoadingBtn from "./LoadingBtn.svelte";

    export let onClose: VoidFunction;
    export let token: string;

    let isLoading = false;
    let fields = { organization: "", repository: "", officalImage: false };
    let errors = { organization: "", repository: "" };

    const onSubmit = async () => {
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

        if (errors.organization || errors.repository) {
            return;
        }

        isLoading = true;

        const result = await subscribeByToken(
            fields.officalImage ? "library" : fields.organization.trim(),
            fields.repository.trim(),
            token,
        );

        if (result.data == "Repository not found") {
            errors.repository = "Repository could not be found";
            isLoading = false;
            return;
        }

        fields = { organization: "", repository: "", officalImage: false };
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
                placeholder={fields.officalImage ? "node" : "pihole"}
            />
        </div>
        <div class="mb-4">
            <OfficialImageCheckbox bind:onClick={fields.officalImage} />
        </div>
        <LoadingBtn {isLoading} onClick={onSubmit} title="Subscribe" />
    </div>
</div>
