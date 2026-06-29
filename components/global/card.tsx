'use client';

import { Button, Card as AntdCard, Tag, theme } from 'antd';
import { componentType } from '../../lib/types/component';
import Image from 'next/image';
import { BsCart3 } from 'react-icons/bs';

type cardProps = {
  component: componentType;
  onClick: () => void;
  disabled: boolean;
  selected: boolean;
  disabledReason?: string;
};

export default function Card({
  component,
  onClick,
  disabled,
  selected,
  disabledReason,
}: cardProps) {
  const { token } = theme.useToken();

  return (
    <AntdCard
      className='h-full'
      styles={{
        body: {
          height: 330,
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
          gap: 12,
        },
      }}
    >
      <div className='mb-4 flex h-[90px] items-center justify-center'>
        <Image
          src={component.image}
          width={120}
          height={90}
          alt={`image of ${component.name}`}
          className='max-h-[90px] w-auto object-contain'
        />
      </div>

      <h3 className='line-clamp-2 text-sm font-semibold leading-5'>
        {component.name}
      </h3>

      <Tag
        className='mb-3 w-fit'
        style={{
          color: token.colorPrimary,
          background: token.colorPrimaryBg,
          borderColor: token.colorPrimaryBorder,
        }}
      >
        {component.category}
      </Tag>

      <p className='text-lg font-bold'>${component.price}</p>

      {disabledReason && (
        <p
          className='text-xs'
          style={{
            color: selected ? token.colorSuccess : token.colorError,
          }}
        >
          {disabledReason}
        </p>
      )}

      <Button
        type={selected ? 'default' : 'primary'}
        onClick={onClick}
        disabled={disabled}
        aria-label={
          selected
            ? `${component.name} already added`
            : disabled
            ? `${component.name} unavailable. ${disabledReason}`
            : `Add ${component.name}`
        }
        block
        icon={<BsCart3 aria-hidden='true' />}
        className='mt-auto'
        style={
          selected
            ? {
                color: token.colorSuccess,
                background: token.colorSuccessBg,
                borderColor: token.colorSuccessBorder,
                opacity: 1,
              }
            : undefined
        }
      >
        {selected ? 'Added' : disabled ? 'Unavailable' : 'Add'}
      </Button>
    </AntdCard>
  );
}
