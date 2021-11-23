/* ELEMENT BUILDERS */
function buildSummonerElement(summonerData) {
    var summonerElement = document.createElement('div')
    summonerElement.id = 'summonerOrb'
    $(summonerElement).click(function(){ summonerOrbClicked(summonerData.summonerName, summonerData.region) })
    var summonerIcon = document.createElement('img')
    summonerIcon.src = CDRAGON_BASE_URL + 'profile-icon/' + summonerData.summonerIcon
    var summonerName = document.createElement('p')
    summonerName.id = 'summonerName'
    $(summonerName).text(summonerData.summonerName)
    var summonerRegion = document.createElement('p')
    summonerRegion.id = 'summonerRegion'
    $(summonerRegion).text(summonerData.region)

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
    $(gameType).text(currentGameData.queueName)
    var wrapGameType = document.createElement('div')
    wrapGameType.id = 'wrapGameType'
    wrapGameType.appendChild(gameType)
    currentGameElement.appendChild(wrapGameType)
    for (var i = 0; i < currentGameData.summoners.length; i++) {
        var currentSummoner = currentGameData.summoners[i]
        if (i == currentGameData.summoners.length / 2) {
            var versusText = document.createElement('p')
            versusText.id = 'versusText'
            $(versusText).text('vs')
            currentGameElement.appendChild(versusText)
        }

        var currentGameSummoner = document.createElement('div')
        currentGameSummoner.id = 'currentGameSummoner'
        $(currentGameSummoner).click({summonerName: currentSummoner.name}, currentGameSummonerClicked)
        var champion = document.createElement('img')
        champion.src = CDRAGON_BASE_URL + 'champion/' + currentSummoner.champId + '/square'
        var summonerName = document.createElement('p')
        summonerName.id = 'summonerName'
        $(summonerName).text(currentSummoner.name)
        var rank = document.createElement('p')
        rank.id = 'rank'
        $(rank).text(currentSummoner.rank)

        $(currentGameSummoner).addClass('currentGameSummonerTeam' + currentSummoner.teamId)
        currentSummoner.selected ?  $(currentGameSummoner).addClass('selectedCurrentGameSummonerTeam' + currentSummoner.teamId):''

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
    $(recentGameElement).attr('class', 'matchId' + gameData.id)
    $(recentGameElement).click({'matchId': gameData.id, 'championId': gameData.champId, 'teamId': gameData.teamId}, recentGameClicked)
    var champion = document.createElement('img')
    champion.src = CDRAGON_BASE_URL + 'champion/' + gameData.champId + '/square'
    recentGameElement.appendChild(champion)
    champion.style = gameData.win ? 'border: 2px solid #22A8CE;' : 'border: 2px solid #B2281D;'
    var gameResult = document.createElement('p')
    gameResult.id = 'recentGameResult'
    $(gameResult).text(gameData.win ? 'W' : 'L')
    var gameKDA = document.createElement('p')
    gameKDA.id = 'recentGameKDA'
    $(gameKDA).text(`${gameData.kills}/${gameData.deaths}/${gameData.assists}`)
    recentGameElement.appendChild(gameResult)
    recentGameElement.appendChild(gameKDA)
    var wrapRecentGameElement = document.createElement('a')
    wrapRecentGameElement.href = '#'
    wrapRecentGameElement.id = gameData.win ? 1 : 0
    wrapRecentGameElement.className = 'recentGame' + gameNumber
    wrapRecentGameElement.appendChild(recentGameElement)

    return wrapRecentGameElement
};

function buildLeagueElement(leagueData) {
    var leagueElement = document.createElement('div')
    var rankBadge = document.createElement('img')
    rankBadge.id =  leagueData.tier + 'RankBadge'
    rankBadge.src = 'img/ranks/' + leagueData.tier + '.png'
    var leagueRankStats = document.createElement('div')
    leagueRankStats.id = 'leagueRankStats'

    var rankQueueType = document.createElement('p')
    rankQueueType.id = 'rankQueueType'
    $(rankQueueType).text(leagueData.queueName)
    var rank = document.createElement('p')
    rank.id = 'rank'
    $(rank).text(leagueData.rank)
    var leagueProgress = document.createElement('p')
    leagueProgress.id = 'leagueProgress'
    $(leagueProgress).text(leagueData.series === '' ? `${leagueData.lp} points` : `In Series: ${leagueData.series}`)
    var leagueName = document.createElement('p')
    leagueName.id = 'leagueName'
    $(leagueName).text(leagueData.leagueName)
    var calcMMR = document.createElement('p')
    calcMMR.id = 'calcMMR'
    $(calcMMR).text(`LolByte Score: ${leagueData.score}`)
    var rankedWL = document.createElement('p')
    rankedWL.id = 'rankedWL'
    $(rankedWL).text(`${leagueData.wins} wins`)

    leagueElement.appendChild(rankQueueType)
    leagueElement.appendChild(rankBadge)
    leagueElement.appendChild(leagueRankStats)
    leagueRankStats.appendChild(rank)
    if (leagueData.tier != 'unranked') {
        leagueRankStats.appendChild(leagueProgress)
        leagueRankStats.appendChild(leagueName)
        leagueRankStats.appendChild(calcMMR)
        leagueRankStats.appendChild(rankedWL)
    }

    return leagueElement
};

function buildPlayerStatElement(playerStatData) {
    var playerStatElement = document.createElement('div')
    var playerStatType = document.createElement('p')
    playerStatType.id = 'playerStatType'
    $(playerStatType).text(`Last ${playerStatData.games} Games`)
    var winPercentage = document.createElement('img')
    winPercentage.id = 'winPercentage'
    winPercentage.src = 'img/assets/' + playerStatData.winPercentage + '.svg'
    var recentGamesStats = document.createElement('div')
    recentGamesStats.id = 'recentGamesStats'
    var kdaLong = document.createElement('p')
    kdaLong.id = 'kdaLong'
    $(kdaLong).text(`${playerStatData.kills.toFixed(1)}/${playerStatData.deaths.toFixed(1)}/${playerStatData.assists.toFixed(1)}`)
    var kdaShort = document.createElement('p')
    kdaShort.id = 'kdaShort'
    $(kdaShort).text(`${(
        (playerStatData.kills + playerStatData.assists) /
        Math.max(playerStatData.deaths, 1)
      ).toFixed(2)} KDA`)
    var averageWardsPlaced = document.createElement('p')
    averageWardsPlaced.id = 'averageWardsPlaced'
    $(averageWardsPlaced).text(`${playerStatData.wards} Wards Placed`)

    playerStatElement.appendChild(playerStatType)
    playerStatElement.appendChild(winPercentage)
    playerStatElement.appendChild(recentGamesStats)
    recentGamesStats.appendChild(kdaLong)
    recentGamesStats.appendChild(kdaShort)
    recentGamesStats.appendChild(averageWardsPlaced)

    return playerStatElement
};

function buildMostPlayedChampsStatElement(championStatData) {
    var championStatElement = document.createElement('div')
    championStatElement.id = 'championStatElement'
    var championStatType = document.createElement('p')
    championStatType.id = 'championStatType'
    $(championStatType).text("Most Played (Recent)")

    var mostPlayedChampions = document.createElement('div')
    mostPlayedChampions.id = 'mostPlayedChampions'
    for (champion in championStatData.champs) {
        var currentChampion = championStatData.champs[champion]
        var mostPlayedChampion = document.createElement('div')
        mostPlayedChampion.id = 'mostPlayedChampion'
        var championImage = document.createElement('img')
        championImage.src = CDRAGON_BASE_URL + 'champion/' + currentChampion.id + '/square'
        $(championImage).css('border', '3px solid white')
        var championName = document.createElement('p')
        championName.id = 'championName'
        $(championName).text(currentChampion.name)
        var championWinLossPercentage = document.createElement('p')
        championWinLossPercentage.id = 'championWinLossPercentage'
        $(championWinLossPercentage).text(`Games Played: ${currentChampion.gamesPlayed}`)
        mostPlayedChampion.appendChild(championImage)
        mostPlayedChampion.appendChild(championName)
        mostPlayedChampion.appendChild(championWinLossPercentage)
        mostPlayedChampions.appendChild(mostPlayedChampion)
    }

    championStatElement.appendChild(championStatType)
    championStatElement.appendChild(mostPlayedChampions)
    return championStatElement
};

function buildTopChampsStatElement(championStatData) {
    var championStatElement = document.createElement('div')
    championStatElement.id = 'championStatElement'
    var championStatType = document.createElement('p')
    championStatType.id = 'championStatType'
    $(championStatType).text("Top Champions (Mastery)")
    
    var topChampions = document.createElement('div')
    topChampions.id = 'topChampions'
    for (champion in championStatData.champs) {
        var currentChampion = championStatData.champs[champion]
        var topChampion = document.createElement('div')
        topChampion.id = 'topChampion'
        var championImage = document.createElement('img')
        championImage.src = CDRAGON_BASE_URL + 'champion/' + currentChampion.id + '/square'
        masteryBorder = currentChampion.level === 7
            ? '#214076'
            : currentChampion.level === 6
            ? '#623474'
            : currentChampion.level === 5
            ? '#6B2120'
            : '#6E5630'
        $(championImage).css('border', '3px solid ' + masteryBorder)
        var championName = document.createElement('p')
        championName.id = 'championName'
        $(championName).text(currentChampion.name)
        var championLevel = document.createElement('p')
        championLevel.id = 'championLevel'
        $(championLevel).text(`Level: ${currentChampion.level}`)
        var championPoints = document.createElement('p')
        championPoints.id = 'championPoints'
        $(championPoints).text(`Points: ${currentChampion.points}`)

        topChampion.appendChild(championImage)
        topChampion.appendChild(championName)
        topChampion.appendChild(championLevel)
        topChampion.appendChild(championPoints)
        topChampions.appendChild(topChampion)
    }

    championStatElement.appendChild(championStatType)
    championStatElement.appendChild(topChampions)
    return championStatElement
};

function buildMatchDetailBarElement(matchDetailData) {
    var matchDetailBarElement = document.createElement('div')
    matchDetailBarElement.id = 'matchDetailBar'
    var matchResult = document.createElement('div')
    matchResult.id = 'matchResult'
    var matchDate = document.createElement('div')
    matchDate.id = 'matchDate'
    $(matchDate).text(formatTimestamp(matchDetailData.timestamp))
    var matchGameType = document.createElement('div')
    matchGameType.id = 'matchGameType'
    $(matchGameType).text(matchDetailData.queueName)
    var matchDuration = document.createElement('div')
    matchDuration.id = 'matchDuration'
    $(matchDuration).text(matchDetailData.duration + " min")

    matchDetailBarElement.appendChild(matchResult)
    matchDetailBarElement.appendChild(matchDate)
    matchDetailBarElement.appendChild(matchGameType)
    matchDetailBarElement.appendChild(matchDuration)

    return matchDetailBarElement
};

function buildMatchDetailSelectionElement(matchDetailData) {
    var selectedSummoner = getSelectedSummoner(matchDetailData.id)
    $('#matchResult').text(selectedSummoner.win ? 'Victory' : 'Defeat')
    $('#matchResult').css('color', selectedSummoner.win ? '#22A8CE' : '#B2281D')
    var matchDetailSelectionElement = document.createElement('div')
    matchDetailSelectionElement.id = 'matchDetailSelection'
    $(matchDetailSelectionElement).addClass('matchDetailSelection' + selectedSummoner.champId)
    $(matchDetailSelectionElement).css('background-image', 'url("' + CDRAGON_BASE_URL + 'champion/' + selectedSummoner.champId + '/splash-art")')
    var itemList = document.createElement('ul')
    itemList.id = 'itemList'
    for (var i = 0; i < selectedSummoner.items.length; i++) {
        var item = document.createElement('li')
        item.id = 'item'
        if (selectedSummoner.items[i]['id']) {
            $(item).qtip({
                content: {
                    title: selectedSummoner.items[i]['name'],
                    text: selectedSummoner.items[i]['desc']
                },
                style: { classes: 'qtip-dark qtip-rounded qtip-shadow' },
                position: { viewport: $('.lolbyte') }
            });
        }
        var itemImage = document.createElement('img')
        itemImage.src = DDRAGON_BASE_URL + 'img/item/' + selectedSummoner.items[i]['id'] + '.png'
        item.appendChild(itemImage)
        itemList.appendChild(item)
    }
    var trinket = document.createElement('li')
    trinket.id = 'trinket'
    var trinketImage = document.createElement('img')
    trinketImage.src = DDRAGON_BASE_URL + 'img/item/' + selectedSummoner.trinket + '.png'
    trinket.appendChild(trinketImage)
    itemList.appendChild(trinket)

    var stats1 = document.createElement('div')
    stats1.id = 'stats1'
    var stats2 = document.createElement('div')
    stats2.id = 'stats2'
    var kdaLong = document.createElement('p')
    kdaLong.id = 'kdaLong'
    $(kdaLong).text(`${selectedSummoner.kills}/${selectedSummoner.deaths}/${selectedSummoner.assists}`)
    stats1.appendChild(kdaLong)
    var damageContribution = document.createElement('p')
    damageContribution.id = 'damageContribution'
    $(damageContribution).text("Dmg Cont: " + selectedSummoner.damageContribution + "%")
    stats1.appendChild(damageContribution)
    var level = document.createElement('p')
    level.id = 'level'
    $(level).text("Level " + selectedSummoner.level)
    stats1.appendChild(level)
    var cs = document.createElement('p')
    cs.id = 'cs'
    $(cs).text(selectedSummoner.cs + " CS, ")
    stats2.appendChild(cs)
    var gold = document.createElement('p')
    gold.id = 'gold'
    $(gold).text((selectedSummoner.gold / 1000).toFixed(1) + "k Gold, ")
    stats2.appendChild(gold)
    var kp = document.createElement('p')
    kp.id = 'kp'
    $(kp).text("Kill Participation: " + selectedSummoner.killParticipation + "%")
    stats2.appendChild(kp)

    var spellList = document.createElement('div')
    spellList.id = 'spellList'
    var spell1 = document.createElement('img')
    spell1.id = 'spell1'
    spell1.src = getSpellIcon(selectedSummoner.spells[0])
    spellList.appendChild(spell1)
    var spell2 = document.createElement('img')
    spell2.id = 'spell2'
    spell2.src = getSpellIcon(selectedSummoner.spells[1])
    spellList.appendChild(spell2)

    var playerInfo = document.createElement('div')
    playerInfo.id = 'playerInfo'
    var summonerName = document.createElement('p')
    summonerName.id = 'summonerName'
    $(summonerName).text(selectedSummoner.name ? selectedSummoner.name + ' ' : 'Loading...')
    playerInfo.appendChild(summonerName)
    var rank = document.createElement('p')
    rank.id = 'rank'
    playerInfo.appendChild(rank)
    $(rank).text(selectedSummoner.rank ? selectedSummoner.rank : '')
    var championName = document.createElement('p')
    championName.id = 'championName'
    $(championName).text(selectedSummoner.champName)
    playerInfo.appendChild(championName)

    var wrapPlayerInfo = document.createElement('a')
    wrapPlayerInfo.href = '#'
    wrapPlayerInfo.appendChild(playerInfo)

    var wrapBadgeList = document.createElement('div')
    wrapBadgeList.id = 'wrapBadgeList'
    var badgeList = document.createElement('div')
    badgeList.id = 'badgeList'

    for (var j = 0; j < selectedSummoner.badges.length; j++) {
        var badgeMetadata = getBadge(selectedSummoner.badges[j])
        var badge = document.createElement('div')
        badge.id = 'badge'
        var badgeText = document.createElement('p')
        badgeText.id = 'badgeText'
        $(badgeText).text(badgeMetadata.big)
        var badgeColor = badgeMetadata.color
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
    var selectedSummoner = getSelectedSummoner(matchDetailData.id)
    var targetTeam = matchDetailData[teamNumber == 1 ? "blueTeam" : "redTeam"]

    var matchDetailTeamXElement = document.createElement('div')
    matchDetailTeamXElement.id = 'matchDetailTeam' + teamNumber
    var matchDetailResult = document.createElement('div')
    matchDetailResult.id = 'matchDetailResult'
    var matchDetailResultText = document.createElement('p')
    var teamWin = targetTeam.win
    $(matchDetailResultText).text(teamWin ? 'Victory  ' : 'Defeat  ')
    matchDetailResult.appendChild(matchDetailResultText)

    var towerKills = document.createElement('div')
    towerKills.id = 'towerKills'
    var towerKillIcon = document.createElement('img')
    towerKillIcon.id = 'towerKillIcon'
    towerKillIcon.src = 'img/assets/tower.png'
    towerKills.appendChild(towerKillIcon)
    var towerKillCount = document.createElement('p')
    towerKillCount.id = 'towerKillCount'
    $(towerKillCount).text(targetTeam.towers)
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
    $(dragonKillCount).text(targetTeam.dragons)
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
    $(baronKillCount).text(targetTeam.barons)
    baronKills.appendChild(baronKillCount)
    $(matchDetailResult).append(baronKills)

    var bans = document.createElement('div')
    bans.id = 'bans'
    for (var i = 0; i < targetTeam.bans.length; i++) {
        var bansIcon = document.createElement('img')
        var bannedChampId = targetTeam.bans[i]
        if (bannedChampId == -1) {
            continue
        }
        bansIcon.src = CDRAGON_BASE_URL + 'champion/' + bannedChampId + '/square'
        bansIcon.title = 'Ban ' + (i + 1)
        bans.appendChild(bansIcon)
    }
    $(matchDetailResult).append(bans)

    var teamKda = document.createElement('p')
    teamKda.id = 'teamKda'
    $(teamKda).text(`${targetTeam.kills}/${targetTeam.deaths}/${targetTeam.assists}`)
    $(matchDetailResult).append(teamKda)

    var teamGold = document.createElement('p')
    teamGold.id = 'teamGold'
    $(teamGold).text('$' + (targetTeam.gold / 1000).toFixed(1) + "k")
    $(matchDetailResult).append(teamGold)

    var matchDetailTeam = document.createElement('div')
    matchDetailTeam.id = 'matchDetailTeam'
    $('#matchDetailTeam' + teamNumber + ' #matchDetailResult').css('background-color', teamWin ? '#38B171' : '#B2281D')

    for (var i = 0; i < matchDetailData.players.length; i++) {
        if (matchDetailData.players[i].teamId == (teamNumber + '00')) {
            var currentSummoner = matchDetailData.players[i]
            var countMatchDetailSummoner = document.createElement('div')
            countMatchDetailSummoner.id = 'summoner' + currentSummoner.participantId
            var matchDetailSummoner = document.createElement('div')
            matchDetailSummoner.id = 'matchDetailSummoner'
            var matchDetailSummonerChampion = document.createElement('img')
            matchDetailSummonerChampion.id = 'matchDetailSummonerChampion'
            matchDetailSummonerChampion.src = CDRAGON_BASE_URL + 'champion/' + currentSummoner.champId + '/square'
            $(matchDetailSummoner).click({'participantId': currentSummoner.participantId, 'matchId': matchDetailData.id}, matchDetailSummonerClicked)
            $(matchDetailSummonerChampion).css('border', '2px solid ' + (teamWin ? '#22A8CE' : '#B2281D'))
            setSelectedSummonerUI(matchDetailSummoner, currentSummoner, selectedSummoner)
            var summonerKda = document.createElement('div')
            summonerKda.id = 'summonerKda'
            $(summonerKda).text(`${currentSummoner.kills}/${currentSummoner.deaths}/${currentSummoner.assists}`)
            var namerank = document.createElement('div')
            namerank.id = 'namerank'
            var summonerName = document.createElement('span')
            summonerName.id = 'summonerName'
            $(summonerName).text(currentSummoner.name ? currentSummoner.name + ' ' : 'Loading...')
            $(summonerName).css('color', (teamWin ? '#22A8CE' : '#B2281D'))
            var rank = document.createElement('span')
            rank.id = 'rank'
            $(rank).text(currentSummoner.rank ? currentSummoner.rank : '')
            namerank.appendChild(summonerName)
            namerank.appendChild(rank)
            var itemList = document.createElement('ul')
            itemList.id = 'itemList'
            var trinket = document.createElement('li')
            trinket.id = 'trinket'
            var trinketImage = document.createElement('img')
            trinketImage.src = DDRAGON_BASE_URL + 'img/item/' + currentSummoner.trinket + '.png'
            trinket.appendChild(trinketImage)
            itemList.appendChild(trinket)
            for (var j = 0; j < currentSummoner.items.length; j++) {
                var item = document.createElement('li')
                item.id = 'item'
                if (currentSummoner.items[j]['id']) {
                    $(item).qtip({
                        content: {
                            title: currentSummoner.items[j]['name'],
                            text: currentSummoner.items[j]['desc']
                        },
                        style: { classes: 'qtip-dark qtip-rounded qtip-shadow' },
                        position: { viewport: $('.lolbyte') }
                    });
                }
                var itemImage = document.createElement('img')
                itemImage.src = DDRAGON_BASE_URL + 'img/item/' + currentSummoner.items[j]['id'] + '.png'
                item.appendChild(itemImage)
                itemList.appendChild(item)
            }

            var spellList = document.createElement('div')
            spellList.id = 'spellList'
            var spell1 = document.createElement('img')
            spell1.id = 'spell1'
            spell1.src = getSpellIcon(currentSummoner.spells[0])
            spellList.appendChild(spell1)
            var spell2 = document.createElement('img')
            spell2.id = 'spell2'
            spell2.src = getSpellIcon(currentSummoner.spells[1])
            spellList.appendChild(spell2)

            var wrapBadgeList = document.createElement('div')
            wrapBadgeList.id = 'wrapBadgeList'
            var badgeList = document.createElement('div')
            badgeList.id = 'badgeList'

            for (var j = 0; j < currentSummoner.badges.length; j++) {
                var badgeMetadata = getBadge(currentSummoner.badges[j])
                var badge = document.createElement('div')
                badge.id = 'badge'
                var badgeText = document.createElement('p')
                badgeText.id = 'badgeText'
                $(badgeText).text(badgeMetadata.small)
                var badgeColor = badgeMetadata.color
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
    }

    matchDetailTeamXElement.appendChild(matchDetailResult)
    matchDetailTeamXElement.appendChild(matchDetailTeam)

    return matchDetailTeamXElement
};
