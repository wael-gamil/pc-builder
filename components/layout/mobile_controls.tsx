'use client';

import Layout_Sider from '@/components/layout/sider';
import {
  getActiveIndex,
  getActiveItems,
  useInventory,
  useInventoryDispatch,
} from '@/lib/contexts/inventory-context';
import { BUDGET } from '@/lib/constants/constants';
import { currentBudget } from '@/lib/utils/helpers';
import { Button, Drawer, Progress, theme } from 'antd';
import { useState } from 'react';
import { BsCart3, BsSliders } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';

type MobileControlsProps = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: string[];
};

export default function Mobile_Controls({
  activeCategory,
  setActiveCategory,
  categories,
}: MobileControlsProps) {
  const { token } = theme.useToken();

  const dispatch = useInventoryDispatch();
  const state = useInventory();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const currentInventory = getActiveItems(state.history);
  const budget = currentBudget(currentInventory);

  const activeIndex = getActiveIndex(state.history);
  const canUndo = activeIndex > 0;
  const canRedo = activeIndex < state.history.length - 1;

  const percent = Math.min(
    100,
    Math.round((budget.currentItemsPrice / BUDGET) * 100)
  );

  return (
    <>
      <div
        className='fixed bottom-4 left-4 right-4 z-50 rounded-xl border p-3 shadow-lg lg:hidden'
        style={{
          background: token.colorBgContainer,
          borderColor: token.colorBorder,
        }}
      >
        <div className='mb-2 grid grid-cols-3 gap-2'>
          <Button onClick={() => setFiltersOpen(true)} icon={<BsSliders />}>
            Filters
          </Button>

          <Button onClick={() => setActionsOpen(true)} icon={<FiSettings />}>
            Actions
          </Button>

          <Button onClick={() => setCartOpen(true)} icon={<BsCart3 />}>
            Cart ({currentInventory.length})
          </Button>
        </div>

        <div>
          <div className='mb-1 flex items-center justify-between'>
            <span
              className='text-xs font-semibold'
              style={{ color: token.colorText }}
            >
              ${budget.currentItemsPrice} / ${BUDGET}
            </span>

            <span
              className='text-xs font-bold'
              style={{ color: token.colorText }}
            >
              {percent}%
            </span>
          </div>

          <Progress
            percent={percent}
            showInfo={false}
            size='small'
            aria-label={`Budget used ${percent}%`}
          />
        </div>
      </div>

      <Drawer
        title='Filters'
        placement='bottom'
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        size='32vh'
      >
        <div className='flex flex-wrap gap-2'>
          {categories.map(category => (
            <Button
              key={category}
              type={activeCategory === category ? 'primary' : 'default'}
              onClick={() => {
                setActiveCategory(category);
                setFiltersOpen(false);
              }}
            >
              {category}
            </Button>
          ))}
        </div>
      </Drawer>

      <Drawer
        title='Actions'
        placement='bottom'
        open={actionsOpen}
        onClose={() => setActionsOpen(false)}
        size='32vh'
      >
        <div className='flex flex-col gap-3'>
          <Button
            block
            onClick={() => dispatch({ type: 'undo' })}
            disabled={!canUndo}
          >
            Undo
          </Button>

          <Button
            block
            onClick={() => dispatch({ type: 'redo' })}
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
              block
              htmlType='submit'
              disabled={currentInventory.length === 0}
            >
              Export PDF
            </Button>
          </form>
        </div>
      </Drawer>

      <Drawer
        title='Selected Items'
        placement='bottom'
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        size='75vh'
      >
        <Layout_Sider />

        <Button block className='mt-4' onClick={() => setCartOpen(false)}>
          Close
        </Button>
      </Drawer>
    </>
  );
}
