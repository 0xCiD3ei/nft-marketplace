import React, { useEffect, useRef } from "react";
import ButtonPrimary from "src/shared/Button/ButtonPrimary";
import ButtonSecondary from "src/shared/Button/ButtonSecondary";
import Input from "src/shared/Input/Input";
import NcModal from "src/shared/NcModal/NcModal";

const ModalTransferToken = ({ show, onCloseModalTransferToken }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element = textareaRef.current;
        if (element) {
          element.focus();
          element.setSelectionRange(element.value.length, element.value.length);
        }
      }, 400);
    }
  }, [show]);

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Transfer token
        </h3>
        <span className="text-sm">
          You can transfer tokens from your address to another
        </span>
        <div className="mt-8 ">
          <Input ref={textareaRef} placeholder="Paste address" type={"text"} />
        </div>
        <div className="mt-4 space-x-3">
          <ButtonPrimary type="submit">Submit</ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalTransferToken}>
            Cancel
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalTransferToken}
      contentExtraClass="max-w-lg"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalTransferToken;
