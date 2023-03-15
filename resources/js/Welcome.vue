<template>
    <div class="flex justify-center items-center h-screen">
        <div class="w-full max-w-xs">
            <div class="bg-white mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Emoji
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="userInput">
                </div>
                <div>
                    <template v-if="emoji">
                        <p id="emoji-display" class="mt-4 text-center w-full text-9xl">{{ emoji }}</p>
                    </template>
                    <template v-else>
                        <Loader/>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import Loader from "./Loader.vue";
import axios from "axios";

const userInput = ref('')
const emoji = ref('')

watch(userInput, debounce(fetchEmoji, 500))

async function fetchEmoji() {
    try {
        const {data} = await  axios.get(`/api/emoji?content=${userInput.value}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        emoji.value = data.content
    }catch (error) {
        console.error(error)
    }
}

function debounce(callback, delay) {
    let timeoutId

    return function () {
        const args = arguments
        const context = this

        clearTimeout(timeoutId)

        timeoutId = setTimeout(function () {
            callback.apply(context, args)
        }, delay)
    }
}

const formattedEmoji = computed(() => {
    return emoji.value.replace(/./g, ' $& ') // adds spaces between each emoji
})
</script>
