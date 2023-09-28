//resize email form 
jQuery('#autoresizing').on('input', function () {
    this.style.height = 'auto';
    this.style.height =
        (this.scrollHeight) * 1.05 + 'px';
});

//get now listening song
jQuery.get("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=aiydn&api_key=1f633977acf0e2d0630ec11dbc350d3e&format=json", function (data) {
    if (typeof data.recenttracks.track[0]["@attr"] != "undefined") {
        jQuery("#music").removeClass("hidden")
        jQuery("#music-icon").addClass("animate-spin")
        let artist = data.recenttracks.track[0].artist["#text"];
        let track = data.recenttracks.track[0].name;
        jQuery("#lastfm-icon").removeClass().addClass('fa-solid fa-music');
        jQuery("#lastfm-text1").text("Now listening: ");
        jQuery("#lastfm-text2").text(track + " by " + artist);
    }
});

//generate top 15
jQuery.get("https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=aiydn&api_key=1f633977acf0e2d0630ec11dbc350d3e&format=json&period=1month", function (data) {
    for (let i = 0; i < 15; i++) {
        let rank = data.toptracks.track[i]["@attr"].rank
        let track = data.toptracks.track[i].name
        let trackURL = data.toptracks.track[i].url
        let artist = data.toptracks.track[i]["artist"].name
        let artistURL = data.toptracks.track[i]["artist"].url
        $('#music-top').append(`<tr><th> ${rank} </th><td> <a href="${trackURL}">${track}</a> </td><td> <a href="${artistURL}">${artist}</a></td></tr>`)
    }
});

//copy discord button
function discord() {
    navigator.clipboard.writeText("aiydn").then(function () {
        toast('Copied username')
    }, function () {
    })
}

//check for notify (email send)
const urlParams = new URLSearchParams(window.location.search);
const notify = urlParams.get('notify');
if (notify == "message success") { toast("Message successfully sent") }

// show notify
function toast(text) {
    jQuery("#notification-text").text(text)
    jQuery("#notification").removeClass("hidden");
    history.pushState(null, "", location.href.split("?")[0]);
    setTimeout(function () { jQuery("#notification").addClass("hidden"); }, 5000);
}