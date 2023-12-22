export const getUsername = (pathname: string) => {
  return pathname.split("/")[2];
}
  