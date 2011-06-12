(function($) {

	/**
	 * Spoofs placeholders in browsers that don't support them (eg Firefox 3)
	 * 
	 * Copyright 2011 Dan Bentley
	 * Licensed under the Apache License 2.0
	 *
	 * Author: Dan Bentley [github.com/danbentley]
	 */

	// Return if native support is available.
	if ("placeholder" in document.createElement("input")) return;

	$(document).ready(function(){
		$(':input[placeholder]').not(':password').each(function() {
			setupPlaceholder($(this));
		});

		$(':password').each(function() {
			setupPasswords($(this));
		});
	   
		$('form').submit(function(e) {
			clearPlaceholdersBeforeSubmit($(this));
		});
	});

	function setupPlaceholder(input) {

		var placeholderText = input.attr('placeholder');

		setPlaceholderOrFlagChanged(input, placeholderText);
		input.bind({
			focus: function(e) {
				if (input.val() === placeholderText 
					&& input.data('changed') === undefined) input.val('');
			},
			blur: function(e) {
				if (input.val() === '') input.val(placeholderText); 
			},
			change: function(e) {
				if (input.val() !== '') input.data('changed', true);
			}
		});
	}

	function setPlaceholderOrFlagChanged(input, text) {
		(input.val() === '') ? input.val(text) : input.data('changed', true);
	}

	function setupPasswords(input) {
		var passwordPlaceholder = createPasswordPlaceholder(input);
		input.after(passwordPlaceholder);

		(input.val() === '') ? input.hide() : passwordPlaceholder.hide();

		$(input).blur(function(e) {
			if (input.val() === '') {
				input.hide();
				passwordPlaceholder.show();
			}
		});
			
		$(passwordPlaceholder).focus(function(e) {
			input.show().focus();
			passwordPlaceholder.hide();
		});
	}

	function createPasswordPlaceholder(input) {
		return input.clone().attr({
			id: 'password-placeholder' + input.attr('name'),
			value: input.attr('placeholder'),
			type: 'input',
			readonly: true
		});
	}

	function clearPlaceholdersBeforeSubmit(form) {

		form.find(':input[name^=password-placeholder]').remove();

		form.find(':input[placeholder]').each(function() {
			if ($(this).val() === $(this).attr('placeholder') 
				&& $(this).data('changed') === undefined) $(this).val('');
		});
	}
})(jQuery);
