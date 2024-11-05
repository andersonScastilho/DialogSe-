export interface IEncryptDecryptProvider {
  encrypt(contentToEncrypt: string): { encrypted: string; iv: string };
  decrypt(encrypted: string, iv: string): string;
}
