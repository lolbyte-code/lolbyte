/* PAGE UPDATER */
function updateMostPlayedChampionsSection(rankedData) {
    refreshOwlList($('#championStatsList'), 'championStatsList', $('.championStats'))

    for (var championStat in rankedData) {
        $('.championStats #championStatsList').append(buildchampionStatElement(rankedData[championStat]))
    }

    loadOwlCarousel('championStats', 'championStatsList', {'items': 1})
    setOwlVisibility('championStats', 'championStatsList', 1)
};

function updateLeaguePage(leagueData) {
    refreshOwlList($('#leagueStatsList'), 'leagueStatsList', $('.leagueStats'))

    for (var league in leagueData)
        $('.leagueStats #leagueStatsList').append(buildLeagueElement(leagueData[league]))

    loadOwlCarousel('leagueStats', 'leagueStatsList', {'items': 1})
    setOwlVisibility('leagueStats', 'leagueStatsList', 1)
};

function updateCurrentGamePage(currentGameData) {
    // Build current game page
    $('.currentGamePage').html(buildCurrentGameElement(currentGameData))
    $('#inGameButton').show()
};

function updateMatchDetailSelection(matchId) {
    // Update match detail selection info
    var selectedSummoner = getSelectedSummoner(matchId)
    $('#playerInfo #summonerName').html(selectedSummoner.name)
    $('#playerInfo #rank').html(selectedSummoner.rank)
    $('#matchDetailSelection #playerInfo').off('click')
    $('#matchDetailSelection #playerInfo').click({'summonerName': selectedSummoner.name}, matchDetailSummonerPlayerInfoClicked)
};

function updateMatchDetailTeam(matchId) {
    // Update match detail team info
    var recentGame = getMatchData(matchId)
    for (var i = 0; i < recentGame.players.length; i++) {
        var currentPlayer = recentGame.players[i]
        $('#matchDetailTeam #summoner' + currentPlayer.participantId + ' a #matchDetailSummoner #namerank #summonerName').html(currentPlayer.summonerName + ' ')
        $('#matchDetailTeam #summoner' + currentPlayer.participantId + ' a #matchDetailSummoner #namerank #rank').html(currentPlayer.rank)
    }
};
