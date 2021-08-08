/*** CONSTANTS ***/
var NEW_API_BASE_URL = 'http://lolbyte.me/api/v4';
var MAX_SUMMONER_LIST_SIZE = 20
var MAX_GAME_COUNT = 20
var CDRAGON_BASE_URL = 'https://cdn.communitydragon.org/latest/'
var DDRAGON_BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/'

$.getJSON('https://ddragon.leagueoflegends.com/api/versions.json', function(versionsData) {
    var latestVersion = versionsData[0]
    DDRAGON_BASE_URL = DDRAGON_BASE_URL + latestVersion + '/'
});

/*** APP VARIABLES ***/
var SELECTED_MATCH
var SEARCH_SUMMONER_QUEUE = []
var CURRENT_SUMMONER = -1

/* INIT CODE */
clearInvalidSavedSummoners()
landingPage()
initAlertPage()

/*** UI LOADER ***/
function loadLolByte(inputObject) {
    // Hide all pages
    hideAllPages()

    if (inputObject.landingPage) {
        $('#inGameButton').hide()
        buildLandingPage(inputObject.landingPage)
        showPage('landingPage')
    } else if (inputObject.searchSummonerPage) {
        showPage('loader')
        SELECTED_MATCH = 0
        buildSummonerPage(inputObject)
        buildStatsPage()
    } else if (inputObject.matchDetailPage) {
        buildMatchDetailsPage(inputObject)
        showPage('summonerPage')
        showPage('matchDetailPage')
    } else if (inputObject.summonerNotFoundPage) {
        $('#inGameButton').hide()
        buildSummonerNotFoundPage()
        showPage('summonerNotFoundPage')
    } else if (inputObject.minimizeRecentGame) {
        showPage('summonerPage')
        showPage('statsPage')
    }

    loadAllOwlCarousels()
};
