
//container div
var mySongsView = document.createElement('div');


//make a function which adds the cells to the row as below
function addCells(songname, artist, genre, provider, rating, link) {
    // Add a row to the body
    var row = document.createElement('tr');
    var _body = body;

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
    if (body) {
        body.appendChild(row);
    }
}


var songs = [];
songs = JSON.parse(localStorage.getItem('songs')) || [];
for (var i = 0; i < songs.length; i++) {
    console.log(songs[i]);
    addCells(songs[i].song, songs[i].artist, songs[i].genre, songs[i].provider, songs[i].rating, songs[i].link);
}


var table = document.createElement('table');
mySongsView.appendChild(table);
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


export { mySongsView, addCells }