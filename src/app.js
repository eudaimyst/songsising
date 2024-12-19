
//make a header div to hold the heading and buttons
var header = document.createElement('div');
header.id = 'appHeader';
document.body.appendChild(header);

//add a heading to the page called "Songs I Sing"
var heading = document.createElement('div');
heading.textContent = 'Songs I Sing';
header.appendChild(heading);

//load songlist.json file and parse it to get the list of songs
var songs = [];
//just load the json and put it in the songs array without using xml http request
fetch('songlist.json')
    .then(response => response.json())
    .then(data => {
        songs = data;
    });



var appMode = 'form'
//add two buttons at the top for a form mode of entry and a table mode of entry
var formButton = document.createElement('button');
formButton.textContent = 'Form mode';
header.appendChild(formButton);
//when form button is pressed the form mode is activated
formButton.addEventListener('click', function () {
    console.log('form button pressed');
    setMode('form');
});
var tableButton = document.createElement('button');
tableButton.textContent = 'Table mode';
header.appendChild(tableButton);
//when table button is pressed the table mode is activated
tableButton.addEventListener('click', function () {
    console.log('table button pressed');
    setMode('table');
});
function setMode(mode) {
    if (mode === appMode) {
        return;
    }
    appMode = mode;
    showHide();
}
//add another button at the top called "song list" which when pressed shows a table of all possible songs from songlist.json
var songListButton = document.createElement('button');
songListButton.textContent = 'Song List';
header.appendChild(songListButton);
songListButton.addEventListener('click', function () {
    console.log('songlist button pressed');
    setMode('songlist');
});

//add a button to clear localStorage data
var clearButton = document.createElement('button');
clearButton.textContent = 'Clear';
header.appendChild(clearButton);
clearButton.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
});
//add an export button which exports the list of songs to a json file which can be downloaded and imported later
var exportButton = document.createElement('button');
exportButton.textContent = 'Export';
header.appendChild(exportButton);
exportButton.addEventListener('click', function () {
    var songs = JSON.parse(localStorage.getItem('songs'));
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(songs));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "data.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});
//add an import button which allows to import a json file of songs
var importButton = document.createElement('button');
importButton.textContent = 'Import';
header.appendChild(importButton);
importButton.addEventListener('click', function () {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.click();
    input.addEventListener('change', function () {
        var file = input.files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            var songs = JSON.parse(reader.result);
            localStorage.setItem('songs', JSON.stringify(songs));
            location.reload();
        };
    });
});



//the following is the table mode

var table = document.createElement('table');
function tableMode() {
    document.body.appendChild(table);
    //add a header to the table
    var header = document.createElement('thead');
    table.appendChild(header);
    //add a row to the header

    var row = document.createElement('tr');
    header.appendChild(row);
    //add three cells to the row
    var cell1 = document.createElement('th');
    row.appendChild(cell1);
    var cell2 = document.createElement('th');
    row.appendChild(cell2);
    var cell3 = document.createElement('th');
    row.appendChild(cell3);
    var cell4 = document.createElement('th');
    row.appendChild(cell4);
    var cell5 = document.createElement('th');
    row.appendChild(cell5);
    var cell6 = document.createElement('th');
    row.appendChild(cell6);
    //set the cell text
    cell1.textContent = 'Song Name';
    cell2.textContent = 'Artist';
    cell3.textContent = 'Genre';
    cell4.textContent = 'Provider';
    cell5.textContent = 'Rating';
    cell6.textContent = 'Link';
    //add a body to the table
    var body = document.createElement('tbody');
    table.appendChild(body);
    //^^^^^ these are header cells dont get confused with body cells 

    //make a function which adds the cells to the row as below
    function addCells(songname, artist, genre, provider, rating, link) {
        // Add a row to the body
        var row = document.createElement('tr');

        // Song Name cell
        var cell = document.createElement('td');
        var input = document.createElement('input');
        input.placeholder = 'Enter song name';
        if (songname) {
            input.value = songname;
        }
        cell.appendChild(input);
        row.appendChild(cell);

        // Artist cell
        var cell2 = document.createElement('td');
        var input2 = document.createElement('input');
        input2.placeholder = 'Enter artist';
        if (artist) {
            input2.value = artist;
        }
        cell2.appendChild(input2);
        row.appendChild(cell2);

        // Genre cell
        var cell3 = document.createElement('td');
        var input3 = document.createElement('input');
        input3.placeholder = 'Enter genre';
        if (genre) {
            input3.value = genre;
        }
        cell3.appendChild(input3);
        row.appendChild(cell3);

        // Provider cell
        var cell4 = document.createElement('td');
        var input4 = document.createElement('input');
        input4.placeholder = 'Enter provider';
        if (provider) {
            input4.value = provider;
        }
        cell4.appendChild(input4);
        row.appendChild(cell4);

        // Rating cell (dropdown)
        var cell5 = document.createElement('td');
        var select = document.createElement('select');
        for (var j = 1; j <= 10; j++) {
            var option = document.createElement('option');
            option.value = j.toString();
            option.textContent = j.toString();
            select.appendChild(option);
        }
        if (rating) {
            select.value = rating;
        }
        cell5.appendChild(select);
        row.appendChild(cell5);

        // Link cell
        var cell6 = document.createElement('td');
        var input6 = document.createElement('input');
        input6.placeholder = 'Enter link';
        if (link) {
            input6.value = link;
        }
        cell6.appendChild(input6);
        row.appendChild(cell6);

        // Append the row to the table body
        body.appendChild(row);
    }

    //if mode == table then add rows and cells to the table using addCells function filled with the data in localstorage
    var songs = [];
    songs = JSON.parse(localStorage.getItem('songs')) || [];
    for (var i = 0; i < songs.length; i++) {
        console.log(songs[i]);
        addCells(songs[i].song, songs[i].artist, songs[i].genre, songs[i].provider, songs[i].rating, songs[i].link);
    }

}
//following is form mode
//create a div to hold the form elements

var formDiv = document.createElement('div');
function formMode() {
    document.body.appendChild(formDiv);

    //make the previous a function which can be called with the label, placeholder and id variables as input
    function createInput(_label, _placeholder, _id) {
        var div = document.createElement('div');
        formDiv.appendChild(div);
        var label = document.createElement('label');
        label.textContent = _label;
        formDiv.appendChild(label);
        var input = document.createElement('input');
        input.placeholder = _placeholder;
        input.id = _id;
        formDiv.appendChild(input);
    }
    //create the song input field
    createInput('Song Name', 'Enter song name', 'song');
    //create the artist input field
    createInput('Artist', 'Enter artist', 'artist');
    //create the artist input field
    createInput('Genre', 'Enter genre', 'genre');
    //create the artist input field
    createInput('Year', 'Enter year', 'year');
    //create the provider input field
    createInput('Provider', 'Enter provider', 'provider');
    //create the rating input field
    createInput('Rating', 'Enter rating', 'rating');
    //create the link input field
    createInput('Link', 'Enter link', 'link');

    //add a button to the form which when pressed saves the form data to localStorage
    var saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    formDiv.appendChild(saveButton);
    saveButton.addEventListener('click', function () {
        var song = document.getElementById('song').value;
        var artist = document.getElementById('artist').value;
        var genre = document.getElementById('genre').value;
        var year = document.getElementById('year').value;
        var provider = document.getElementById('provider').value;
        var rating = document.getElementById('rating').value;
        var link = document.getElementById('link').value;
        var songObj = {
            song: song,
            artist: artist,
            genre: genre,
            year: year,
            provider: provider,
            rating: rating,
            link: link
        };
        var songs = JSON.parse(localStorage.getItem('songs')) || [];
        songs.push(songObj);
        localStorage.setItem('songs', JSON.stringify(songs));
        document.getElementById('song').value = '';
        document.getElementById('artist').value = '';
        document.getElementById('genre').value = '';
        document.getElementById('year').value = '';
        document.getElementById('provider').value = '';
        document.getElementById('rating').value = '';
        document.getElementById('link').value = '';
    });
}

var songlistDiv = document.createElement('div');
function songlistMode() {
    //display a table with the song name, artist, provider from the json
    document.body.appendChild(songlistDiv);
    var table = document.createElement('table');
    songlistDiv.appendChild(table);
    var header = document.createElement('thead');
    table.appendChild(header);
    var row = document.createElement('tr');
    header.appendChild(row);
    var cell1 = document.createElement('th');
    row.appendChild(cell1);
    var cell2 = document.createElement('th');
    row.appendChild(cell2);
    var cell3 = document.createElement('th');
    row.appendChild(cell3);
    cell1.textContent = 'Song Name';
    cell2.textContent = 'Artist';
    cell3.textContent = 'Provider';
    var body = document.createElement('tbody');
    table.appendChild(body);
    for (var i = 0; i < songs.length; i++) {
        var row = document.createElement('tr');
        var cell1 = document.createElement('td');
        var cell2 = document.createElement('td');
        var cell3 = document.createElement('td');
        cell1.textContent = songs[i].song;
        cell2.textContent = songs[i].artist;
        cell3.textContent = songs[i].provider;
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        body.appendChild(row);
    }

}


//function to show/hide the form and table depending on mode
function showHide() {
    console.log('showHide called');
    if (appMode === 'form') {
        //remove the table if it exists and run form mode function
        if (table) {
            table.remove();
            //remove all table child elements recursively
            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }
        }
        formMode();
    }
    else if (appMode === 'table') {
        //remove the form if it exists and run table mode function
        if (formDiv) {
            formDiv.remove();
            //remove all form child elements recursively
            while (formDiv.firstChild) {
                formDiv.removeChild(formDiv.firstChild);
            }
        }
        tableMode();

    }
    else if (appMode === 'songlist') {
        if (formDiv) {
            formDiv.remove();
            while (formDiv.firstChild) {
                formDiv.removeChild(formDiv.firstChild);
            }
        }
        if (table) {
            table.remove();
            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }
        }
        songlistMode();
    }
}
showHide();

