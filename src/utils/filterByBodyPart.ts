export const filterByBodyParts = (muscleName: string) => {
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

