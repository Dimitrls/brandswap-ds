import React from 'react';
import { IconButton } from '../../../Buttons/IconButton';
import type { IconName } from '../../../Icons/Icon';
import type { IconButtonVariant } from '../../../shared/types';

export interface GridTableAction {
  icon: IconName;
  ariaLabel: string;
  onClick: () => void;
  variant?: IconButtonVariant;
  disabled?: boolean;
}

export interface ActionsCellProps {
  actions: GridTableAction[];
}

export function ActionsCell({ actions }: ActionsCellProps) {
  return (
    <div className="bs-grid-table--actions" data-stop-row-click>
      {actions.map((action) => (
        <IconButton
          key={action.ariaLabel}
          icon={action.icon}
          ariaLabel={action.ariaLabel}
          onClick={action.onClick}
          variant={action.variant ?? 'subtle'}
          sizeVariant="small"
          disabled={action.disabled}
        />
      ))}
    </div>
  );
}
