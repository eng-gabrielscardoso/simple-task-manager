import { Button } from "primereact/button";

export const Footer = () => {
  return (
    <>
      <footer className="text-center flex align-items-center justify-content-center">
        © Created by{" "}
        <Button
          link
          label="Gabriel Santos Cardoso."
          onClick={() => window.open("https://gabrielscardoso.com", "_blank")}
          className="h-fit w-fit"
        />
      </footer>
    </>
  );
};
