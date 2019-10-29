function ajaxImg(url) {
    let that = this
    console.log(chrome)
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://image2.135editor.com/cache/remote/aHR0cHM6Ly9tbWJpei5xbG9nby5jbi9tbWJpel9wbmcvbGRGYUJOU2t2SGdYN1VrUEpDT3ZHTUw0bHNwMVFxTUZGeWpiTUZJM3E3WHVORHh5SlBSN2pRZmVkYjlhYzhUVUhYNGYxUkROaWJYUUFpYXRvOUlCU2liTkEvMA==', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log(xhr.responseText)
            } else {}
        }
    }
}
export {
    ajaxImg
}