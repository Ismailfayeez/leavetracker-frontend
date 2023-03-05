import React from "react";
import AbsenteeCard from "../ui-kit/cards/apps/leavetracker/absentee-card/AbsenteeCard";
function PlayGround(props) {
  return (
    <div>
      <AbsenteeCard name="fayeez" groups={["india", "pakistan", "srilanka"]} />
    </div>
  );
}

export default PlayGround;
