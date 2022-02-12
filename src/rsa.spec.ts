import * as a from "https://deno.land/std@0.123.0/testing/asserts.ts"
import { RSAService } from "./rsa.ts"

Deno.test("runs the keyGeneration and the encryption/decryption", () => {

    const rsaService = new RSAService()
    const newRSAKeyPair = rsaService.generateKeyPair()

    a.assertExists(newRSAKeyPair, "I would have expected an RSA Key Pair")

    const message = "Hello World!"
    const signature = rsaService.createSignature(message, newRSAKeyPair.privateKey)
    const encryptedMessage = rsaService.encrypt(message, newRSAKeyPair.publicKey)
    const decryptedmessage = rsaService.decrypt(encryptedMessage, newRSAKeyPair.privateKey)

    a.assertEquals(rsaService.validateAuthenticity(decryptedmessage, signature, newRSAKeyPair.publicKey), true)
    a.assertEquals(message, decryptedmessage, "decrypted message differs from original message")

})
