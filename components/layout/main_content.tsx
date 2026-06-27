'use client';
import data from '../../data/pc-components.json';
import Card from '../global/card';
import {
  useInventory,
  useInventoryDispatch,
} from '../../lib/contexts/inventory-context';
import { componentType } from '@/lib/types/component';
import { useEffect } from 'react';
export default function Main_Content() {
  const dispatch = useInventoryDispatch();
  const inventoryItems = useInventory();
  useEffect(() => {
    console.log(inventoryItems);
  }, [inventoryItems]);
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
            disabled={inventoryItems.findIndex(el => el.id === item.id) !== -1}
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
        disabled={inventoryItems.length === 0}
      >
        undo
      </button>
    </div>
  );
}
