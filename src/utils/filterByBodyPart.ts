export const filterByBodyParts = (muscleGroup: Set<string>): string[] => {
  return Array.from(muscleGroup).map(mg => assignMuscleGroup(mg));
}

export const muscleGroups: string[] = [
  "abs",
  "chest",
  "legs",
  "shoulders",
  "back",
  "arms",
];

export const assignMuscleGroup = (muscleName: string) => {
  switch (muscleName) {
    case "abdominals":
      return "abs";
    case "chest":
      return "chest";
    case "abductors" || "adductors" ||"calves" ||"quadriceps" || "hamstrings" ||"glutes":
      return "legs";
    case "shoulders" || "neck":
      return "shoulders";
    case "lats" || "traps" || "middle back" || "lower back":
      return "back";
    case "forearms" || "biceps" || "triceps":
      return "arms";
    default:
      return "";
  }
}

