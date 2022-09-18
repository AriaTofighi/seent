import React, { RefObject } from "react";

type Props = {
  onChange: (event: any) => Promise<void>;
  innerRef: RefObject<HTMLInputElement>;
  accept?: string;
};

const FileUpload = ({ onChange, innerRef, accept = "image/*" }: Props) => {
  return (
    <input
      type="file"
      accept={accept}
      onChange={onChange}
      style={{ display: "none" }}
      ref={innerRef}
    />
  );
};

export default FileUpload;
