import React from "react";
import "../../styles/card-home.css";
// import snack from "../../assets/category/snack.jpg";

function CardHome({ title, image }) {
  return (
    <div className="cardHome">
      <img
        src={image}
        className="w-full h-full object-cover"
        width="300"
        height="200"
      />
      <span>{title}</span>
    </div>
  );
}

export default CardHome;
