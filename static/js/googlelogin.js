//Google sign in
function onSignIn(googleUser) {
    // The ID token you need to pass to your backend:
    let id_token = googleUser.getAuthResponse().id_token;

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/googlelogin');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        document.write(xhr.responseText);
    };
    xhr.send('idtoken=' + id_token);
}

//Google sign out
function signOut() {
    var newWindow = window.open(
        'https://mail.google.com/mail/?logout&hl=fr',
        'Disconnect from Google',
        'width=500,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,top=200,left=200,popup=yes'
    );

    setTimeout(function(){
        if (newWindow) newWindow.close();

        window.location="auth/google";
        window.location = "/logout";
    },1500);
}
