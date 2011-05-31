(function($) {

	/**
	 * Spoofs placeholders in browsers that don't support them. (eg Firefox 3)
	 * 
	 * Copyright 2011 Dan Bentley
	 * Licensed under the Apache License 2.0
	 *
	 * Author: Dan Bentley [github.com/danbentley]
	 */

	// Return if native support is available.
	if ("placeholder" in document.createElement("input")) return;

	$(':input[placeholder]').each(function(index) {
		setupPlaceholder($(this));
	});
   
	$('form').submit(function(e) {
		clearPlaceholdersBeforeSubmit($(this));
	});

	function setupPlaceholder(input) {

		var placeholderText = input.attr('placeholder');

		setPlaceholderOrFlagChanged(input, placeholderText);
		input.bind('focus blur change', function(e) {
			if (e.type === 'focus' && input.val() === placeholderText && !input.data('changed')) input.val('');
			if (e.type === 'blur' && input.val() === '') input.val(placeholderText);
			if (e.type === 'change' && input.val() !== '') input.data('changed', true);  
		});
	}

	function setPlaceholderOrFlagChanged(input, placeholderText) {

		if (input.val() === '') {
			input.val(placeholderText);
		} else {
			input.data('changed', true);
		}
	}

	function clearPlaceholdersBeforeSubmit(form) {
		form.find(':input[placeholder]').each(function() {
			var el = $(this);
			if (el.val() === el.attr('placeholder') && !el.data('changed')) el.val('');
		});
	}
})(jQuery);
