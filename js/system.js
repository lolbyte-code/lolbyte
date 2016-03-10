/* Set specific UI settings for different OS/browsers */
var OSName
if (navigator.appVersion.indexOf('Mac')!=-1) OSName='Mac'
if (navigator.appVersion.indexOf('Linux')!=-1) OSName='Linux'
if (navigator.appVersion.indexOf('Win')!=-1) OSName='Windows'
var isFirefox = typeof InstallTrigger !== 'undefined'

if (OSName == 'Windows') {
    $('#searchSummoner').attr('size', 22)
    $('#searchButton').css('top', '-24px')
    $('#inGameButton p').css('top', '-7px')
}

if (OSName == 'Mac') {
    $('#searchSummoner').attr('size', 25)
}
