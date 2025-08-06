/* eslint-disable @typescript-eslint/no-unused-vars */
import { GET_USER } from "@/queries";
import { type UserData } from "@/types";
import { useQuery } from "@apollo/client";

type UserProfileProps = {
    userName: string;
   
}

const UserProfile = ({userName}: UserProfileProps) => {
    const {loading,error,data} = useQuery<UserData>(GET_USER, {variables: {login: userName},
    });
    if (loading) return <div>Loading..</div>
    if (error) return <h2 className='text-xl'>{error.message}</h2>;
  if (!data) return <h2 className='text-xl'>User Not Found.</h2>;
  const {
    avatarUrl,
    name,
    bio,
    url,
    repositories,
    followers,
    following,
    gists,
  } = data.user;
 return (
   <div>
      <h1>{bio}</h1>
      
    </div>
 )
}
export default UserProfile;