//import form.js and mysongs.js and songlist.js
import { formView } from './form.js';
import { mySongsView, addCells } from './mysongs.js';
import { songListView } from './songlist.js';


//make a header div to hold the heading and buttons
var header = document.createElement('div');
header.id = 'appHeader';
document.body.appendChild(header);

//add a heading to the page called "Songs I Sing"
var heading = document.createElement('div');
heading.textContent = 'Songs I Sing';
header.appendChild(heading);



var appMode = 'form'
//add two buttons at the top for a form mode of entry and a table mode of entry
var formButton = document.createElement('button');
formButton.textContent = 'Manual Entry';
header.appendChild(formButton);
//when form button is pressed the form mode is activated
formButton.addEventListener('click', function () {
    console.log('form button pressed');
    setMode('form');
});
var tableButton = document.createElement('button');
tableButton.textContent = 'My Songs';
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

document.body.appendChild(formView);
document.body.appendChild(mySongsView);
document.body.appendChild(songListView);


//following is form mode
//create a div to hold the form elements





//function to show/hide the form and table depending on mode
function showHide() {
    console.log('showHide called');
    //remove formView, mySongsView and songListView from the document
    if (document.body.contains(formView)) {
        formView.classList.add('hidden');
    }
    if (document.body.contains(mySongsView)) {
        mySongsView.classList.add('hidden');
    }
    if (document.body.contains(songListView)) {
        songListView.classList.add('hidden');
    }

    if (appMode === 'form') {
        formView.classList.remove('hidden');
    }
    else if (appMode === 'table') {
        mySongsView.classList.remove('hidden');
    }
    else if (appMode === 'songlist') {
        songListView.classList.remove('hidden');
    }
}
showHide();

