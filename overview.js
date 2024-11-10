document.addEventListener('DOMContentLoaded', () => {
    const moodOverview = document.getElementById('mood-overview');

    // Fetch moods from the server
    fetch('get_moods.php')
        .then(response => response.json())
        .then(moods => {
            if (moods.length === 0) {
                moodOverview.innerHTML = "<p>No moods have been submitted yet.</p>";
            } else {
                moods.forEach(mood => {
                    const moodItem = document.createElement('div');
                    moodItem.classList.add('mood-item');
                    moodItem.innerHTML = `
                        <img src="${mood.gifUrl}" alt="Selected GIF" width="150px">
                        <div>
                            <h3>${mood.name}</h3>
                            <p>${mood.message}</p>
                        </div>
                    `;
                    moodOverview.appendChild(moodItem);
                });
            }
        })
        .catch(error => console.error('Error fetching moods:', error));
});
