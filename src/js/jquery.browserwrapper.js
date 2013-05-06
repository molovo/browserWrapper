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
            makeBrowserWork:false,
            winVersion:     '',
            theme:          false,
            themeOptions:   {}
        };
        //overwrite the defaults
        var options         = $.extend(true, defaults, options);

        //set up variables
        var act             = $(this);
        var gui             = $('.browser-gui');
        var border          = $('.browser-window-border');
        var addressBar      = $('.browser-gui .address-bar');
        var height          = act.height();
        var width           = act.width();

        //grab current content of div so that it can be replaced
        var currentContent  = act.html();

        if (defaults.makeBrowserWork && (currentContent.match(/<iframe/) || currentContent.match(/<object/))) {
            var contentEditable = 'contenteditable="true"';
            act.data('originalURL', act.find('iframe').attr('src') || act.find('object').attr('data'));
        }

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
                    }
                ]

            };
            BrowserDetect.init();
            if (defaults.os == 'detect') {defaults.os = BrowserDetect.OS;};
            if (defaults.browser == 'detect') {defaults.browser = BrowserDetect.browser;};
        }

        if(defaults.os == 'windows' && defaults.winVersion != 'windows7'){
            defaults.winVersion = 'windows8';
        }

        //build the controls based on variables above
        if ( defaults.os == 'mac' ) {
            var windowButtons = '<img class="window-button red" src="' + defaults.filePath + 'img/red-button.png" /><img class="window-button yellow" src="' + defaults.filePath + 'img/yellow-button.png" />';
            if (contentEditable) {
                windowButtons += '<a class="window-button green" href="' + defaults.browserURL + '" target="_blank"><img src="' + defaults.filePath + 'img/green-button.png" /></a>';
            } else {
                windowButtons += '<img class="window-button green" src="' + defaults.filePath + 'img/green-button.png" />';
            }
        } else if ( defaults.os == 'windows' ) {
            if (contentEditable) {
                var windowButtons = '<a class="window-button green ' + defaults.winVersion + '" href="' + defaults.browserURL + '" target="_blank"><img src="' + defaults.filePath + 'img/' + defaults.winVersion + '-buttons.png" /></a>';
            } else {
                var windowButtons = '<img class="window-button green" src="' + defaults.filePath + 'img/' + defaults.winVersion + '-buttons.png" />';
            }
        }

        if(defaults.browser && defaults.browser !== 'false') {
            var browserTab = '<span class="tab ' + defaults.browser + '"><span class="tab-wrapper"><img class="favicon" src="' + defaults.favicon + '" /><span class="tabtext">' + defaults.browserTitle + '</span></span></span>'
            var browserControls = '<div class="browser-gui-controls ' + defaults.browser + '">';

            if (defaults.browser == 'chrome') {
                if (contentEditable) {
                    browserControls += '<a class="back-button"><img class="nav-buttons" src="' + defaults.filePath + 'img/' + defaults.browser + '-back-button.png" /></a><a class="forward-button"><img class="nav-buttons" src="' + defaults.filePath + 'img/' + defaults.browser + '-forward-button.png" /></a><a href="#" class="refresh-button"><img class="nav-buttons" src="' + defaults.filePath + 'img/' + defaults.browser + '-refresh-button.png" /></a><a href="#" class="home-button"><img class="nav-buttons" src="' + defaults.filePath + 'img/' + defaults.browser + '-home-button.png" /></a>';
                } else {
                    browserControls += '<img class="nav-buttons" src="' + defaults.filePath + 'img/' + defaults.browser + '-nav-buttons.png" />';
                }
                browserControls += '<span class="address-bar notsearch"><img class="address-bar-icon" src="' + defaults.filePath + 'img/address-bar-icon.png" />';
            } else if (defaults.browser == 'firefox') {
                if (contentEditable) {
                    browserControls += '<a class="back-button"><img class="nav-buttons" src="' + defaults.filePath + 'img/' + defaults.browser + '-nav-buttons.png" /></a>';
                } else {
                    browserControls += '<img class="nav-buttons" src="' + defaults.filePath + 'img/' + defaults.browser + '-nav-buttons.png" />';
                }
                browserControls += '<span class="address-bar notsearch"><img class="address-bar-icon" src="' + defaults.filePath + 'img/address-bar-icon.png" />';
            }
            browserControls += '<span class="address-bar-text" ' + contentEditable + '>' + defaults.browserURL + '</span>';
            if (defaults.browser == 'chrome') {
                browserControls += '<img class="address-bar-bookmark" src="' + defaults.filePath + 'img/' + defaults.browser + '-address-bar-bookmark.png" /></span><img class="nav-button-settings" src="' + defaults.filePath + 'img/nav-button-settings.png" />';
            } else if (defaults.browser == 'firefox') {
                browserControls += '<span class="address-bar-bookmark"><img class="address-bar-bookmark-button" src="' + defaults.filePath + 'img/' + defaults.browser + '-address-bar-bookmark-button.png" /><a class="refresh-button"><img src="' + defaults.filePath + 'img/' + defaults.browser + '-refresh-button.png" /></a></span></span><span class="address-bar firefox-google-search"><img class="address-bar-icon" src="' + defaults.filePath + 'img/google-search-icon.png" /><span class="address-bar-text">Search Google</span></span>'
            } else {
                browserControls += '</span>';
            }
            browserControls += '</div>';
        } else {
            browserControls = ' ';
            browserTab = ' ';
        }

        var windowControls  = '<div class="browser-window-controls ' + defaults.os + ' ' + defaults.browser + '">' + windowButtons + browserTab + '</div>';

        if (!defaults.theme) {
            //expand div and repopulate with content and browser styling
            act.html('<div class="browser-window-border ' + defaults.os + ' ' + defaults.winVersion + ' ' + defaults.browser + '" style="box-shadow:' + defaults.shadow + '">' + windowControls + '<div class="browser-gui ' + defaults.browser + '">' + browserControls + currentContent + '</div></div>').trigger('refresh');
        } else {
            $('head').append('<link rel="stylesheet" href="' + defaults.theme + 'style.css" />');

            var themeName = '';

            $.ajax({
                url: defaults.theme + 'theme-info.json',
                type: 'GET',
                dataType: 'json',
                async: false,
                success:  function(data) {
                    themeName = data.name;

                    // Write themeOptions into DOM as a JSON string, then load defaults and overwrite
                    act.before('<script>var themeOptions = $.parseJSON(\'[' + JSON.stringify(defaults.themeOptions) + ']\');var themeOptions = themeOptions[0];$.ajax({url: \'' + defaults.theme + 'theme-info.json\', type: \'GET\', dataType: \'json\', async: false, success: function(data) { themeOptions = $.extend(true, data.themeOptions, themeOptions); } });</script>');
                }
            });

            // Load theme HTML into browser
            act.addClass(themeName).load(defaults.theme + 'content.html', function() {
                // Populate theme with original content
                act.find('.browser-content-container').html(currentContent);

                // Update browser with user options
                act.find('.tabtext').html(defaults.browserTitle);
                act.find('.address-bar-text').html(defaults.browserURL);
                act.find('.favicon').attr('src', defaults.favicon);
                act.css('box-shadow', defaults.shadow);
            });
        }

        if (contentEditable) {

            // Update home and refresh links with origin URL
            act.find('.home-button').attr('href', act.data('originalURL'));
            act.find('.refresh-button').attr('href', act.data('originalURL'));

            act.on('focus', '.address-bar-text[contenteditable]', function() {
                // Take current value from address bar
                var $this = $(this);

                // Store in local data
                act.data('before', $this.html());
                return $this;
            }).on('blur keypress paste', '.address-bar-text[contenteditable]', function(event) {
                // Only capture enter keypress
                var keyCode = event.keyCode || event.which;
                if (keyCode !== 13) {
                    return true;
                } else {
                    // Stop enter keypress from adding new line
                    event.preventDefault();
                    event.stopImmediatePropagation();

                    // if URL has changed, trigger change event
                    var $this = $(this);
                    if (act.data('before') !== $this.html()) {
                        /*if ($this.html() !== defaults.browserURL) {
                            act.find('.back-button').attr('href', act.data('before'));
                        } else {
                            act.find('.back-button').removeAttr('href');
                        }*/
                        $this.trigger('change');
                    }
                    return $this;
                }
            }).find('.address-bar-text[contenteditable]').on('change', function() {
                var $this = $(this);
                var newURL = $this.html();

                // check string for http, https or ftp. If not found, add http.
                if (!newURL.match(/^(https?|ftp):\/\/(.*)/)) {
                    newURL = 'http://' + newURL;
                }

                rebuildBrowser.init(act, newURL);
            });
            // Make back button work properly
            act.find('.back-button').on('click', function(event) {
                event.preventDefault();
                var forwardURL = act.find('iframe').attr('src') || act.find('object').attr('data');
                act.find('.forward-button').attr('href', forwardURL);
                rebuildBrowser.init(act, $(this).attr('href'));
                return false;
            });
            // Make forward button work properly
            act.find('.forward-button').on('click', function(event) {
                event.preventDefault();
                var backURL = act.find('iframe').attr('src') || act.find('object').attr('data');
                act.find('.back-button').attr('href', backURL);
                rebuildBrowser.init(act, $(this).attr('href'));
                return false;
            });
            // Make refresh button work properly
            act.find('.refresh-button').on('click', function(event) {
                event.preventDefault();
                var refreshURL = act.find('iframe').attr('src') || act.find('object').attr('data');
                rebuildBrowser.init(act, refreshURL);
                return false;
            });
            // Make home button work properly
            act.find('.home-button').on('click', function(event) {
                event.preventDefault();
                var homeURL = act.data('originalURL');
                rebuildBrowser.init(act, homeURL);
                return false;
            });

            var rebuildBrowser = {
                init: function(target, url) {
                    // update iframe src directly
                    target.find('iframe').attr('src', url);

                    // for objects, object must be cloned, removed, and have the data source modified before re-adding to the DOM
                    var newObj = target.find('object').clone().attr('data', url);
                    target.find('object').remove();
                    target.find('.browser-content').append( newObj );

                    // Take a lucky guess as to the favicon location
                    var newFavicon = url.split('/').splice(0,3).join('/') + '/favicon' + ('.ico' || '.png');
                    target.find('.favicon').attr('src', newFavicon);

                    // Grabbing the title of the new page is not possible, so we'll update it with the URL
                    target.find('.tabtext').html( url );
                    // var newTitle = target.find('object' || 'iframe').document.title;
                    //target.find('.tabtext').html( newTitle );

                    // Update address bar
                    target.find('.address-bar-text').html(url);

                    // Update back button
                    if (url !== defaults.browserURL) {
                        target.find('.back-button').attr('href', act.data('before'));
                    } else {
                        target.find('.back-button').removeAttr('href');
                    }

                    // Store new url in local data for back button
                    act.data('before', url);

                    // Make full screen button open iframe URL in a new tab
                    target.find('.window-button.green').attr('href', url);
                }
            }

        }
    }

})(jQuery);