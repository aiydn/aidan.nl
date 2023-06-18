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
        artist = data.recenttracks.track[0].artist["#text"];
        track = data.recenttracks.track[0].name;
        // album = data.recenttracks.track[0].album["#text"];
        // artwork = data.recenttracks.track[0].image[3]["#text"];
        // url = data.recenttracks.track[0]["url"];
        // console.log(url)
        jQuery("#track").text("🎧" + track + " by " + artist);
        jQuery("#lastfm").text("Currently listening: " + track + " by " + artist);
        jQuery("#artwork").attr("src", artwork);
    }
    else { jQuery("#track").remove() }
});
function discord() {
    navigator.clipboard.writeText('aiydn').then(function () {
        toast('Copied username')
    }, function () {
    })
}