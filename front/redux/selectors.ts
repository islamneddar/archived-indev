import { useSelector } from 'react-redux';
import {RootState} from "./store";

export function mySelectors() {
  return {
    system : useSelector((state : RootState) => state.system)
  }
}