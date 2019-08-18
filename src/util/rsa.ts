import * as NodeRSA from 'node-rsa'
import * as fs from 'fs'
import * as path from 'path'
import log from './log'

let privatePem = null
let publicPem = null
const publicPath = path.resolve(__dirname, '../pem/public.pem')
const privatePath = path.resolve(__dirname, '../pem/private.pem')
function generate (): void {
  if (fs.existsSync(publicPath) && fs.existsSync(privatePath)) {
    log.info('RSA: 密钥对已存在，无需初始化')
    publicPem = fs.readFileSync(publicPath)
    privatePem = fs.readFileSync(privatePath)
    return
  }
  const key = new NodeRSA({ b: 1024 })
  key.setOptions({ encryptionScheme: 'pkcs1' })
  privatePem = key.exportKey('pkcs1-private-pem')
  publicPem = key.exportKey('pkcs1-public-pem')
  fs.writeFile(publicPath, publicPem, (err): void => {
    if (err) throw err
    log.info('公钥初始化成功')
  })
  fs.writeFile(privatePath, privatePem, (err) => {
    if (err) throw err
    log.info('私钥初始化成功')
  })
}

generate()

export function getPublicPem (): string {
  if (!publicPem) publicPem = fs.readFileSync(publicPath)
  return publicPem
}

export function getPrivatePem (): string {
  if (!privatePem) privatePem = fs.readFileSync(privatePath)
  return privatePem
}

export function encrypt (data: string, encoding: NodeRSA.Encoding = 'base64'): string | Buffer {
  const key = new NodeRSA(getPublicPem())
  return key.encrypt(data, encoding)
}

export function decrypt (data: string | Buffer, encoding: NodeRSA.Encoding = 'utf8'): string | Buffer {
  const key = new NodeRSA(getPrivatePem())
  return key.decrypt(data, encoding)
}

function test (): void {
  const encryptStr = encrypt('林朝军')
  console.log('加密后=>', encryptStr)
  console.log('解密后=>', decrypt(encryptStr))
}
// test()
