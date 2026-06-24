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
  // find second large number
  FindSecLaerge: () => {
    const nums = [10, 5, 8, 20, 15];
    let secondLargest = 0;
    let largest = 0;

    for (const num of nums) {
      if (num > largest) {
        secondLargest = largest;
        largest = num;
      } else if (num > secondLargest && num !== largest) {
        secondLargest = num;
      }
    }
    console.log(secondLargest, largest);
    return "g";
  },
  // duplicate numbers remove + second largest and third
  RemDubFindSecLarrge: () => {
    const nums = [10, 5, 8, 20, 15, 20, 10, 8];
    let seen = {};
    let unique = [];
    let largest = -Infinity;
    let secondLargest = -Infinity;
    let thirdLargest = -Infinity;

    for (const num of nums) {
      if (!seen[num]) {
        unique.push(num);
        seen[num] = true;
      }
    }
    for (const num of unique) {
      if (num > largest) {
        thirdLargest = secondLargest;
        secondLargest = largest;
        largest = num;
      } else if (num > secondLargest) {
        thirdLargest = secondLargest;
        secondLargest = num;
      } else if (num > thirdLargest) {
        thirdLargest = num;
      }
    }
    console.log(thirdLargest, secondLargest, largest, unique, seen);
    return "hlo";
  },
  // find kth largest
  KthLargest_1: () => {
    const nums = [15, 5, 8, 20, 15, 20, 10, 8];
    const k = 4;

    let top = [];

    for (const num of nums) {
      top.push(num);

      top.sort((a, b) => b - a);

      if (top.length > k) {
        top.pop();
      }
    }

    return top[k - 1];
  },
  KthLargest_2: () => {
    const nums = [15, 5, 8, 20, 15, 20, 10, 8];
    const k = 5;

    let top = Array(k).fill(-Infinity);

    for (const num of nums) {
      for (let i = 0; i < k; i++) {
        if (num > top[i]) {
          for (let j = k - 1; j > i; j--) {
            top[j] = top[j - 1];
          }

          top[i] = num;
          break;
        }
      }
    }
    console.log(top)

    return top[k - 1];
  },

  Sum: () => {
    return 10 + 20;
  },

  Reverse: () => {
    return "hello".split("").reverse().join("");
  },
};

export default Problems;
