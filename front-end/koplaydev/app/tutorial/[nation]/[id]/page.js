import FlipC from "./component/china/FlipC";
import RainC from "./component/china/RainC";
import SmuC from "./component/china/SmuC";
import FlipK from "./component/korea/FlipK";
import RainK from "./component/korea/RainK";
import SmuK from "./component/korea/SmuK";
import FlipT from "./component/thailand/FlipT";
import RainT from "./component/thailand/RainT";
import SmuT from "./component/thailand/SmuT";
import FlipV from "./component/vietnam/FlipV";
import RainV from "./component/vietnam/RainV";
import SmuV from "./component/vietnam/SmuV";

export default async function game({ params }) {
  return <TutorialSelector nationName={params.nation} gameidx={params.id} />;
}

const TutorialSelector = (props) => {
  if (props.nationName === "Korea") {
    if (props.gameidx === "1") {
      return <RainK />;
    } else if (props.gameidx === "2") {
      return <FlipK />;
    } else if (props.gameidx === "3") {
      return <SmuK />;
    }
  } else if (props.nationName === "Thailand") {
    if (props.gameidx === "1") {
      return <RainT />;
    } else if (props.gameidx === "2") {
      return <FlipT />;
    } else if (props.gameidx === "3") {
      return <SmuT />;
    }
  } else if (props.nationName === "China") {
    if (props.gameidx === "1") {
      return <RainC />;
    } else if (props.gameidx === "2") {
      return <FlipC />;
    } else if (props.gameidx === "3") {
      return <SmuC />;
    }
  } else if (props.nationName === "Vietnam") {
    if (props.gameidx === "1") {
      return <RainV />;
    } else if (props.gameidx === "2") {
      return <FlipV />;
    } else if (props.gameidx === "3") {
      return <SmuV />;
    }
  }
};
