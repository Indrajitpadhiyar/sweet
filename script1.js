let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let slideContainer = document.querySelector('.slide');
let items = document.querySelectorAll('.item');
let audios = document.querySelectorAll('.audio'); // Get all audio elements

// Convert NodeList to an Array for easier manipulation
items = Array.from(items);

// Function to stop all songs
function stopAllAudio() {
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

// Function to play the song of the first visible slide
function playCurrentSong() {
    stopAllAudio(); // Stop any currently playing song
    let currentAudio = items[0].querySelector('.audio'); // Get the audio for the first slide
    currentAudio.play();
}

// Event listener for "Next" button
next.addEventListener('click', function() {
    // Move the first slide to the end of the container
    slideContainer.appendChild(items[0]);
    // Update the array so that the first element is now the last one
    items.push(items.shift());
    playCurrentSong(); // Play the song for the new first slide
});

// Event listener for "Previous" button
prev.addEventListener('click', function() {
    // Move the last slide to the front of the container
    slideContainer.insertBefore(items[items.length - 1], items[0]);
    // Update the array so that the last element is now the first one
    items.unshift(items.pop());
    playCurrentSong(); // Play the song for the new first slide
});

// Play the song for the first slide on load
playCurrentSong();

// Touch Events for swipe on mobile devices
let startX;
let endX;

slideContainer.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});

slideContainer.addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
        // Swipe left
        next.click();
    } else if (endX - startX > 50) {
        // Swipe right
        prev.click();
    }
});
