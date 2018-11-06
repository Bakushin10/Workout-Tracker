const WORKOUTDICT = new Map([
    //chest
    ["BBP", 'Barbell Bench Press'],
    ["FBDP", "Flat Bench Dumbbell Press"],
    ["IDP", "Incline Dumbbell Press"],
    ["LIBBP","Low Inclined Barbell Bench Press"],
    ["SMCP","Seated Machine Chest Press"],
    ["DIPS","Dips"],
    ["IBCF","Incline Bench Cable Fly"],
    ["PUS","pushUps"],

    //Back
    ["DL","Deadlift"],
    ["PUS","Pullups"],
    ["CUP","ChinUps"],
    ["WGRP","Wide-Grip Rear PullUp"],
    ["OADR","One Arm Dumbell Row"],
    ["VBP","V-bar Pulldown"],
    ["WBP","Wide Bar Pulldown"],

    //shoulder
    ["SDP","Standing Dumbell Press"],
    ["SMP","Standing Military Press"],
    ["SBMP","Seated Barbell Military Press"],
    ["OASL","One Arm Side Laterals"],
    ["PP","Power Partials"],

    //biceps
    ["EZC","EZ-BarCurl"],
    ["CDEZC","Close Grip EZ-BarCurl"],
    ["CC","Concentration Curls"],
    ["HC","Hammer Curls"],
    ["IDC","Incline Dumbbell Curls"],
    ["CBC","Cable Curl"],

    //triceps
    ["TP","Triceps Pushdown"],
    ["TBP","Bench Dip"],
    ["EZT","EZ-Bar Triceps"],
    ["STP","Seated Triceps Press"],
    ["CGBBP","Close Grip Barbell Bench Press"],

    //legs
    ["LP","Leg Press"],
    ["SQUAT","Squat"],

]);

export const MONTHS = new Map([
    ["Jan", 1],
    ["Feb", 2],
    ["Mar", 3],
    ["Apr", 4],
    ["May", 5],
    ["Jun", 6],
    ["Jul", 7],
    ["Aug", 8],
    ["Sep", 9],
    ["Oct", 10],
    ["Nov", 11],
    ["Dec", 12]
])

export const getWorkoutMenuName = (key) => {
    return WORKOUTDICT.get(key)
}

export const convertMonth = (key) => {
  return MONTHS.get(key)
}