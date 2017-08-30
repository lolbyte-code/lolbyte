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
            if (!$.isEmptyObject(summonerData)) {
                !noUpdateQueue ? updateSummonerQueue(summonerData.searchSummonerPage.summonerObject):''
                updateRecentSummoners(summonerData.searchSummonerPage.summonerObject)
                loadLolByte(summonerData)

                // Kick off call to server for game data!
                for (var i = 0; i < summonerData.searchSummonerPage.recentGames.length; i++) {
                    retrieveMatchData(summonerData.searchSummonerPage.recentGames[i].matchId)
                }
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

function retrieveMatchData(matchId) {
    var targetGame = getMatchData(matchId)
    if (!targetGame) {
        $.getJSON(API_BASE_URL + 'matches/' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase() +
                  '/match-id/' + matchId, function(matchDetailData) {
            addMatchData(matchDetailData.matchDetailPage)
            initMatchDetailNameRanks(matchDetailData.matchDetailPage.matchId)
        });
    } else {
        setSelectedSummonerBySummonerId(matchId, SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId)
    }
};

function matchDetailPage(matchId, teamId, championId) {
    // Only show page if the match exists
    if (getMatchData(matchId)) {
        setSelectedSummonerByChampionTeamId(matchId, championId, teamId)
        loadLolByte({'matchDetailPage': getMatchData(matchId)})
    }
};

function initMatchDetailNameRanks(matchId) {
    $.getJSON(API_BASE_URL + 'matches/' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase() + '/match-id/' + matchId + '/details' +
              '?summonerId=' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId, function(matchDetailData) {
        var targetGame = getMatchData(matchDetailData.matchId)
        if (targetGame) {
            for (var i = 0; i < targetGame.players.length; i++) {
                targetGame.players[i].summonerName = matchDetailData.players[targetGame.players[i].participantId - 1].summonerName
                targetGame.players[i].rank = matchDetailData.players[targetGame.players[i].participantId - 1].rank
            }

            setMatchData(targetGame)
            if (SELECTED_MATCH == matchDetailData.matchId) {
                updateMatchDetailSelection(matchDetailData.matchId)
                updateMatchDetailTeam(matchDetailData.matchId)
            }
        }
    });
};

function initCurrentGamePage() {
    $.getJSON(API_BASE_URL + 'current/' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase() + '/summoner-id/' +
              SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId, function(currentGameData) {
        if (!$.isEmptyObject(currentGameData)) {
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

