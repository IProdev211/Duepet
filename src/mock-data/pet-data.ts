import tommyPhoto from "../../assets/images/pet-images/archi.jpg";
import lovePhoto from "../../assets/images/pet-images/love.jpg";
import gloryPhoto from "../../assets/images/pet-images/glory.jpg";
import dorkyPhoto from "../../assets/images/pet-images/dorky.jpg";
import dangerPhoto from "../../assets/images/pet-images/danger.jpg";
import chiefPhoto from "../../assets/images/pet-images/chief.jpg";
import archiPhoto from "../../assets/images/pet-images/archi.jpg";

const data = [
  { id: "01", name: "Tommy", image: tommyPhoto },
  { id: "02", name: "Love", image: lovePhoto },
  { id: "03", name: "Glory", image: gloryPhoto },
  { id: "04", name: "Dorky", image: dorkyPhoto },
  { id: "05", name: "Danger", image: dangerPhoto },
  { id: "06", name: "Chief", image: chiefPhoto },
  { id: "07", name: "Archi", image: archiPhoto }
];

export type dataType = typeof data;
export default data;
