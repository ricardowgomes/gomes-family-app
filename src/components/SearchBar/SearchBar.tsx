import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";

interface SearchBarProps {
  placeholder: string;
  setSearchTerm: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm, placeholder }) => (
  <InputGroup>
    <Input placeholder={placeholder} onChange={(e) => setSearchTerm(e.target.value)} />
    <InputRightElement pointerEvents='none'>
      <SearchIcon color='teal' />
    </InputRightElement>
  </InputGroup>
);

export default SearchBar;
