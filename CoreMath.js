/**
 * CoreMath.js
 * coremathjs.com
 * @version 1.0.0
 * * @date 2026-01-06
 * * @license
 * Copyright (C) 2026 John Doe <johndoe749_@hotmail.com>
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

/*
Table of contents:

* 1. Core Math Symbols
  * 1.1. Scientific Constants
  * 1.2. ASCII Safe Symbols
* 2. Logic
  * 2.1. Addition
  * 2.2. Subtraction
  * 2.3. Multiplication
  * 2.4. Division
* 3. Physics
* 4. Format
* 5. Export for various environments
*/

// 1. Core math symbols
const CoreMath = {
    // --- 1.1. Scientific Constants ---
    PI: Math.PI,  // 3.14159265359
    E: Math.E, // 2.71828183
    LN10: Math.LN10, // log_e
    SQRT2: Math.SQRT2, // sqrt
    PHI: 1.618033988749895, // Golden Ratio
    C: 299792458,           // Speed of Light in m/s (Exact)

    // --- 1.2. ASCII Safe Symbols (Unicode Escapes) ---
    symbols: {
        DEGREE: '\u00B0',     // Degree symbol
        PLUS_MINUS: '\u00B1', // Plus-Minus sign
        MICRO: '\u00B5',      // Micro sign (Mu)
        THETA: '\u03B8',      // Greek Theta
        DELTA: '\u0394',      // Greek Delta (Change)
        INFINITY: '\u221E',   // Infinity
        APPROX: '\u2248',     // Approximately equal
        SUM: '\u2211',        // Summation
        PI_SYM: '\u03C0'      // Greek Pi symbol
    },
    
    // 2. Logic
    /**
     * Precision Addition
     * Fixes 0.1 + 0.2 = 0.3000000000000000444089209850062616169452667236328125
     */
    add: function(a, b) {
        const aDigits = (a.toString().split('.')[1] || '').length;
        const bDigits = (b.toString().split('.')[1] || '').length;
        const multiplier = Math.pow(10, Math.max(aDigits, bDigits));
        return (Math.round(a * multiplier) + Math.round(b * multiplier)) / multiplier;
    },

    /**
     * Precision Subtraction
     */
    subtract: function(a, b) {
        const aDigits = (a.toString().split('.')[1] || '').length;
        const bDigits = (b.toString().split('.')[1] || '').length;
        const multiplier = Math.pow(10, Math.max(aDigits, bDigits));
        return (Math.round(a * multiplier) - Math.round(b * multiplier)) / multiplier;
    },

    /**
     * Precision Multiplication
     */
    multiply: function(a, b) {
        const aDigits = (a.toString().split('.')[1] || '').length;
        const bDigits = (b.toString().split('.')[1] || '').length;
        const multiplier = Math.pow(10, aDigits + bDigits);
        return (Math.round(a * Math.pow(10, aDigits)) * Math.round(b * Math.pow(10, bDigits))) / multiplier;
    },

    /**
     * Precision Division
     */
    divide: function(a, b) {
        if (b === 0) return NaN;
        const aDigits = (a.toString().split('.')[1] || '').length;
        const bDigits = (b.toString().split('.')[1] || '').length;
        const aInt = Number(a.toString().replace('.', ''));
        const bInt = Number(b.toString().replace('.', ''));
        return (aInt / bInt) * Math.pow(10, bDigits - aDigits);
    },

    // 3. Physics
    /**
     * Physics: Energy Calculation (E=mc^2)
     * @param {number} mass - Mass in kg
     */
    getEnergy: function(mass) {
        return this.multiply(mass, Math.pow(this.C, 2));
    },

    // 4. Format
    /**
     * Utility: Format for UI
     */
    format: (num, decimals = 4) => {
        return Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);
    }
};

// 5. Export for various environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CoreMath;
} else {
    window.CoreMath = CoreMath;
}
