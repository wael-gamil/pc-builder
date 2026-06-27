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

type historyAction = 'add' | 'delete';

type historyEntry = {
  id: number;
  items: componentType[];
  isActive: boolean;
  action?: historyAction;
};

type state = {
  history: historyEntry[];
};

type actionType =
  | {
      type: 'add' | 'delete';
      item: componentType;
    }
  | {
      type: 'undo' | 'redo';
    };

const initialHistoryState: state = {
  history: [
    {
      id: 1,
      items: [],
      isActive: true,
    },
  ],
};

export const InventoryContext = createContext<state>(initialHistoryState);
export const InventoryDispatchContext = createContext<
  Dispatch<actionType> | undefined
>(undefined);

function inventoryReducer(state: state, action: actionType): state {
  switch (action.type) {
    case 'add': {
      const currentItems = getActiveItems(state.history);
      const alreadyExist = currentItems.some(
        item => item.id === action.item.id
      );
      if (alreadyExist) return state;
      const newItems = [...currentItems, action.item];
      return createNewHistoryEntry(state, newItems, 'add');
    }
    case 'delete': {
      const currentItems = getActiveItems(state.history);
      const newItems = currentItems.filter(el => el.id !== action.item.id);
      return createNewHistoryEntry(state, newItems, 'delete');
    }
    case 'undo': {
      const activeIndex = getActiveIndex(state.history);
      if (activeIndex <= 0) return state;
      return {
        history: state.history.map((entry, index) => ({
          ...entry,
          isActive: index === activeIndex - 1,
        })),
      };
    }

    case 'redo': {
      const activeIndex = getActiveIndex(state.history);
      if (activeIndex === -1 || activeIndex >= state.history.length - 1)
        return state;
      return {
        history: state.history.map((entry, index) => ({
          ...entry,
          isActive: index === activeIndex + 1,
        })),
      };
    }
    default:
      return state;
  }
}

export function InventroyProvider({ children }: { children: ReactNode }) {
  const [state, dispatchInventoryItems] = useReducer(
    inventoryReducer,
    initialHistoryState,
    initialPresistedValue => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('inventoryHistory');
        return stored ? JSON.parse(stored) : initialPresistedValue;
      }
      return initialPresistedValue;
    }
  );
  useEffect(() => {
    localStorage.setItem('inventoryHistory', JSON.stringify(state));
  }, [state]);
  return (
    <InventoryContext value={state}>
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

export function getActiveIndex(history: historyEntry[]) {
  return history.findIndex(el => el.isActive);
}

export function getActiveItems(history: historyEntry[]) {
  const activeIndex = getActiveIndex(history);
  return activeIndex === -1 ? [] : history[activeIndex].items;
}

export function createNewHistoryEntry(
  state: state,
  newItems: componentType[],
  action: historyAction
): state {
  const activeIndex = getActiveIndex(state.history);
  const historyBeforeActive = state.history.slice(0, activeIndex + 1);
  const inactiveHistory = historyBeforeActive.map(historyEntry => {
    return {
      ...historyEntry,
      isActive: false,
    };
  });
  const lastEntry = historyBeforeActive[historyBeforeActive.length - 1];
  const newEntry: historyEntry = {
    id: lastEntry.id + 1,
    items: newItems,
    isActive: true,
    action,
  };
  return { history: [...inactiveHistory, newEntry] };
}
