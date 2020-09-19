/* EVENT LISTENERS */
$('#searchButton').click(function() {
    summonerPage()
});

$(document).keypress(function(e) {
    if(e.which == 13) {
        summonerPage()
    }
});

$('#alertButton').click(function() {
    alertButtonClicked()
});

$('#backButton').click(function() {
    backButtonClicked()
});

$('#backButton2').click(function() {
    backButtonClicked()
});

$('#forwardButton').click(function() {
    forwardButtonClicked()
});

$('#homeButton').click(function() {
    landingPage()
});

$('#homeButton2').click(function() {
    landingPage()
});

$('#summonerFavoriteButton').click(function() {
    summonerFavoriteButtonClicked()
});

$('#summonerFavoriteButton2').click(function() {
    summonerFavoriteButtonClicked()
});

$('#inGameButton').click(function() {
    inGameButtonClicked()
});

$('#recentGamesType').change(function() {
    summonerPage(true, SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER])
});