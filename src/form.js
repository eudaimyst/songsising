
var formDiv = document.createElement('div');

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
        Name: song,
        Artist: artist,
        genre: genre,
        year: year,
        Provider: provider,
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

export { formDiv as formView };