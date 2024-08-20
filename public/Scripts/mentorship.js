// mentorship.js

document.addEventListener('DOMContentLoaded', () => {
    const requestButtons = document.querySelectorAll('.request-btn');
    const modal = document.getElementById('mentorship-modal');
    const closeModal = document.querySelector('.close');
    const mentorInfo = document.getElementById('mentor-info');

    if (!modal || !closeModal || !mentorInfo) {
        console.error('Modal element or close button or mentor info element not found');
        return;
    }

    requestButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const mentorCard = e.target.closest('.mentor-card');
            if (!mentorCard) {
                console.error('Mentor card not found');
                return;
            }

            const mentorName = mentorCard.querySelector('h3').textContent;
            const details = mentorCard.querySelector('.mentor-credentials').innerHTML;

            // Update the modal content with mentor details and name
            mentorInfo.innerHTML = `
                <p><strong>Name:</strong> ${mentorName}</p>
                ${details}
            `;
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
