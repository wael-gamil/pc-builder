'use client';

import Image from 'next/image';
import { Button, Card, Empty, Tag, theme } from 'antd';
import {
  getActiveItems,
  useInventory,
  useInventoryDispatch,
} from '@/lib/contexts/inventory-context';
import { currentBudget } from '@/lib/utils/helpers';

export default function Layout_Sider() {
  const { token } = theme.useToken();

  const state = useInventory();
  const dispatch = useInventoryDispatch();

  const currentInventory = getActiveItems(state.history);
  const budget = currentBudget(currentInventory);

  return (
    <Card title={`Selected Items (${currentInventory.length})`}>
      {currentInventory.length === 0 && (
        <Empty description='No items selected' />
      )}

      <div className='flex flex-col gap-3'>
        {currentInventory.map(item => (
          <div
            key={item.id}
            className='flex items-center gap-3 border-b pb-3'
            style={{ borderColor: token.colorBorder }}
          >
            <Image
              src={item.image}
              width={48}
              height={48}
              alt={item.name}
              className='object-contain'
            />

            <div className='min-w-0 flex-1'>
              <p className='truncate text-sm font-semibold'>{item.name}</p>

              <Tag
                className='mt-1'
                style={{
                  color: token.colorPrimary,
                  background: token.colorPrimaryBg,
                  borderColor: token.colorPrimaryBorder,
                }}
              >
                {item.category}
              </Tag>
            </div>

            <p className='text-sm font-bold'>${item.price}</p>

            <Button
              danger
              variant='outlined'
              onClick={() =>
                dispatch({
                  type: 'delete',
                  item,
                })
              }
            >
              ×
            </Button>
          </div>
        ))}
      </div>

      <div className='mt-4 flex items-center justify-between border-t pt-4'>
        <p style={{ color: token.colorTextSecondary }}>
          Subtotal ({currentInventory.length})
        </p>
        <p className='text-lg font-bold'>${budget.currentItemsPrice}</p>
      </div>
    </Card>
  );
}
