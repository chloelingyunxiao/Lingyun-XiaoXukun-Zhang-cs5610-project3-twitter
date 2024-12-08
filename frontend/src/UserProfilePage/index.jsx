import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { username } = useParams();

  return (
    <div>
      <h1>User Profile: {username}</h1>
      {/* Fetch and display user posts here */}
    </div>
  );
};

export default UserProfile;
