import { Button } from "primereact/button";
import { Card } from "primereact/card";

export const TaskCard = () => {
  const headerContent = (
    <div className="p-2 text-lg font-bold">Lorem ipsum</div>
  );

  const footerContent = (
    <div className="p-2 text-sm flex justify-content-between align-items-center">
      <div><span>{ new Date().getDate() }/{ new Date().getMonth()}/{ new Date().getFullYear() }</span> - <i className="font-italic"></i>In progress</div>
      <Button type="button" severity="success" size="small" icon="pi pi-check-circle" label="Conclude" />
    </div>
  )

  return (
    <>
      <Card header={headerContent} footer={footerContent}>
        <div className="p-2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et autem
            laborum temporibus ratione ab maiores! Eaque, odio qui quo
            consequatur, excepturi sequi ea ullam omnis laboriosam autem nemo
            aut natus!
          </p>
        </div>
      </Card>
    </>
  );
};
