import React from "react";
import PropTypes from "prop-types";

const Startpage = (props) => {
  Startpage.propTypes = {
    clickStart: PropTypes.func,
  };
  return (
    <main className="startpage">
      <h1>Quizzical</h1>
      <h3>Test your knowledge!</h3>
      <button onClick={props.clickStart}>Start quiz</button>
    </main>
  );
};

export default Startpage;
