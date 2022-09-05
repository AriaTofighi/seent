// Returns the file extension or undefined if there is none
export const getFileExtension = (fileName: string) => {
  const re = /(?:\.([^.]+))?$/;
  const result = re.exec(fileName);
  return result[1];
};
