import React, {useEffect} from "react";
import ButtonPrimary from "src/components/shared/Button/ButtonPrimary";
import ButtonSecondary from "src/components/shared/Button/ButtonSecondary";
import webClientService from "src/lib/services/webClientService";
import {useSnackbar} from "notistack";

const FollowButton = ({
  className = "relative z-10",
  sizeClass = "px-4 py-1.5 min-w-[84px]",
  fontSize = "text-sm font-medium",
  isFollowing,
  account,
  user
}) => {
  const [following, setFollowing] = React.useState(() => isFollowing);
  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(() => {
    setFollowing(isFollowing)
  }, [isFollowing]);
  
  return account?._id === user?._id ?
    <div></div> : !following ? (
      <ButtonPrimary
        className={className}
        sizeClass={sizeClass}
        fontSize={fontSize}
        onClick={async () => {
          const response = await webClientService.followingUser({
            accountId: account._id,
            followerId: user._id
          })
          if (response.code === 200) {
            enqueueSnackbar('Successful user following', {
              variant: "success"
            })
            setFollowing(true)
          }
        }}
      >
        Follow
      </ButtonPrimary>
    ) : (
      <ButtonSecondary
        className={className}
        sizeClass={sizeClass}
        fontSize={fontSize}
        onClick={async () => {
          const response = await webClientService.followingUser({
            accountId: account._id,
            followerId: user._id
          })
          if (response.code === 200) {
            enqueueSnackbar('Successfully unfollowed the user', {
              variant: "success"
            })
            setFollowing(false)
          }
        }}
      >
        <span className="text-sm ">Following</span>
      </ButtonSecondary>
    );
};

export default FollowButton;
