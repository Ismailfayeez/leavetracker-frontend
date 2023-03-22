import React from "react";
import { ReactComponent as EmptyImg } from "../../assets/images/empty.svg";
import "./noResult.scss";

function NoResult({ statement, illustration: Illustration, noImage }) {
  return (
    <div className="no-result flex flex--column flex--center gap--10px full-height">
      {noImage ? null : Illustration ? (
        <div>
          <Illustration className="illustration base-size" />
        </div>
      ) : (
        <div>
          <EmptyImg className="illustration base-size" />
        </div>
      )}
      <p style={{ textAlign: "center" }}>
        {" "}
        {statement ? statement : "No Result found"}
      </p>
    </div>
  );
}

export default NoResult;
