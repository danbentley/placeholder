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

	function setupPasswords(input) {

		var passwordPlaceholder = createPasswordPlaceholder(input);

		input.after(passwordPlaceholder);

		(input.val() === '') ? input.hide() : passwordPlaceholder.hide();

		$(input).blur(function(e) {
			if (input.val() === '') {
				input.toggle().focus();
				passwordPlaceholder.toggle();
			}
		});
			
		$(passwordPlaceholder).focus(function(e) {
			input.toggle().focus();
			passwordPlaceholder.toggle();
		});
	}

	function createPasswordPlaceholder(input) {
	
		return input.clone().attr({
			name: 'password-placeholder' + input.attr('name'),
			id: 'password-placeholder' + input.attr('name'),
			value: input.attr('placeholder'),
			type: 'input',
			readonly: true
		});
	}

	function setupPlaceholder(input) {

		var placeholderText = input.attr('placeholder');

		setPlaceholderOrFlagChanged(input, placeholderText);
		input.bind({
			focus: function(e) {
				if (input.val() === placeholderText && input.data('changed') === undefined) input.val('');
			},
			blur: function(e) {
				if (input.val() === '') input.val(placeholderText); 
			},
			change: function(e) {
				if (input.val() !== '') input.data('changed', true);
			}
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

		form.find(':input[name^=password-placeholder]').remove();

		var inputs = form.find(':input[placeholder]');
		inputs.each(function() {
			var el = $(this);
			if (el.val() === el.attr('placeholder') && el.data('changed') === undefined) el.val('');
		});

	}
})(jQuery);
