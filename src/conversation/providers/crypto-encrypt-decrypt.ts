import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

export class CryptoEncryptDecrypt {
  encrypt(contentToEncrypt: string) {
    const alg = process.env.ALGORITHM;
    const secretKey = process.env.SECRET_KEY;
    const iv = randomBytes(16);

    const content = contentToEncrypt;
    const cipher = createCipheriv(alg, Buffer.from(secretKey), iv);
    const encrypted = Buffer.concat([cipher.update(content), cipher.final()]);

    return { encrypted, iv };
  }

  decrypt(encrypted: NodeJS.ArrayBufferView, iv: Buffer) {
    const decipher = createDecipheriv(
      process.env.ALGORITHM,
      Buffer.from(process.env.SECRET_KEY),
      iv,
    );

    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    return decrypted;
  }
}
