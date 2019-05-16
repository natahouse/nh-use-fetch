const to = async (toResolve) =>
  toResolve.then(res => [res, undefined]).catch(err => [undefined, err])

export default to
