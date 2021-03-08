function fileChange(){
    let photos = document.getElementById("image-file").files;

    if(photos.length > 0){
        console.log('Photos sent')
        let photo = photos[0];  // file from input
        let req = new XMLHttpRequest();
        let formData = new FormData();

        formData.append("profilepicture", photo);
        req.open("POST", '/upload/profilepicture');
        req.send(formData);
        req.onload = function() {
            document.write(req.responseText);
        };
    }
}
