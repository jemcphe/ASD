function(doc){
	if(doc._id.substr(0,2) === "K:") {
		emit(doc._id.substr(2), {
			"position": doc.position,
			"pname": doc.pname,
			"team": doc.team,
			"notes": doc.notes
		});
	}
};