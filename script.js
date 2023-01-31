const d2f = num => {
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
    if (num <= 0) {
        return "Number must be greater than 0";
    }
    return helper(1, 1, num)[1];
};

const f2d = b => {
    const helper = (f1, f2, i) => {
        if (i >= b.length - 1) {
            return 0;
        }
        const char = b.charAt(i);
        if (char == '1') {
            return f2 + helper(f2, f1 + f2, i + 1);
        } else if (char == '0') {
            return helper(f2, f1 + f2, i + 1);
        }
    }
    for (var i = 0; i < b.length; i++) {
        switch (b.charAt(i)) {
            case '1':
            case '0':
                break;
            default:
                return `Invalid character at position ${i}: ${b.charAt(i)}`;
        }
    }
    if (b.length < 2 || b.charAt(b.length - 1) != '1' || b.charAt(b.length - 2) != '1') {
        return "Last two bits must be 1";
    }
    return helper(1, 1, 0);
};

document.getElementById("d2f").addEventListener("click", () => {
    const input = document.getElementById("input").value;
    const output = d2f(parseInt(input));
    document.getElementById("output").value = output;
});
document.getElementById("f2d").addEventListener("click", () => {
    const input = document.getElementById("input").value;
    const output = f2d(input);
    document.getElementById("output").value = output.toString();
});