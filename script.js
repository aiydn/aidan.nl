var username

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
        artist = data.recenttracks.track[0].artist["#text"];
        track = data.recenttracks.track[0].name;
        // album = data.recenttracks.track[0].album["#text"];
        // artwork = data.recenttracks.track[0].image[3]["#text"];
        // url = data.recenttracks.track[0]["url"];
        // console.log(url)
        jQuery("#music").text("🎧" + track + " by " + artist);
        jQuery("#lastfm").text("Currently listening: " + track + " by " + artist);
        jQuery("#artwork").attr("src", artwork);
    }
});
jQuery.get("https://api.lanyard.rest/v1/users/590834029666893825", function (data) {
    // console.log(data)
    username = data.data.discord_user.username;
    jQuery("#discord").text("Discord: " + username)
});
function discord() {
    navigator.clipboard.writeText(username).then(function () {
        toast('Copied username')
    }, function () {
    })
}