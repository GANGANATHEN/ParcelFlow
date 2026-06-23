import { If } from "three/src/nodes/tsl/TSLCore";

const Problems = {
  // count string count
  LetterCount: () => {
    const str = "Hello World";
    let count = 0;

    for (const char of str) {
      count++;
    }

    return count;
    // return str.length;
  },
  // reverse String
  LetterReverse: () => {
    const text = "javascript";
    let str = "";

    for (let i = text.length - 1; i >= 0; i--) {
      str += text[i];
    }
    return str;
  },
  // add even numbers
  AddEvenNum: () => {
    const nums = [1, 2, 3, 4, 5, 6];
    let add = 0;
    for (let num of nums) {
      if (num % 2 === 0) {
        add += num;
      }
    }
    return add;
  },
  // find large numbers
  FindNum: () => {
    const nums = [-5, -2, -9, -1, -7];
    let largest = nums[0];
    for (const num of nums) {
      if (largest <= num) {
        largest = num;
      }
    }
    return largest;
  },
  // Palindrome string Check
  PalindromeStr: () => {
    const text = "madam";
    let result = "";

    for (let i = text.length - 1; i >= 0; i--) {
      result += text[i];
    }

    return result === text;
  },
  // Vowels strig count
  VowelsCountStr: () => {
    const text = "javAscript";
    let count = 0;

    for (const str of text.toLowerCase()) {
      if (
        str === "a" ||
        str === "e" ||
        str === "i" ||
        str === "o" ||
        str === "u"
      ) {
        count++;
      }
    }
    return count;
  },
  // Letter Count
  LetterCount: () => {
    const text = "programming";
    // let char = "";
    let result = {};
    // for (const str of text) {
    //   let count = 0;
    //   char = str;
    //   for (const str1 of text) {
    //     if (char == str1) count++;
    //   }
    //   result[char] = count;
    // }
    for (const char of text) {
      result[char] = (result[char] || 0) + 1;
    }
    return JSON.stringify(result);
  },
  // Duplicate Numbers Count
  DubNum: () => {
    const arr = [1, 2, 2, 3, 3, 3, 4];
    const result = {};

    for (const num of arr) {
      result[num] = (result[num] || 0) + 1;
    }
    return result;
  },
  // first non-repeating character
  NonRepeatStr: () => {
    const text = "swiss";
    let result = {};

    for (const str of text) {
      result[str] = (result[str] || 0) + 1;
    }
    for (const str of text) {
      if (result[str] === 1) {
        return str;
      }
    }
  },

  Sum: () => {
    return 10 + 20;
  },

  Reverse: () => {
    return "hello".split("").reverse().join("");
  },
};

export default Problems;
