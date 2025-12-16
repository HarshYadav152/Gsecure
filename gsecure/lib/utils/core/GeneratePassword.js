import crypto from "crypto";
/**
 * Generates a strong password based on user preferences
 * 
 * @function generatePassword
 * @param {Object} options - Password generation options
 * @param {number} [options.length=16] - Desired password length
 * @param {string} [options.keyword=''] - Keyword that must be included in the password
 * @param {boolean} [options.includeLowercase=true] - Include lowercase characters
 * @param {boolean} [options.includeUppercase=true] - Include uppercase characters
 * @param {boolean} [options.includeNumbers=true] - Include numeric characters
 * @param {boolean} [options.includeSpecial=true] - Include special characters
 * @param {boolean} [options.excludeSimilar=false] - Exclude similar characters like 1/l/I, 0/O
 * @param {boolean} [options.excludeAmbiguous=false] - Exclude ambiguous characters like {}/[]()<>
 * @returns {string} The generated password
 * @throws {Error} If parameters are invalid or generation fails
 */
function GeneratePassword({
    length = 16,
    keyword = '',
    includeLowercase = true,
    includeUppercase = true,
    includeNumbers = true,
    includeSpecial = true,
    excludeSimilar = false,
    excludeAmbiguous = false
} = {}) {
    // Check if keyword is too long
    if (keyword && keyword.length >= length) {
        return {
            success: false,
            message: "Keyword is too long for the specified password length",
            code: "KEYWORD_TOO_LONG"
        };
    }

    // Validate parameters
    if (length < 15 || length > 128) {
        return {
            success: false,
            message: "Password length must be between 8 and 128 characters",
            code: "INVALID_LENGTH"
        };
    }

    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSpecial) {
        return {
            success: false,
            message: "At least one character type must be selected",
            code: "NO_CHAR_TYPES"
        };
    }

    try {


        // Define character sets
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const special = '!@#$%^&*()-_=+[]{};:,.<>?/|~';

        // Similar looking characters to exclude if requested
        const similar = 'il1IoO0';
        // Ambiguous characters to exclude if requested
        const ambiguous = '{}[]()/\\\'"`~,;:.<>';

        // Build character pool based on user preferences
        let charPool = '';
        if (includeLowercase) charPool += lowercase;
        if (includeUppercase) charPool += uppercase;
        if (includeNumbers) charPool += numbers;
        if (includeSpecial) charPool += special;

        // Remove excluded characters if requested
        if (excludeSimilar) {
            charPool = charPool.split('').filter(char => !similar.includes(char)).join('');
        }

        if (excludeAmbiguous) {
            charPool = charPool.split('').filter(char => !ambiguous.includes(char)).join('');
        }
        // If after exclusions our character pool is empty, return an error
        if (charPool.length === 0) {
            return {
                success: false,
                message: "Character exclusions too restrictive - no valid characters available",
                code: "EMPTY_CHAR_POOL"
            };
        }

        // Calculate remaining length after accounting for keyword
        const remainingLength = length - keyword.length;

        // Generate the variable part of the password
        let variablePart = '';

        // Use Node.js crypto for secure random generation
        for (let i = 0; i < remainingLength; i++) {
            const randomIndex = crypto.randomInt(charPool.length);
            variablePart += charPool.charAt(randomIndex);
        }

        // Ensure all selected character sets are included at least once in the variable part
        // Only if we have enough space after the keyword
        let ensureCharTypes = [];
        if (includeLowercase) ensureCharTypes.push(lowercase[crypto.randomInt(lowercase.length)]);
        if (includeUppercase) ensureCharTypes.push(uppercase[crypto.randomInt(uppercase.length)]);
        if (includeNumbers) ensureCharTypes.push(numbers[crypto.randomInt(numbers.length)]);
        if (includeSpecial) ensureCharTypes.push(special[crypto.randomInt(special.length)]);

        // Make sure we don't try to replace more characters than we have
        const typesToEnsure = Math.min(ensureCharTypes.length, variablePart.length);

        // Replace some characters to ensure we include required types
        for (let i = 0; i < typesToEnsure; i++) {
            variablePart = variablePart.substring(0, i) + ensureCharTypes[i] + variablePart.substring(i + 1);
        }

        // Insert keyword at a random position within the password
        let position = 0;
        if (remainingLength > 0) {
            position = crypto.randomInt(remainingLength + 1);
        }
        
        const finalPassword = variablePart.substring(0, position) + keyword + variablePart.substring(position);

        return {
            success: true,
            password: finalPassword
        };
    } catch (error) {
        return {
            success: false,
            message: "Failed to generate password: " + error.message,
            code: "GENERATION_FAILED"
        };
    }
}

export { GeneratePassword };