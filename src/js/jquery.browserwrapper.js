/***********************************

    browserWrapper jQuery Plugin
    Developed by James Dinsdale
    http://www.molovo.co.uk

    This plugin is free to use
    for both personal and
    commercial purposes.

    v0.2 - 03/05/2013

***********************************/

(function ($) {

    //define the browserWrapper plugin
    $.fn.browserWrapper = function (options) {

        //specify the plugins defauls
        var defaults = {
            browserTitle:   'Your Awesome Title',                 //title to appear on tab
            browserURL:     'http://your.awesome.url.com',  //URL to appear in address bar
            favicon:        'http://browserwrapper.molovo.co.uk/img/favicon.png',       //URL for favicon to appear on tab
            filePath:       'browserWrapper/src/',                          //path to browserWrapper
            shadow:         '0px 5px 15px rgba(0,0,0,0.3)',             //adds a box-shadow to the browser, follows CSS syntax, use '0' to remove
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

/*        if (width < 312) {
            var firefoxBookmarkHide = 'style="display: none;"';
        } else {
            var firefoxBookmarkHide = '';
        }*/

        //grab current content of div so that it can be replaced
        var currentContent  = act.html();

        if( defaults.os == 'detect' || defaults.browser == 'detect' ){
            // based upon http://www.quirksmode.org/js/detect.html
            var BrowserDetect = {
                init: function () {
                    //defaults to mac/chrome when not in list
                    this.browser = this.searchString(this.dataBrowser) || "chrome";
                    this.OS = this.searchString(this.dataOS) || "mac";
                },
                searchString: function (data) {
                    for (var i=0;i<data.length;i++) {
                        var dataString = data[i].string;
                        var dataProp = data[i].prop;
                        this.versionSearchString = data[i].versionSearch || data[i].identity;
                        if (dataString) {
                            if (dataString.indexOf(data[i].subString) != -1)
                                return data[i].identity;
                        }
                        else if (dataProp)
                            return data[i].identity;
                    }
                },
                dataBrowser: [
                    {
                        string: navigator.userAgent,
                        subString: "Chrome",
                        identity: "chrome"
                    },
                    {
                        string: navigator.vendor,
                        subString: "Apple",
                        identity: "safari"
                    },
                    {
                        string: navigator.userAgent,
                        subString: "Firefox",
                        identity: "firefox"
                    }
                ],
                dataOS : [
                    {
                        string: navigator.platform,
                        subString: "Win",
                        identity: "windows"
                    },
                    {
                        string: navigator.platform,
                        subString: "Mac",
                        identity: "mac"
                    },
                    {
                        string: navigator.platform,
                        subString: "Linux",
                        identity: "linux"
                    }
                ]

            };
            BrowserDetect.init();
            if (defaults.os == 'detect') {defaults.os = BrowserDetect.OS;};
            if (defaults.browser == 'detect') {defaults.browser = BrowserDetect.browser;};
        }
        


        //build the controls based on variables above
        if ( defaults.os == 'mac' ) {
            var windowButtons = '<img class="window-button red" src="' + defaults.filePath + 'img/red-button.png" /><img class="window-button yellow" src="' + defaults.filePath + 'img/yellow-button.png" /><img class="window-button green" src="' + defaults.filePath + 'img/green-button.png" />';
        } else if ( defaults.os == 'windows' ) {
            var windowButtons = '<img class="window-button" src="' + defaults.filePath + 'img/windows-buttons.png" />';
        }
        var browserTab = '<span class="tab ' + defaults.browser + '"><span class="tab-wrapper"><img class="favicon" src="' + defaults.favicon + '" /><span class="tabtext">' + defaults.browserTitle + '</span></span></span>'
        var browserControls = '<div class="browser-gui-controls ' + defaults.browser + '"><img class="nav-buttons" src="' + defaults.filePath + 'img/' + defaults.browser + '-nav-buttons.png" /><span class="address-bar notsearch">';
                if (defaults.browser == 'chrome') {
                    browserControls += '<img class="address-bar-icon" src="' + defaults.filePath + 'img/address-bar-icon.png" />';
                }
                browserControls += '<span class="address-bar-text">' + defaults.browserURL + '</span>';
                if (defaults.browser == 'chrome') {
                    browserControls += '<img class="address-bar-bookmark" src="' + defaults.filePath + 'img/' + defaults.browser + '-address-bar-bookmark.png" /></span><img class="nav-button-settings" src="' + defaults.filePath + 'img/nav-button-settings.png" />';
                } else if (defaults.browser == 'firefox') {
                    browserControls += '<img class="address-bar-bookmark" src="' + defaults.filePath + 'img/' + defaults.browser + '-address-bar-bookmark.png" /></span><span class="address-bar firefox-google-search"><img class="address-bar-icon" src="' + defaults.filePath + 'img/google-search-icon.png" /><span class="address-bar-text">Search Google</span></span>'
                } else {
                    browserControls += '</span>';
                }
                browserControls += '</div>';

        var windowControls  = '<div class="browser-window-controls ' + defaults.os + ' ' + defaults.browser + '">' + windowButtons + browserTab + '</div>';

        //expand div and repopulate with content and browser styling
        act.html('<div class="browser-window-border ' + defaults.os + ' ' + defaults.browser + '" style="box-shadow:' + defaults.shadow + '">' + windowControls + '<div class="browser-gui ' + defaults.browser + '">' + browserControls + currentContent + '</div></div>').trigger('refresh');

    }
})(jQuery);