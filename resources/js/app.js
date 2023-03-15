import './bootstrap';


const emoticonForm = document.querySelector("#emoticon-container");
const userInput = emoticonForm.querySelector('input[type="text"]');
const emojiDisplay = emoticonForm.querySelector("p");
userInput.addEventListener(
    "input",
    debounce((event) => {
        fetchEmoji();
    }, 500)
);

function fetchEmoji() {
    const userInput = emoticonForm.querySelector('input[type="text"]');
    const emojiDisplay = document.getElementById("emoji-display");
    const loadingContainer = document.querySelector("#loading-container");
    loadingContainer.classList.remove("invisible");

    fetch(`/api/emoji?content=${userInput.value}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then(({ content }) => {
            emojiDisplay.innerText = content;
            loadingContainer.classList.add("invisible");
        })
        .catch((error) => console.error(error));
}

function debounce(callback, delay) {
    let timeoutId;

    return function () {
        const args = arguments;
        const context = this;

        clearTimeout(timeoutId);

        timeoutId = setTimeout(function () {
            callback.apply(context, args);
        }, delay);
    };
}
