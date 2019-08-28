async function test (ctx, next): Promise<void> {
  console.log('this is test miidleware')
  await next()
}
export default test
