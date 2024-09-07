import { Flex } from "@chakra-ui/react";
import LabelTag from "../LabelTag/LabelTag";
import { NewTransaction } from "@/types";

interface SelectedLabelsProps {
  labelIds: NewTransaction["labelIds"];
  handleRemoveLabel: (labelId: string) => void;
}

const SelectedLabels: React.FC<SelectedLabelsProps> = ({
  labelIds,
  handleRemoveLabel,
}) => {
  return (
    labelIds !== undefined &&
    labelIds.length > 0 && (
      <Flex gap={2} flexWrap="wrap" justifyContent="flex-start">
        {labelIds.map((id) => (
          <LabelTag
            key={id}
            labelId={id}
            onCloseClick={() => handleRemoveLabel(id)}
          />
        ))}
      </Flex>
    )
  );
};

export default SelectedLabels;
