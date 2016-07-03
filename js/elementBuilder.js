/* ELEMENT BUILDERS */
function buildSummonerElement(summonerData) {
    var summonerElement = document.createElement('div')
    summonerElement.id = 'summonerOrb'
    $(summonerElement).click(function(){ summonerOrbClicked(summonerData.summonerName, summonerData.region) })
    var summonerIcon = document.createElement('img')
    summonerIcon.src = 'http://ddragon.leagueoflegends.com/cdn/6.12.1/img/profileicon/' + summonerData.summonerIcon + '.png'
    var summonerName = document.createElement('p')
    summonerName.id = 'summonerName'
    $(summonerName).html(summonerData.summonerName)
    var summonerRegion = document.createElement('p')
    summonerRegion.id = 'summonerRegion'
    $(summonerRegion).html(summonerData.region)

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
    $(gameType).html(currentGameData.gameType)
    var wrapGameType = document.createElement('div')
    wrapGameType.id = 'wrapGameType'
    wrapGameType.appendChild(gameType)
    currentGameElement.appendChild(wrapGameType)
    for (var i = 0; i < currentGameData.summoners.length; i++) {
        var currentSummoner = currentGameData.summoners[i]
        if (i == currentGameData.summoners.length / 2) {
            var versusText = document.createElement('p')
            versusText.id = 'versusText'
            $(versusText).html('vs')
            currentGameElement.appendChild(versusText)
        }

        var currentGameSummoner = document.createElement('div')
        currentGameSummoner.id = 'currentGameSummoner'
        $(currentGameSummoner).click({summonerName: currentSummoner.summonerName}, currentGameSummonerClicked)
        var champion = document.createElement('img')
        champion.src = 'img/resources/champions/' + currentSummoner.championId + '.png'
        var summonerName = document.createElement('p')
        summonerName.id = 'summonerName'
        $(summonerName).html(currentSummoner.summonerName)
        var rank = document.createElement('p')
        rank.id = 'rank'
        $(rank).html(currentSummoner.rank)

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
    $(gameResult).html(gameData.win ? 'W' : 'L')
    var gameKDA = document.createElement('p')
    gameKDA.id = 'recentGameKDA'
    $(gameKDA).html(gameData.kda)

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
    $(rankQueueType).html(leagueData.rankQueueType)
    var rank = document.createElement('p')
    rank.id = 'rank'
    $(rank).html(leagueData.rank)
    var leaguePoints = document.createElement('p')
    leaguePoints.id = 'leaguePoints'
    $(leaguePoints).html(leagueData.leaguePoints)
    var leagueName = document.createElement('p')
    leagueName.id = 'leagueName'
    $(leagueName).html(leagueData.leagueName)
    var calcMMR = document.createElement('p')
    calcMMR.id = 'calcMMR'
    $(calcMMR).html(leagueData.mmr)
    var rankedWL = document.createElement('p')
    rankedWL.id = 'rankedWL'
    $(rankedWL).html(leagueData.rankedWL)
    var rankedWinRatio = document.createElement('p')
    rankedWinRatio.id = 'rankedWinRatio'
    $(rankedWinRatio).html(leagueData.rankedWinRatio)
    var lastSeasonRank = document.createElement('p')
    lastSeasonRank.id = 'lastSeasonRank'
    $(lastSeasonRank).html(leagueData.lastSeasonRank)

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
    $(playerStatType).html(playerStatData.playerStatType)
    var winPercentage = document.createElement('img')
    winPercentage.id = 'winPercentage'
    winPercentage.src = 'img/assets/percent' + playerStatData.winPercentage + '.png'
    var recentGamesStats = document.createElement('div')
    recentGamesStats.id = 'recentGamesStats'
    var kdaLong = document.createElement('p')
    kdaLong.id = 'kdaLong'
    $(kdaLong).html(playerStatData.kdaLong)
    var kdaShort = document.createElement('p')
    kdaShort.id = 'kdaShort'
    $(kdaShort).html(playerStatData.kdaShort)
    var averageWardsPlaced = document.createElement('p')
    averageWardsPlaced.id = 'averageWardsPlaced'
    $(averageWardsPlaced).html(playerStatData.averageWardsPlaced)

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
    $(rankedStatType).html(rankedStatData.rankedStatType)
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
        $(championName).html(currentChamp.championName)
        var champWL = document.createElement('p')
        champWL.id = 'champWL'
        $(champWL).html(currentChamp.winloss)
        var champKDA = document.createElement('p')
        champKDA.id = 'champKDA'
        $(champKDA).html(currentChamp.kda)

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
    $(matchDate).html(matchDetailData.matchDate)
    var matchGameType = document.createElement('div')
    matchGameType.id = 'matchGameType'
    $(matchGameType).html(matchDetailData.matchGameType)
    var matchDuration = document.createElement('div')
    matchDuration.id = 'matchDuration'
    $(matchDuration).html(matchDetailData.matchDuration)

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

    var stats1 = document.createElement('div')
    stats1.id = 'stats1'
    var stats2 = document.createElement('div')
    stats2.id = 'stats2'
    var kdaLong = document.createElement('p')
    kdaLong.id = 'kdaLong'
    $(kdaLong).html(selectedSummoner.kdaLong)
    stats1.appendChild(kdaLong)
    var kdaShort = document.createElement('p')
    kdaShort.id = 'kdaShort'
    $(kdaShort).html(selectedSummoner.kdaShort)
    stats1.appendChild(kdaShort)
    var level = document.createElement('p')
    level.id = 'level'
    $(level).html(selectedSummoner.level)
    stats1.appendChild(level)
    var cs = document.createElement('p')
    cs.id = 'cs'
    $(cs).html(selectedSummoner.cs)
    stats2.appendChild(cs)
    var gold = document.createElement('p')
    gold.id = 'gold'
    $(gold).html(selectedSummoner.gold)
    stats2.appendChild(gold)
    var kp = document.createElement('p')
    kp.id = 'kp'
    $(kp).html(selectedSummoner.killParticipation)
    stats2.appendChild(kp)

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
    $(summonerName).html(selectedSummoner.summonerName ? selectedSummoner.summonerName + ' ' : 'Loading...')
    playerInfo.appendChild(summonerName)
    var rank = document.createElement('p')
    rank.id = 'rank'
    playerInfo.appendChild(rank)
    $(rank).html(selectedSummoner.rank ? selectedSummoner.rank : '')
    var championName = document.createElement('p')
    championName.id = 'championName'
    $(championName).html(selectedSummoner.championName)
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
        $(badgeText).html(selectedSummoner.badges[j].big)
        var badgeColor = selectedSummoner.badges[j]['color']
        $(badgeText).css('border', '1px solid ' + badgeColor)
        $(badgeText).css('color', badgeColor)
        badge.appendChild(badgeText)
        badgeList.appendChild(badge)
    }

    wrapBadgeList.appendChild(badgeList)

    matchDetailSelectionElement.appendChild(itemList)
    matchDetailSelectionElement.appendChild(stats1)
    matchDetailSelectionElement.appendChild(stats2)
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
    $(matchDetailResultText).html(teamWin ? 'Victory  ' : 'Defeat  ')
    matchDetailResult.appendChild(matchDetailResultText)

    var towerKills = document.createElement('div')
    towerKills.id = 'towerKills'
    var towerKillIcon = document.createElement('img')
    towerKillIcon.id = 'towerKillIcon'
    towerKillIcon.src = 'img/assets/tower.png'
    towerKills.appendChild(towerKillIcon)
    var towerKillCount = document.createElement('p')
    towerKillCount.id = 'towerKillCount'
    $(towerKillCount).html(matchDetailData.teams[teamNumber - 1].towerKills)
    towerKills.appendChild(towerKillCount)
    $(matchDetailResult).append(towerKills)

    var dragonKills = document.createElement('div')
    dragonKills.id = 'dragonKills'
    var dragonKillIcon = document.createElement('img')
    dragonKillIcon.id = 'dragonKillIcon'
    dragonKillIcon.src = 'img/assets/dragon.png'
    dragonKills.appendChild(dragonKillIcon)
    var dragonKillCount = document.createElement('p')
    dragonKillCount.id = 'dragonKillCount'
    $(dragonKillCount).html(matchDetailData.teams[teamNumber - 1].dragonKills)
    dragonKills.appendChild(dragonKillCount)
    $(matchDetailResult).append(dragonKills)

    var baronKills = document.createElement('div')
    baronKills.id = 'baronKills'
    var baronKillIcon = document.createElement('img')
    baronKillIcon.id = 'baronKillIcon'
    baronKillIcon.src = 'img/assets/baron.png'
    baronKills.appendChild(baronKillIcon)
    var baronKillCount = document.createElement('p')
    baronKillCount.id = 'baronKillCount'
    $(baronKillCount).html(matchDetailData.teams[teamNumber - 1].baronKills)
    baronKills.appendChild(baronKillCount)
    $(matchDetailResult).append(baronKills)

    var teamKda = document.createElement('p')
    teamKda.id = 'teamKda'
    $(teamKda).html(matchDetailData.teams[teamNumber - 1].kda)
    $(matchDetailResult).append(teamKda)

    var teamGold = document.createElement('p')
    teamGold.id = 'teamGold'
    $(teamGold).html('$' + matchDetailData.teams[teamNumber - 1].gold)
    $(matchDetailResult).append(teamGold)

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
        $(matchDetailSummoner).click({'participantId': currentSummoner.participantId, 'gameId': matchDetailData.gameId}, matchDetailSummonerClicked)
        $(matchDetailSummonerChampion).css('border', '2px solid ' + (teamWin ? '#22A8CE' : '#B2281D'))
        setSelectedSummonerUI(matchDetailSummoner, currentSummoner, selectedSummoner)
        var summonerKda = document.createElement('div')
        summonerKda.id = 'summonerKda'
        $(summonerKda).html(currentSummoner.kdaLong)
        var namerank = document.createElement('div')
        namerank.id = 'namerank'
        var summonerName = document.createElement('span')
        summonerName.id = 'summonerName'
        $(summonerName).html(currentSummoner.summonerName ? currentSummoner.summonerName + ' ' : 'Loading...')
        $(summonerName).css('color', (teamWin ? '#22A8CE' : '#B2281D'))
        var rank = document.createElement('span')
        rank.id = 'rank'
        $(rank).html(currentSummoner.rank ? currentSummoner.rank : '')
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
            $(badgeText).html(currentSummoner.badges[j].small)
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
