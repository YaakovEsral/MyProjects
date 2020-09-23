(function () {
    'use strict';

    //first fetch to add options and event listeners
    fetch('ajax/chords.json')
        .then((r) => {
            if (!r.ok) {
                throw new Error(`${r.status} ${r.statusText}`);
            }
            return r.json();
        })
        .then((songs) => {
            //dynamically generate song options
            for (let i = 0; i < songs.length; i++) {
                $('select').append(`<option value="${songs[i].songName}">${songs[i].songName} - ${songs[i].artist}</option>`);
            }
            //add change event listener to fetch chords upon request
            $('select').change(() => {
                fetchChords(songs);
            });
        })
        .catch((err) => console.log(err));

    //function to fetch chords from the text files based on user input
    function fetchChords(songs) {
        let url;
        let title;
        let artist;
        const val = $('select').find("option:selected").val();
        for (let i = 0; i < songs.length; i++) {
            if (songs[i].songName === val) {
                url = songs[i].src;
                title = songs[i].songName;
                artist = songs[i].artist;
                break;
            }
        }
        fetch(`ajax/${url}`)
            .then((r) => {
                if (!r.ok) {
                    throw new Error(`${r.status} ${r.statusText}`);
                }
                return r.text();
            })
            .then((chords) => {
                $('#songTitle').text(title);
                $('#songArtist').text(artist);
                $('pre').text(chords);
            });
    }
}());