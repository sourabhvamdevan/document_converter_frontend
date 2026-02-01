

export const isValidFile = (file) => {
  const maxSize = 10 * 1024 * 1024 //10MB ke liye
  return file && file.size <= maxSize
}
