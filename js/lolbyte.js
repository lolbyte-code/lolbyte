/*** CONSTANTS ***/
var API_BASE_URL = 'http://gg.lolbyte.me/api2/Handler.php'
var MAX_SUMMONER_LIST_SIZE = 20
var MAX_GAME_COUNT = 20

/*** APP VARIABLES ***/
var SELECTED_MATCH
var SEARCH_SUMMONER_QUEUE = []
var CURRENT_SUMMONER = -1
var RANKED_MODE = 0

/* INIT CODE */
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
        buildSummonerPage(inputObject.searchSummonerPage)
        buildStatsPage(inputObject.searchSummonerPage)
        showPage('summonerPage')
        showPage('statsPage')
    } else if (inputObject.matchDetailPage) {
        buildMatchDetailsPage(inputObject.matchDetailPage)
        showPage('summonerPage')
        showPage('matchDetailPage')
    } else if (inputObject.summonerNotFoundPage) {
        buildSummonerNotFoundPage()
        showPage('summonerNotFoundPage')
    } else if (inputObject.minimizeRecentGame) {
        showPage('summonerPage')
        showPage('statsPage')
    }

    loadAllOwlCarousels()
};
