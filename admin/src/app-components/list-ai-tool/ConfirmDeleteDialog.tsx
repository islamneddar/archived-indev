import React from 'react';
import {Dialog} from 'primereact/dialog';

interface ConfirmDeleteDialogProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  position?: any;
  footerContent: React.ReactNode;
}

function ConfirmDeleteDialog(props: ConfirmDeleteDialogProps) {
  return (
    <Dialog
      header="Header"
      visible={props.visible}
      position={props.position || 'center'}
      style={{width: '50vw'}}
      onHide={() => props.setVisible(false)}
      footer={props.footerContent}
      draggable={false}
      resizable={false}>
      <p className="m-0">Are you sure you want to delete this ai product ?</p>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
