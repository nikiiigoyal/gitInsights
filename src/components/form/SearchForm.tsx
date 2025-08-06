type SearchFormProps = {
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm = ({userName, setUserName}: SearchFormProps) => {
 return (
    <div className="text-center">
        SearchForm
    </div>
 )
}
export default SearchForm;