import { Switch } from "@headlessui/react";
import React from "react";
import { classNames } from "../../utils/style";

interface SimpleToggleProps {
  classNameContainer: string | "";
  classNamePoint: string | "";
  whenSwitchEnabled: () => void;
  whenSwitchDisabled: () => void;
  switchEnabled: boolean;
  setEnabled: (checked: boolean) => void;
}

function SimpleToggleInnom(props: SimpleToggleProps) {
  function setEnabledFunction(checked: boolean) {
    props.setEnabled(checked);
    if (checked) {
      props.whenSwitchEnabled();
    } else {
      props.whenSwitchDisabled();
    }
  }

  return (
    <Switch
      checked={props.switchEnabled}
      onChange={setEnabledFunction}
      className={classNames(
        props.switchEnabled ? "bg-indigo-600" : "bg-gray-200",
        `relative inline-flex h-4 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out 
                focus:outline-none focus:ring-indigo-500 focus:ring-offset-2`,
        props.classNameContainer
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          props.switchEnabled ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          props.classNamePoint
        )}
      />
    </Switch>
  );
}

export default SimpleToggleInnom;
