//models/Expense.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workoutSchema = new Schema({
    date : String,
    day : String,
    workoutDay : String,
    muscleUsed : [],
    muscleGroup :[{
        chest : [{
            BarbellBenchPress : Boolean,
            FlatBenchDumbbellPress : Boolean,
            InclineDumbbellPress : Boolean,
            LowInclineBarbellBenchPress : Boolean,
            SeatedMachineChestPress : Boolean,
            Dips : Boolean,
            InclineBenchCableFly : Boolean,
            pushUps : Boolean
        }],
        back : [{
            Deadlist : Boolean,
            Pullups : Boolean,
            ChinUps : Boolean,
            WideGripRearPullUp : Boolean,
            OneArmDumbellRow : Boolean,
            V_barPulldown : Boolean,
            WideBarPulldown : Boolean,
        }],
        shoulder :[{
            StandingDumbellPress : Boolean,
            StandingMilitaryPress : Boolean,
            SeatedBarbellMilitaryPress : Boolean,
            OneArmSideLaterals : Boolean,
            PowerPartials : Boolean,
        }],
        biceps : [{
            EZBarCurl : Boolean,
            CloseGripEZBarCurl : Boolean,
            ConcentrationCurls : Boolean,
            HammerCurls : Boolean,
            InclineDumbbellCurls : Boolean,
            CableCurl : Boolean
        }],
        triceps : [{
            TricepsPushdown : Boolean,
            BenchDip : Boolean,
            EZBarTriceps : Boolean,
            SeatedTricepsPress : Boolean,
            CloseGripBarbellBenchPress : Boolean
        }],
        legs :[{
            LegPress : Boolean,
            Squat : Boolean
        }]
    }]
});

module.exports = mongoose.model('Workout', workoutSchema);