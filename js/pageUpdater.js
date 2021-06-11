/* PAGE UPDATER */
function updateLeaguePage(leagueData) {
    refreshOwlList($('#leagueStatsList'), 'leagueStatsList', $('.leagueStats'))

    for (var league in leagueData.data)
        $('.leagueStats #leagueStatsList').append(buildLeagueElement(leagueData.data[league]))

    loadOwlCarousel('leagueStats', 'leagueStatsList', {'items': 1})
    setOwlVisibility('leagueStats', 'leagueStatsList', 1)
};

function updateRecentGamesPage(gamesData) {
    // Refresh lists using Owl
    refreshOwlList($('#recentGamesList'), 'recentGamesList', $('.recentGames'))
    
    // Recent games section
    for (var game in gamesData.data)
        $('.recentGames #recentGamesList').append(buildRecentGameElement(gamesData.data[game], game))

    if (isFirefox && OSName == 'Windows') {
        $('.recentGames #recentGamesList #recentGameKDA').css('top', '-30px')
        $('.recentGames #recentGamesList #recentGameResult').css('top', '-35px')
    }

    loadOwlCarousel('recentGames', 'recentGamesList', {'items': 10})
    setOwlVisibility('recentGames', 'recentGamesList', 1)
};

function updateStatisticsPage(statsData) {
    refreshOwlList($('#playerStatsList'), 'playerStatsList', $('.playerStats'))
    refreshOwlList($('#championStatsList'), 'championStatsList', $('.championStats'))

    // Player stats section
    $('.playerStats #playerStatsList').append(buildPlayerStatElement(statsData.playerStats))

    // Champs stats section
    $('.championStats #championStatsList').append(buildMostPlayedChampsStatElement(statsData.mostPlayedChamps))
    $('.championStats #championStatsList').append(buildTopChampsStatElement(statsData.topChamps))

    loadOwlCarousel('championStats', 'championStatsList', {'items': 1})
    setOwlVisibility('championStats', 'championStatsList', 1)

    showPage('summonerPage')
    showPage('statsPage')
    hidePage('loader')

    initCurrentGamePage()
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
