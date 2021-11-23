/*** CONSTANTS ***/
var NEW_API_BASE_URL = 'http://lolbyte.me/api/v4';
var MAX_SUMMONER_LIST_SIZE = 20
var MAX_GAME_COUNT = 20
var CDRAGON_BASE_URL = 'https://cdn.communitydragon.org/latest/'
var DDRAGON_BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/'

var spellUrls = new Map();

$.getJSON('https://ddragon.leagueoflegends.com/api/versions.json', function(versionsData) {
    var latestVersion = versionsData[0]
    DDRAGON_BASE_URL = DDRAGON_BASE_URL + latestVersion + '/'
    $.getJSON(`${DDRAGON_BASE_URL}data/en_US/summoner.json`, function(spellsData) {
        Object.entries(spellsData.data).forEach((entry) =>
        spellUrls.set(
          parseInt(entry[1].key),
          `${DDRAGON_BASE_URL}img/spell/${entry[1].image.full}`,
        ),
      );
    })
});

const getSpellIcon = (spellId) => spellUrls.get(spellId);

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
