const API_KEY = "OEbtgIhUp94HNgdgLM0AefWsezVShoi5";

// Search GIFs based on user query
document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('gif-search').value;
    const randomOffset = Math.floor(Math.random() * 100); // Adjust the range as desired
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=5&offset=${randomOffset}`)
        .then(response => response.json())
        .then(data => displayGifs(data.data))
        .catch(error => console.error('Error fetching search GIFs:', error));
});

// Fetch random GIFs on a specific topic
document.getElementById('random-btn').addEventListener('click', () => {
    const topic = "office"; // Set your desired topic here
    const randomOffset = Math.floor(Math.random() * 100); // Adjust range as needed
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${topic}&limit=5&offset=${randomOffset}`)
        .then(response => response.json())
        .then(data => displayGifs(data.data))
        .catch(error => console.error('Error fetching topic GIFs:', error));
});

// Display GIFs in the gif-results container
function displayGifs(gifs) {
    const gifResults = document.getElementById('gif-results');
    gifResults.innerHTML = ''; // Clear previous results
    gifs.forEach(gif => {
        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        img.addEventListener('click', () => selectGif(gif.images.fixed_height.url));
        gifResults.appendChild(img);
    });
}

let selectedGifUrl = '';
function selectGif(url) {
    selectedGifUrl = url;
    document.getElementById('gif-results').innerHTML = `<img src="${url}" width="100px">`;
}


// Save Mood
document.getElementById('submit-btn').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    if (name && message && selectedGifUrl) {
        const newMood = { name, message, gifUrl: selectedGifUrl };

        fetch('submit_mood.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMood)
        })
        .then(response => response.json())
        .then(data => alert('Mood submitted successfully!'))
        .catch(error => console.error('Error saving mood:', error));
    } else {
        alert('Please fill in all fields and select a GIF!');
    }
});
