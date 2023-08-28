var username, songurl

jQuery('#autoresizing').on('input', function () {
    this.style.height = 'auto';

    this.style.height =
        (this.scrollHeight) * 1.05 + 'px';
});
function toast(text) {
    jQuery("#notification-text").text(text)
    jQuery("#notification").removeClass("hidden");
    history.pushState(null, "", location.href.split("?")[0]);

    setTimeout(function () { jQuery("#notification").addClass("hidden"); }, 5000);
}

const urlParams = new URLSearchParams(window.location.search);
const notify = urlParams.get('notify');
if (notify == "message success") { toast("Message successfully sent") }

jQuery.get("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=aiydn&api_key=1f633977acf0e2d0630ec11dbc350d3e&format=json", function (data) {
    if (typeof data.recenttracks.track[0]["@attr"] != "undefined") {
        jQuery("#music").removeClass("hidden")
        jQuery("#music-icon").addClass("animate-spin")

        artist = data.recenttracks.track[0].artist["#text"];
        track = data.recenttracks.track[0].name;
        songurl = data.recenttracks.track[0]["url"];
        console.log(data)
        jQuery("#lastfm-icon").removeClass().addClass('fa-solid fa-music');
        jQuery("#lastfm-text").text("Now listening: " + track + " by " + artist);
    }
});
jQuery.get("https://api.lanyard.rest/v1/users/590834029666893825", function (data) {
    // console.log(data)
    username = data.data.discord_user.username;
    jQuery("#discord").text(username)
});

function discord() {
    navigator.clipboard.writeText(username).then(function () {
        toast('Copied username')
    }, function () {
    })
}