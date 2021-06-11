/*** PAGE BUILDERS ***/
function buildLandingPage(pageData) {
    // Set region to region of last searched summoner
    $('#regionSelector').val(getLatestRegion())

    // Refresh lists using Owl
    refreshOwlList($('.recentSummoners #summonerList'), 'summonerList', $('.recentSummoners'))
    refreshOwlList($('.favoriteSummoners #summonerList'), 'summonerList', $('.favoriteSummoners'))

    for (var summoner in pageData.favoriteSummoners)
        $('.favoriteSummoners #summonerList').append(buildSummonerElement(pageData.favoriteSummoners[summoner]))
    for (var summoner in pageData.recentSummoners)
        $('.recentSummoners #summonerList').append(buildSummonerElement(pageData.recentSummoners[summoner]))
};

function buildSummonerPage(pageData) {
    // Top summoner information
    $('.summonerBar #summonerName').html(pageData.name)
    $('.summonerBar #summonerName').click(function() { headerSummonerNameClicked() })
    $('.summonerBar #summonerLevel').html('Level ' + pageData.level)

    // Hide in-game button if summoner isn't in game
    !pageData.inGame ? $('#inGameButton').hide():''

    // Determine if viewing a favorite summoner
    if (getSummoner(pageData.id, 'favoriteSummoners')) {
        $('.summonerBar #summonerFavoriteButton').attr('src', 'img/assets/favoriteButton.png')
    } else {
        $('.summonerBar #summonerFavoriteButton').attr('src', 'img/assets/favoriteButtonOff.png')
    }
};

function buildSummonerNotFoundPage() {
    // Determine if viewing a favorite summoner
    if (getSummoner(SEARCH_SUMMONER_QUEUE[CURRENT_SUMMONER].summonerId, 'favoriteSummoners')) {
        $('.summonerNotFoundPage #summonerFavoriteButton2').attr('src', 'img/assets/favoriteButton.png')
    } else {
        $('.summonerNotFoundPage #summonerFavoriteButton2').attr('src', 'img/assets/favoriteButtonOff.png')
    }
};

function buildStatsPage() {
    // Recent games section
    initRecentGamesPage()

    // League stats section
    initLeaguePage()

    // Player stats section
    initStatsPage()
};

function buildMatchDetailsPage(pageData) {
    // Top section of match details
    $('.matchDetailPage').html(buildMatchDetailBarElement(pageData))
    $('.matchDetailPage').append(buildMatchDetailSelectionElement(pageData))
    // Team details section of match details
    $('.matchDetailPage').append(buildMatchDetailTeamElement(pageData, 1))
    $('.matchDetailPage').append(buildMatchDetailTeamElement(pageData, 2))

    // Loading order means I can't find these elements until
    // they are initially rendered
    var team1Win = pageData.blueTeam.win
    var team2Win = pageData.redTeam.win
    $('#matchDetailTeam1 #matchDetailResult').css('background-color', team1Win ? '#22A8CE' : '#B2281D')
    $('#matchDetailTeam2 #matchDetailResult').css('background-color', team2Win ? '#22A8CE' : '#B2281D')

    if (OSName == 'Windows') {
        $('#matchDetailSummoner #spellList').css('top', '-87px')
        $('#matchDetailSelection #playerInfo').css('top', '-5px')
        $('#matchDetailSummoner #badgeText').css('line-height', '1')
    }

    if (isFirefox && OSName == 'Windows') {
        $('#matchDetailSummoner #spellList').css('top', '-90px')
        $('#matchDetailSummoner #namerank').css('top', '-42px')
    }
};
