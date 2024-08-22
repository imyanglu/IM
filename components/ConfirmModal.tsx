type ConfirmModal = {
  visible: boolean;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }: any) => {};
