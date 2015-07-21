Selectize.define('infinite_scroll', function(options) {
	var self = this
    , page = 1;

  self.infinitescroll = {
    onScroll: function() {
      var scrollBottom = self.$dropdown_content[0].scrollHeight - (self.$dropdown_content.scrollTop() + self.$dropdown_content.height())
      if(scrollBottom < 300){
        var query = JSON.stringify({
          search: self.lastValue,
          page: page
        })

        self.$dropdown_content.off('scroll')
        self.onSearchChange(query)
      }
    }
  };

	self.setup = (function() {
		var original = self.setup;

		return function() {
      var query = JSON.stringify({
        search: self.lastValue,
        page: page
      })

			original.apply(self, arguments);
      self.onSearchChange(query)
		};
	})();

  self.onKeyUp = function(e) {
		var self = this;

		if (self.isLocked) return e && e.preventDefault();
		var value = self.$control_input.val() || '';

		if (self.lastValue !== value) {
      var query = JSON.stringify({
        search: value,
        page: page = 1
      });

			self.lastValue = value;
			self.onSearchChange(query);
      self.refreshOptions();
      self.clearOptions();
			self.trigger('type', value);
		}
	};

  self.on('load',function(){
    page++
    self.$dropdown_content.on('scroll', self.infinitescroll.onScroll);
  });

});
