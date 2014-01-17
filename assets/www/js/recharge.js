define(['underscore', 'Backbone', 'jquery',
        'text!recharge.html!strip',
        'jqueryui',
        'jqueryuiTouch'
       ],
    function(_, Backbone, $, RechargeHtml) {
        var recharge = Backbone.View.extend({
                el: 'body',
                persons: ['nfan','shshen', 'wqu', 'mjiao', 'yewang'],
                events: {
                    'click #btnAdd': 'onAdd',
                    'click #btnSubmit': 'onSubmit',
                    'click #btnRemove': 'onRemove'
                },
                
                initialize: function(options) {
                    _.bindAll(this, 'render', 'onAdd', 'onSubmit', 'onRemove', 'setHandler', 'refreshCnt');
                },

                render: function() {
                    var html = RechargeHtml;
                    this.$el.html(html);
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
					var link="mailto:shenshanliang@gmail.com";
					var d = new Date();
					var subject = "Recharge ";
					var curr_date = d.getDate();
				    var curr_month = d.getMonth() + 1; //Months are zero based
				    var curr_year = d.getFullYear();
				    subject += curr_year + "-" + curr_month + "-" + curr_date;
				    
					var body=","+$("#sum").val()+";";
					$("#content li").each(function(idx, el) {
		        			body += $(el).find(".name").val()+","+$(el).find(".fee").val()+";";
		        			link += ","+$(el).find(".name").val()+"@adobe.com";
		    		});
		    		subject+=";"+body;
		    		var el = $("#linkSubmit");
		    		el.attr("href", link + "?" + "subject=" + subject);
		    		window.location.href = el.attr("href");

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

            return recharge;
    }
);
