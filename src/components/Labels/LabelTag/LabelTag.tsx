import { colors, Colors } from "@/constants";
import { Label } from "@/types";
import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";

function cuidToNumber(cuid: string): number {
  // Remove any non-alphanumeric characters from the CUID
  const sanitizedCuid = cuid.replace(/[^a-zA-Z0-9]/g, '');

  // Convert the sanitized CUID to a base-36 number
  const number = parseInt(sanitizedCuid, 36);

  // Return the numeric value
  return number;
}

const getColor = (cuid: string): Colors => colors[cuidToNumber(cuid) % 10];

interface LabelTagProps {
  label: Label;
  onCloseClick: () => void;
}

const LabelTag: React.FC<LabelTagProps> = ({ label, onCloseClick }) => {
  return (
    <Tag
      size="sm"
      borderRadius="full"
      variant="solid"
      colorScheme={getColor(label.id)}
    >
      <TagLabel>{label.name}</TagLabel>
      <TagCloseButton onClick={onCloseClick} />
    </Tag>
  );
};

export default LabelTag;
