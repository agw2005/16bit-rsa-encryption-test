export function generateBigPrimeNumber(): number{
    
    function isPrime(num: number): boolean {
        if (num <= 1) return false;
        if (num <= 3) return true;

        if (num % 2 === 0 || num % 3 === 0) return false;

        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }

        return true;
    }

    function generateBigNumber(): number{
        const [max,min] = [100, 300]; //2^8 - 1 = 256
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let x = generateBigNumber();
    while(!isPrime(x)){
        x = generateBigNumber();
    }
    return x;
}

export function generatePandQ(): [number, number]{
    let [p,q] = [generateBigPrimeNumber() , generateBigPrimeNumber()];
    while(p*q >= 65535){ //2^16 - 1 = 65535  -----> 16bit RSA keys
        [p,q] = [generateBigPrimeNumber() , generateBigPrimeNumber()]
    }
    return [p,q]
}

export function generateN(p: number, q: number){
    return p*q;
}

export function generatePhi(p: number, q: number): number{
    return (p-1)*(q-1)
}

export function gcd(a: number, b: number): number {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

export function findCoprime(n: number): number[]{
    let arrCoprime: number[] = [];
    for(let i = 2 ; i < n ; i++){
        if(gcd(n,i) == 1){
            arrCoprime.push(i);
        }
    }
    return arrCoprime
}

export function findSharedValues(arr1: number[], arr2: number[]): number[] {
    return arr1.filter(value => arr2.includes(value));
}

export function findE(n: number, phiN: number): number {
    const coprimeOfN = findCoprime(n);
    const coprimeOfPhiN = findCoprime(phiN);
    const sharedCoprime = findSharedValues(coprimeOfN, coprimeOfPhiN);
    let candidateIndex = Math.floor(Math.random() * (sharedCoprime.length - Math.floor(sharedCoprime.length/2) + 1)) + Math.floor(sharedCoprime.length/2)
    return sharedCoprime[candidateIndex];
}

export function findD(e: number, phiN: number): number {
    // let d = 0;
    // for(let i = e ; i < Number.MAX_SAFE_INTEGER ; i+=e){
    //     console.log(i);
    //     if(((i * e) % phiN) == 1){
    //         d = i;
    //         break
    //     }
    // }
    // return d;
    let [m0, x0, x1] = [phiN, 0, 1];

    while (e > 1) {
        let q = Math.floor(e / phiN);
        [phiN, e] = [e % phiN, phiN];
        [x0, x1] = [x1 - q * x0, x0];
    }

    return x1 < 0 ? x1 + m0 : x1; // Ensure positive result
}

export function modExp(base: number, exp: number, mod: number): number {
    let result = 1;
    base = base % mod; // Ensure base is within range

    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }

        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }

    return result;
}

// Encrypt a message
export function encryptMessage(text: string, publicExponent: number, modulo: number){
    let encryptedMessage: number[] = [];
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i); // Get ASCII value of the character
        const encrypted = modExp(char, publicExponent, modulo); // Apply RSA encryption
        encryptedMessage.push(encrypted);
    }
    return encryptedMessage;
}

// Parse the encrypted array of num[] into string for better readibility
export function mergeEncryptedMessage(message: number[]){
    return message.map(num => num.toString()).join(':');
}

// Parse the encrypted string to number[] to be decrypted
export function reverseEncryptedMessage(message: string): number[] {
    return message.split(':').map(num => parseInt(num, 10));
}

// Decrypt an encrypted message
export function decryptMessage(message: string, privateExponent: number, modulo: number): string {
    let encryptedMessage = reverseEncryptedMessage(message);
    let decryptedMessage = "";
    for (let i = 0; i < encryptedMessage.length; i++) {
        const decrypted = modExp(encryptedMessage[i], privateExponent, modulo); // Apply RSA decryption
        decryptedMessage += String.fromCharCode(decrypted); // Convert the decrypted value back to a character
    }
    return decryptedMessage;
}
