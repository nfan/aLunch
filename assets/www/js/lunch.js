define(['underscore', 'Backbone', 'jquery',
        'text!lunch.html!strip',
        'jqueryui',
        'jqueryuiTouch'
       ],
    function(_, Backbone, $, LunchHtml) {
        var lunch = Backbone.View.extend({
                el: 'body',
                locations: ['桃屋', '醉爱', '清华园宾馆'],
                persons: ['nfan','slshen', 'wqu'],
                events: {
                    'click #btnAdd': 'onAdd',
                    'click #btnSubmit': 'onSubmit',
                    'click #btnEven': 'onEven',
                    'click #btnRemove': 'onRemove'
                },
                
                initialize: function(options) {
                    _.bindAll(this, 'render', 'onAdd', 'onSubmit', 'onEven', 'onRemove', 'setHandler', 'refreshCnt');
                },

                render: function() {
                    var html = LunchHtml;
                    this.$el.html(html);
                    $("#location").autocomplete({source: this.locations});
                    $("#sum").click(this.refreshCnt);
                    $("#sum").blur(this.refreshCnt);
                    this.onAdd();
                    return this;
                    
                },

                onAdd: function() {
	    			var el = $($("#tmplPerson").html());
	    			this.$el.find("#content ol").append(el);
	    			this.setHandler(el);
	    			this.refreshCnt();
                },
		
				onSubmit: function() {
					var link="mailto:fan_nan@126.com";
					var d = new Date();
					var subject = "Lunch ";
					var curr_date = d.getDate();
				    var curr_month = d.getMonth() + 1; //Months are zero based
				    var curr_year = d.getFullYear();
				    subject += curr_year + "-" + curr_month + "-" + curr_date;
				    
					var body=$("#location").val()+","+$("#sum").val()+";";
					$("#content li").each(function(idx, el) {
		        			body += $(el).find(".name").val()+","+$(el).find(".fee").val()+";";
		    		});
		    		subject+=";"+body;
		    		var el = $("#linkSubmit");
		    		el.attr("href", link + "?" + "subject=" + subject);
		    		window.location.href = el.attr("href");
		    		/*
		    	  var evt = document.createEvent("MouseEvents"); 
			      evt.initMouseEvent("click", true, true, window, 
			          0, 0, 0, 0, 0, false, false, false, false, 0, null); 
			      var allowDefault = el.get(0).dispatchEvent(evt);
		    		*/
				},

				onEven: function() {
					var sum = parseFloat($("#sum").val());
		    			var cnt = parseFloat($("#cnt").val());
		    			var av = sum/cnt;
		    			$("#content li input.fee").each(function(idx, el) {
		        			$(el).val(av);
		    			});
		    			this.refreshCnt();
				},
		
				onRemove: function(evt){
					$(evt.target).parents("li").remove();
		    		this.refreshCnt();
				},
				
				setHandler: function(el) {
					var that = this;
					el.find("button").click(this.onRemove);
					el.find("input.name").autocomplete({source:this.persons});
					el.find("div.fee_slider").slider({
				      range: "min",
				      value: 0,
				      min: 0,
				      max: 100,
				      slide: function( event, ui ) {
				        el.find("input.fee").val( ui.value );
				        that.refreshCnt();
				      }
				    });
					el.find("input.fee").click(this.refreshCnt);
					el.find("input.fee").blur(this.refreshCnt);
				},
				
				refreshCnt: function(){
		    			var tmp = 0;
		    			var tot = 0;
		    			$("#content li .fee").each(function(idx, el){
		        			tmp++;
		        			tot+=parseFloat($(el).val());
		    			});
		    			$("#cnt").val(tmp);
		    			$("#sum1").html(tot);
		    			
		    			if(tot != parseFloat($("#sum").val())) {
		    				$("#sum1").css("color","red");
		    			} else {
		    				$("#sum1").css("color","green");
		    			}
				}
		
            });

            return lunch;
    }
);
