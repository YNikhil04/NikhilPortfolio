document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get form input values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Create an object to store the contact details
        const contactDetails = {
            timestamp: new Date().toISOString(), // Add a timestamp for tracking
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        // Retrieve existing contact data from local storage
        let storedContacts = localStorage.getItem('portfolioContacts');
        let contactsArray = [];

        if (storedContacts) {
            try {
                contactsArray = JSON.parse(storedContacts);
                // Ensure it's an array, or initialize if parsing fails
                if (!Array.isArray(contactsArray)) {
                    contactsArray = [];
                }
            } catch (e) {
                console.error("Error parsing stored contacts from local storage:", e);
                contactsArray = []; // Reset if parsing fails
            }
        }

        // Add the new contact details to the array
        contactsArray.push(contactDetails);

        // Store the updated array back into local storage
        localStorage.setItem('portfolioContacts', JSON.stringify(contactsArray));

        // Clear the form fields
        contactForm.reset();

        // Show the success message
        successMessage.classList.remove('hidden');
        successMessage.classList.add('visible');

        // Optionally, hide the success message after a few seconds
        setTimeout(() => {
            successMessage.classList.remove('visible');
            successMessage.classList.add('hidden');
        }, 5000); // Hide after 5 seconds
    });
});