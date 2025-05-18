import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { clickedProfile } from "../../hand/handSlice";
export default function Profile({ img, position, player }) {
  const profile = useSelector((state) => state.hand.profile[player]);
  const dispatch = useDispatch();
  return (
    <div
      className="profile absolute"
      onClick={() => {
        if (player === "player") {
          dispatch(clickedProfile("player"));
        } else {
          dispatch(clickedProfile("enemy"));
        }
      }}
      style={{
        top: position.top,
        left: position.left,
        bottom: position.bottom?(position.bottom):0,
      }}
    >
      <div className="image-container ">
        <img
          className="profile-image transition-all duration-300 ease-in-out hover:-translate-y-2"
          src={"/cards/card-images/" + img.pack + "/" + img.pack + ".png"}
          alt=""
          style={{
            border: profile.borderColor
              ? `3px solid ${profile.borderColor}`
              : `0px solid ${profile.borderColor}`,
            borderRadius: profile.borderColor ? "50%" : "0%",
          }}
        />
      </div>

      {profile.armor > 0 && (
        <div className="armor-bar absolute">
          <img
            className="armor-bar-image absolute"
            src="/armor-bar.png"
            alt=""
          />
          <div className="flex justify-center items-center  ">
            <p className="text-white text-xl z-10 armor-bar-text">
              {profile.armor}
            </p>
          </div>
        </div>
      )}

      <div className="health-bar absolute ">
        <img
          className="health-bar-image absolute"
          src="/health-bar.png"
          alt=""
        />
        {/* Health Bar label */}
        <span
          style={{
            position: "absolute",
            left: "110%",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "serif",
            fontWeight: "bold",
            fontSize: "1rem",
            color: "#fff",
            textShadow: "1px 1px 3px #000",
            letterSpacing: "1px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          Health Bar
        </span>
        <div className="flex justify-center items-center  ">
          <p className="text-white text-xl z-10 health-bar-text">
            {profile.cardHealth}
          </p>
        </div>
      </div>
    </div>
  );
}
