<!--
      onerror = Showerror

         function Showerror(x, y, z) {
         	   
         	   alert(x+" "+y+" "+z)
   }
      
    $(document).ready(function(){
    	$('#validtation').formValidation({
    		framework: 'bootstrap',
    		fields: {
    			Name: {
    				validators: {
                         notEmpty: {
                         	message: "You can't leave this empty. "
                    }
    			}
			},
		    Username: {
		    	    validators: {
		    		    notEmpty: {
		    			    message: "You can't leave this empty."
		    		},
                     stringLength: {
                        min: 6,
                        max: 30, 
                        message: 'The username must be more than 6 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-@-.-9_]+$/,
                        message: 'The username can only consist of alphabetical, number and underscore'
                    }
		    	}
		    },
            Email: {
                validators: {
                    notEmpty: {
                        message: "You can't leave this empty."
                    }
                }
            },
            Password: {
                validators: {
                    notEmpty: {
                        message: "You can't leave this empty."
                    },
                    stringLength: {
                        min: 8,
                        max: 30, 
                        message: 'Short passwords are easy to guess. Try one with at least 8 characters.'
                    },
                }
            },
            Confirm: {
                 validators: {
                    notEmpty: {
                        message: "You can't leave this empty."
                    },
                    identical: {
                        field: 'Password',
                        message: "These passwords don't match. Try again?"
                    }
                }

            }
        }
    });
});     
-->