/*** ELEMENT BUILDERS ***/
function buildSummonerElement(summonerData) {
    var summonerElement = document.createElement('div')
    summonerElement.id = 'summonerOrb'
    $(summonerElement).click(function(){ summonerOrbClicked(summonerData.summonerName, summonerData.region) })
    var summonerIcon = document.createElement('img')
    summonerIcon.src = 'http://ddragon.leagueoflegends.com/cdn/6.5.1/img/profileicon/' + summonerData.summonerIcon + '.png'
    var summonerName = document.createElement('p')
    summonerName.id = 'summonerName'
    summonerName.innerHTML = summonerData.summonerName
    var summonerRegion = document.createElement('p')
    summonerRegion.id = 'summonerRegion'
    summonerRegion.innerHTML = summonerData.region

    summonerElement.appendChild(summonerIcon)
    summonerElement.appendChild(summonerName)
    summonerElement.appendChild(summonerRegion)

    var wrapSummonerElement = document.createElement('a')
    wrapSummonerElement.href = '#'
    wrapSummonerElement.appendChild(summonerElement)

    return wrapSummonerElement
};

function buildCurrentGameElement(currentGameData) {
    var currentGameElement = document.createElement('div')
    currentGameElement.id = 'currentGameInfo'
    var gameType = document.createElement('p')
    gameType.id = 'gameType'
    gameType.innerHTML = currentGameData.gameType
    var wrapGameType = document.createElement('div')
    wrapGameType.id = 'wrapGameType'
    wrapGameType.appendChild(gameType)
    currentGameElement.appendChild(wrapGameType)
    for (var i = 0; i < currentGameData.summoners.length; i++) {
        var currentSummoner = currentGameData.summoners[i]
        if (i == currentGameData.summoners.length / 2) {
            var versusText = document.createElement('p')
            versusText.id = 'versusText'
            versusText.innerHTML = 'vs'
            currentGameElement.appendChild(versusText)
        }
        var currentGameSummoner = document.createElement('div')
        currentGameSummoner.id = 'currentGameSummoner'
        $(currentGameSummoner).click({summonerName: currentSummoner.summonerName}, currentGameSummonerClicked)
        var champion = document.createElement('img')
        champion.src = 'img/resources/champions/' + currentSummoner.championId + '.png'
        var summonerName = document.createElement('p')
        summonerName.id = 'summonerName'
        summonerName.innerHTML = currentSummoner.summonerName
        var rank = document.createElement('p')
        rank.id = 'rank'
        rank.innerHTML = currentSummoner.rank

        $(currentGameSummoner).addClass('currentGameSummonerTeam' + currentSummoner.teamId)
        currentSummoner.selectedSummoner ?  $(currentGameSummoner).addClass('selectedCurrentGameSummonerTeam' + currentSummoner.teamId):''

        currentGameSummoner.appendChild(champion)
        currentGameSummoner.appendChild(summonerName)
        currentGameSummoner.appendChild(rank)

        var wrapCurrentGameSummoner = document.createElement('a')
        wrapCurrentGameSummoner.href = '#'
        wrapCurrentGameSummoner.appendChild(currentGameSummoner)
        currentGameElement.appendChild(wrapCurrentGameSummoner)
    }

    return currentGameElement
};

function buildRecentGameElement(gameData, gameNumber) {
    var recentGameElement = document.createElement('div')
    recentGameElement.id = 'recentGame'
    $(recentGameElement).attr('class', 'gameId' + gameData.gameId)
    $(recentGameElement).click({'gameId': gameData.gameId, 'championId': gameData.championId, 'teamId': gameData.teamId}, recentGameClicked)
    var champion = document.createElement('img')
    champion.src = 'img/resources/champions/' + gameData.championId + '.png'
    champion.style = gameData.win ? 'border: 2px solid #22A8CE;' : 'border: 2px solid #B2281D;'
    var gameResult = document.createElement('p')
    gameResult.id = 'recentGameResult'
    gameResult.innerHTML = gameData.win ? 'W' : 'L'
    var gameKDA = document.createElement('p')
    gameKDA.id = 'recentGameKDA'
    gameKDA.innerHTML = gameData.kda

    recentGameElement.appendChild(champion)
    recentGameElement.appendChild(gameResult)
    recentGameElement.appendChild(gameKDA)

    var wrapRecentGameElement = document.createElement('a')
    wrapRecentGameElement.href = '#'
    wrapRecentGameElement.id = gameData.win ? 1 : 0
    wrapRecentGameElement.className = 'recentGame' + gameNumber
    wrapRecentGameElement.appendChild(recentGameElement)

    return wrapRecentGameElement
};

function buildRankedToggleButtonElement() {
        var rankedToggleButton = document.createElement('img')
        rankedToggleButton.id = 'rankedToggleButton'
        rankedToggleButton.src = RANKED_MODE ? 'img/assets/rankedToggleOff.png' : 'img/assets/rankedToggleOn.png'
        $(rankedToggleButton).click(function() { rankedToggleButtonClicked() })

        return rankedToggleButton
};

function buildLeagueElement(leagueData) {
    var leagueElement = document.createElement('div')
    var rankBadge = document.createElement('img')
    rankBadge.id = 'rankBadge'
    rankBadge.src = 'img/ranks/' + leagueData.tier + '.png'
    var leagueRankStats = document.createElement('div')
    leagueRankStats.id = 'leagueRankStats'

    var rankQueueType = document.createElement('p')
    rankQueueType.id = 'rankQueueType'
    rankQueueType.innerHTML = leagueData.rankQueueType
    var rank = document.createElement('p')
    rank.id = 'rank'
    rank.innerHTML = leagueData.rank
    var leaguePoints = document.createElement('p')
    leaguePoints.id = 'leaguePoints'
    leaguePoints.innerHTML = leagueData.leaguePoints
    var leagueName = document.createElement('p')
    leagueName.id = 'leagueName'
    leagueName.innerHTML = leagueData.leagueName
    var calcMMR = document.createElement('p')
    calcMMR.id = 'calcMMR'
    calcMMR.innerHTML = leagueData.mmr
    var rankedWL = document.createElement('p')
    rankedWL.id = 'rankedWL'
    rankedWL.innerHTML = leagueData.rankedWL
    var rankedWinRatio = document.createElement('p')
    rankedWinRatio.id = 'rankedWinRatio'
    rankedWinRatio.innerHTML = leagueData.rankedWinRatio
    var lastSeasonRank = document.createElement('p')
    lastSeasonRank.id = 'lastSeasonRank'
    lastSeasonRank.innerHTML = leagueData.lastSeasonRank

    leagueElement.appendChild(rankQueueType)
    leagueElement.appendChild(rankBadge)
    leagueElement.appendChild(leagueRankStats)
    leagueRankStats.appendChild(rank)
    if (leagueData.tier != 'unranked') {
        leagueRankStats.appendChild(leaguePoints)
        leagueRankStats.appendChild(leagueName)
        leagueRankStats.appendChild(calcMMR)
        leagueRankStats.appendChild(rankedWL)
        leagueRankStats.appendChild(rankedWinRatio)
    }
    leagueRankStats.appendChild(lastSeasonRank)

    return leagueElement
};

function buildPlayerStatElement(playerStatData) {
    var playerStatElement = document.createElement('div')
    var playerStatType = document.createElement('p')
    playerStatType.id = 'playerStatType'
    playerStatType.innerHTML = playerStatData.playerStatType
    var winPercentage = document.createElement('img')
    winPercentage.id = 'winPercentage'
    winPercentage.src = 'img/assets/percent' + playerStatData.winPercentage + '.png'
    var recentGamesStats = document.createElement('div')
    recentGamesStats.id = 'recentGamesStats'
    var kdaLong = document.createElement('p')
    kdaLong.id = 'kdaLong'
    kdaLong.innerHTML = playerStatData.kdaLong
    var kdaShort = document.createElement('p')
    kdaShort.id = 'kdaShort'
    kdaShort.innerHTML = playerStatData.kdaShort
    var averageWardsPlaced = document.createElement('p')
    averageWardsPlaced.id = 'averageWardsPlaced'
    averageWardsPlaced.innerHTML = playerStatData.averageWardsPlaced

    playerStatElement.appendChild(playerStatType)
    playerStatElement.appendChild(winPercentage)
    playerStatElement.appendChild(recentGamesStats)
    recentGamesStats.appendChild(kdaLong)
    recentGamesStats.appendChild(kdaShort)
    recentGamesStats.appendChild(averageWardsPlaced)

    return playerStatElement
};

function buildRankedStatElement(rankedStatData) {
    var rankedStatElement = document.createElement('div')
    rankedStatElement.id = 'rankedStatElement'
    var rankedStatType = document.createElement('p')
    rankedStatType.id = 'rankedStatType'
    rankedStatType.innerHTML = rankedStatData.rankedStatType
    var mostPlayedChamps = document.createElement('div')
    mostPlayedChamps.id = 'mostPlayedChamps'
    for (champ in rankedStatData.mostPlayedChampions) {
        var currentChamp = rankedStatData.mostPlayedChampions[champ]
        var mostPlayedChamp = document.createElement('div')
        mostPlayedChamp.id = 'mostPlayedChamp'
        var champPic = document.createElement('img')
        champPic.src = 'img/resources/champions/' + currentChamp.championId + '.png'
        var championName = document.createElement('p')
        championName.id = 'championName'
        championName.innerHTML = currentChamp.championName
        var champWL = document.createElement('p')
        champWL.id = 'champWL'
        champWL.innerHTML = currentChamp.winloss
        var champKDA = document.createElement('p')
        champKDA.id = 'champKDA'
        champKDA.innerHTML = currentChamp.kda

        mostPlayedChamp.appendChild(champPic)
        mostPlayedChamp.appendChild(championName)
        mostPlayedChamp.appendChild(champWL)
        mostPlayedChamp.appendChild(champKDA)
        mostPlayedChamps.appendChild(mostPlayedChamp)
    }

    rankedStatElement.appendChild(rankedStatType)
    rankedStatElement.appendChild(mostPlayedChamps)

    return rankedStatElement
};

function buildMatchDetailBarElement(matchDetailData) {
    var matchDetailBarElement = document.createElement('div')
    matchDetailBarElement.id = 'matchDetailBar'
    var matchResult = document.createElement('div')
    matchResult.id = 'matchResult'
    var matchDate = document.createElement('div')
    matchDate.id = 'matchDate'
    matchDate.innerHTML = matchDetailData.matchDate
    var matchGameType = document.createElement('div')
    matchGameType.id = 'matchGameType'
    matchGameType.innerHTML = matchDetailData.matchGameType
    var matchDuration = document.createElement('div')
    matchDuration.id = 'matchDuration'
    matchDuration.innerHTML = matchDetailData.matchDuration

    matchDetailBarElement.appendChild(matchResult)
    matchDetailBarElement.appendChild(matchDate)
    matchDetailBarElement.appendChild(matchGameType)
    matchDetailBarElement.appendChild(matchDuration)

    return matchDetailBarElement
};

function buildMatchDetailSelectionElement(matchDetailData) {
    var selectedSummoner = getSelectedSummoner(matchDetailData.gameId)

    $('#matchResult').html(selectedSummoner.win ? 'Victory' : 'Defeat')
    $('#matchResult').css('color', selectedSummoner.win ? '#22A8CE' : '#B2281D')

    var matchDetailSelectionElement = document.createElement('div')
    matchDetailSelectionElement.id = 'matchDetailSelection'
    $(matchDetailSelectionElement).addClass('matchDetailSelection' + selectedSummoner.championId)
    $(matchDetailSelectionElement).css('background-image', 'url("img/resources/splashes/' + selectedSummoner.championId + '.jpg")')
    // $(matchDetailSelectionElement).css('background-image', 'url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + selectedSummoner.championName + '_0.jpg")')
    var itemList = document.createElement('ul')
    itemList.id = 'itemList'
    for (var i = 0; i < selectedSummoner.items.length; i++) {
        var item = document.createElement('li')
        item.id = 'item'
        var itemImage = document.createElement('img')
        itemImage.src = 'img/resources/items/' + selectedSummoner.items[i] + '.png'
        item.appendChild(itemImage)
        itemList.appendChild(item)
    }
    var trinket = document.createElement('li')
    trinket.id = 'trinket'
    var trinketImage = document.createElement('img')
    trinketImage.src = 'img/resources/items/' + selectedSummoner.trinket + '.png'
    trinket.appendChild(trinketImage)
    itemList.appendChild(trinket)

    var stats = document.createElement('div')
    stats.id = 'stats'
    var kdaLong = document.createElement('p')
    kdaLong.id = 'kdaLong'
    kdaLong.innerHTML = selectedSummoner.kdaLong
    stats.appendChild(kdaLong)
    var kdaShort = document.createElement('p')
    kdaShort.id = 'kdaShort'
    kdaShort.innerHTML = selectedSummoner.kdaShort
    stats.appendChild(kdaShort)
    var level = document.createElement('p')
    level.id = 'level'
    level.innerHTML = selectedSummoner.level
    stats.appendChild(level)
    var cs = document.createElement('p')
    cs.id = 'cs'
    cs.innerHTML = selectedSummoner.cs
    stats.appendChild(cs)
    var gold = document.createElement('p')
    gold.id = 'gold'
    gold.innerHTML = selectedSummoner.gold
    stats.appendChild(gold)

    var spellList = document.createElement('div')
    spellList.id = 'spellList'
    var spell1 = document.createElement('img')
    spell1.id = 'spell1'
    spell1.src = 'img/resources/spells/' + selectedSummoner.spells[0] + '.png'
    spellList.appendChild(spell1)
    var spell2 = document.createElement('img')
    spell2.id = 'spell2'
    spell2.src = 'img/resources/spells/' + selectedSummoner.spells[1] + '.png'
    spellList.appendChild(spell2)

    var playerInfo = document.createElement('div')
    playerInfo.id = 'playerInfo'
    var summonerName = document.createElement('p')
    summonerName.id = 'summonerName'
    summonerName.innerHTML = selectedSummoner.summonerName ? selectedSummoner.summonerName + ' ' : 'Loading...'
    playerInfo.appendChild(summonerName)
    var rank = document.createElement('p')
    rank.id = 'rank'
    playerInfo.appendChild(rank)
    rank.innerHTML = selectedSummoner.rank ? selectedSummoner.rank : ''
    var championName = document.createElement('p')
    championName.id = 'championName'
    championName.innerHTML = selectedSummoner.championName
    playerInfo.appendChild(championName)

    var wrapPlayerInfo = document.createElement('a')
    wrapPlayerInfo.href = '#'
    wrapPlayerInfo.appendChild(playerInfo)

    var wrapBadgeList = document.createElement('div')
    wrapBadgeList.id = 'wrapBadgeList'
    var badgeList = document.createElement('div')
    badgeList.id = 'badgeList'

    for (var j = 0; j < selectedSummoner.badges.length; j++) {
        var badge = document.createElement('div')
        badge.id = 'badge'
        var badgeText = document.createElement('p')
        badgeText.id = 'badgeText'
        badgeText.innerHTML = selectedSummoner.badges[j].big
        var badgeColor = selectedSummoner.badges[j]['color']
        $(badgeText).css('border', '1px solid ' + badgeColor)
        $(badgeText).css('color', badgeColor)
        badge.appendChild(badgeText)
        badgeList.appendChild(badge)
    }

    wrapBadgeList.appendChild(badgeList)

    matchDetailSelectionElement.appendChild(itemList)
    matchDetailSelectionElement.appendChild(stats)
    matchDetailSelectionElement.appendChild(spellList)
    matchDetailSelectionElement.appendChild(wrapPlayerInfo)
    matchDetailSelectionElement.appendChild(wrapBadgeList)

    return matchDetailSelectionElement
};

function buildMatchDetailTeamElement(matchDetailData, teamNumber) {
    var selectedSummoner = getSelectedSummoner(matchDetailData.gameId)

    var matchDetailTeamXElement = document.createElement('div')
    matchDetailTeamXElement.id = 'matchDetailTeam' + teamNumber
    var matchDetailResult = document.createElement('div')
    matchDetailResult.id = 'matchDetailResult'
    var matchDetailResultText = document.createElement('p')
    var teamWin = matchDetailData['team' + teamNumber + 'Win']
    matchDetailResultText.innerHTML = teamWin ? 'Victory' : 'Defeat'
    matchDetailResult.appendChild(matchDetailResultText)
    var matchDetailTeam = document.createElement('div')
    matchDetailTeam.id = 'matchDetailTeam'
    $('#matchDetailTeam' + teamNumber + ' #matchDetailResult').css('background-color', teamWin ? '#38B171' : '#B2281D')

    for (var i = 0; i < matchDetailData.players.length / 2; i++) {
        var teamOffset = teamNumber == 1 ? i : i + (matchDetailData.players.length / 2)
        var currentSummoner = matchDetailData.players[teamOffset]
        var countMatchDetailSummoner = document.createElement('div')
        countMatchDetailSummoner.id = 'summoner' + currentSummoner.participantId
        var matchDetailSummoner = document.createElement('div')
        matchDetailSummoner.id = 'matchDetailSummoner'
        var matchDetailSummonerChampion = document.createElement('img')
        matchDetailSummonerChampion.id = 'matchDetailSummonerChampion'
        matchDetailSummonerChampion.src = 'img/resources/champions/' + currentSummoner.championId + '.png'
        $(matchDetailSummonerChampion).css('border', '2px solid ' + teamWin ? '#38B171' : '#B2281D')
        $(matchDetailSummoner).click({'participantId': currentSummoner.participantId, 'gameId': matchDetailData.gameId}, matchDetailSummonerClicked)
        setSelectedSummonerUI(matchDetailSummoner, currentSummoner, selectedSummoner)
        var summonerKda = document.createElement('div')
        summonerKda.id = 'summonerKda'
        summonerKda.innerHTML = currentSummoner.kdaLong
        var namerank = document.createElement('div')
        namerank.id = 'namerank'
        var summonerName = document.createElement('span')
        summonerName.id = 'summonerName'
        summonerName.innerHTML = currentSummoner.summonerName ? currentSummoner.summonerName + ' ' : 'Loading...'
        var rank = document.createElement('span')
        rank.id = 'rank'
        rank.innerHTML = currentSummoner.rank ? currentSummoner.rank : ''
        namerank.appendChild(summonerName)
        namerank.appendChild(rank)
        var itemList = document.createElement('ul')
        itemList.id = 'itemList'
        var trinket = document.createElement('li')
        trinket.id = 'trinket'
        var trinketImage = document.createElement('img')
        trinketImage.src = 'img/resources/items/' + currentSummoner.trinket + '.png'
        trinket.appendChild(trinketImage)
        itemList.appendChild(trinket)
        for (var j = 0; j < currentSummoner.items.length; j++) {
            var item = document.createElement('li')
            item.id = 'item'
            var itemImage = document.createElement('img')
            itemImage.src = 'img/resources/items/' + currentSummoner.items[j] + '.png'
            item.appendChild(itemImage)
            itemList.appendChild(item)
        }
        var spellList = document.createElement('div')
        spellList.id = 'spellList'
        var spell1 = document.createElement('img')
        spell1.id = 'spell1'
        spell1.src = 'img/resources/spells/' + currentSummoner.spells[0] + '.png'
        spellList.appendChild(spell1)
        var spell2 = document.createElement('img')
        spell2.id = 'spell2'
        spell2.src = 'img/resources/spells/' + currentSummoner.spells[1] + '.png'
        spellList.appendChild(spell2)

        var wrapBadgeList = document.createElement('div')
        wrapBadgeList.id = 'wrapBadgeList'
        var badgeList = document.createElement('div')
        badgeList.id = 'badgeList'

        for (var j = 0; j < currentSummoner.badges.length; j++) {
            var badge = document.createElement('div')
            badge.id = 'badge'
            var badgeText = document.createElement('p')
            badgeText.id = 'badgeText'
            badgeText.innerHTML = currentSummoner.badges[j].small
            var badgeColor = currentSummoner.badges[j]['color']
            $(badgeText).css('border', '1px solid ' + badgeColor)
            $(badgeText).css('color', badgeColor)
            badge.appendChild(badgeText)
            badgeList.appendChild(badge)
        }

        wrapBadgeList.appendChild(badgeList)

        matchDetailSummoner.appendChild(matchDetailSummonerChampion)
        matchDetailSummoner.appendChild(summonerKda)
        matchDetailSummoner.appendChild(namerank)
        matchDetailSummoner.appendChild(itemList)
        matchDetailSummoner.appendChild(spellList)
        matchDetailSummoner.appendChild(wrapBadgeList)

        var wrapMatchDetailsSummonerElement = document.createElement('a')
        wrapMatchDetailsSummonerElement.href = '#'
        wrapMatchDetailsSummonerElement.appendChild(matchDetailSummoner)
        countMatchDetailSummoner.appendChild(wrapMatchDetailsSummonerElement)
        matchDetailTeam.appendChild(countMatchDetailSummoner)
    }

    matchDetailTeamXElement.appendChild(matchDetailResult)
    matchDetailTeamXElement.appendChild(matchDetailTeam)

    return matchDetailTeamXElement
};
