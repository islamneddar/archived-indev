'use client';
import React from 'react';
import {Dialog} from 'primereact/dialog';
import AiToolItemDialogContent from '@/app-page-component/ai-tool-section/ai-tools/ai-tool-dialog/AiToolItemDialogContent';
import {useAiToolStateSelector} from '@/redux/slices/ai-tools/ai-tool/ai-tool-state/ai-tool-state.selector';
import {useDispatch} from 'react-redux';
import {setAiTool} from '@/redux/slices/ai-tools/ai-tool/ai-tool-state/ai-tool-state.slice';

function AiToolItemDialog() {
  const dispatch = useDispatch();

  const currentAiTool = useAiToolStateSelector();

  if (!currentAiTool.currentSelectedAiToolInDialog) {
    return null;
  }
  return (
    <Dialog
      visible={!!currentAiTool.currentSelectedAiToolInDialog}
      style={{width: '70vw', height: '80vh', backgroundColor: '#000'}}
      onHide={() => {
        dispatch(setAiTool(null));
      }}
      closeOnEscape={true}>
      <div>
        <AiToolItemDialogContent
          aiTool={
            currentAiTool.currentSelectedAiToolInDialog
          }></AiToolItemDialogContent>
      </div>
    </Dialog>
  );
}

export default AiToolItemDialog;
