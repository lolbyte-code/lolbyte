/* Interact with localStorage */
function getLocal(key) {
    return JSON.parse(localStorage.getItem(key)) || []
};

function setLocal(key, valueObject) {
    localStorage.setItem(key, JSON.stringify(valueObject))
};

function getSummoners(listType) {
    return listType == 'recentSummoners' ? getLocal('recentSummoners') : getLocal('favoriteSummoners')
};

function getLatestRegion() {
    var summoners = getSummoners('recentSummoners')
    if (summoners.length > 0) {
        return summoners[0].region
    } else {
        return 'NA'
    }
};

function getSummoner(summonerId, listType) {
    var summoners = getSummoners(listType)
    for (var i = 0; i < summoners.length; i++) {
        if (summoners[i].summonerId == summonerId) {
            return {'index': i, 'summonerObject': summoners[i]}
        }
    }

    return null
};

function updateRecentSummoners(summonerObject) {
    var recentSummoners = getSummoners('recentSummoners')
    var targetSummoner = getSummoner(summonerObject.summonerId, 'recentSummoners')
    if (targetSummoner) {
        recentSummoners.splice(targetSummoner['index'], 1)
    }
    recentSummoners.unshift(summonerObject)
    recentSummoners = recentSummoners.splice(0, MAX_SUMMONER_LIST_SIZE)
    setLocal('recentSummoners', recentSummoners)
};

function removeRecentSummoner(summonerObject) {
    var recentSummoners = getLocal('recentSummoners')
    var targetSummoner = getSummoner(summonerObject.summonerId, 'recentSummoners')
    recentSummoners.splice(targetSummoner['index'], 1)
    setLocal('recentSummoners', recentSummoners)
};

function addFavoriteSummoner(summonerObject) {
    var favoriteSummoners = getLocal('favoriteSummoners')
    favoriteSummoners.unshift(summonerObject)
    favoriteSummoners = favoriteSummoners.splice(0, MAX_SUMMONER_LIST_SIZE)
    setLocal('favoriteSummoners', favoriteSummoners)
};

function removeFavoriteSummoner(summonerObject) {
    var favoriteSummoners = getLocal('favoriteSummoners')
    var targetSummoner = getSummoner(summonerObject.summonerId, 'favoriteSummoners')
    favoriteSummoners.splice(targetSummoner['index'], 1)
    setLocal('favoriteSummoners', favoriteSummoners)
};

function getMatchData(matchId) {
    var recentGames = getLocal('matchesData')
    for (var game in recentGames) {
        if (recentGames[game].id == matchId) {
            recentGames[game].matchDetailPage = true
            return recentGames[game]
        }
    }

    return null
};

function setMatchData(recentGameObject) {
    var recentGames = getLocal('matchesData')
    for (var game in recentGames) {
        if (recentGames[game].matchId == recentGameObject.matchId) {
            recentGames[game] = recentGameObject
            break
        }
    }

    setRecentGames(recentGames)
};

function addMatchData(recentGameObject) {
    var recentGames = getLocal('matchesData')
    recentGames.push(recentGameObject)
    setRecentGames(recentGames)
};

function setRecentGames(recentGames) {
    setLocal('matchesData', recentGames)
};

function clearMatchData() {
    localStorage.removeItem('matchesData')
};
