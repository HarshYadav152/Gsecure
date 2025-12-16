import axios from "axios";
import crypto from "crypto"

/**
 * Check if a password has been found in a data breach using HaveIBeenPwned API.
 * @param {string} password - The password to check.
 * @returns {Promise<number>} - The number of times the password was found, or 0 if safe.
 */
async function PasswordCheck(password) {
    if (!password || typeof password !== 'string') {
        console.warn('Invalid password provided to checkPasswordPwned.');
        return 0; // Treat invalid input as safe to avoid blocking user flow unnecessarily
    }

    try {
        // Step 1: Hash the password with SHA-1 and uppercase it
        const sha1Hash = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
        console.log("hash : ",sha1Hash)
        // Step 2: Split into prefix (first 5 characters) and suffix (rest)
        const prefix = sha1Hash.substring(0, 5);
        const suffix = sha1Hash.substring(5);

        // Step 3: Send GET request to HaveIBeenPwned with the prefix
        const response = await axios.get(`${process.env.HIBP_HOST}/${prefix}`, {
            headers: {
                'User-Agent': `Gsecure/v1.0.0 (${process.env.U_AGENT_EMAIL})` // Required by HIBP API
            }
        });
        const hashes = response.data.split('\n');

        // Step 4: Look for the suffix in the response
        for (const line of hashes) {
            const [hashSuffix, count] = line.trim().split(':');
            if (hashSuffix === suffix) {
                return parseInt(count, 10); // Found in breach
            }
        }

        return 0; // Not found, considered safe
    } catch (error) {
        console.error('Error checking password against HaveIBeenPwned API:', error.message);
        // Consider how to handle API errors in your application.
        // Returning -1 might be appropriate for indicating an error,
        // but be consistent in how you handle it in your calling code.
        return -1;
    }
}

export {PasswordCheck}