import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useNavigation from "@/hooks/navigation/useNavigation";

import { useSearchParams } from "next/navigation";

interface PaginationProps {
  lastPage: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({ lastPage }) => {
  const { getUpdatedURL } = useNavigation();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (lastPage === 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={getUpdatedURL({ page: currentPage - 1 })} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {currentPage !== lastPage && (
          <PaginationItem>
            <PaginationNext href={getUpdatedURL({ page: currentPage + 1 })} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
