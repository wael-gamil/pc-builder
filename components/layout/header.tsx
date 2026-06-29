'use client';

import { Card, Progress, Switch, theme } from 'antd';
import { BUDGET } from '@/lib/constants/constants';
import { getActiveItems, useInventory } from '@/lib/contexts/inventory-context';
import { currentBudget } from '@/lib/utils/helpers';
import { useAppTheme } from '@/providers/AppThemeProvider';

export default function Layout_Header() {
  const { token } = theme.useToken();
  const { mode, toggleTheme } = useAppTheme();

  const state = useInventory();
  const currentInventory = getActiveItems(state.history);
  const budget = currentBudget(currentInventory);

  const budgetUsage = Math.round((budget.currentItemsPrice / BUDGET) * 100);

  return (
    <Card>
      <div className='mb-4 flex items-center justify-between gap-4'>
        <h1 className='text-xl font-bold'>PC Builder</h1>

        <Switch
          checked={mode === 'dark'}
          onChange={toggleTheme}
          checkedChildren='Dark'
          unCheckedChildren='Light'
        />
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
        <div>
          <p className='text-sm' style={{ color: token.colorTextSecondary }}>
            Budget Limit
          </p>
          <p className='text-xl font-bold'>${BUDGET}</p>
        </div>

        <div>
          <p className='text-sm' style={{ color: token.colorTextSecondary }}>
            Total Spent
          </p>
          <p className='text-xl font-bold'>${budget.currentItemsPrice}</p>
        </div>

        <div>
          <p className='text-sm' style={{ color: token.colorTextSecondary }}>
            Remaining
          </p>
          <p
            className='text-xl font-bold'
            style={{ color: token.colorSuccess }}
          >
            ${budget.availableBalance}
          </p>
        </div>

        <div>
          <div className='mb-1 flex items-center justify-between'>
            <p className='text-sm' style={{ color: token.colorTextSecondary }}>
              Budget Usage
            </p>
            <p className='font-bold'>{budgetUsage}%</p>
          </div>

          <Progress
            percent={budgetUsage}
            showInfo={false}
            status={budget.availableBalance < 0 ? 'exception' : 'normal'}
          />
        </div>
      </div>
    </Card>
  );
}
