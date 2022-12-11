import {
  PropsWithChildren,
  createContext,
  Dispatch,
  useContext,
  SetStateAction
} from 'react';
import { useStatePersist } from 'use-state-persist';
import { useModal } from '@nextui-org/react';
import { union } from 'lodash'

const context = createContext<Bucket>({} as never);

interface Bucket {
  productIds: string[];
  setProductIds: Dispatch<string>
  deleteId: (v: string) => void;
  clean: () => void;
  bindings: {open: boolean, onClose: () => void}
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const useBucket = () => useContext(context);

export const BucketProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useStatePersist<string[]>('@bucket', []);
  const { bindings, setVisible } = useModal();

  const value: Bucket = {
    productIds: state,
    setProductIds: (value) => {
      setState(prev => {
        const da: string[] = [];

        da.push(value)

        // @ts-ignore
        return union(prev, da)
      });
    },
    deleteId: value => setState(prev => prev.filter(el => el !== value)),
    clean: () => setState([]),
    bindings,
    setVisible,
  }

  return (
    <context.Provider value={value}>{children}</context.Provider>
  )
}
