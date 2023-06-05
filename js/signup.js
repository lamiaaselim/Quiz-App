// Signup function

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateFullname(fullName) {
    var re = /^[^\s]+( [^\s]+)+$/;
    return re.test(fullName);
}


function signup() {
    var email = document.getElementById("email").value;
    if ((email != "") & (validateEmail(email) == true)) {
        var name = document.getElementById("name").value;
        if (validateFullname(name)) {
            var password = document.getElementById("password").value;
            var password_confirm = document.getElementById("password-confirm").value;
            if ((password != "") & (password === password_confirm)) {
                var user = {
                    email: email,
                    name: name,
                    password: password,
                    login: false,
                };

                var json = JSON.stringify(user);
                localStorage.setItem(email, json);
                window.location.href = "login.html";
            } else {
                $("#passwordAlert")
                    .fadeTo(2000, 500)
                    .slideUp(500, function () {
                        $("#passwordAlert").slideUp(500);
                    });
            }
        } else {
            $("#nameAlert")
                .fadeTo(2000, 500)
                .slideUp(500, function () {
                    $("#nameAlert").slideUp(500);
                });
        }
    } else {
        $("#emailAlert")
            .fadeTo(2000, 500)
            .slideUp(500, function () {
                $("#emailAlert").slideUp(500);
            });
    }
}
