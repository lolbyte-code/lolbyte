function updateMatchDetailSelectionElement(matchId) {
    var selectedSummoner = getSelectedSummoner(matchId)

    $('#matchResult').html(selectedSummoner.win ? 'Victory' : 'Defeat')
    $('#matchResult').css('color', selectedSummoner.win ? '#22A8CE' : '#B2281D')

    $('#matchDetailSelection').css('background-image', 'url("' + CDRAGON_BASE_URL + 'champion/' + selectedSummoner.championId + '/splash-art")')
    $('#matchDetailSelection').removeClass()
    $('#matchDetailSelection').addClass('matchDetailSelection' + selectedSummoner.championId)
    $('#matchDetailSelection #itemList').empty()
    for (var i = 0; i < selectedSummoner.items.length; i++) {
        var item = document.createElement('li')
        item.id = 'item'
        if (selectedSummoner.items[i]['id']) {
            $(item).qtip({
                content: {
                    title: selectedSummoner.items[i]['name'],
                    text: selectedSummoner.items[i]['description']
                },
                style: { classes: 'qtip-dark qtip-rounded qtip-shadow' },
                position: { viewport: $('.lolbyte') }
            });
        }
        var itemImage = document.createElement('img')
        if (selectedSummoner.items[i]['id'] == 0) {
            itemImage.src = 'img/resources/items/0.png'
        } else {
            itemImage.src = DDRAGON_BASE_URL + 'img/item/' + selectedSummoner.items[i]['id'] + '.png'
        }
        item.appendChild(itemImage)
        $('#matchDetailSelection #itemList').append(item)
    }
    var trinket = document.createElement('li')
    trinket.id = 'trinket'
    var trinketImage = document.createElement('img')
    trinketImage.src = DDRAGON_BASE_URL + 'img/item/' + selectedSummoner.trinket + '.png'
    trinket.appendChild(trinketImage)
    $('#matchDetailSelection #itemList').append(trinket)

    $('#matchDetailSelection #stats1 #kdaLong').html(selectedSummoner.kdaLong)
    $('#matchDetailSelection #stats1 #damageContribution').html(selectedSummoner.damageContribution)
    $('#matchDetailSelection #stats1 #level').html(selectedSummoner.level)
    $('#matchDetailSelection #stats2 #cs').html(selectedSummoner.cs)
    $('#matchDetailSelection #stats2 #gold').html(selectedSummoner.gold)
    $('#matchDetailSelection #stats2 #kp').html(selectedSummoner.killParticipation)
    $('#matchDetailSelection #spellList #spell1').attr('src', 'img/resources/spells/' + selectedSummoner.spells[0] + '.png')
    $('#matchDetailSelection #spellList #spell2').attr('src', 'img/resources/spells/' + selectedSummoner.spells[1] + '.png')
    $('#matchDetailSelection #playerInfo #summonerName').html(selectedSummoner.summonerName)
    $('#matchDetailSelection #playerInfo #rank').html(selectedSummoner.rank)
    $('#matchDetailSelection #playerInfo #championName').html(selectedSummoner.championName)
    $('#matchDetailSelection #playerInfo').off('click')
    $('#matchDetailSelection #playerInfo').click({'summonerName': selectedSummoner.summonerName}, matchDetailSummonerPlayerInfoClicked)

    $('#wrapBadgeList').empty()
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

    $('#wrapBadgeList').append(badgeList)
};

function updateMatchDetailTeamElement(matchId) {
    var recentGame = getMatchData(matchId)
    var selectedSummoner = getSelectedSummoner(matchId)

    for (var i = 0; i < recentGame.players.length; i++) {
        var currentSummoner = recentGame.players[i]
        var matchDetailSummoner = $('#summoner' + currentSummoner.participantId + ' #matchDetailSummoner')
        setSelectedSummonerUI(matchDetailSummoner, currentSummoner, selectedSummoner)
    }
};
