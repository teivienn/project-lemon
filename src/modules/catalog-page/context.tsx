import {
  PropsWithChildren,
  createContext,
  useState,
  Dispatch,
  useContext,
  useMemo,
} from 'react';

const context = createContext<Con>({} as any);

type Con = {
  categoryId: string;
  subCategoryId: string;
  search: string;
  setSearch: Dispatch<any>;
  setSubCategoryId: Dispatch<any>;
  setCategoryId: Dispatch<any>;
  selectedCategoryIdValue: string;
  selectedSubCategoryIdValue: string;
};

export const useCatContext = () => useContext(context);

export const Context = ({ children }: PropsWithChildren) => {
  const [categoryId, setCategoryId] = useState<any>(new Set([]));
  const [subCategoryId, setSubCategoryId] = useState<any>(new Set([]));
  const [search, setSearch] = useState('');

  const selectedCategoryIdValue = useMemo(
    () => Array.from(categoryId).join(', ').replaceAll('_', ' '),
    [categoryId],
  );

  const selectedSubCategoryIdValue = useMemo(
    () => Array.from(subCategoryId).join(', ').replaceAll('_', ' '),
    [subCategoryId],
  );

  const value = {
    categoryId,
    selectedCategoryIdValue,
    setCategoryId,
    subCategoryId,
    selectedSubCategoryIdValue,
    search,
    setSearch,
    setSubCategoryId,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};
