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
import { Button, Card as AntdCard } from 'antd';

type mainContentProps = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: string[];
};

export default function Main_Content({
  activeCategory,
  setActiveCategory,
  categories,
}: mainContentProps) {
  const dispatch = useInventoryDispatch();
  const state = useInventory();

  const currentInventory = getActiveItems(state.history);
  const activeIndex = getActiveIndex(state.history);

  const canUndo = activeIndex > 0;
  const canRedo = activeIndex < state.history.length - 1;

  const budget = currentBudget(currentInventory);

  const filteredData =
    activeCategory === 'All'
      ? data
      : data.filter(item => item.category === activeCategory);

  return (
    <div>
      <AntdCard className='mb-4 hidden lg:block'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <div className='flex flex-wrap gap-2'>
            {categories.map(category => (
              <Button
                key={category}
                type={activeCategory === category ? 'primary' : 'default'}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className='flex flex-wrap gap-2'>
            <Button
              onClick={() => {
                dispatch({ type: 'undo' });
              }}
              disabled={!canUndo}
            >
              Undo
            </Button>

            <Button
              onClick={() => {
                dispatch({ type: 'redo' });
              }}
              disabled={!canRedo}
            >
              Redo
            </Button>

            <form action='/api/export-inventory' method='POST'>
              <input
                type='hidden'
                name='items'
                value={JSON.stringify(currentInventory)}
              />

              <Button
                htmlType='submit'
                disabled={currentInventory.length === 0}
              >
                Export PDF
              </Button>
            </form>
          </div>
        </div>
      </AntdCard>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 pt-2'>
        {filteredData.map((item: componentType) => {
          const selected =
            currentInventory.findIndex(el => el.id === item.id) !== -1;

          const alreadyHasCategory = currentInventory.some(
            selectedItem => selectedItem.category === item.category
          );

          const incompatible = isIncompatible(item, currentInventory);
          const overBudget = budget.availableBalance < item.price;

          const blocked =
            !selected && (alreadyHasCategory || incompatible || overBudget);

          let disabledReason = '';

          if (selected) {
            disabledReason = 'Already added';
          } else if (alreadyHasCategory) {
            disabledReason = `Only one ${item.category} can be selected`;
          } else if (incompatible) {
            disabledReason = 'Not compatible with your current build';
          } else if (overBudget) {
            disabledReason = 'Exceeds the remaining budget';
          }

          return (
            <Card
              component={item}
              onClick={() =>
                dispatch({
                  type: 'add',
                  item,
                })
              }
              disabled={selected || blocked}
              selected={selected}
              disabledReason={disabledReason}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
}
