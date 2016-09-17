/* HELPER FUNCTIONS */
function refreshOwlList(element, elementId, parentElement) {
    element.remove()
    var owlList = document.createElement('div')
    owlList.id = elementId
    parentElement.append(owlList)
};

function loadAllOwlCarousels() {
    loadOwlCarousel('favoriteSummoners', 'summonerList', {'items': 5})
    loadOwlCarousel('recentSummoners', 'summonerList', {'items': 5})
    loadOwlCarousel('recentGames', 'recentGamesList', {'items': 10})
    loadOwlCarousel('playerStats', 'playerStatsList', {'items': 1})

    setOwlVisibility('favoriteSummoners', 'summonerList', 5)
    setOwlVisibility('recentSummoners', 'summonerList', 5)
    setOwlVisibility('recentGames', 'recentGamesList', 10)
    setOwlVisibility('playerStats', 'playerStatsList', 1)
};

function loadOwlCarousel(className, listName, options) {
    $('.' + className +' #' + listName).owlCarousel({
        items: options.items,
        navigation: true,
        scrollPerPage: true,
        responsive: false,
        margin: 0,
        navigationText: [
            '<img id="navLeft" src="img/assets/navLeft.png">',
            '<img id="navRight" src="img/assets/navRight.png">'
        ]
    });
};

function setOwlVisibility(className, listName, maxItemCount) {
    var itemCount = $('.' + className + ' #' + listName + ' .owl-wrapper-outer .owl-wrapper').children().length

    if (itemCount <= maxItemCount) {
         $('.' + className + ' #' + listName + ' .owl-controls').hide()
    } else {
         $('.' + className + ' #' + listName + ' .owl-controls').show()
    }
};

/* Helper functions */
function formatText(text) {
    return text.toLowerCase().replace(/[^a-zA-Z0-9\u00C0-\u017F]/g, '')
};

function formatTimestamp(timestamp) {
    var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    var date = new Date(0)
    date.setUTCMilliseconds(timestamp)
    return date.toLocaleDateString('en-us', dateOptions)
}

/* Setters/getters for selected summoner */
function setSelectedSummonerByParticipantId(gameId, participantId) {
    var targetRecentGame = getMatchData(gameId)
    for (var i = 0; i < targetRecentGame.players.length; i++) {
        if (targetRecentGame.players[i].participantId == participantId) {
            targetRecentGame.players[i]['selectedSummoner'] = true
        } else {
            targetRecentGame.players[i]['selectedSummoner'] = false
        }
    }
    setMatchData(targetRecentGame)
};

function setSelectedSummonerBySummonerId(gameId, summonerId) {
    var targetRecentGame = getMatchData(gameId)
    for (var i = 0; i < targetRecentGame.players.length; i++) {
        if (targetRecentGame.players[i].summonerId == summonerId) {
            targetRecentGame.players[i]['selectedSummoner'] = true
        } else {
            targetRecentGame.players[i]['selectedSummoner'] = false
        }
    }
    setMatchData(targetRecentGame)
};

function setSelectedSummonerByChampionTeamId(gameId, championId, teamId) {
    var targetRecentGame = getMatchData(gameId)
    for (var i = 0; i < targetRecentGame.players.length; i++) {
        if (targetRecentGame.players[i].championId == championId && targetRecentGame.players[i].teamId == teamId) {
            targetRecentGame.players[i]['selectedSummoner'] = true
        } else {
            targetRecentGame.players[i]['selectedSummoner'] = false
        }
    }
    setMatchData(targetRecentGame)
};

function getSelectedSummoner(gameId) {
    var targetGame = getMatchData(gameId)
    for (var i = 0; i < targetGame.players.length; i++) {
        if (targetGame.players[i].selectedSummoner) {
            return targetGame.players[i]
        }
    }
};

function setSelectedSummonerUI(matchDetailSummoner, currentSummoner, selectedSummoner) {
    if (currentSummoner.participantId == selectedSummoner.participantId) {
        $(matchDetailSummoner).addClass('matchDetailSelectedSummoner')
        $(matchDetailSummoner).removeClass('matchDetailNotSelectedSummoner')
    } else {
        $(matchDetailSummoner).addClass('matchDetailNotSelectedSummoner')
        $(matchDetailSummoner).removeClass('matchDetailSelectedSummoner')
    }
};

/* Clear functions */
function clearRecentGameWhiteBorders() {
    // Clear white borders and remove glow from recent games
    for (var i = 0; i < MAX_GAME_COUNT; i++) {
        var win = $('.recentGame' + i).attr('id')
        var border = win == '1' ? '2px solid #22A8CE' : '2px solid #B2281D'
        $('.recentGame' + i + ' #recentGame img').css('border', border)
    }
};

function clearLocalCache() {
    clearMatchData()
    SEARCH_SUMMONER_QUEUE = []
    CURRENT_SUMMONER = -1
};

function clearFields() {
    setSearch('')
};

function clearInvalidSavedSummoners() {
    // Remove any saved summoners without a summoner name
    var recentSummoners = getSummoners('recentSummoners')
    var favoriteSummoners = getSummoners('favoriteSummoners')

    for (var summoner in recentSummoners) {
        var recentSummoner = recentSummoners[summoner]
        !recentSummoner.summonerName ? removeRecentSummoner(recentSummoner) :''
    }

    for (var summoner in favoriteSummoners) {
        var favoriteSummoner = favoriteSummoners[summoner]
        !favoriteSummoner.summonerName ? removeFavoriteSummoner(favoriteSummoner) :''
    }
};

/* UI functions */
function hideAllPages() {
    $('.landingPage').hide()
    $('.summonerPage').hide()
    $('.statsPage').hide()
    $('.matchDetailPage').hide()
    $('.currentGamePage').hide()
    $('.summonerNotFoundPage').hide()
};

function showPage(pageName) {
    $('.' + pageName).show()
};

function hidePage(pageName) {
    $('.' + pageName).hide()
};

function togglePage(pageName) {
    $('.' + pageName).is(':visible') ? hidePage(pageName) : showPage(pageName)
};

function setSearch(summonerName, region) {
    summonerName ? $('#searchSummoner').val(summonerName):''
    region ? $('#regionSelector').val(region):''
};

function getSearch(summonerOverride) {
    var searchedSummoner = summonerOverride ? summonerOverride.summonerName : $('#searchSummoner').val()
    var selectedRegion = summonerOverride ? summonerOverride.region : $('#regionSelector').val()

    return {"summonerName": formatText(searchedSummoner), "region": selectedRegion}
};

function minimizeRecentGame() {
    loadLolByte({'minimizeRecentGame': {}})
};
