function(doc){
	if(doc._id.substr(0,4) === "DEF:") {
		emit(doc._id.substr(4), {
			"position": doc.position,
			"pname": doc.pname,
			"team": doc.team,
			"notes": doc.notes
		});
	}
};