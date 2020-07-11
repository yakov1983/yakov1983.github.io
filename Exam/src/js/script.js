/*jshint esversion: 6 */

// const URL = "https://exam-7495f.firebaseio.com/.json";

let dialog = document.getElementById("dialog");
let views = document.getElementById("views");
let videoName = document.getElementById("name");
let video = null;

function getVideoList() {
    return new Promise((accept, reject) => {
        $.ajax({
            url: "https://exam-7495f.firebaseio.com/.json",
            //url: URL + "video",
            method: "GET",
            success: (data) => {
                accept(data);
                console.log(data);
            },
            error: (err) => {
                reject(err);
            }
        });
    });
}

function getVideoURL(videoID) {
    return new Promise((accept, reject) => {
        $.ajax({
            url: "https://exam-7495f.firebaseio.com/" + videoID + "/.json",
            //url: URL + "video/" + videoID,
            method: "GET",
            success: (data) => {
                accept(data);
                console.log(data);
            },
            error: (err) => {
                reject(err);
            }
        });
    });
}

getVideoList().then(
    (data) => {
        showVideoList(data);
    },
    (err) => {
        console.log(err);
    }
);

function showVideoList(list) {
    for (let v of list) {
        let block = document.createElement("div");
        block.className = "video-block";
        let img = document.createElement("img");
        img.src = v.preview;
        img.onclick = () => {
            openVideo(v);
        };
        block.appendChild(img);
        let name = document.createElement("p");
        name.innerText = v.name;
        name.className = "name";
        block.appendChild(name);
        let duration = document.createElement("p");
        duration.className = "duration";
        duration.innerText = calcDuration(v.duration);
        block.appendChild(duration);
        document.body.appendChild(block);
    }
}

function calcDuration(duration) {
    let min = Math.trunc(duration / 60);
    let sec = duration - min * 60;
    return pod(min) + "m " + pod(sec) + "s";
}

function pod(v) {
    if (v < 10) {
        return "0" + v;
    }
    return "" + v;
}

function openVideo(video) {
    getVideoURL(video.id).then(
        (data) => {
            playVideo(data, video.name);
            console.log(data);
        },
        (err) => {
            console.log(err);
        }
    );
}

function playVideo(url, name) {
    // debugger
    videoName.innerText = name;
    views.innerText = url.url.viewCount;
    video = document.createElement("video");
    video.controls = true;
    let source = document.createElement("source");
    source.type = url.url.type;
    source.src = url.url.url;
    video.appendChild(source);
    dialog.prepend(video);
    video.scr = url.url;
    dialog.style.display = "block";
    video.play();
}

function closeDialog() {
    dialog.style.display = "none";
    video.pause();
    dialog.removeChild(video);
    video = null;
}