/*** CONSTANTS ***/
var API_BASE_URL = 'http://localhost:8080/api/v3/';
var MAX_SUMMONER_LIST_SIZE = 20
var MAX_GAME_COUNT = 20

/*** APP VARIABLES ***/
var SELECTED_MATCH
var SEARCH_SUMMONER_QUEUE = []
var CURRENT_SUMMONER = -1
var RANKED_MODE = false

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
        SELECTED_MATCH = 0
        buildSummonerPage(inputObject)
        buildStatsPage(inputObject)
        showPage('summonerPage')
        showPage('statsPage')
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
