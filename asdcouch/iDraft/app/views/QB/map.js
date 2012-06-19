function(doc){
	if(doc._id.substr(0,3) === "QB:") {
		emit(doc._id.substr(3), {
			"position": doc.position,
			"pname": doc.pname,
			"team": doc.team,
			"bye" : doc.bye,
			"skill" : doc.skill,
			"notes": doc.notes
		});
	}
};