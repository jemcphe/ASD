


// 	
	// var parsePlayerForm = function(data){
		// //uses form data here
		// console.log(data);
	// }
// 	
		// // Create StoreData Function
	// function storeData(key){
		// //If there is no key, this is a new item and we need to generate a new key
		// if(!key){ 
		// //Create Random Key
		// var 	id									= Math.floor(Math.random()*1000001);
		// } else {
			// //else, set the id to the existing key we're editing so that it will save over the data.
			// //The key is the same key that's been passed along from the editSubmit event handler
			// //to the validate function, and then passed here, into the storeData function.
			// id = key;
		// }
// 		
		// var apform = $('#addPlayerForm');
// 		
		// //getCheckboxValue();
		// // gather up all our form field values and store in an object.
		// // Object properties contain array with the form label and input value.
		// var item = {};
				// item.position				= ["Position:", $('#position').value];
				// item.pname					= ["Player Name:", $('#pname').value];
				// item.team					= ["Team Name:", $('#team').value];
				// item.bye						= ["Bye Week:", $('#byeweek').value];
				// item.starter					= ["Starter:", starterValue];
				// item.skill						= ["Skill Level:", $('#skill').value];
				// item.notes					= ["Notes:", $('#notes').value];
		// //Save Data into Local Storage: Use Stringify to convert our object to a string.
		// localStorage.setItem(id, JSON.stringify(item));
		// alert("Player Saved!");
	// };
	
	// jQuery Function	
	$(document).ready(function() {
		
		var apform = $('#addPlayerForm');
		
		apform.validate({
			invalidHandler: function(form, validator) {},
			submitHandler: function(){
				var id = Math.floor(Math.random()*1000001);
				var data = apform.serializeArray();
				localStorage.setItem(id, JSON.stringify(data));
				console.log(data);
				alert("Player Saved!");
				window.location.reload(apform);
			}
		});
	});