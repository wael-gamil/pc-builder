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
export default function Main_Content() {
  const dispatch = useInventoryDispatch();
  const state = useInventory();
  const currentInventory = getActiveItems(state.history);
  const activeIndex = getActiveIndex(state.history);
  const canUndo = activeIndex > 0;
  const canRedo = activeIndex < state.history.length - 1;
  return (
    <div className='flex gap-2'>
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
              currentInventory.findIndex(el => el.id === item.id) !== -1
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
    </div>
  );
}
