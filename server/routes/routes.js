//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/', function(req, res){
  res.render('index')
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

router.get('/getWorkout',function(req, res) {
    const workout = require('../../models/workout');
    
    workout.find({},function(err,response){
        if(err)
            res.send(err);
        res.json(response);
    })
});

const MUSCLE = new Map([
    [0, 'chest'],
    [1, 'back'],
    [2, 'shoulder'],
    [3, 'biceps'],
    [4, 'triceps'],
    [5, 'legs'],
])

const GETMUSCLE = (key) =>{
    return MUSCLE.get(key)
}

router.get('/getWorkoutForCalender',function(req, res) {
    const workout = require('../../models/workout');

    workout.find({},function(err,response){

        WorkoutData = []
        for(let i = 0; i < response.length; i++){
            let updatedSelectedItem = [];
            for(let n = 0; n < response[i].muscleGroup.length;n++){

                each_workout = {
                    start: response[i].muscleGroup[n].date,
                    title : response[i].muscleGroup[n].workoutDay + " day",
                    exercise : []
                }

                const muscleUsed = response[i].muscleGroup[n].muscleUsed
                for(let j = 0; j < muscleUsed.length; j++){
                   // let muscleDetail = muscle + "Detail";
                    if(muscleUsed[j]){
                        const muscle = GETMUSCLE(j)
                        const eachExercise = response[i].muscleGroup[n][muscle][0]
                        each_workout.exercise.push(muscle)
                        each_workout.exercise.push(eachExercise)
                    }
                }
                WorkoutData.push(each_workout)
            }
        }
        //console.log(WorkoutData)
        if(err)
            res.send(err);
        res.json(WorkoutData);
    })
});

router.route('/updateWorkout').post(function(req,res){
    var Workout = require('../../models/workout');
    var workout = new Workout();
    const month = req.body.month;
    const year = req.body.year;

    const newWorkout = {
        date : req.body.date,
        day : req.body.day,
        month : req.body.month,
        workoutDay : req.body.workoutDay,
        muscleUsed : req.body.muscleUsed,
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
            Deadlift : req.body.Deadlift,
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

    //console.log(workout)
    //console.log(monthAndYear)

    Workout.findOneAndUpdate(
        {'month' : month, 'year' : year}, //check the matching 
        {$push:{muscleGroup:newWorkout}},{upsert:true},
        function(err,docs) {
            if (err)
                res.send(err);
            else{
                console.log("New data Successfully added\n");
                res.json(docs);
            }
    });
});

module.exports = router;