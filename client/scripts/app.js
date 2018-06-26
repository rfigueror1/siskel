var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },
  
  initialize: function() {
    // add a listener to each movie to check for change
    // in toggleLike. If a change happens,
    // sort the collection
    this.on('change:like', function() {
      this.collection.sort();
    });
    
    // this.on('change', function() {
    //   this.view.render();
    // });
    // 
  },

  toggleLike: function() {
    // your code here
    this.set('like', !(this.get('like')));
    // this.sort();
    console.log(this.on, 'model on');
  }
  

});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {
    // your code here
    // defaults: {
    //   comparator:'title';
    // }
    this.comparator = 'title';
  },

  comparator: 'title',

  sortByField: function(field) {
    // your code here
    
    this.comparator = field;
    this.sort();
    
    // debugger;
    
    console.log(this.models, 'the collection');
    
    // if(this.model.hasChanged()){
      
    // }
    
    // this.model.on('change', function() {
    //   this.collection.sort();
    // });
  },
  
  // console.log(this.model, 'this.model outside')
  


});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },

  handleClick: function(e) {
    var field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({
  
  model: Movie,

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
    // your code here
  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function() {
    // your code here
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    // your code here
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
