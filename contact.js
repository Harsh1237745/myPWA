document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // This is the text and colour of the text will be shown once the form is done
        formStatus.style.color = '#1A73E8'; 
        formStatus.textContent = 'Submitting your message...';

        // It will have two second delay once the form is sumbitted
        setTimeout(() => {
            
            // It will show the current time of the country we are living in
            const now = new Date();
            
            // This is the format of how the time will be displayed once the form is sumbiteed
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'Australia/Sydney', // the time will show in AEDT
                timeZoneName: 'short'
            };
            
            const submissionTime = now.toLocaleString('en-US', options);

            // Show the message to the output once the sumbit message is send
            formStatus.style.color = '#1A73E8';
            formStatus.innerHTML = `
                Thank you! Your contact form has been sent.<br>
                Submitted On: ${submissionTime}
            `;
            
            form.reset(); 

        }, 2000); // When the form is done it shows a two second delay in the thing before it displays the output
    });
});

