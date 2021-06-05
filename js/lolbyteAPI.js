/* API CALLS */
function landingPage() {
    $('#searchSummoner').focus()
    clearLocalCache()
    clearFields()
    var init = {'landingPage': {'favoriteSummoners': getSummoners('favoriteSummoners'), 'recentSummoners': getSummoners('recentSummoners')}}
    loadLolByte(init)
};

function summonerPage(noUpdateQueue, summonerSearchOverride) {
    rgeaLog()
    var summonerQuery = getSearch(summonerSearchOverride)
    var success = false;
    if (summonerQuery.region && summonerQuery.summonerName) {
        $.getJSON(`${NEW_API_BASE_URL}/summoners/${summonerQuery.summonerName}?region=${summonerQuery.region.toLowerCase()}`, function(summonerData) {
            success = true;
            summonerObject = buildSummonerObject(summonerData)
            !noUpdateQueue ? updateSummonerQueue(summonerObject):''
            updateRecentSummoners(summonerObject)
            summonerData.searchSummonerPage = true
            loadLolByte(summonerData)
        });
    }
    setTimeout(function() {
        if (!success) {
            updateSummonerQueue({'summonerName': summonerQuery.summonerName, 'region': summonerQuery.region, 'summonerIcon': 0})
            loadLolByte({'summonerNotFoundPage': {}})
        }
    }, 5000);
};

function updateSummonerQueue(summonerObject) {
    SEARCH_SUMMONER_QUEUE = SEARCH_SUMMONER_QUEUE.splice(0, ++CURRENT_SUMMONER)
    SEARCH_SUMMONER_QUEUE.push(summonerObject)
};

function retrieveMatchData(matchId, teamId, championId) {
    rgeaLog()
    var targetGame = getMatchData(matchId)
    if (!targetGame) {
        $.getJSON(`${NEW_API_BASE_URL}/matches/${matchId}?summonerId=${SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId}&region=${SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase()}`, function(matchDetailData) {
            addMatchData(matchDetailData)
            matchDetailPage(matchId, teamId, championId)
            $('.matchId' + matchId + ' img').resetKeyframe();
            $('.matchId' + matchId + ' img').pauseKeyframe();
        });
    }
};

function matchDetailPage(matchId, teamId, championId) {
    setSelectedSummonerBySummonerName(matchId, SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerName)
    loadLolByte(getMatchData(matchId))
    SELECTED_MATCH = matchId
};

function initCurrentGamePage() {
    rgeaLog()
    $.getJSON(`${NEW_API_BASE_URL}/current/${SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId}?region=${SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase()}`, function(currentGameData) {
        updateCurrentGamePage(currentGameData)
    });
};

function initRecentGamesPage() {
    rgeaLog()
    $.getJSON(`${NEW_API_BASE_URL}/recentGames/${SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId}?region=${SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase()}`, function(gamesData) {
        updateRecentGamesPage(gamesData)
    });
};

function initLeaguePage() {
    rgeaLog()
    $.getJSON(`${NEW_API_BASE_URL}/ranks/${SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId}?region=${SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase()}`, function(leagueData) {
        updateLeaguePage(leagueData)
    });
};

function initStatsPage() {
    rgeaLog()
    $.getJSON(`${NEW_API_BASE_URL}/statistics/${SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId}?region=${SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase()}`, function(statsData) {
        updateStatisticsPage(statsData)
    });
};

function initAlertPage() {
    $.getJSON(`${NEW_API_BASE_URL}/notifications`, function(alertData) {
        if (alertData['alert']) {
            var alertMessage = document.createElement('p')
            $(alertMessage).html(alertData['alert'])
            $('.alertPage').append(alertMessage)
            $('#alertButton').show()
        }
    });
};

