<script lang="ts">
  export let onClose: VoidFunction;
</script>

<div
  class="flex fixed text-gray-500 items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0"
  on:click={onClose}
>
  <div class="p-5 border shadow-lg rounded-md bg-white">
    <div class="mt-3 text-center">
      <div
        class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100"
      >
        <svg
          class="h-6 w-6 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-800 mt-2">Subscribed!</h3>
      <p class="text-sm text-gray-500">
        Please verify your Email to receive notifications
      </p>
      <button
        class="bg-blue-500 animate hover:bg-blue-700 text-white font-medium mt-4 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition flex items-center justify-center"
        on:click={onClose}
      >
        OK
      </button>
    </div>
  </div>
</div>
