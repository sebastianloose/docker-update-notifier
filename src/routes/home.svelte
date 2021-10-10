<script lang="ts">
    import { goto } from "$app/navigation";
    import { getSubscriptions } from "../api/api";

    import { onMount } from "svelte";
    import type { Subscription } from "src/types/subscription";

    let token = "";
    let subscriptions: Subscription[] = [];

    onMount(async () => {
        token = getCookie("token");
        if (!token) {
            goto("/docker-update-notifier/login");
            return;
        }
        const res = await getSubscriptions(token);
        if (res.status == "error") {
            goto("/docker-update-notifier/login");
            return;
        }
        subscriptions = res.data as Subscription[];
    });

    const getCookie = (cname: string) => {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    const logOut = () => {
        document.cookie = "token=;samesite=strict;secure";
        goto("/docker-update-notifier/login");
    };
</script>

<div>
    <div class="w-full h-8">
        <div
            class="float-right border border-blue-500 rounded-lg text-blue-500 hover:text-white px-5 py-1.5 cursor-pointer hover:bg-blue-500 transition"
            on:click={logOut}
        >
            Log Out
        </div>
    </div>
    <div class="max-w-3xl m-auto mt-10">
        <h1 class="text-5xl tracking-wide font-bold text-gray-800">
            Docker Update Notifier<span class="text-blue-500">.</span>
        </h1>
        <p class="my-5 text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum explicabo nobis voluptatem. Quo vero hic
            officiis ut, ratione, sunt animi ad dolores labore consequatur totam ipsum tenetur!
        </p>

        <div class="flex flex-col">
            <div class="-my-2 sm:-mx-6 lg:-mx-8">
                <div class="align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>

                                    <th scope="col" class="relative px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {#each subscriptions as { organization, repository, active }}
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-500">{organization}/{repository}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {#if !active}
                                                <span
                                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                                                >
                                                    Active
                                                </span>
                                            {:else}
                                                <span
                                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-700"
                                                >
                                                    Inactive
                                                </span>
                                            {/if}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <p
                                                href="#"
                                                class="text-red-500 hover:text-red-300 transition cursor-pointer"
                                            >
                                                Delete
                                            </p>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
