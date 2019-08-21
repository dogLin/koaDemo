async function test (ctx, next): Promise<void> {
  console.log('testMiddle')
  await next()
}
export default test
