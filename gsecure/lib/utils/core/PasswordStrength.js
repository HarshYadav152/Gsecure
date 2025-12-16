/**
 * Evaluates password strength based on multiple criteria.
 * 
 * @param {string} password - The password to evaluate
 * @returns {Object} Result object containing:
 *   - score: Numeric strength score (0-100)
 *   - rating: Text classification (Weak, Medium, Strong, Very Strong)
 *   - feedback: Array of improvement suggestions
 */

function PasswordStrength(password) {
    if (!password || typeof password !== 'string') {
        return {
            score: 0,
            rating: "Weak",
            feedback: ["Password is empty or invalid"]
        };
    }

    let score = 0;
    const feedback = [];
    const length = password.length;

    // Length evaluation (up to 30 points)
    if (length < 8) {
        score += length * 1.5;
        feedback.push("Password is too short (aim for 12+ characters)");
    } else if (length < 12) {
        score += 12 + (length - 8) * 2;
        feedback.push("Consider using a longer password");
    } else {
        // Maximum 30 points for length, diminishing returns after 20 chars
        score += 20 + Math.min(10, (length - 12) * 0.5);
    }

    // Character type bonuses
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9\s]/.test(password);

    let charVariety = 0;
    if (!hasLower) feedback.push("Add lowercase letters");
    else charVariety += 7.5;

    if (!hasUpper) feedback.push("Add uppercase letters");
    else charVariety += 7.5;

    if (!hasDigit) feedback.push("Add numbers");
    else charVariety += 7.5;

    if (!hasSpecial) feedback.push("Add special characters (!@#$%^&*)");
    else charVariety += 7.5;

    score += charVariety;

    // Pattern detection (up to 40 points deduction)
    let patternDeduction = 0;

    // Check for sequential characters
    const sequences = ['abcdefghijklmnopqrstuvwxyz', '0123456789'];
    for (const seq of sequences) {
        for (let i = 0; i < password.length - 2; i++) {
            const fragment = password.toLowerCase().slice(i, i + 3);
            if (seq.includes(fragment)) {
                patternDeduction += 5;
                feedback.push("Avoid sequential characters (abc, 123, etc.)");
                break;
            }
        }
    }

    // Check for repeated characters
    const repeatedChars = /(.)\1{2,}/;
    if (repeatedChars.test(password)) {
        patternDeduction += 10;
        feedback.push("Avoid repeating characters");
    }

    // Common words/patterns check
    const commonPatterns = ['password', '123456', 'qwerty', 'admin'];
    for (const pattern of commonPatterns) {
        if (password.toLowerCase().includes(pattern)) {
            patternDeduction += 15;
            feedback.push("Avoid common words or patterns");
            break;
        }
    }

    // Apply deductions up to a maximum of 40 points
    score = Math.max(0, score - Math.min(patternDeduction, 40));

    // Distribution bonus (up to 20 points)
    if (hasLower && hasUpper && hasDigit && hasSpecial) {
        // Calculate distribution of different character types
        const lowerCount = (password.match(/[a-z]/g) || []).length;
        const upperCount = (password.match(/[A-Z]/g) || []).length;
        const digitCount = (password.match(/[0-9]/g) || []).length;
        const specialCount = (password.match(/[^a-zA-Z0-9\s]/g) || []).length;

        const total = password.length;
        const distribution = [lowerCount, upperCount, digitCount, specialCount].map(c => c / total);

        // Best distribution would be approximately equal usage of all types
        const distributionScore = 20 * (1 - Math.max(...distribution) + Math.min(...distribution));
        score += distributionScore;
    }

    // Final normalization to 0-100 scale and rounding
    score = Math.min(100, Math.round(score));

    // Determine rating
    let rating;
    if (score < 40) rating = "Weak";
    else if (score < 60) rating = "Medium";
    else if (score < 80) rating = "Strong";
    else rating = "Very Strong";

    // Remove duplicate feedback items
    const uniqueFeedback = [...new Set(feedback)];

    return {
        score,
        rating,
        feedback: uniqueFeedback.length > 0 ? uniqueFeedback : ["Good password!"]
    };
}

/**
 * Maps numeric scores to human-readable ratings
 * @param {number} score - The numeric password strength score
 * @returns {string} - Human-readable strength rating
 */
function getRating(score) {
    if (score < 40) return "Weak";
    if (score < 60) return "Medium";
    if (score < 80) return "Strong";
    return "Very Strong";
}
/**
 * Generates specific feedback for password improvement
 * @param {string} password - The password to analyze
 * @param {number} score - The current strength score
 * @returns {string[]} - Array of specific improvement suggestions
 */
function generateFeedback(password, score) {
    const feedback = [];
    
    if (password.length < 12) {
        feedback.push("Consider using a longer password (12+ characters)");
    }
    
    if (!/[A-Z]/.test(password)) {
        feedback.push("Add uppercase letters");
    }
    
    if (!/[a-z]/.test(password)) {
        feedback.push("Add lowercase letters");
    }
    
    if (!/[0-9]/.test(password)) {
        feedback.push("Add numbers");
    }
    
    if (!/[^A-Za-z0-9]/.test(password)) {
        feedback.push("Add special characters (!@#$%^&*)");
    }
    
    return feedback;
}

export { 
    PasswordStrength,
    getRating,
    generateFeedback
}