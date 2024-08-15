document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscribeForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;

        try {
            const response = await fetch('/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const result = await response.text();

            if (response.ok) {
                messageDiv.innerHTML = `<p style="color: green;">${result}</p>`;
            } else {
                messageDiv.innerHTML = `<p style="color: red;">${result}</p>`;
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.innerHTML = '<p style="color: red;">Error in subscription</p>';
        }
    });
});
