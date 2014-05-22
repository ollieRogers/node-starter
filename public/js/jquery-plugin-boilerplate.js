/**
 * A jQuery Plugin bolierplate
 */

;(function($) {

    $.pluginName = function(element, options) {

        var defaults = {
            opt1: '#foo', 
        }

        var plugin = this;

        plugin.settings = {};

        // save some selectors
        var $element = $(element),  
             element = element;

        // plugin function 
        plugin.init = function() {

            plugin.settings = $.extend({}, defaults, options);

            // code here please
            console.log($element)

        }

        plugin.init();

    }


    // plugin wrapper 
    $.fn.pluginName = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('pluginName')) {
                var plugin = new $.pluginName(this, options);
                $(this).data('pluginName', plugin);
            }
        });

    }

})(jQuery);