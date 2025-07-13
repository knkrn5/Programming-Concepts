//** Passing this codes via browser console tab to bypass the frontend security, that why the security should always be implement in both the frontend and backend */
//** In this way API can also be misused */

fetch('http://localhost:5000/api/v1/profile/details', {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));


// =======================================================

fetch('http://localhost:5000/api/v1/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
    body: {
        email: 'email@gmail.com',
        password: '11231654'
    }
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));

// ==============================================================
fetch('http://localhost:5000/api/v1/auth/register', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        firstName: 'testing',
        email: 'email@gmail.com',
        password: 'qwerty',
        enteredOTP: 12345
    })
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));


// ======================================================================

fetch('http://localhost:5000/api/v1/auth/send-email-otp', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        subject: 'testing',
        email: 'dyjezeje@azuretechtalk.net',
        excerpt: 'nice try boiiiii'
    })
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));

// ===============================================================
fetch('http://localhost:5000/api/v1/profile/delete-account', {
    method: 'DELETE',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: 'email@gmail.com',
        enteredOTP: 263624,
        password: "2131654"
    })
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));

// =============================================================

fetch('http://localhost:5000/api/v1/auth/reset-password', {
    method: 'PATCH',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({

        email: 'dyjezeje@azuretechtalk.net',
        newPassword: '21321654',
        enteredOTP: 121345

    })
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
