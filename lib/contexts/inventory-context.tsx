'use client';
import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  Dispatch,
} from 'react';
import { componentType } from '../types/component';

type actionType =
  | {
      type: 'add';
      item: componentType;
    }
  | {
      type: 'undo';
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
  switch (action.type) {
    case 'add':
      return [...items, action.item];
    case 'undo':
      return items.slice(0, -1);
    default:
      return items;
  }
}
export function InventroyProvider({ children }: { children: ReactNode }) {
  const [inventoryitems, dispatchInventoryItems] = useReducer(
    inventoryReducer,
    intialInventory
  );
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
