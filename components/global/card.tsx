'use client';

import { componentType } from '../../lib/types/component';
import Image from 'next/image';

type cardProps = {
  component: componentType;
  onClick: () => void;
  disabled: boolean;
};
export default function Card({ component, onClick, disabled }: cardProps) {
  return (
    <div className='flex'>
      <Image
        src={component.image}
        width={50}
        height={50}
        alt={`image of component-${component.name}`}
      />
      <div>
        <p>{component.name}</p>
        <p>{component.price}</p>
        <p>{component.category}</p>
      </div>
      <button
        className='border border-white'
        onClick={onClick}
        disabled={disabled}
      >
        select
      </button>
    </div>
  );
}
