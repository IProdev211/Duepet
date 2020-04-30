export const NumberRegx = /^\d+(\.\d+)*$/;

export const TRACKER_ITEMS = {
  food: {
    name: "food",
    unit: "g",
    image: require("../../assets/images/tracker_food/tracker_food.png"),
    icon: require("../../assets/images/food/food.png")
  },
  water: {
    name: "water",
    unit: "ml",
    image: require("../../assets/images/tracker_water/tracker_water.png"),
    icon: require("../../assets/images/water/water.png")
  },
  weight: {
    name: "weight",
    unit: "kg",
    image: require("../../assets/images/tracker_weight/tracker_weight.png"),
    icon: require("../../assets/images/weight/weight.png")
  },
  exercise: {
    name: "exercise",
    unit: "mins",
    image: require("../../assets/images/tracker_exercise/tracker_exercise.png"),
    icon: require("../../assets/images/exercise/exercise.png")
  },
  poo: {
    name: "poo",
    unit: "times",
    image: require("../../assets/images/tracker_poo/tracker_poo.png"),
    icon: require("../../assets/images/poo/poo.png")
  },
  wee: {
    name: "wee",
    unit: "times",
    image: require("../../assets/images/tracker_wee/tracker_wee.png"),
    icon: require("../../assets/images/wee/wee.png")
  },
  vomit: {
    name: "vomit",
    unit: "g",
    image: require("../../assets/images/tracker_vomit/tracker_vomit.png"),
    icon: require("../../assets/images/vomit/vomit.png")
  }
};
