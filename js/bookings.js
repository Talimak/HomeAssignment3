//  הוספה/ביטול השכרות, לפי currentUser
const currentUser = loadFromStorage("currentUser");

if (!currentUser) {
    window.location.href = "login.html";
}