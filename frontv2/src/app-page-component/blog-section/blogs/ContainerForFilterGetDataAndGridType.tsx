import React from 'react';
import {blogAffichageType, gridBlogType} from '@/infra/data/blog-general.data';
import {BlogAffichageType, GridBlogType} from '@/infra/enums/blog-general.type';

export interface IContainerForFilterGetDataAndGridTypeProps {
  stateAffichage: BlogAffichageType;
  setStateAffichage: (state: BlogAffichageType) => void;
  stateGrid: GridBlogType;
  setStateGrid: (state: GridBlogType) => void;
}
function ContainerForFilterGetDataAndGridType(
  props: IContainerForFilterGetDataAndGridTypeProps,
) {
  return (
    <div className={'w-full flex justify-center items-center py-5 text-center'}>
      <div className={'w-full flex justify-between border-b-1 border-white'}>
        <div>
          {blogAffichageType.map((grid, index) => {
            return (
              <div
                key={index}
                className={
                  `hover:bg-indigo-500 rounded-t-lg hover:cursor-pointer w-20` +
                  (props.stateAffichage === grid.value ? ' bg-indigo-500' : '')
                }
                onClick={() => props.setStateAffichage(grid.value)}>
                <p className={'p-1 text-white font-medium px-2 tn:text-mobile'}>
                  {grid.content}
                </p>
              </div>
            );
          })}
        </div>
        <div className={'hidden sm:flex flex-row gap-3'}>
          {gridBlogType.map((grid, index) => {
            return (
              <div
                key={index}
                className={
                  `hover:bg-indigo-500 rounded-t-lg hover:cursor-pointer w-20` +
                  (props.stateGrid === grid.value ? ' bg-indigo-500' : '')
                }
                onClick={() => props.setStateGrid(grid.value)}>
                <p className={'p-1 text-white font-medium px-2'}>
                  {grid.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ContainerForFilterGetDataAndGridType;
