
    document.addEventListener("DOMContentLoaded", function() {
       if (window.location.href == 'http://localhost:8000/users/sign-in') {
            var loginButton = document.getElementById("login-button");
            if (loginButton) {
                loginButton.innerHTML = '<a href="/">Home</a>';
            }
        }
    });

