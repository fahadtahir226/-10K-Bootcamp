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
  var ulfordelete = document.getElementById("ulHtml").childNodes;


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
    var ul = document.getElementById("ulHtml");
    ul.innerHTML = '';
    var h3 = document.getElementById("headingfollowerHtml");
    var uldiv = document.getElementById("uldiv");

    img.setAttribute('src',user.avatar_url);
    img.setAttribute("class", "userimage");
    maindiv.setAttribute("class", "maindiv");
    uldiv.setAttribute("class", "maindiv");
    ul.setAttribute("class", "mainul");
    h3.setAttribute("class", "mainh3")
    name.innerHTML = "Name: ";
    login.innerHTML = "Login: ";
    id.innerHTML = "Id: ";
    h3.innerHTML = "Followers: "

    var loginSite = document.createTextNode(user.login)
    var nameSite = document.createTextNode(user.name);
    var idSite = document.createTextNode(user.id);


    name.appendChild(nameSite);
    login.appendChild(loginSite);
    id.appendChild(idSite);

    fetch(`https://api.github.com/users/${inputvalue}/followers`)
    .then(function(response){
      return response.json()
    })
    .then(function(followers){
      console.log(followers);
      var num = 0; 
      for(khuar in followers){
        const follSingle = document.createElement("li");
        num++;
        follSingle.setAttribute("id",`listnumber${num}`)
        var followersName = followers[khuar].login;
        var textforusername = document.createTextNode(followersName);
        follSingle.appendChild(textforusername);
        ul.appendChild(follSingle);

      }
    
    }).catch(function(error){
      const noUserFound = document.createTextNode("The user doesnot have any followers");
      ul.appendChild(noUserFound);
    })
  
    
  })
  .catch(function(error){
    console.log("Not working!!")
  })
}


// caches.match(`https://api.github.com/users/${inputvalue}`)
// .then(function(response) {
//   if (!response==null || !response==undefined){
//     console.log("data found");
//     return response.json(); 
//   }else{
//     console.log("No data");  
//   }
// })
// .then(function(data) {
//   if(data==null || data==undefined){}
//   else{
//   console.log("data from client", data);
//   //return data;
//   }
// })
// .catch(function() {
//   console.log("error");
// })