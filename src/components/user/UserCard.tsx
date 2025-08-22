/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { MapPin, Link,  Building } from "lucide-react";

type UserCardProps = {
    avatarUrl: string;
    name: string;
    username: string;
    bio: string;
    url: string;
    location?: string;
    website?: string;
    joinDate?: string;
    company?: string;
    followers?: any[]; // Array of follower objects
}

const UserCard = ({
    avatarUrl, 
    name, 
    username, 
    bio, 
    url, 
    location, 
    website, 
    
    company, 
    followers = []
}: UserCardProps) => {
    return (
        <div className="w-full mb-8 px-4">
            <div className="w-full max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* User Card - Left Side */}
                    <Card className="border-0 shadow-sm bg-white">
                        <CardHeader className="p-8">
                         {/* Profile Section */}
                            <div className="flex items-start justify-between mb-6">
                                {/* Avatar and Info */}
                                <div className="flex items-start gap-4">
                                    <img
                                        src={avatarUrl}
                                        alt={name}
                                        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                                    />
                                    <div>
                                        <CardTitle className="text-xl font-semibold text-gray-900 mb-1">
                                            {name}
                                        </CardTitle>
                                        <CardDescription className="text-gray-500 text-base">
                                            @{username}
                                        </CardDescription>
                                    </div>
                                </div>
                                
                                {/* Follow Button */}
                                <Button 
                                    variant="outline" 
                                    className="border-cyan-400 text-cyan-500 hover:bg-cyan-50 px-6 py-2 rounded-full font-medium"
                                >
                                    Follow
                                </Button>
                            </div>

                            {/* Bio */}
                            <div className="mb-8">
                                <p className="text-gray-700 text-base leading-relaxed">
                                    {bio}
                                </p>
                            </div>

                            {/* Details */}
                            <div className="space-y-4">
                                {/* Company */}
                                <div className="flex items-center gap-3">
                                    <Building className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-600 text-base">
                                        {company}
                                    </span>
                                </div>
                                
                                {/* Location */}
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-600 text-base">
                                        {location}
                                    </span>
                                </div>
                                
                                {/* Website */}
                                <div className="flex items-center gap-3">
                                    <Link className="w-5 h-5 text-gray-400" />
                                    <a 
                                        href={website} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-cyan-500 text-base hover:underline"
                                    >
                                        {website}
                                    </a>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Followers Card - Right Side */}
                    <Card className="border-0 shadow-sm bg-white">
                        <CardHeader className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="text-base text-gray-500 font-medium">Followers</div>
                                <div className="flex space-x-1">
                                    <button className="p-1.5 hover:bg-gray-100 rounded">
                                        <span className="text-gray-400 text-sm">▲</span>
                                    </button>
                                    <button className="p-1.5 hover:bg-gray-100 rounded">
                                        <span className="text-gray-400 text-sm">▼</span>
                                    </button>
                                </div>
                            </div>
                            
                            {/* Followers List */}
                            <div className="space-y-5">
                                {/* Sample Follower - matching the design */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src="/api/placeholder/48/48"
                                        alt="Yassmittal"
                                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-gray-900 text-base mb-1">
                                            Yassmittal
                                        </div>
                                        <div className="text-cyan-500 text-sm">
                                            https://github.com/yassmittal
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Additional followers from props */}
                                {followers.slice(0, 4).map((follower, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <img
                                            src={follower?.avatar_url || '/api/placeholder/48/48'}
                                            alt={follower?.login || 'Follower'}
                                            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-gray-900 text-base mb-1">
                                                {follower?.login || 'Username'}
                                            </div>
                                            <div className="text-cyan-500 text-sm">
                                                {follower?.html_url || 'https://github.com/username'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Bottom Navigation
                            <div className="flex justify-between items-center mt-8 pt-4">
                                <button className="p-2 hover:bg-gray-100 rounded">
                                    <span className="text-gray-400">◄</span>
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded">
                                    <span className="text-gray-400">►</span>
                                </button>
                            </div> */}
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default UserCard;