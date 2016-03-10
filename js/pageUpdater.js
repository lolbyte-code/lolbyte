/* PAGE UPDATER */
function updateMostPlayedChampsSection(rankedData) {
    refreshOwlList($('#rankedStatsList'), 'rankedStatsList', $('.rankedStats'))

    for (var rankedStat in rankedData.rankedStats) {
        $('.rankedStats #rankedStatsList').append(buildRankedStatElement(rankedData.rankedStats[rankedStat]))
    }

    loadOwlCarousel('rankedStats', 'rankedStatsList', {'items': 1, 'margin': 0})
    setOwlVisibility('rankedStats', 'rankedStatsList', 1)
};

function updateLeaguePage(leagueData) {
    refreshOwlList($('#leagueStatsList'), 'leagueStatsList', $('.leagueStats'))

    for (var league in leagueData.leagueStats)
        $('.leagueStats #leagueStatsList').append(buildLeagueElement(leagueData.leagueStats[league]))

    loadOwlCarousel('leagueStats', 'leagueStatsList', {'items': 1, 'margin': 0})
    setOwlVisibility('leagueStats', 'leagueStatsList', 1)
};

function updateCurrentGamePage(currentGameData) {
    // Build current game page
    $('.currentGamePage').html(buildCurrentGameElement(currentGameData))
    $('#inGameButton').show()
};

function updateMatchDetailSelection(gameId) {
    // Update match detail selection info
    var selectedSummoner = getSelectedSummoner(gameId)
    $('#playerInfo #summonerName').html(selectedSummoner.summonerName)
    $('#playerInfo #rank').html(selectedSummoner.rank)
    $('#matchDetailSelection #playerInfo').click({'summonerName': selectedSummoner.summonerName}, matchDetailSummonerPlayerInfoClicked)
};

function updateMatchDetailTeam(gameId) {
    // Update match detail team info
    var recentGame = getMatchData(gameId)
    for (var i = 0; i < recentGame.players.length; i++) {
        var currentPlayer = recentGame.players[i]
        $('#matchDetailTeam #summoner' + currentPlayer.participantId + ' a #matchDetailSummoner #namerank #summonerName').html(currentPlayer.summonerName + ' ')
        $('#matchDetailTeam #summoner' + currentPlayer.participantId + ' a #matchDetailSummoner #namerank #rank').html(currentPlayer.rank)
    }
};
