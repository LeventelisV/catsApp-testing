import  "./Cards.css";
import heartFilled from "../../svgs/heartFilled.svg";
import heartOutlined from "../../svgs/heartOutlined.svg";
import { useState } from "react";

export default function Card({ name, phone, email, image, favored, index, updateFavoured }) {

    const [isFavored,setIsFavored] = useState(favored)
    const heartButtonClicked = () =>{
        updateFavoured(index,!isFavored)
        setIsFavored(!isFavored)
    }

  return (
    <article className="card">
      <div className="card-header">
        <img src={image.url} alt={image.alt} className="card-img" />
        <button className="heart" onClick={heartButtonClicked}>
          {isFavored ? (
            <img src={heartFilled} alt="filled heart" />
          ) : (
            <img src={heartOutlined} alt="outlined heart" />
          )}
        </button>
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </article>
  );
}
