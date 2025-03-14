// Archivo que contiene la generación de los Hash para las contraseñas.

/**
 * Genera una cadena de salt aleatoria para ser utilizada en el hash de contraseñas.
 * @returns {string} - Una cadena de sal generada aleatoriamente.
 */
function generateSalt(len = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let salt = '';
    for (let i = 0; i < len; i++) {
        salt += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return salt;
}

/**
 * Genera un valor de hash básico combinando los valores ASCII de los caracteres en la cadena de entrada con la salt proporcionada.
 * @param {string} inputString - La cadena de entrada que se va a hashear.
 * @param {string} salt - La sal que se va a añadir al hash.
 * @returns {number} - El valor hasheado generado a partir de la cadena de entrada y la salt.
 */
function basicHash(inputString, salt) {
    let hash = 0;
    inputString += salt; // Agregar la sal al hash

    for (let i = 0; i < inputString.length; i++) {
        const char = inputString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
    }
    return hash;
}

/**
 * Compara un password dado con un hash y una sal para determinar si coinciden.
 * @param {string} inputPassword - El password a comparar.
 * @param {string} salt - La sal asociada al hash.
 * @param {number} expectedHash - El valor hash esperado.
 * @returns {boolean} - true si el password coincide con el hash y la sal, false en caso contrario.
 */
function compareHash(inputPassword, salt, expectedHash) {
    const generatedHash = basicHash(inputPassword, salt);
    return generatedHash == expectedHash;
}

module.exports = {
    generateSalt,
    basicHash,
    compareHash
};
