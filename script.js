const d2f = (num, neg) => {
    const helper = (f1, f2, n) => {
        if (f2 > n) {
            return [n, "1"];
        }
        [rem, b] = helper(f2, f1 + f2, n);
        if (rem >= f2) {
            return [rem - f2, "1" + b];
        } else {
            return [rem, "0" + b];
        }
    }

    const negHelper = (f1, f2, sum, n) => {
        if (Math.abs(sum) > Math.abs(n)) {
            return [n, "1"];
        }
        if ((n < 0 && f1 < 0) || (n > 0 && f1 > 0)) {
            sum += f1;
        }
        [rem, b] = negHelper(f2, f1 + -f2, sum, n);
        const canBe1 = b.charAt(0) !== '1' || b.length === 1;
        if (Math.abs(rem - f1) < Math.abs(rem) && canBe1) {
            return [rem - f1, "1" + b];
        } else {
            return [rem, "0" + b];
        }
    }

    if (neg) {
        if (num === 0) {
            return "Number cannot be 0";
        }
        return negHelper(1, -1, 0, num)[1];
    } else {
        if (num <= 0) {
            return "Number must be greater than 0";
        }
        return helper(1, 1, num)[1];
    }
};

const f2d = (enc, neg) => {
    const n = neg ? -1 : 1;
    const helper = (f1, f2, i) => {
        if (i >= enc.length - 1) {
            return 0;
        }
        const char = enc.charAt(i);
        if (char == '1') {
            return (neg ? f1 : f2) + helper(f2, f1 + n * f2, i + 1);
        } else if (char == '0') {
            return helper(f2, f1 + n * f2, i + 1);
        }
    }
    for (var i = 0; i < enc.length; i++) {
        switch (enc.charAt(i)) {
            case '1':
            case '0':
                break;
            default:
                return `Invalid character at position ${i}: ${enc.charAt(i)}`;
        }
    }
    if (enc.length < 2 || enc.charAt(enc.length - 1) != '1' || enc.charAt(enc.length - 2) != '1') {
        return "Last two bits must be 1";
    }
    return helper(1, n * 1, 0);
};

document.getElementById("convert").addEventListener("click", () => {
    const inputEncoding = document.querySelector('input[name="from"]:checked').value;
    const outputEncoding = document.querySelector('input[name="to"]:checked').value;

    const input = document.getElementById("input").value.trim();
    var output;
    if (inputEncoding === outputEncoding) {
        output = input;
    } else if (inputEncoding === "fibonacci") {
        const decimal = f2d(input, false);
        if (outputEncoding === "decimal") {
            output = decimal;
        } else {
            output = (/^\d+$/.test(decimal)) ? d2f(decimal, true) : decimal;
        }
    } else if (inputEncoding === "decimal") {
        output = d2f(input, outputEncoding === "negafibonacci");
    } else if (inputEncoding === "negafibonacci") {
        const decimal = f2d(input, true);
        if (outputEncoding === "decimal") {
            output = decimal
        } else {
            output = (/^\d+$/.test(decimal)) ? d2f(decimal, false) : decimal;
        }
    }
    document.getElementById("output").value = output.toString();
});