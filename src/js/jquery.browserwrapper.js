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
            browser:        'chrome',
            makeBrowserWork:false
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

        if (defaults.makeBrowserWork && (currentContent.match(/<iframe/) || currentContent.match(/<object/))) {
            var contentEditable = 'contenteditable="true"';
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
                browserControls += '<span class="address-bar-text" ' + contentEditable + '>' + defaults.browserURL + '</span>';
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

        if (contentEditable) {
            act.on('focus', '.address-bar-text[contenteditable]', function() {
                var $this = $(this);
                $this.data('before', $this.html());
                return $this;
            }).on('blur keypress paste', '.address-bar-text[contenteditable]', function(event) {
                var keyCode = event.keyCode || event.which;
                if (keyCode !== 13) {
                    return true;
                } else {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    var $this = $(this);
                    if ($this.data('before') !== $this.html()) {
                        $this.trigger('change');
                    }
                    return $this;
                }
            }).find('.address-bar-text[contenteditable]').on('change', function() {
                var $this = $(this);
                act.find('iframe').attr('src', $this.html());
                var newObj = act.find('object').clone().attr('data', $this.html());
                act.find('object').remove();
                act.find('.browser-content').append( newObj );
            });
        }

    }
})(jQuery);