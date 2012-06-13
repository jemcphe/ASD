function(doc){
	if(doc._id.substr(0,7) === "player:") {
		emit(doc._id.substr(7), {
			"position": doc.position,
			"pname": doc.pname,
			"team": doc.team,
			"notes": doc.notes
		});
	}
};