import React, { RefObject } from "react";

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

type Props = {
  onChange: (event: any) => Promise<void>;
  innerRef: RefObject<HTMLInputElement>;
  accept?: string;
};

export default FileUpload;
