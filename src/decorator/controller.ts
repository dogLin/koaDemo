export const controller = (prefix: string) => {
  console.log(prefix)
  return (constructor): any => {
    constructor.prototype._prefix = prefix
  }
}
