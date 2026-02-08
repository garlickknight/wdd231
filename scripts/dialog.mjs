const loadButton = document.getElementById('loadButton');
const loadingDialog = document.getElementById('loadingDialog');

loadButton.addEventListener('click', () => {
    loadingDialog.showModal();

    // Simulate loading delay (3 seconds)
    setTimeout(() => {
        loadingDialog.close();
        alert('Content loaded successfully!');
    }, 3000);
});