/* API CALLS */
function landingPage() {
    $('#searchSummoner').focus()
    clearLocalCache()
    clearFields()
    var init = {'landingPage': {'favoriteSummoners': getSummoners('favoriteSummoners'), 'recentSummoners': getSummoners('recentSummoners')}}
    loadLolByte(init)
};

function summonerPage(noUpdateQueue, summonerSearchOverride) {
    var summonerQuery = getSearch(summonerSearchOverride)
    if (summonerQuery.region && summonerQuery.summonerName) {
        $.getJSON(API_BASE_URL + 'summoners/' + summonerQuery.region.toLowerCase() + '/name/' + summonerQuery.summonerName +
                  '?rankedOnly=' + RANKED_MODE, function(summonerData) {
            if (summonerData.summonerLevel != 0) {
                !noUpdateQueue ? updateSummonerQueue(summonerData.summonerObject):''
                updateRecentSummoners(summonerData.summonerObject)
                // hack
                summonerData.searchSummonerPage = true
                loadLolByte(summonerData)
            } else {
                updateSummonerQueue({'summonerName': summonerQuery.summonerName, 'region': summonerQuery.region, 'summonerIcon': 0})
                loadLolByte({'summonerNotFoundPage': {}})
            }
        });
    }
};

function updateSummonerQueue(summonerObject) {
    SEARCH_SUMMONER_QUEUE = SEARCH_SUMMONER_QUEUE.splice(0, ++CURRENT_SUMMONER)
    SEARCH_SUMMONER_QUEUE.push(summonerObject)
};

function retrieveMatchData(matchId, teamId, championId) {
    var targetGame = getMatchData(matchId)
    if (!targetGame) {
        $.getJSON(API_BASE_URL + 'matches/' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase() +
                  '/match-id/' + matchId + '?summonerId=' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId, function(matchDetailData) {
            addMatchData(matchDetailData)
            matchDetailPage(matchId, teamId, championId)
            $('.matchId' + matchId + ' img').resetKeyframe();
            $('.matchId' + matchId + ' img').pauseKeyframe();
        });
    }
};

function matchDetailPage(matchId, teamId, championId) {
    setSelectedSummonerBySummonerId(matchId, SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId)
    loadLolByte(getMatchData(matchId))
    SELECTED_MATCH = matchId
};

function initCurrentGamePage() {
    $.getJSON(API_BASE_URL + 'current/' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase() + '/summoner-id/' +
              SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId, function(currentGameData) {
        if (currentGameData.summoners.length !== 0) {
            updateCurrentGamePage(currentGameData)
        }
    });
};

function initMostPlayedChampions() {
    $.getJSON(API_BASE_URL + 'summoners/' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase() + '/summoner-id/'+
              formatText(SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId) +'/champions', function(rankedData) {
        updateMostPlayedChampionsSection(rankedData)
    });
};

function initLeaguePage() {
    $.getJSON(API_BASE_URL + 'summoners/' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase() + '/summoner-id/'+
              formatText(SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId) +'/rank', function(leagueData) {
        updateLeaguePage(leagueData)
    });
};

function initAlertPage() {
    $.getJSON(API_BASE_URL + 'notifications', function(alertData) {
        if (alertData['alert']) {
            var alertMessage = document.createElement('p')
            $(alertMessage).html(alertData['alert'])
            $('.alertPage').append(alertMessage)
            $('#alertButton').show()
        }
    });
};

