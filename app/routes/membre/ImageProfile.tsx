import profile_placeholder from "~/assets/images/profile_placeholder.jpg";

interface Props {
  profile: string;
}

function ImageProfile({ profile }: Props) {
  return (
    <>
      {profile ? (
        <div>
          <img
            src={import.meta.env.VITE_API_URL + `files/image/${profile}`}
            alt=""
            className="w-[40px] h-[40px] rounded-[50%]"
          />
        </div>
      ) : (
        <img
          src={profile_placeholder}
          alt=""
          className="w-[40px] h-[40px] rounded-[50%]"
        />
      )}
    </>
  );
}

export default ImageProfile;
