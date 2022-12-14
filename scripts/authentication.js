// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            var user = authResult.user;                            // get the user object from the Firebase authentication database
            if (authResult.additionalUserInfo.isNewUser) {         //if new user
                db.collection("users").doc(user.uid).set({         //write to firestore. We are using the UID for the ID in users collection
                    name: user.displayName,                        //for every user, will have these default fields
                    email: user.email,
                    country: "Canada",
                    school: "BCIT",
                    aboutme: " ",
                    reminders: {
                        start_time: '0',
                        interval: '0',
                        end_time: '0'
                    },
                    personal_goal: 0,
                    break_counter: 0,
                }).then(function () {
                    console.log("New user added to firestore");
                    window.location.assign("main.html");       //re-direct to main.html after signup
                })
                    .catch(function (error) {
                        console.log("Error adding new user: " + error);
                    });
            } else {
                return true;
            }
            return false;
        },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'main.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

//function to hide the login button after user clicks on it and shows login container afterwards
function login_option() {
    console.log("The login button has been clicked!");
    // Hide the login button now and show authentication
    $('#login_block').css('display', 'none');
    ui.start('#firebaseui-auth-container', uiConfig);

}
function setup() {
    $("#login_button").click(login_option);
}
$(document).ready(setup)