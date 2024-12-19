
var songs = require('./songlist.json');




//if mode == table then add rows and cells to the table using addCells function filled with the data in localstorage

var songlistDiv = document.createElement('div');
//add a search input box which filters the table by song name
var searchInput = document.createElement('input');
searchInput.placeholder = 'Search by song name';
songlistDiv.appendChild(searchInput);
var filteredSongs = songs;
searchInput.addEventListener('input', function () {
    //need to add a serach which creates a filtered list to be used in the table
    var search = searchInput.value;
    filteredSongs = songs.filter(function (song) {
        return song.Name.toLowerCase().includes(search.toLowerCase());
    });
    clearTableBodyContents()
    drawTableBodyContents()

});

//display a table with the song name, artist, provider from the json
var listTable = document.createElement('table');
songlistDiv.appendChild(listTable);
var header = document.createElement('thead');
listTable.appendChild(header);
var row = document.createElement('tr');
header.appendChild(row);
var cell1 = document.createElement('th');
row.appendChild(cell1);
var cell2 = document.createElement('th');
row.appendChild(cell2);
var cell3 = document.createElement('th');
row.appendChild(cell3);
var cell4 = document.createElement('th');
row.appendChild(cell4);
cell1.textContent = 'Add to My Songs';
cell2.textContent = 'Song Name';
cell3.textContent = 'Artist';
cell4.textContent = 'Provider';
var body = document.createElement('tbody');
listTable.appendChild(body);

function clearTableBodyContents() {
    //use a while loop to remove all the rows from the table body
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }
}

function drawTableBodyContents() {
    for (var i = 0; i < filteredSongs.length; i++) {
        var row = document.createElement('tr');
        var cell1 = document.createElement('td');
        var cell2 = document.createElement('td');
        var cell3 = document.createElement('td');
        var cell4 = document.createElement('td');
        cell1.textContent = '+';
        cell2.textContent = filteredSongs[i].Name;
        cell3.textContent = filteredSongs[i].Artist;
        cell4.textContent = filteredSongs[i].Provider;
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        body.appendChild(row);
    }
}
drawTableBodyContents();

export { songlistDiv as songListView };