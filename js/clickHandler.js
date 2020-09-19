/* CLICK FUNCTIONS */
function alertButtonClicked() {
    togglePage('alertPage')
};

function backButtonClicked() {
    if (CURRENT_SUMMONER > 0) {
        var targetSummoner = SEARCH_SUMMONER_QUEUE[--CURRENT_SUMMONER]
        navigateSummoner(targetSummoner)
    }
};

function forwardButtonClicked() {
    if (CURRENT_SUMMONER < SEARCH_SUMMONER_QUEUE.length - 1) {
        var targetSummoner = SEARCH_SUMMONER_QUEUE[++CURRENT_SUMMONER]
        navigateSummoner(targetSummoner)
    }
};

function navigateSummoner(targetSummoner) {
    setSearch(targetSummoner.summonerName, targetSummoner.region)
    summonerPage(true)
};

function summonerOrbClicked(summonerName, region) {
    setSearch(summonerName, region)
    summonerPage()
};

function summonerFavoriteButtonClicked() {
    if (!getSummoner(SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId, 'favoriteSummoners')) {
        $('.summonerBar #summonerFavoriteButton').attr('src', 'img/assets/favoriteButton.png')
        $('.summonerNotFoundPage #summonerFavoriteButton2').attr('src', 'img/assets/favoriteButton.png')
        addFavoriteSummoner(SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER])
    } else {
        $('.summonerBar #summonerFavoriteButton').attr('src', 'img/assets/favoriteButtonOff.png')
        $('.summonerNotFoundPage #summonerFavoriteButton2').attr('src', 'img/assets/favoriteButtonOff.png')
        removeFavoriteSummoner(SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER])
    }
};

function inGameButtonClicked() {
    togglePage('currentGamePage')
};

function currentGameSummonerClicked(currentGameSummonerReference) {
    setSearch(currentGameSummonerReference.data.summonerName)
    summonerPage()
};

function headerSummonerNameClicked() {
    clearRecentGameWhiteBorders()
    minimizeRecentGame()
};

function recentGameClicked(recentGameClickedData) {
    clearRecentGameWhiteBorders()
    minimizeRecentGame()

    var matchId = recentGameClickedData.data.matchId
    var teamId = recentGameClickedData.data.teamId
    var championId = recentGameClickedData.data.championId

    if (matchId == SELECTED_MATCH) {
        SELECTED_MATCH = 0
    } else if (getMatchData(matchId)) {
        $('.matchId' + matchId + ' img').css('border', '2px solid white')
        matchDetailPage(matchId, championId, teamId)
    } else {
        $('.matchId' + matchId + ' img').css('border', '2px solid white')
        $('.matchId' + matchId + ' img').playKeyframe({
            name: 'spin',
            duration: '1.5s',
            timingFunction: 'ease',
            iterationCount: 'infinite'
        });
        retrieveMatchData(matchId, teamId, championId)
    }
};

function matchDetailSummonerPlayerInfoClicked(matchDetailSummonerPlayerInfoClickData) {
    setSearch(matchDetailSummonerPlayerInfoClickData.data.summonerName)
    summonerPage()
};

function matchDetailSummonerClicked(matchDetailSummonerClickData) {
    var participantId = matchDetailSummonerClickData.data.participantId
    var matchId = matchDetailSummonerClickData.data.matchId

    setSelectedSummonerByParticipantId(matchId, participantId)
    updateMatchDetailSelectionElement(matchId)
    updateMatchDetailTeamElement(matchId)
};
