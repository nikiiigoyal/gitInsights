/* eslint-disable @typescript-eslint/no-unused-vars */
import { GET_USER } from "@/queries";
import { type UserData } from "@/types";
import { useQuery } from "@apollo/client";
import StatsContainer from "./StatsContainer";
import UserCard from "./UserCard";

import UsedLanguages from "../charts/UsedLanguages";
// import PopularRepos, { MostPopular } from "../charts/PopularRepos";
// import ForkedRepos, { MostForked } from "../charts/ForkedRepos";
import Loading from "./Loading";
import MostForked from "../charts/ForkedRepos";
import  MostPopular  from "../charts/PopularRepos";

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
  if (loading) return <Loading />;
 return (
    <div>
    <UserCard 
    avatarUrl={avatarUrl} 
    name={name} 
    bio={bio} 
    url={url}
    username="john doe"  // At minimum add this
    followers={[]}       // Empty array if no followers data
/>
    <StatsContainer totalRepos={repositories.totalCount}
      followers={followers.totalCount}
      following={following.totalCount}
      gists={gists.totalCount}/>
      {
  repositories.totalCount > 0 && (
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <UsedLanguages repositories={repositories.nodes} />
      <MostPopular repositories={repositories.nodes} />
      {/* <StarsPerLanguage repositories={repositories} /> */}
      <MostForked repositories={repositories.nodes} />
    </div>
  )
}
  </div>
 )
}
export default UserProfile;