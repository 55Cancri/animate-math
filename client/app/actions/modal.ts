interface LoadModal {
  type: string;
  modalType: string;
}
interface HideModal {
  type: string;
}

export const loadModal = (modalType: string): LoadModal => ({
  type: 'SHOW_MODAL',
  modalType,
});

// set modalType to null in redux store
export const hideModal = (): HideModal => ({
  type: 'HIDE_MODAL',
});
