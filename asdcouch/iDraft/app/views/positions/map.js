function(doc){
	if(doc._id.substr(0,9) === "position:") {
		emit(doc._id.substr(9), {
			"pos": doc.pos,
			"abrev": doc.abrev
		});
	}
};