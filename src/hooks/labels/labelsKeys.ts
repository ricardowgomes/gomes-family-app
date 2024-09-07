export const labelsKeys = {
  root: ["labels"] as const,
  all: () => [...labelsKeys.root, "all"],
  search: (searchTerm: string, excludedIds: string[]) => [
    ...labelsKeys.root,
    "search",
    searchTerm,
    excludedIds,
  ],
  single: (id: string) => [...labelsKeys.root, id],
};
