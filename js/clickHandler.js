/* CLICK FUNCTIONS */
function alertButtonClicked() {
    togglePage('alertPage')
};

function feedbackButtonClicked() {
    window.open('mailto:crxlolbyte@gmail.com?Subject=LolByte Feedback')
};

function donationButtonClicked() {
    window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=L3HYQR8RNYPU8&lc=US&item_name+=LolByte%20Development&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted')
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

    var gameId = recentGameClickedData.data.gameId
    var teamId = recentGameClickedData.data.teamId
    var championId = recentGameClickedData.data.championId

    if (gameId == SELECTED_MATCH) {
        minimizeRecentGame()
        SELECTED_MATCH = 0
    } else {
        matchDetailPage(gameId, teamId, championId)
        SELECTED_MATCH = gameId
        $('.gameId' + recentGameClickedData.data.gameId + ' img').css('border', '2px solid white')
    }
};

function rankedToggleButtonClicked() {
    if (RANKED_MODE) {
        RANKED_MODE = false
        summonerPage(true, SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER])
        $('#rankedToggleButton').attr('src', 'img/assets/rankedToggleOff.png')
    } else {
        RANKED_MODE = true
        summonerPage(true, SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER])
        $('#rankedToggleButton').attr('src', 'img/assets/rankedToggleOn.png')
    }
};

function matchDetailSummonerPlayerInfoClicked(matchDetailSummonerPlayerInfoClickData) {
    setSearch(matchDetailSummonerPlayerInfoClickData.data.summonerName)
    summonerPage()
};

function matchDetailSummonerClicked(matchDetailSummonerClickData) {
    var participantId = matchDetailSummonerClickData.data.participantId
    var gameId = matchDetailSummonerClickData.data.gameId

    setSelectedSummonerByParticipantId(gameId, participantId)
    updateMatchDetailBarElement(gameId)
    updateMatchDetailSelectionElement(gameId)
    updateMatchDetailTeamElement(gameId)
};
