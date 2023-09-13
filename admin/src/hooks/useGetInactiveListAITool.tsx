'use client';
import React, {useEffect, useState} from 'react';
import {AiToolService} from '@/service/ai-tool.service';

function UseGetInactiveListAiTool() {
  const [listTools, setListTools] = useState([]);

  /*useEffect(() => {
    const getListTools = async () => {
      const response = await AiToolService.getInstance().getAllInactive();
      setListTools(data);
    };

    getListTools();
  }, []);*/

  return <div></div>;
}

export default UseGetInactiveListAiTool;
