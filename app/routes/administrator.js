var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var assestments = mongoose.model('assestments');
var curriculumList = mongoose.model('curriculumList');
var curriculums = mongoose.model('curriculums');

//for selected curriculum
router.get('/curriculumSel/:id', function( req, res) {
	curriculums.find({school_year: req.params.id}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// add curriculum
router.post('/newCurriculum', function(req, res){
	var new_curriculum = new curriculumList({curriculumYear: req.body.curriculum_year});
	new_curriculum.save(function(err, data){
		if (err){
			return err;
		};
		res.json(data);
	});
});
//for curriculums list
router.get('/curriculum-list', function( req, res) {
	curriculumList.find({}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
//for departments
//add department
router.post('/curriculumSel/:id', function(req, res){
	var newData = {
		school_year : req.params.id,
	    department_name : req.body.depName,
	    department_des : req.body.depDes
	};
	var department_new = new curriculums(newData);

	department_new.save(function(err, data){
		if (err){
			return err;
		};
		res.json(data);
	});
});
// delete department
router.delete('/curriculumSel/:id', function(req, res){
	curriculums.findByIdAndRemove(req.params.id, function(err, data){
		res.json(data);
	})
});
///add and delete courses
router.put('/curriculumSel/:id', function(req, res){
	if (req.body.status){
		curriculums.findByIdAndUpdate(req.params.id,{$pull:{courses:{_id:req.body._id}}}, function(err, data){
			res.json(data);
		});
	}else{
		curriculums.findByIdAndUpdate(req.params.id,{$addToSet:{courses:{course_name:req.body.courseName,course_des:req.body.courseDes,totalYears: req.body.courseYears, totalTerms: req.body.courseTerms}}} ,function(err, data){
		if (err){
			return err;
		};
		res.json(data);
		});
	}
});
// get course subjects
router.get('/courseSubjects/:id', function(req, res){
	curriculums.find({'courses._id':req.params.id}, {courses:{$elemMatch:{_id:req.params.id}}},function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// add course subjects
router.put('/courseSubjects/:id', function(req, res){
	curriculums.findByIdAndUpdate(req.params.id,{$addToSet:{subjects:{course_name:req.body.course_name,course_des:req.body.course_des,year_level: req.body.year_level, term: req.body.term,subject_name:req.body.subject.subName,subject_des:req.body.subject.subDes,units:req.body.subject.subUnits,cost_perUnits:req.body.subject.subCpu,pre_requisite:req.body.subject.subPreRequisite}}} ,function(err, data){
		if (err){
			return err;
		};
		res.json(data);
		});
});
// find subjects related in year
router.get('/findSubjectsByYear/:id', function(req, res){
	console.log(req.params.id);
	curriculums.findById(req.params.id, function(err, data){
		if (err){
			return err;
		};
		res.json(data.subjects);
		});
});

//for assestments
router.get('/assestments', function( req, res) {
	assestments.find({}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// add new school fees
router.post('/assestments', function( req, res){
	var newAssestment = new assestments({typeOfFee:req.body.name});

	newAssestment.save(function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// get fees of selected school fee
router.get('/assestments/:id', function( req, res) {
	assestments.findById(req.params.id, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// add and delete fees in school fee
router.put('/assestments/:id', function( req, res) {
	if (req.body.status){
		assestments.findByIdAndUpdate(req.params.id,{$pull:{fees:{_id:req.body._id}}}, function(err, data){
			res.json(data);
		});
		console.log(req.body._id);
		console.log(req.params.id);
	}else{
		assestments.findByIdAndUpdate(req.params.id,{$addToSet:{fees:{fee_name:req.body.fee_name,amount:req.body.amount, data_created: new Date()}}}, function(err, data){
			if(err){
				return err;
			}
			res.json(data);
		});
	}
});
module.exports = router;