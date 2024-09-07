import { colors, Colors } from "@/constants";
import { useQueryLabel } from "@/hooks/labels";
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

const getColor = (cuid: string): Colors => {
  try {
    const number = cuidToNumber(cuid);
    return colors[number % 10];
  } catch (error) {
    console.log("Error getting color for label:", error);
    return Colors.Gray;
  }
};

interface LabelTagProps {
  labelId: Label["id"];
  onCloseClick: () => void;
}

const LabelTag: React.FC<LabelTagProps> = ({ labelId, onCloseClick }) => {
  const { data: label } = useQueryLabel(labelId);

  return (
    <Tag
      size="sm"
      borderRadius="full"
      variant="solid"
      colorScheme={getColor(labelId)}
    >
      <TagLabel>{label.name}</TagLabel>
      <TagCloseButton onClick={onCloseClick} />
    </Tag>
  );
};

export default LabelTag;
