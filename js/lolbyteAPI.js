/* API CALLS */
function landingPage() {
    $('#searchSummoner').focus()
    clearLocalCache()
    clearFields()
    var init = {'landingPage': {'favoriteSummoners': getSummoners('favoriteSummoners'), 'recentSummoners': getSummoners('recentSummoners')}}
    loadLolByte(init)
};

function summonerPage(notUpdateQueue, summonerOverride) {
    var summonerQuery = getSearch(summonerOverride)
    $.getJSON(API_BASE_URL + 'summoners/' + summonerQuery.region.toLowerCase() + '/name/' + summonerQuery.summonerName +
              '?rankedOnly=' + RANKED_MODE, function(summonerData) {
        if (!summonerData.error) {
            !notUpdateQueue ? updateSummonerQueue(summonerData.searchSummonerPage.summonerObject):''
            updateRecentSummoners(summonerData.searchSummonerPage.summonerObject)
            loadLolByte(summonerData)

            // Kick off call to server for game data!
            for (var i = 0; i < summonerData.searchSummonerPage.recentGames.length; i++) {
                retrieveMatchData(summonerData.searchSummonerPage.recentGames[i].gameId)
            }
        } else {
            updateSummonerQueue({'summonerName': summonerQuery.summonerName, 'region': summonerQuery.region})
            loadLolByte({'summonerNotFoundPage': {}})
        }
    });
};

function updateSummonerQueue(summonerObject) {
    SEARCH_SUMMONER_QUEUE = SEARCH_SUMMONER_QUEUE.splice(0, ++CURRENT_SUMMONER)
    SEARCH_SUMMONER_QUEUE.push(summonerObject)
};

function retrieveMatchData(gameId) {
    var targetGame = getMatchData(gameId)
    if (!targetGame) {
        $.getJSON(API_BASE_URL + 'matches/' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase() +
                  '/game-id/' + gameId, function(matchDetailData) {
            if (!matchDetailData.error) {
                addMatchData(matchDetailData.matchDetailPage)
                initMatchDetailNameRanks(matchDetailData.matchDetailPage.gameId)
            }
        });
    } else {
        setSelectedSummonerBySummonerId(gameId, SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId)
    }
};

function matchDetailPage(gameId, teamId, championId) {
    // Only show page if the match exists
    if (getMatchData(gameId)) {
        setSelectedSummonerByChampionTeamId(gameId, championId, teamId)
        loadLolByte({'matchDetailPage': getMatchData(gameId)})
    } else {
        !isFirefox ? alert('Game data not found.'):''
    }
};

function initMatchDetailNameRanks(gameId) {
    $.getJSON(API_BASE_URL + 'matches/' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase() + '/game-id/' + gameId + '/details' +
              '?summonerId=' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId, function(matchDetailData) {
        if (!matchDetailData.error) {
            var targetGame = getMatchData(matchDetailData.gameId)
            if (targetGame) {
                for (var i = 0; i < targetGame.players.length; i++) {
                    targetGame.players[i].summonerName = matchDetailData.players[targetGame.players[i].participantId - 1].summonerName
                    targetGame.players[i].rank = matchDetailData.players[targetGame.players[i].participantId - 1].rank
                }

                setMatchData(targetGame)
                if (SELECTED_MATCH == matchDetailData.gameId) {
                    updateMatchDetailSelection(matchDetailData.gameId)
                    updateMatchDetailTeam(matchDetailData.gameId)
                }
            }
        }
    });
};

function initCurrentGamePage() {
    $.getJSON(API_BASE_URL + 'current/' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase() + '/summoner-id/' +
              SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId, function(currentGameData) {
        if (!currentGameData.error) {
            updateCurrentGamePage(currentGameData)
        }
    });
};

function initMostPlayedChampions() {
    $.getJSON(API_BASE_URL + 'summoners/' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase() + '/summoner-id/'+
              formatText(SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId) +'/champions', function(rankedData) {
        if (!rankedData.error) {
            updateMostPlayedChampionsSection(rankedData)
        }
    });
};

function initLeaguePage() {
    $.getJSON(API_BASE_URL + 'summoners/' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase() + '/summoner-id/'+
              formatText(SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId) +'/rank', function(leagueData) {
        if (!leagueData.error) {
            updateLeaguePage(leagueData)
        }
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

