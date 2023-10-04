//resize email form 
jQuery('#autoresizing').on('input', function () {
    this.style.height = 'auto';
    this.style.height =
        (this.scrollHeight) * 1.05 + 'px';
});

//get now listening song
var listening
jQuery.get("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=aiydn&api_key=1f633977acf0e2d0630ec11dbc350d3e&format=json&limit=1", function (data) {
    if (typeof data.recenttracks.track[0]["@attr"] != "undefined") {
        jQuery("#music").removeClass("hidden")
        jQuery("#music-icon").addClass("animate-spin")
        let artist = data.recenttracks.track[0].artist["#text"];
        let track = data.recenttracks.track[0].name;
        let trackURL = data.recenttracks.track[0].url
        jQuery("#lastfm-icon").removeClass().addClass('fa-solid fa-music');
        jQuery("#lastfm-text1").text("Now listening: ");
        jQuery("#lastfm-text2").text(track + " by " + artist);
        jQuery("#open-song").removeClass("hidden")
        jQuery("#open-song").text(track + " by " + artist + " on Last.FM")
        listening = data.recenttracks.track[0].url
    }
});

//generate top 15
jQuery.get("https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=aiydn&api_key=1f633977acf0e2d0630ec11dbc350d3e&format=json&period=3month&limit=20", function (data) {
    for (let i = 0; i < data.toptracks.track.length; i++) {
        let rank = data.toptracks.track[i]["@attr"].rank
        let track = data.toptracks.track[i].name
        let trackURL = data.toptracks.track[i].url
        let artist = data.toptracks.track[i]["artist"].name
        let artistURL = data.toptracks.track[i]["artist"].url
        $('#music-top').append(`<tr><th> ${rank} </th><td> <a href="${trackURL}">${track}</a> </td><td> <a href="${artistURL}">${artist}</a></td></tr>`)
    }
});

//copy discord button
function copy(text, popup) {
    navigator.clipboard.writeText(text).then(function () {
        toast(popup)
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

//AniList

let listFavourites = `query {  User(id: 5783610) 
    {favourites
        {
            anime{nodes{title{romaji english} siteUrl coverImage{large}}}
            manga{nodes{title{romaji english} siteUrl coverImage{large}}}
            characters{nodes{name{full} siteUrl image{large}}}  
            staff{nodes{name{full} siteUrl}}  
            studios{nodes{name siteUrl}}  
        }
    }
}`

function AniListGet(query, generateType, variables,) {

    // var variables = {
    //     id: 5783610
    // };

    // Define the config we'll need for our Api request
    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

    // Make the HTTP Api request
    fetch(url, options).then(handleResponse)
        .then(handleData);

    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleData(data) {
        generate(data);
        // console.log(data);
    }

    function generate(data) {
        if (generateType == "favourites") {
            let usefull = data.data.User.favourites;
            for (let i = 0; i < usefull.anime.nodes.length; i++) {
                $('#anilist-favourites-anime').append(`<img onclick="window.location.href='${usefull.anime.nodes[i].siteUrl}'" class="object-cover rounded-md" src="${usefull.anime.nodes[i].coverImage.large}" alt="${usefull.anime.nodes[i].title.english}" title="${usefull.anime.nodes[i].title.english}">`
                )
            }
            for (let i = 0; i < usefull.manga.nodes.length; i++) {
                $('#anilist-favourites-manga').append(`<img onclick="window.location.href='${usefull.manga.nodes[i].siteUrl}'" class="object-cover rounded-md" src="${usefull.manga.nodes[i].coverImage.large}" alt="${usefull.manga.nodes[i].title.english}" title="${usefull.manga.nodes[i].title.english}">`
                )
            }
            for (let i = 0; i < usefull.characters.nodes.length; i++) {
                $('#anilist-favourites-characters').append(`<img onclick="window.location.href='${usefull.characters.nodes[i].siteUrl}'" class="object-cover rounded-md" src="${usefull.characters.nodes[i].image.large}" alt="${usefull.characters.nodes[i].name.full}" title="${usefull.characters.nodes[i].name.full}">`
                )
            }
        }
    }
}

AniListGet(listFavourites, "favourites")