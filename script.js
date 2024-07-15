document.addEventListener("DOMContentLoaded", function() {
    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * 6);
        return `url('./img/${randomIndex}.png')`;
    }
    const container = document.getElementById("container");
    container.style.backgroundImage = getRandomImage();
});