document.getElementById("loginForm").addEventListener("submit", function(e){

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Default Admin Login
    if(username === "admin" && password === "12345"){

        // Login Success
        localStorage.setItem("adminLogin","true");

        alert("Login Successful");

        window.location.href = "dashboard.html";

    }else{

        alert("Invalid Username or Password");

    }

});