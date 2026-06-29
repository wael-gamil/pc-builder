'use client';

import { Button, Tag, theme } from 'antd';
import { componentType } from '../../lib/types/component';
import Image from 'next/image';
import { Card as AntdCard } from 'antd';
import { BsCart3 } from 'react-icons/bs';

type cardProps = {
  component: componentType;
  onClick: () => void;
  disabled: boolean;
};
export default function Card({ component, onClick, disabled }: cardProps) {
  const { token } = theme.useToken();

  return (
    <AntdCard
      styles={{
        body: {
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
          gap: 12,
        },
      }}
    >
      <div className='flex justify-center'>
        <Image
          src={component.image}
          width={120}
          height={90}
          alt={`image of ${component.name}`}
          className='object-contain'
        />
      </div>

      <div className='flex flex-1 flex-col gap-2'>
        <h3 className='text-xl font-semibold leading-5'>{component.name}</h3>

        <Tag
          style={{
            color: token.colorTextSecondary,
            background: token.colorPrimaryBg,
            borderColor: token.colorPrimaryBorder,
          }}
          className='w-fit'
        >
          {component.category}
        </Tag>

        <p className='text-lg font-bold'>${component.price}</p>
      </div>

      <Button
        type={disabled ? 'default' : 'primary'}
        onClick={onClick}
        disabled={disabled}
        icon={<BsCart3 />}
      >
        {disabled ? 'Added' : 'Add'}
      </Button>
    </AntdCard>
  );
}
