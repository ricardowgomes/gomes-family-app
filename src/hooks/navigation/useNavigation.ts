import { useSearchParams, usePathname } from "next/navigation";

interface SearchParams {
  page?: number;
}

const useNavigation = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getUpdatedURL = (newParams: SearchParams) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update params with new values
    Object.keys(newParams).forEach((key) => {
      params.set(key, String(newParams[key]));
    });

    // Return the full URL with the updated query string
    return `${pathname}?${params.toString()}`;
  };

  return {
    getUpdatedURL,
  };
};

export default useNavigation;
