export enum GridHeaderMenuActions {
  TOGGLE_PIN = 'PinUnpinColumn',
  TOGGLE_VISIBILITY = 'ShowHideColumn',
  TOGGLE_SUMMARY = 'ShowHideColumnSummary',
  TOGGLE_GRUPING = 'GrupUngrup'
}

export interface IHeaderMenuAction {
  actionId: GridHeaderMenuActions;
  actionValue: string;
  actionIcon: string;
}
