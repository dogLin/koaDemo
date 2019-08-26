async function test (ctx, next): Promise<void> {
  await next()
}
export default test
