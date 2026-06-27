'use client';
import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  Dispatch,
  useEffect,
} from 'react';
import { componentType } from '../types/component';

type actionType =
  | {
      type: 'add' | 'delete';
      item: componentType;
    }
  | {
      type: 'undo' | 'redo';
    };

const intialInventory: componentType[] = [];

export const InventoryContext = createContext(intialInventory);
export const InventoryDispatchContext = createContext<
  Dispatch<actionType> | undefined
>(undefined);

function inventoryReducer(
  items: componentType[],
  action: actionType
): componentType[] {
  let newItems = items;
  switch (action.type) {
    case 'add':
      newItems = [...items, action.item];
      return newItems;
    case 'delete':
      newItems = items.filter(el => el.id !== action.item.id);
      return newItems;
    case 'undo':
    case 'redo':
    default:
      return items;
  }
}

export function InventroyProvider({ children }: { children: ReactNode }) {
  const [inventoryitems, dispatchInventoryItems] = useReducer(
    inventoryReducer,
    intialInventory,
    initialPresistedValue => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('inventoryItems');
        return stored ? JSON.parse(stored) : initialPresistedValue;
      }
      return initialPresistedValue;
    }
  );
  useEffect(() => {
    localStorage.setItem('inventoryItems', JSON.stringify(inventoryitems));
  }, [inventoryitems]);
  return (
    <InventoryContext value={inventoryitems}>
      <InventoryDispatchContext value={dispatchInventoryItems}>
        {children}
      </InventoryDispatchContext>
    </InventoryContext>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}

export function useInventoryDispatch() {
  const context = useContext(InventoryDispatchContext);
  if (!context) {
    throw new Error(
      'useInventoryDispatch must be used within an InventoryProvider'
    );
  }
  return context;
}
