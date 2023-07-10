import React from "react";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import ButtonSecondary from "src/components/shared/Button/ButtonSecondary";

const FollowButton = ({
  className = "relative z-10",
  sizeClass = "px-4 py-1.5 min-w-[84px]",
  fontSize = "text-sm font-medium",
  isFollowing = Math.random() > 0.5,
}) => {
  const [following, setFollowing] = React.useState(isFollowing);

  return !following ? (
    <ButtonPrimary
      className={className}
      sizeClass={sizeClass}
      fontSize={fontSize}
      onClick={() => setFollowing(true)}
    >
      Follow
    </ButtonPrimary>
  ) : (
    <ButtonSecondary
      className={className}
      sizeClass={sizeClass}
      fontSize={fontSize}
      onClick={() => setFollowing(false)}
    >
      <span className="text-sm ">Following</span>
    </ButtonSecondary>
  );
};

export default FollowButton;
