/* API CALLS */
function landingPage() {
    clearLocalCache()
    clearFields()
    var init = {'landingPage': {'favoriteSummoners': getSummoners('favoriteSummoners'), 'recentSummoners': getSummoners('recentSummoners')}}
    loadLolByte(init)
};

function summonerPage(navigationFlag) {
    var summonerQuery = getSearch()
    $.getJSON(API_BASE_URL + '?region=' + summonerQuery.region.toLowerCase() + '&data=SearchSummoner&ranked=' +
              RANKED_MODE + '&name=' + summonerQuery.summonerName + '&size=' + MAX_GAME_COUNT, function(summonerData) {
        if (!summonerData.error) {
            !navigationFlag ? updateSummonerQueue(summonerData.searchSummonerPage.summonerObject):''
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
        $.getJSON(API_BASE_URL + '?region=' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase() + '&data=MatchDetails&gameId=' +
                  gameId + '&id=' +  SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId, function(matchDetailData) {
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
    setSelectedSummonerByChampionTeamId(gameId, championId, teamId)
    loadLolByte({'matchDetailPage': getMatchData(gameId)})
};

function initMatchDetailNameRanks(gameId) {
    $.getJSON(API_BASE_URL + '?region=' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase() + '&data=MatchDetails&ff=1&gameId=' +
              gameId + '&id=' +  SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId, function(matchDetailData) {
        if (!matchDetailData.error) {
            var targetGame = getMatchData(matchDetailData.gameId)
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
    });
};

function initCurrentGamePage() {
    $.getJSON(API_BASE_URL + '?region=' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase() +
              '&data=CurrentGame&id=' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId, function(currentGameData) {
        if (!currentGameData.error) {
            updateCurrentGamePage(currentGameData)
        }
    });
};

function initMostPlayedChampions() {
    $.getJSON(API_BASE_URL + '?region=' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase() + '&data=SearchSummoner&mpc=1&ranked=' +
              RANKED_MODE + '&name=' + FormatText(SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerName), function(rankedData) {
        if (!rankedData.error) {
            updateMostPlayedChampsSection(rankedData)
        }
    });
};

function initLeaguePage() {
    $.getJSON(API_BASE_URL + '?region=' + SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].region.toLowerCase() + '&data=SearchSummoner&rg=1&ranked=' +
              RANKED_MODE + '&name=' + FormatText(SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerName), function(leagueData) {
        if (!leagueData.error) {
            updateLeaguePage(leagueData)
        }
    });
};

function initAlertPage() {
    $.getJSON(API_BASE_URL + '?data=Alerts', function(alertData) {
        if (alertData['alert']) {
            var alertMessage = document.createElement('p')
            alertMessage.innerHTML = alertData['alert']
            $('.alertPage').append(alertMessage)
            $('#alertButton').show()
        }
    });
};

