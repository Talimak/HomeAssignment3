document.querySelector("#register-form").addEventListener("submit", function (e){
    e.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value;
    const errormessage = document.querySelector("#error-message");

    if(password.length < 8) {
        errormessage.textContent = "Password must be at least 8 characters.";
        return;
    }

    let users = loadFromStorage("usersList") || [];
    let existingUser = users.find(function(user) {
        return user.username === username;
    });

    if (existingUser) {
        errormessage.textContent = "Username already exists.";
        return;
    }

    users.push({
        username: username,
        password: password
    });

    saveToStorage("usersList", users);
    saveToStorage("currentUser", username);

    window.location.href = "index.html";
});

document.querySelector("#login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const loginUserName = document.querySelector("#username").value.trim();
    const loginPassword = document.querySelector("#password").value;
    const loginError = document.querySelector("#error-message");

    let allUsers = loadFromStorage("usersList") || [];

    let foundUser = allUsers.find(function(user){
        return user.username === loginUserName && user.password === loginPassword;

    });

    if (!foundUser) {
        loginError.textContent = "Invalid username or password.";
        return;
    }

    saveToStorage("currentUser", loginUserName);

    window.location.href = "index.html";
});

const nameSpan = document.querySelector("#nbr-user-name");

if (nameSpan) {
    const currentUser = loadFromStorage("currentUser");
    if (!currentUser) {
        if (window.location.pathname !== "/login.html") {
            window.location.href = "login.html";
        }
  }

    else {
        nameSpan.textContent = currentUser;
    }
}


const logoutBtn = document.querySelector("#btn-logout");
if(logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    });
}



