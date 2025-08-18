import StatsCard from "./StatsCard";
import { BookOpen, Users, UserPlus, Code } from "lucide-react";

type StatsContainerProps = {
    totalRepos: number;
    followers: number;
    following: number;
    gists: number;
}

const StatsContainer = (props: StatsContainerProps) => {
    const {totalRepos, followers, following, gists} = props;
    
    return (
        <div className="w-full mb-8 px-1">
            <div className="w-full max-w-6xl mx-auto">
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
                    <StatsCard 
                        title='Repos' 
                        count={totalRepos} 
                        icon={<BookOpen className="w-6 h-6" />}
                        bgColor="bg-pink-100"
                        iconColor="text-pink-600"
                    />
                    <StatsCard 
                        title='Followers' 
                        count={followers} 
                        icon={<Users className="w-6 h-6" />}
                        bgColor="bg-cyan-100"
                        iconColor="text-cyan-600"
                    />
                    <StatsCard 
                        title='Following' 
                        count={following} 
                        icon={<UserPlus className="w-6 h-6" />}
                        bgColor="bg-purple-100"
                        iconColor="text-purple-600"
                    />
                    <StatsCard 
                        title='Gists' 
                        count={gists} 
                        icon={<Code className="w-6 h-6" />}
                        bgColor="bg-yellow-100"
                        iconColor="text-yellow-600"
                    />
                </div>
            </div>
        </div>
    )
}

export default StatsContainer;