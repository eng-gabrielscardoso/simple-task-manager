import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

export const CreateTask = () => {
  const [isVisible, toggleVisible] = useState(false);

  const headerContent = (
    <div className="p-2">
      <h2 className="text-lg font-bold">Create a new task</h2>
    </div>
  )

  const footerContent = (
    <div className="p-2">
      <Button
        label="Ok"
        icon="pi pi-check"
        onClick={() => toggleVisible(false)}
        autoFocus
        className="m-0"
      />
    </div>
  );

  return (
    <>
      <Button
        icon="pi pi-plus-circle"
        type="button"
        label="Add"
        onClick={() => toggleVisible(true)}
      />
      <Dialog
        visible={isVisible}
        modal
        header={headerContent}
        footer={footerContent}
        style={{ width: "398px" }}
        onHide={() => {
          if (!isVisible) return;
          toggleVisible(false);
        }}
      >
        <div className="p-2">
          Under development ;)
        </div>
      </Dialog>
    </>
  );
};
