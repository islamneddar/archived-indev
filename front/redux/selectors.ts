import { useSelector } from "react-redux";
import { RootState } from "./store";

export default function mySelectors() {
  return {
    system: useSelector((state: RootState) => state.system),
  };
}
