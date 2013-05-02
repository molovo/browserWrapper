/***********************************

    browserWrapper jQuery Plugin
    Developed by James Dinsdale
    http://www.molovo.co.uk

    This plugin is free to use
    for both personal and
    commercial purposes.

    v0.1 - 12/10/2012

***********************************/

(function ($) {

    //define the browserWrapper plugin
    $.fn.browserWrapper = function (options) {

        //specify the plugins defauls
        var defaults = {
            browserTitle:   'Your Awesome Title',                 //title to appear on tab
            browserURL:     'http://your.awesome.url.com',  //URL to appear in address bar
            favicon:        'http://browserwrapper.molovo.co.uk/img/favicon.png',       //URL for favicon to appear on tab
            filePath:       'browserWrapper/',                          //path to browserWrapper
            shadow:         '0px 5px 15px rgba(0,0,0,0.3)',             //adds a box-shadow to the browser, follows CSS syntax, use '0' to remove
            responsive:     'n',                                         // if 'y', reloads page on window.resize to redraw browser window at a different size
            os:             'mac',
            browser:        'chrome'
        };
        //overwrite the defaults
        var options         = $.extend(defaults, options);

        //set up variables
        var act             = $(this);
        var gui             = $('.browser-gui');
        var border          = $('.browser-window-border');
        var addressBar      = $('.browser-gui .address-bar');
        var height          = act.height();
        var width           = act.width();

        var addressBarWidth = width - 154;
        var addressTxtWidth = width - 214;
        var guiHeight       = height + 34;
        var windowHeight    = height + 69;
        var marginDifference = 0;


        if ( defaults.os == 'windows') {
            var windowHeight = windowHeight + 2;
            if (defaults.browser == 'chrome') {
                var marginDifference = 6;
            }
            var tabWidth = width - 108;
        } else {
                var tabWidth = 231;
        }

        if ( defaults.browser == 'firefox') {
            var tabWidth = 240;
            var addressBarWidth = width - 204;
            var addressTxtWidth = width - 304;
            var searchWidth = 120;
            var guiHeight = height + 40;
            var windowHeight = height + 90;
            if ( defaults.os == 'windows') {
                var guiHeight    = height + 40;
                var windowHeight = height + 86;
            }
        }

        var tabWrapperWidth = tabWidth - 53;
        var tabTextWidth = tabWrapperWidth - 24;

        //grab current content of div so that it can be replaced
        var currentContent  = act.html();

        //build the controls based on variables above
        if ( defaults.os == 'mac' ) {
            var windowButtons = '<img class="window-button red" src="' + defaults.filePath + 'src/img/red-button.png" /><img class="window-button yellow" src="' + defaults.filePath + 'src/img/yellow-button.png" /><img class="window-button green" src="' + defaults.filePath + 'src/img/green-button.png" />';
        } else if ( defaults.os == 'windows' ) {
            var windowButtons = '<img class="window-button" src="' + defaults.filePath + 'src/img/windows-buttons.png" />';
        }
        var browserTab = '<span class="tab ' + defaults.browser + '" style="width: ' + tabWidth + 'px;"><span class="tab-wrapper" style="width: ' + tabWrapperWidth + 'px;"><img class="favicon" src="' + defaults.favicon + '" /><span class="tabtext" style="width: ' + tabTextWidth + 'px;">' + defaults.browserTitle + '</span></span></span>'
        var browserControls = '<div class="browser-gui-controls ' + defaults.browser + '"><img class="nav-buttons" src="' + defaults.filePath + 'src/img/' + defaults.browser + '-nav-buttons.png" /><span class="address-bar" style="width: ' + addressBarWidth + 'px;">';
                            if (defaults.browser == 'chrome') {
                                browserControls += '<img class="address-bar-icon" src="' + defaults.filePath + 'src/img/address-bar-icon.png" />';
                            }
                            browserControls += '<span class="address-bar-text" style="width: ' + addressTxtWidth + 'px;">' + defaults.browserURL + '</span>';
                            if (defaults.browser == 'chrome') {
                                browserControls += '<img class="address-bar-bookmark" src="' + defaults.filePath + 'src/img/' + defaults.browser + '-address-bar-bookmark.png" /></span><img class="nav-button-settings" src="' + defaults.filePath + 'src/img/nav-button-settings.png" />';
                            } else if (defaults.browser == 'firefox') {
                                browserControls += '<img class="address-bar-bookmark" src="' + defaults.filePath + 'src/img/' + defaults.browser + '-address-bar-bookmark.png" /></span><span class="address-bar firefox-google-search" style="width: ' + searchWidth + 'px;"><img class="address-bar-icon" src="' + defaults.filePath + '/src/img/google-search-icon.png" /><span class="address-bar-text">Search Google</span></span>'
                            } else {
                                browserControls += '</span>';
                            }
                            browserControls += '</div>';

        var windowControls  = '<div class="browser-window-controls ' + defaults.os + ' ' + defaults.browser + '">' + windowButtons + browserTab + '</div>';

        //expand div and repopulate with content and browser styling
        act.height(windowHeight).css({'margin-top': '-=' + marginDifference + 'px'}).html('<div class="browser-window-border ' + defaults.os + ' ' + defaults.browser + '" style="height: ' + windowHeight + 'px; box-shadow:' + defaults.shadow + '">' + windowControls + '<div class="browser-gui ' + defaults.browser + '" style="height: ' + guiHeight + 'px;">' + browserControls + currentContent + '</div></div>').trigger('refresh');

        if ( defaults.responsive == 'y' ) {
            //refresh page to force browser redraw on resize
            $(window).resize(function(){
                location.reload();
            });
        }

    }
})(jQuery);