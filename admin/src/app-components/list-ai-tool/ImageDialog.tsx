import React from 'react';
import {Dialog} from 'primereact/dialog';

interface ImageDialogProps {
  imageOpenInDialog: boolean;
  setState: (value: any) => void;
  imageUrl: string;
}
function ImageDialog(props: ImageDialogProps) {
  return (
    <Dialog
      visible={props.imageOpenInDialog}
      style={{width: '70vw', height: '80vh', backgroundColor: '#000'}}
      onHide={() => {
        props.setState((prevState: any) => ({
          ...prevState,
          imageOpenInDialog: false,
        }));
      }}
      closeOnEscape={true}>
      <div className={'flex h-full w-full justify-center items-center'}>
        <img
          src={props.imageUrl}
          alt={'image of website'}
          className={'flex h-full w-full'}
        />
      </div>
    </Dialog>
  );
}

export default ImageDialog;
