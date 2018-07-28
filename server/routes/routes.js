//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Expense = require('../../models/Expense');

router.get('/', function(req, res){
  res.render('index')
});

router.route('/insert').post(function(req,res) {
    console.log(req.body)
    var expense = new Expense();
    expense.profName = req.body.profName;
    expense.course = req.body.course;
    expense.major = req.body.major;
    expense.month = req.body.month;
    expense.year = req.body.year;
  
    expense.save(function(err) {
        if (err)
            res.send(err);
        res.send('Expense successfully added!');
    });
})

router.route('/update').post(function(req, res) {
 const doc = {
     description: req.body.description,
     amount: req.body.amount,
     month: req.body.month,
     year: req.body.year
 };
    console.log(doc);
    Expense.update({_id: req.body._id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Expense successfully updated!');
  });
});

router.get('/delete', function(req, res){
    var id = req.query.id;
    Expense.find({_id: id}).remove().exec(function(err, expense) {
        if(err)
        res.send(err)
        res.send('Expense successfully deleted!');
    })
});

router.get('/getAll',function(req, res) {
    var monthRec = req.query.month;
    var yearRec = req.query.year;
    if(monthRec && monthRec != 'All'){
        Expense.find({$and: [ {month: monthRec}, {year: yearRec}]}, function(err, expenses) {
        if (err)
            res.send(err);
        res.json(expenses);
  });
 } else {
    Expense.find({year: yearRec}, function(err, expenses) {
        if (err)
            res.send(err);
        res.json(expenses);
    });
 }
});

router.get('/getWorkout-date',function(req, res) {
    const workoutDate = require('../../models/workout-date');

    workoutDate.find({},function(err,response){
        if(err)
            res.send(err);
        res.json(response);
    })
});

router.get('/getWorkout-detail',function(req, res) {
    const workout = require('../../models/workout');
    const date = req.query.date;
    
    workout.find({date : date},function(err,response){
        if(err)
            res.send(err);
        res.json(response);
    })
});

router.route('/updateWorkout').post(function(req,res){
    var Workout = require('../../models/workout');
    var workoutDate = require('../../models/workout-date');
    var workout = new Workout();
    var workoutDate = new workoutDate();

    workoutDate.date = req.body.date;
    workoutDate.day = req.body.day;

    workout.date = req.body.date;
    workout.day = req.body.day;
    workout.muscleUsed = req.body.muscleUsed;
    workout.muscleGroup = {
        chest : [{
            BarbellBenchPress : req.body.BarbellBenchPress,
            FlatBenchDumbbellPress : req.body.FlatBenchDumbbellPress,
            InclineDumbbellPress : req.body.InclineDumbbellPress,
            LowInclineBarbellBenchPress : req.body.LowInclineBarbellBenchPress,
            SeatedMachineChestPress : req.body.SeatedMachineChestPress,
            Dips : req.body.Dips,
            InclineBenchCableFly : req.body.InclineBenchCableFly,
            pushUps : req.body.pushUps
        }],
        back : [{
            Deadlist : req.body.Deadlist,
            Pullups : req.body.Pullups,
            ChinUps : req.body.ChinUps,
            WideGripRearPullUp : req.body.WideGripRearPullUp,
            OneArmDumbellRow : req.body.OneArmDumbellRow,
            V_barPulldown : req.body.V_barPulldown,
            WideBarPulldown : req.body.WideBarPulldown,
        }],
        shoulder :[{
            StandingDumbellPress : req.body.StandingDumbellPress,
            StandingMilitaryPress : req.body.StandingMilitaryPress,
            SeatedBarbellMilitaryPress : req.body.SeatedBarbellMilitaryPress,
            OneArmSideLaterals : req.body.OneArmSideLaterals,
            PowerPartials : req.body.PowerPartials,
        }],
        biceps : [{
            EZBarCurl : req.body.EZBarCurl,
            CloseGripEZBarCurl : req.body.CloseGripEZBarCurl,
            ConcentrationCurls : req.body.ConcentrationCurls,
            HammerCurls : req.body.HammerCurls,
            InclineDumbbellCurls : req.body.InclineDumbbellCurls,
            CableCurl : req.body.CableCurl
        }],
        triceps : [{
            TricepsPushdown : req.body.TricepsPushdown,
            BenchDip : req.body.BenchDip,
            EZBarTriceps : req.body.EZBarTriceps,
            SeatedTricepsPress : req.body.SeatedTricepsPress,
            CloseGripBarbellBenchPress : req.body.CloseGripBarbellBenchPress
        }],
        legs :[{
            LegPress : req.body.LegPress,
            Squat : req.body.Squat
        }]
    }

    console.log(workout)

    workout.save(function(err) {
        if (err)
            res.send(err);
        else{
            workoutDate.save(function(err) {
                if (err)
                    res.send(err);
                res.send('Expense successfully added!');
            });
        }
    });
});

module.exports = router;