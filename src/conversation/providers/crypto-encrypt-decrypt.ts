import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

export class CryptoEncryptDecrypt {
  encrypt(contentToEncrypt: string) {
    const alg = process.env.ALGORITHM;
    const secretKey = process.env.SECRET_KEY_CRYPTO;
    const iv = randomBytes(16);

    const content = contentToEncrypt;
    const cipher = createCipheriv(alg, Buffer.from(secretKey), iv);
    const encrypted = cipher.update(content, 'utf-8', 'hex')

    return { encrypted, iv };
  }

  decrypt(encrypted: string, iv: Buffer) {
    const decipher = createDecipheriv(
      process.env.ALGORITHM,
      Buffer.from(process.env.SECRET_KEY_CRYPTO),
      iv,
    );

    const decrypted = decipher.update(encrypted, 'hex', 'utf-8')

    return decrypted;
  }
}
