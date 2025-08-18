import { useState, type FormEvent } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

type SearchFormProps = {
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm = ({userName, setUserName}: SearchFormProps) => {
    const [text,setText] = useState(userName);
    
    // Mock requests counter - replace with your actual API call counter
    const [requests, setRequests] = useState(50);
    const maxRequests = 60;
    
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text === '') {
            console.log('Please enter a name')
            return;
        }
        setUserName(text);
        // Increment request counter when search is performed
        setRequests(prev => Math.min(prev + 1, maxRequests));
    }

    return (
        <div className="w-full mb-8 pt-8">
            <div className="flex items-center gap-4 w-full max-w-5xl mx-auto">
                {/* Search Form - takes most of the width */}
                <form onSubmit={handleSearch} className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg shadow-sm flex-grow">
                    {/* Search Icon */}
                    <Search className="w-5 h-5 text-gray-400" />
                    
                    {/* Search Input */}
                    <Input 
                        type='text'
                        id='search'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter Github User"
                        className='flex-grow text-4xl text-[#102a42] tracking-[2px] font-semibold border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-1 '
                    />
                    
                    {/* Search Button */}
                    <Button 
                        type='submit' 
                        className="bg-[#2caeba] tracking-[2px] transition-all duration-300 ease-linear hover:bg-[#88ebf2] hover:text-[#044c53] cursor-pointer text-white px-[8px] py-[4px] flex-shrink-0"
                    >
                        Search
                    </Button>
                </form>
                
                {/* Requests Counter - separate from form */}
                <div className="flex items-center gap-2 text-[#617d98] font-normal  text-3xl whitespace-nowrap pl-3">
                    <span>Requests :</span>
                    <span className="">
                        {requests} / {maxRequests}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SearchForm;