import { useState, type FormEvent } from "react";
;
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
        <div className="w-full mb-8 pt-22 flex">
            <form onSubmit={handleSearch} className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                {/* Search Icon */}
                <Search className="w-5 h-5 text-gray-400 " />
                
                {/* Enter Github User Label */}
               
                
                {/* Search Input */}
                <Input 
                    type='text'
                    id='search'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                   placeholder="Enter Github User"
                    className='flex-grow border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-2'
                />
                
                {/* Search Button */}
                <Button 
                    type='submit' 
                    className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 flex-shrink-0"
                >
                    Search
                </Button>
                
               
            </form>
             {/* Requests Counter */}
                <div className="flex items-center gap-2 text-gray-500 text-sm whitespace-nowrap pl-4 border-l border-gray-200">
                    <span>Requests:</span>
                    <span className="font-medium">
                        {requests} / {maxRequests}
                    </span>
                </div>
        </div>
    )
}

export default SearchForm;