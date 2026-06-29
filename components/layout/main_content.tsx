'use client';
import data from '../../data/pc-components.json';
import Card from '../global/card';
import {
  getActiveIndex,
  getActiveItems,
  useInventory,
  useInventoryDispatch,
} from '../../lib/contexts/inventory-context';
import { componentType } from '@/lib/types/component';
import { currentBudget, isIncompatible } from '@/lib/utils/helpers';
export default function Main_Content() {
  const dispatch = useInventoryDispatch();
  const state = useInventory();
  const currentInventory = getActiveItems(state.history);
  const activeIndex = getActiveIndex(state.history);
  const canUndo = activeIndex > 0;
  const canRedo = activeIndex < state.history.length - 1;
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {data.map((item: componentType, index) => {
        return (
          <Card
            component={item}
            onClick={() =>
              dispatch({
                type: 'add',
                item: item,
              })
            }
            disabled={
              currentInventory.findIndex(el => el.id === item.id) !== -1 ||
              isIncompatible(item, currentInventory) ||
              currentBudget(currentInventory).availableBalance < item.price
            }
            key={index}
          />
        );
      })}
      <button
        onClick={() => {
          dispatch({
            type: 'undo',
          });
        }}
        disabled={!canUndo}
      >
        undo
      </button>
      <button
        onClick={() => {
          dispatch({
            type: 'redo',
          });
        }}
        disabled={!canRedo}
      >
        redo
      </button>
      <form action='/api/export-inventory' method='POST'>
        <input
          type='hidden'
          name='items'
          value={JSON.stringify(currentInventory)}
        />
        <button
          className='px-4 py-2'
          type='submit'
          disabled={currentInventory.length === 0}
        >
          Export Pdf
        </button>
      </form>
    </div>
  );
}
