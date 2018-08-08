if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
}
var inputvalue;
function getData() {
  console.log("testing");

  inputvalue = document.getElementById("inputSection").value;   
  fetch(`https://api.github.com/users/${inputvalue}`).then(function(response){
    return response.json()
  })
  .then(function(user){
    console.log(user);

    var maindiv = document.getElementById("displayDiv");
    var img = document.getElementById("imgHtml");
    var name = document.getElementById("nameHtml");
    var login = document.getElementById("loginHtml");
    var id = document.getElementById("idHtml");
    var followers = document.getElementById("followersHtml");

      
    img.setAttribute('src',user.avatar_url);
    img.setAttribute("class", "userimage");
    maindiv.setAttribute("class", "maindiv");
    name.innerHTML = "Name: ";
    login.innerHTML = "Login: ";
    id.innerHTML = "Id: ";
    followers.innerHTML = "Followers: ";
      

    var loginSite = document.createTextNode(user.login)
    var nameSite = document.createTextNode(user.name);
    var idSite = document.createTextNode(user.id);
    var followerSite = document.createTextNode(user.followers);
      
    name.appendChild(nameSite);
    login.appendChild(loginSite);
    id.appendChild(idSite);
    followers.appendChild(followerSite);
    
  })
  .catch(function(error){
    console.log("Not working!!")
  })
}
