$(document).ready(function() {

	// Placeholder text for browsers without support for the placeholder attribute.
	if (!("placeholder" in document.createElement("input"))) {
		$('input').each(function(index) {
			var el = $(this);
			var placeholderText = el.attr('placeholder');
			if (placeholderText) {
				el.val(placeholderText);
				el.bind('focus blur', function(e) {
					if (e.type === 'focus' && el.val() === placeholderText) el.val(''); 
					if (e.type === 'blur' && el.val() === '') el.val(placeholderText); 
				});
			}
		});
	}
});
