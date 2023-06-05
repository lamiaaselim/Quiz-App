// Signup function


function login() {
    event.preventDefault()
    var username = document.getElementById("email").value; 
    var userFromLocalStorage = JSON.parse(localStorage.getItem(username));
    if(!userFromLocalStorage){
        return
    }
    
    var password = document.getElementById("password").value;
    if (userFromLocalStorage.password !== password){
        return
    }
    userFromLocalStorage.login = true
    var json = JSON.stringify(userFromLocalStorage);
    localStorage.setItem(userFromLocalStorage.email, json);
    alert('logged in successfully');
    event.preventDefault()
    window.location.href = 'dashboard.html'

}
