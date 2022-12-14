var user = firebase.auth().currentUser;

//function to check if user is logged in so they cannot access the features that are specific to logged in users
function check_login(text) {
    console.log(text)
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        //If user is signed in, can redirect to the correct pages that are per that user
        if (user) {
            if (text == "weekly") {
                window.location.href = 'weekly.html';
            }
            else if (text == "home") {
                window.location.href = 'user_page.html';
            }
            else if (text == "profile") {
                window.location.href = 'profile.html';
            }
        }
        //if user is not signed in, have an alert telling them to sign in, and will direct them homepage to sign in
        else {
            if (text == "home") {
                window.location.href = 'login_homepage.html';
            }
            else {
                window.location.href = "login_homepage.html";
                alert("Please sign in first");
            }
        }

    })
}

