// Load lyrics for three LyriCreativity case studies
initializeCaseStudy("Avicii", "Hey Brother", 1);
initializeCaseStudy("Tears for Fears", "Everybody Wants to Rule the World", 2);
initializeCaseStudy("of Montreal", "nursing slopes", 3);

// Initialize case studies
function initializeCaseStudy(caseStudyArtist, caseStudySong, caseStudyNumber) {
    var artist = caseStudyArtist;
    var song = caseStudySong;

    // Making API call
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            // Standardizing lyrics for presentation
            var songLyrics = JSON.parse(this.responseText);
            standardizedSongLyrics = standardizeSongLyrics(songLyrics.lyrics);

            // Obtaining array of lyrics

            // Source: https://www.w3schools.com/jsref/jsref_split.asp
            var standardizedSongLyricsArray = standardizedSongLyrics.split(" ");

            // Obtaining array of unique lyrics
            var uniqueSongLyricsArray = [];
            for (var i = 0; i < standardizedSongLyricsArray.length; i++) {

                // Source: https://www.w3schools.com/jsref/jsref_includes_array.asp
                if (!uniqueSongLyricsArray.includes(standardizedSongLyricsArray[i])) {
                    uniqueSongLyricsArray.push(standardizedSongLyricsArray[i]);
                }
            }

            // Updating the DOM for each case study
            document.getElementById("case-study-" + caseStudyNumber + "-lyrics").innerHTML = standardizedSongLyrics;
            document.getElementById("case-study-" + caseStudyNumber + "-individual-words").innerHTML = standardizedSongLyricsArray.length;
            document.getElementById("case-study-" + caseStudyNumber + "-unique-words").innerHTML = uniqueSongLyricsArray.length;
            
            // Source: https://www.w3schools.com/jsref/jsref_tofixed.asp
            var percentage = (uniqueSongLyricsArray.length / standardizedSongLyricsArray.length * 100).toFixed(2);
            var stringPercentage = percentage + "%";
            document.getElementById("case-study-" + caseStudyNumber + "-percent-unique-words").innerHTML = stringPercentage;

            document.getElementById("case-study-" + caseStudyNumber + "-creativity-classification").innerHTML = calculateCreativity(percentage);

        } else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    }
    xhttp.open("GET", "https://api.lyrics.ovh/v1/" + artist + "/" + song, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

// Initializing an array to keep track of IDs (enabling easy deletion if necessary)
var keepTrack = [];

// Setting up the event listener
document.getElementById("get-lyrics-button").addEventListener("click", postLyrics);

function postLyrics() {
    event.preventDefault();
    var artist = document.getElementById("artist-input-box").value;
    var song = document.getElementById("song-input-box").value;

    // Ensuring input fields clear after the user searches
    document.getElementById("artist-input-box").value = "";
    document.getElementById("song-input-box").value = "";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            // Standardizing lyrics for presentation
            var songLyrics = JSON.parse(this.responseText);
            standardizedSongLyrics = standardizeSongLyrics(songLyrics.lyrics);

            // Obtaining array of lyrics
            var standardizedSongLyricsArray = standardizedSongLyrics.split(" ");

            // Obtaining array of unique lyrics
            var uniqueSongLyricsArray = [];
            for (var i = 0; i < standardizedSongLyricsArray.length; i++) {

                if (!uniqueSongLyricsArray.includes(standardizedSongLyricsArray[i])) {
                    uniqueSongLyricsArray.push(standardizedSongLyricsArray[i]);
                }
            }

            console.log(songLyrics.lyrics);

            // Updating the "entry number" for the song/artist that the user searches

            // Source: https://www.w3schools.com/jsref/jsref_push.asp
            keepTrack.push(keepTrack.length + 1);

            // Creating paragraph
            var newParagraph = document.createElement("p");
            newParagraph.setAttribute("id", "paragraph-" + keepTrack.length);
            newParagraph.setAttribute("class", "container");

            // Creating the title
            var classificationTitle = document.createElement("h4");
            classificationTitle.innerHTML = "Creativity Profile";

            // Creating the artist info
            var artistInfo = document.createElement("h5");
            var artistSpan = document.createElement("span");
            artistSpan.setAttribute("class", "artist-intro");
            artistSpan.innerHTML = "Artist: ";
            artistInfo.append(artistSpan);
            artistInfo.append(artist);

            // Creating the song info
            var songInfo = document.createElement("h5");
            var songSpan = document.createElement("span");
            songSpan.setAttribute("class", "song-intro");
            songSpan.innerHTML = "Song: ";
            songInfo.append(songSpan);
            songInfo.append(song);

            // Creating the lyrics
            var lyricsHeading = document.createElement("span");
            lyricsHeading.setAttribute("class", "lyrics");
            lyricsHeading.style.fontStyle = "italic";
            lyricsHeading.style.fontWeight = "bold";
            lyricsHeading.style.display = "block";
            lyricsHeading.style.marginBottom = "10px";
            lyricsHeading.innerHTML = "Lyrics";

            var lyrics = document.createElement("span");
            lyrics.setAttribute("class", "case-study-lyrics");
            lyrics.append(standardizedSongLyrics);

            // Creating the analysis section
            var analysis = document.createElement("span");
            analysis.setAttribute("class", "analysis");
            analysis.style.marginTop = "20px";
            analysis.innerHTML = "LyriCreativity Analysis";

            // Creating the list of properties associated wit hthe song
            var unorderedList = document.createElement("ul");
            unorderedList.style.fontStyle = "italic";

            var individualWords = document.createElement("li");
            individualWords.innerHTML = "Individual words: " + standardizedSongLyricsArray.length;

            var uniqueWords = document.createElement("li");
            uniqueWords.innerHTML = "Unique Words: " + uniqueSongLyricsArray.length;

            var percentUniqueWords = document.createElement("li");
            var percentage = (uniqueSongLyricsArray.length / 
                standardizedSongLyricsArray.length * 100).toFixed(2);
            percentUniqueWords.innerHTML = "Percentage of unique song lyrics: " + percentage + "%";

            var formattedSong = document.createElement("span");
            formattedSong.style.fontWeight = "bold";
            formattedSong.style.fontStyle = "italic";
            formattedSong.innerHTML = song;

            // Updating the creativity classification
            var creativitySpecifier = document.createElement("span");
            creativitySpecifier.style.textDecoration = "underline";
            creativitySpecifier.append(calculateCreativity(percentage));

            var creativitySummary = document.createElement("li");
            creativitySummary.innerHTML = "Classification for ";
            creativitySummary.append(formattedSong);
            creativitySummary.append(": ");
            creativitySummary.append(creativitySpecifier);

            // Adding all necessary components to the unordered list of properties
            unorderedList.append(individualWords);
            unorderedList.append(uniqueWords);
            unorderedList.append(percentUniqueWords);
            unorderedList.append(creativitySummary);

            // Creating the delete button
            var newButton = document.createElement("button");
            newButton.setAttribute("id", "button-" + keepTrack.length);
            newButton.setAttribute("class", "button");
            newButton.append("Clear Example");
            newButton.addEventListener("click", deleteLyrics);
            newButton.onmouseover = function() {
                newButton.style.border = "1px solid #04252E";
                newButton.style.backgroundColor = "2px solid #53C0DB";
            }

            // Creating the hr to separate the song from either (1) the copyright label or (2) another song entry
            var newHr = document.createElement("hr");
            newHr.setAttribute("id", "newhr-" + keepTrack.length);
            newHr.setAttribute("class", "last-hrs");
            
            // Appending everything to the new paragraph
            newParagraph.append(classificationTitle);
            newParagraph.append(artistInfo);
            newParagraph.append(songInfo);
            newParagraph.append(lyricsHeading);
            newParagraph.append(lyrics);
            newParagraph.append(analysis);
            newParagraph.append(unorderedList);
            newParagraph.append(newButton);

            // Appending everything to the empty div
            document.getElementById("user-examples").append(newParagraph);
            document.getElementById("user-examples").append(newHr);

        } else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    }
    xhttp.open("GET", "https://api.lyrics.ovh/v1/" + artist + "/" + song, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

// Standardizing the song lyrics
function standardizeSongLyrics(songLyrics) {

    var modifiedSongLyrics = songLyrics.toLowerCase();

    // Catching some of the most frequent issues with lyrics (parentheses, etc.); note that there
    // are likely many hundreds of possibilities for how lyrics could need to be re-standardized,
    // so this code simply attempts to account for the most popular formatting issues

    // Source: https://www.w3schools.com/jsref/jsref_replace.asp
    modifiedSongLyrics = modifiedSongLyrics.replace(/\n/g, " ");
    modifiedSongLyrics = modifiedSongLyrics.replace(/  /g, " ");
    modifiedSongLyrics = modifiedSongLyrics.replace(/[\r().,!?]/g, "");
    modifiedSongLyrics = modifiedSongLyrics.replace(/ - /g, " ");

    return modifiedSongLyrics;
}

// Calculating the creativity level
function calculateCreativity(percentage) {

    creativityLevel = "";

    if (percentage <= 40) {
        creativityLevel = "Not Creative";
    } else if (percentage <= 60) {
        creativityLevel = "Somewhat Creative";
    } else {
        creativityLevel = "Very Creative";
    }

    return creativityLevel;
}

// Deleting the song entry
function deleteLyrics() {
    var elementNumber = this.id.substr(7, 7);

    console.log(elementNumber);

    // Removing the paragraph
    var paragraphToRemove = document.getElementById("paragraph-" + elementNumber);
    paragraphToRemove.remove();

    // Removing the hr
    var hrToRemove = document.getElementById("newhr-" + elementNumber);
    hrToRemove.remove();
}