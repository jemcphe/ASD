function(doc){
	if(doc._id.substr(0,3) === "RB:") {
		emit(doc._id.substr(3), {
			"position": doc.position,
			"pname": doc.pname,
			"team": doc.team,
			"notes": doc.notes
		});
	}
};