function updateMatchDetailSelectionElement(matchId) {
    var selectedSummoner = getSelectedSummoner(matchId)

    $('#matchResult').html(selectedSummoner.win ? 'Victory' : 'Defeat')
    $('#matchResult').css('color', selectedSummoner.win ? '#22A8CE' : '#B2281D')

    $('#matchDetailSelection').css('background-image', 'url("' + CDRAGON_BASE_URL + 'champion/' + selectedSummoner.champId + '/splash-art")')
    $('#matchDetailSelection').removeClass()
    $('#matchDetailSelection').addClass('matchDetailSelection' + selectedSummoner.champId)
    $('#matchDetailSelection #itemList').empty()
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
        $('#matchDetailSelection #itemList').append(item)
    }
    var trinket = document.createElement('li')
    trinket.id = 'trinket'
    var trinketImage = document.createElement('img')
    trinketImage.src = DDRAGON_BASE_URL + 'img/item/' + selectedSummoner.trinket + '.png'
    trinket.appendChild(trinketImage)
    $('#matchDetailSelection #itemList').append(trinket)

    $('#matchDetailSelection #stats1 #kdaLong').html(`${selectedSummoner.kills}/${selectedSummoner.deaths}/${selectedSummoner.assists}`)
    $('#matchDetailSelection #stats1 #damageContribution').html("Dmg Cont: " + selectedSummoner.damageContribution + "%")
    $('#matchDetailSelection #stats1 #level').html("Level " + selectedSummoner.level)
    $('#matchDetailSelection #stats2 #cs').html(selectedSummoner.cs + " CS, ")
    $('#matchDetailSelection #stats2 #gold').html((selectedSummoner.gold / 1000).toFixed(1) + "k Gold, ")
    $('#matchDetailSelection #stats2 #kp').html("Kill Participation: " + selectedSummoner.killParticipation + "%")
    $('#matchDetailSelection #spellList #spell1').attr('src', getSpellIcon(selectedSummoner.spells[0]))
    $('#matchDetailSelection #spellList #spell2').attr('src', getSpellIcon(selectedSummoner.spells[1]))
    $('#matchDetailSelection #playerInfo #summonerName').html(selectedSummoner.name)
    $('#matchDetailSelection #playerInfo #rank').html(selectedSummoner.rank)
    $('#matchDetailSelection #playerInfo #championName').html(selectedSummoner.champName)
    $('#matchDetailSelection #playerInfo').off('click')
    $('#matchDetailSelection #playerInfo').click({'summonerName': selectedSummoner.name}, matchDetailSummonerPlayerInfoClicked)

    $('#wrapBadgeList').empty()
    var badgeList = document.createElement('div')
    badgeList.id = 'badgeList'
    for (var j = 0; j < selectedSummoner.badges.length; j++) {
        var badgeMetadata = getBadge(selectedSummoner.badges[j])
        var badge = document.createElement('div')
        badge.id = 'badge'
        var badgeText = document.createElement('p')
        badgeText.id = 'badgeText'
        $(badgeText).html(badgeMetadata.big)
        var badgeColor = badgeMetadata.color
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
