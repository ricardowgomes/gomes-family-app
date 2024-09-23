import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";

interface SearchBarProps {
  placeholder: string;
  setSearchTerm: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setSearchTerm,
  placeholder,
}) => (
  <InputGroup
    p={4}
    borderWidth={1}
    borderRadius="md"
    shadow="md"
    backgroundColor={"white"}
    w="100%"
  >
    <Input
      placeholder={placeholder}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <InputRightElement pointerEvents="none">
      <SearchIcon color="teal" position={'absolute'} right={8} top={7} />
    </InputRightElement>
  </InputGroup>
);

export default SearchBar;
