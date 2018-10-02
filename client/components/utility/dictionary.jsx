const WORKOUTDICT = new Map([
    ["BBP", 'Barbell Bench Press'],
    ["FBDP", "Flat Bench Dumbbell Press"],
    ["IDP", "Incline Dumbbell Press"],
    ["LIBBP","Low Inclined Barbell Bench Press"],
    ["SMCP","Seated Machine Chest Press"],
    ["DIPS","Dips"],
    ["IBCF","Incline Bench Cable Fly"],
    ["PUS","pushUps"]
]);

export const getWorkoutMenuName = (key) => {
    return WORKOUTDICT.get(key)
}
