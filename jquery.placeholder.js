(function() {

    /**
     * Spoofs placeholders in browsers that don't support them. (eg Firefox 3)
     * 
     * Copyright 2011 Dan Bentley
     * Licensed under the Apache License 2.0
     *
     * Author: Dan Bentley [github.com/danbentley]
     */
        
    // Return if native support is available.
	if (("placeholder" in document.createElement("input"))) return;

    $(':input[placeholder]').each(function(index) {
        var el = $(this);
        var placeholderText = el.attr('placeholder');
        el.val(placeholderText);
        el.bind('focus blur', function(e) {
            if (e.type === 'focus' && el.val() === placeholderText) el.val(''); 
            if (e.type === 'blur' && el.val() === '') el.val(placeholderText); 
        });
    });
})(jQuery);
