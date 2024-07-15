document.addEventListener("DOMContentLoaded", function() {
    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * 6);
        return `url('./img/${randomIndex}.png')`;
    }

    // Set the background-image of the container to a random image
    const container = document.getElementById("container");
    container.style.backgroundImage = getRandomImage();
});