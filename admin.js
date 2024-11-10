document.addEventListener('DOMContentLoaded', () => {
    const adminOverview = document.getElementById('admin-overview');

    function loadMoods() {
        fetch('get_moods.php')
            .then(response => response.json())
            .then(moods => {
                adminOverview.innerHTML = '';
                moods.forEach((mood, index) => {
                    const moodItem = document.createElement('div');
                    moodItem.classList.add('mood-item');
                    moodItem.innerHTML = `
                        <img src="${mood.gifUrl}" alt="GIF" width="100px">
                        <h3 contenteditable="true">${mood.name}</h3>
                        <p contenteditable="true">${mood.message}</p>
                        <button onclick="updateMood(${index})">Save</button>
                        <button onclick="deleteMood(${index})">Delete</button>
                    `;
                    adminOverview.appendChild(moodItem);
                });
            });
    }
    loadMoods();

    window.updateMood = (index) => {
        const moodItem = adminOverview.children[index];
        const updatedMood = {
            name: moodItem.querySelector('h3').innerText,
            message: moodItem.querySelector('p').innerText,
            gifUrl: moodItem.querySelector('img').src
        };
        fetch('update_mood.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ index, ...updatedMood }) })
        .then(() => loadMoods());
    };

    window.deleteMood = (index) => {
        fetch('delete_mood.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ index }) })
        .then(() => loadMoods());
    };
});
