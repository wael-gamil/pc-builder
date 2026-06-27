import { BUDGET } from '../constants/constants';
import { componentType } from '../types/component';

export function isIncompatible(
  checkingItem: componentType,
  currentItems: componentType[]
) {
  return currentItems.some(currentItem => {
    const currentBlocksChecking = currentItem.incompatibleWith.includes(
      checkingItem.id
    );
    const checkingBlocksCurrent = checkingItem.incompatibleWith.includes(
      currentItem.id
    );
    return currentBlocksChecking || checkingBlocksCurrent;
  });
}

export function currentBudget(currentItems: componentType[]) {
  const currentItemsPrice = currentItems.reduce(
    (acc, currentValue) => acc + currentValue.price,
    0
  );

  return {
    currentItemsPrice,
    availableBalance: BUDGET - currentItemsPrice,
  };
}
