
import { GATESubject, GATEQuestion, LanguageLesson, DSATopic, AptitudeQuestion, TOEFLQuestion } from '../types';

export const DSA_SYLLABUS: DSATopic[] = [
  {
    name: 'Arrays',
    patterns: [
      {
        name: 'Hash Map/Set',
        description: 'Use hash maps or sets to store and quickly look up elements. Perfect for problems requiring O(1) lookup time, checking duplicates, or finding pairs that sum to a target.',
        problems: [
          { id: 'arr-1', title: 'Two Sum', difficulty: 'Easy', statement: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', approach: 'Use a hash map to store the complement of each number.', algorithm: ['Initialize a Map', 'Iterate through the array', 'Calculate complement = target - nums[i]', 'If complement exists in Map, return [Map.get(complement), i]'], pseudocode: 'function twoSum(nums, target) {\n  let map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    let diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n}', youtubeUrl: 'https://www.youtube.com/watch?v=KLlXCFG5TnA', leetcodeUrl: 'https://leetcode.com/problems/two-sum/', gfgUrl: 'https://www.geeksforgeeks.org/check-if-array-has-2-elements-whose-sum-is-equal-to-k/' },
          { id: 'arr-3', title: 'Contains Duplicate', difficulty: 'Easy', statement: 'Return true if any value appears at least twice in the array.', approach: 'Use a Set to track seen numbers.', algorithm: ['Initialize a Set', 'Iterate through array', 'If number exists in Set, return true', 'Else add to Set', 'Return false if loop completes'], pseudocode: 'function containsDuplicate(nums) {\n  const seen = new Set();\n  for (let num of nums) {\n    if (seen.has(num)) return true;\n    seen.add(num);\n  }\n  return false;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=3OamzN90kPg', leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/', gfgUrl: 'https://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/' }
        ]
      },
      {
        name: 'Two Pointers',
        description: 'Use two pointers moving from different ends or at different speeds to solve problems efficiently. Ideal for sorted arrays, finding pairs, or reducing time complexity from O(n²) to O(n).',
        problems: [
          { id: 'arr-6', title: '3Sum', difficulty: 'Medium', statement: 'Find all unique triplets that sum to zero.', approach: 'Sort array and use two pointers.', algorithm: ['Sort the array', 'Iterate through each element', 'Use two pointers to find complement', 'Skip duplicates'], pseudocode: 'function threeSum(nums) {\n  const result = [];\n  nums.sort((a, b) => a - b);\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i-1]) continue;\n    let left = i + 1, right = nums.length - 1;\n    while (left < right) {\n      const sum = nums[i] + nums[left] + nums[right];\n      if (sum === 0) {\n        result.push([nums[i], nums[left], nums[right]]);\n        while (left < right && nums[left] === nums[left+1]) left++;\n        while (left < right && nums[right] === nums[right-1]) right--;\n        left++; right--;\n      } else if (sum < 0) {\n        left++;\n      } else {\n        right--;\n      }\n    }\n  }\n  return result;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=jzZsG8n2R9A', leetcodeUrl: 'https://leetcode.com/problems/3sum/', gfgUrl: 'https://www.geeksforgeeks.org/find-triplets-array-whose-sum-equal-zero/' }
        ]
      },
      {
        name: 'Sliding Window',
        description: 'Maintain a window of elements and slide it through the array. Excellent for finding subarrays/substrings with specific properties, minimizing or maximizing within a window, or problems with fixed/variable window sizes.',
        problems: [
          { id: 'arr-2', title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', statement: 'Find the maximum profit from buying and selling a stock once.', approach: 'Track the minimum price and calculate max profit.', algorithm: ['Initialize minPrice and maxProfit', 'Iterate through prices', 'Update minPrice if current price is lower', 'Calculate profit if sold today, update maxProfit'], pseudocode: 'function maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  for (let price of prices) {\n    minPrice = Math.min(minPrice, price);\n    maxProfit = Math.max(maxProfit, price - minPrice);\n  }\n  return maxProfit;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=1pkOgXD63yU', leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', gfgUrl: 'https://www.geeksforgeeks.org/stock-buy-sell/' }
        ]
      },
      {
        name: 'Prefix/Suffix Sum',
        description: 'Precompute prefix or suffix sums to answer range queries in O(1) time. Useful for problems involving cumulative operations, range sums, or products where you need to exclude certain elements.',
        problems: [
          { id: 'arr-4', title: 'Product of Array Except Self', difficulty: 'Medium', statement: 'Return an array where output[i] is equal to the product of all elements except nums[i].', approach: 'Use prefix and suffix products.', algorithm: ['Initialize result array with 1s', 'Calculate prefix products', 'Calculate suffix products and multiply with prefix', 'Return result'], pseudocode: 'function productExceptSelf(nums) {\n  const n = nums.length;\n  const result = new Array(n).fill(1);\n  let prefix = 1;\n  for (let i = 0; i < n; i++) {\n    result[i] = prefix;\n    prefix *= nums[i];\n  }\n  let suffix = 1;\n  for (let i = n - 1; i >= 0; i--) {\n    result[i] *= suffix;\n    suffix *= nums[i];\n  }\n  return result;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=bNvIQI2wAjk', leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/', gfgUrl: 'https://www.geeksforgeeks.org/product-array-puzzle-set-2-o1-space/' }
        ]
      },
      {
        name: 'Kadane\'s Algorithm',
        description: 'A dynamic programming approach to find the maximum sum subarray. Keep track of the maximum sum ending at each position and reset when the sum becomes negative. Time complexity: O(n), Space: O(1).',
        problems: [
          { id: 'arr-5', title: 'Maximum Subarray (Kadane\'s Algorithm)', difficulty: 'Medium', statement: 'Find the contiguous subarray with the largest sum.', approach: 'Maintain a running sum and reset if it becomes negative.', algorithm: ['Initialize max_so_far and max_ending_here', 'Iterate through elements', 'Add element to max_ending_here', 'If max_ending_here > max_so_far, update max_so_far', 'If max_ending_here < 0, reset to 0'], pseudocode: 'function maxSubArray(nums) {\n  let maxSoFar = -Infinity;\n  let maxEndingHere = 0;\n  for (let num of nums) {\n    maxEndingHere = Math.max(num, maxEndingHere + num);\n    maxSoFar = Math.max(maxSoFar, maxEndingHere);\n  }\n  return maxSoFar;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=5WZl3MMT0Eg', leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/', gfgUrl: 'https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/' }
        ]
      }
    ]
  },
  {
    name: 'Linked Lists',
    patterns: [
      {
        name: 'Reversal',
        description: 'Reverse linked lists by manipulating pointers. Use iterative approach with prev, curr, and next pointers, or recursive approach. Essential for many linked list problems and understanding pointer manipulation.',
        problems: [
          { id: 'll-1', title: 'Reverse a Linked List', difficulty: 'Easy', statement: 'Given the head of a singly linked list, reverse the list.', approach: 'Iterative swap of pointers.', algorithm: ['Set prev as null', 'Set curr as head', 'While curr exists: store next, set curr.next to prev, move prev and curr'], pseudocode: 'function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr) {\n    let next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=G0_I-ZF0S38', leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/', gfgUrl: 'https://www.geeksforgeeks.org/reverse-a-linked-list/' }
        ]
      },
      {
        name: 'Two Pointers',
        description: 'Use fast and slow pointers (Floyd\'s algorithm) to detect cycles, find middle nodes, or solve problems without knowing the length. Fast pointer moves 2x speed, slow moves 1x speed. When fast reaches end, slow is at middle.',
        problems: [
          { id: 'll-2', title: 'Linked List Cycle', difficulty: 'Easy', statement: 'Given head, determine if the linked list has a cycle.', approach: 'Use Floyd\'s cycle detection algorithm (fast and slow pointers).', algorithm: ['Initialize slow and fast pointers at head', 'Move slow by 1, fast by 2', 'If they meet, cycle exists', 'If fast reaches null, no cycle'], pseudocode: 'function hasCycle(head) {\n  let slow = head;\n  let fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=gBTe7lFR3vc', leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/', gfgUrl: 'https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/' },
          { id: 'll-3', title: 'Middle of Linked List', difficulty: 'Easy', statement: 'Return the middle node of a linked list.', approach: 'Use fast and slow pointers.', algorithm: ['Initialize slow and fast at head', 'Move slow by 1, fast by 2', 'When fast reaches end, slow is at middle'], pseudocode: 'function middleNode(head) {\n  let slow = head;\n  let fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n  }\n  return slow;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=A2_ldqM4QcQ', leetcodeUrl: 'https://leetcode.com/problems/middle-of-the-linked-list/', gfgUrl: 'https://www.geeksforgeeks.org/find-middle-of-the-linked-list/' }
        ]
      },
      {
        name: 'Merge',
        description: 'Merge two sorted linked lists by comparing values and building a new list. Use a dummy node to simplify edge cases. Extend this pattern to merge k sorted lists using divide-and-conquer or priority queue.',
        problems: [
          { id: 'll-4', title: 'Merge Two Sorted Lists', difficulty: 'Easy', statement: 'Merge two sorted linked lists into one sorted list.', approach: 'Use a dummy node and compare values.', algorithm: ['Create dummy node', 'Compare values from both lists', 'Attach smaller node to result', 'Continue until one list ends', 'Attach remaining nodes'], pseudocode: 'function mergeTwoLists(l1, l2) {\n  let dummy = new ListNode(0);\n  let curr = dummy;\n  while (l1 && l2) {\n    if (l1.val < l2.val) {\n      curr.next = l1;\n      l1 = l1.next;\n    } else {\n      curr.next = l2;\n      l2 = l2.next;\n    }\n    curr = curr.next;\n  }\n  curr.next = l1 || l2;\n  return dummy.next;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=XIdigk957u0', leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/', gfgUrl: 'https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/' }
        ]
      }
    ]
  },
  {
    name: 'Dynamic Programming',
    patterns: [
      {
        name: '1D DP',
        description: 'Dynamic programming with a one-dimensional array. Each dp[i] represents the optimal solution up to position i. Build the solution bottom-up by relating each state to previous states. Common for linear problems like climbing stairs, house robber, or coin change.',
        problems: [
          { id: 'dp-1', title: 'Climbing Stairs', difficulty: 'Easy', statement: 'Distinct ways to reach the top of N stairs.', approach: 'Fibonacci sequence logic using DP table.', algorithm: ['Base cases n=1, n=2', 'dp[i] = dp[i-1] + dp[i-2]'], pseudocode: 'function climbStairs(n) {\n  if (n <= 2) return n;\n  let dp = [1, 2];\n  for (let i = 3; i <= n; i++) {\n    dp[i] = dp[i-1] + dp[i-2];\n  }\n  return dp[n];\n}', youtubeUrl: 'https://www.youtube.com/watch?v=Y0lT9Fck7q8', leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/', gfgUrl: 'https://www.geeksforgeeks.org/count-ways-reach-nth-stair/' },
          { id: 'dp-2', title: 'House Robber', difficulty: 'Medium', statement: 'Maximum money that can be robbed from houses without robbing two adjacent houses.', approach: 'DP: rob current house or skip it.', algorithm: ['dp[i] = max(dp[i-1], dp[i-2] + nums[i])', 'Base cases: dp[0] = nums[0], dp[1] = max(nums[0], nums[1])'], pseudocode: 'function rob(nums) {\n  if (nums.length === 0) return 0;\n  if (nums.length === 1) return nums[0];\n  let dp = [nums[0], Math.max(nums[0], nums[1])];\n  for (let i = 2; i < nums.length; i++) {\n    dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);\n  }\n  return dp[nums.length - 1];\n}', youtubeUrl: 'https://www.youtube.com/watch?v=73r3KWiEvyk', leetcodeUrl: 'https://leetcode.com/problems/house-robber/', gfgUrl: 'https://www.geeksforgeeks.org/find-maximum-possible-stolen-value-houses/' }
        ]
      },
      {
        name: '2D DP',
        description: 'Dynamic programming with a two-dimensional array. dp[i][j] represents the optimal solution for subproblem at position (i,j). Common for grid problems, string matching, or problems with two changing parameters. Think: "What does dp[i][j] represent?"',
        problems: [
          { id: 'dp-3', title: 'Unique Paths', difficulty: 'Medium', statement: 'Find the number of unique paths from top-left to bottom-right in a grid.', approach: 'DP: paths[i][j] = paths[i-1][j] + paths[i][j-1].', algorithm: ['Initialize dp[0][j] = 1 and dp[i][0] = 1', 'For each cell, sum paths from top and left', 'Return dp[m-1][n-1]'], pseudocode: 'function uniquePaths(m, n) {\n  let dp = Array(m).fill().map(() => Array(n).fill(1));\n  for (let i = 1; i < m; i++) {\n    for (let j = 1; j < n; j++) {\n      dp[i][j] = dp[i-1][j] + dp[i][j-1];\n    }\n  }\n  return dp[m-1][n-1];\n}', youtubeUrl: 'https://www.youtube.com/watch?v=IlEsdxuD4lY', leetcodeUrl: 'https://leetcode.com/problems/unique-paths/', gfgUrl: 'https://www.geeksforgeeks.org/count-possible-paths-top-left-bottom-right-nxm-matrix/' }
        ]
      },
      {
        name: 'Memoization',
        description: 'Top-down approach: cache results of expensive function calls to avoid recomputation. Store results in a hash map/dictionary. Perfect for recursive problems with overlapping subproblems. Convert recursive solution to memoized version by adding a memo parameter.',
        problems: [
          { id: 'dp-4', title: 'Fibonacci Number', difficulty: 'Easy', statement: 'Calculate the nth Fibonacci number.', approach: 'Use memoization to avoid recalculating subproblems.', algorithm: ['Base cases: F(0) = 0, F(1) = 1', 'Memoize results', 'Return memo[n] if exists', 'Otherwise calculate and store'], pseudocode: 'function fib(n, memo = {}) {\n  if (n in memo) return memo[n];\n  if (n <= 1) return n;\n  memo[n] = fib(n-1, memo) + fib(n-2, memo);\n  return memo[n];\n}', youtubeUrl: 'https://www.youtube.com/watch?v=vYquumk4nWw', leetcodeUrl: 'https://leetcode.com/problems/fibonacci-number/', gfgUrl: 'https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/' }
        ]
      }
    ]
  },
  {
    name: 'Stack',
    patterns: [
      {
        name: 'Monotonic Stack',
        description: 'Maintain a stack where elements are in monotonic (increasing or decreasing) order. Perfect for finding next/previous greater/smaller elements, or problems where you need to process elements in a specific order. Pop elements that violate the monotonic property.',
        problems: [
          { id: 'st-1', title: 'Next Greater Element', difficulty: 'Medium', statement: 'Find the next greater element for each element in the array.', approach: 'Use a monotonic decreasing stack to track elements waiting for their next greater element.', algorithm: ['Initialize result array with -1', 'Use stack to store indices', 'For each element, pop smaller elements and update their result', 'Push current index to stack'], pseudocode: 'function nextGreaterElement(nums) {\n  const result = new Array(nums.length).fill(-1);\n  const stack = [];\n  for (let i = 0; i < nums.length; i++) {\n    while (stack.length && nums[stack[stack.length-1]] < nums[i]) {\n      result[stack.pop()] = nums[i];\n    }\n    stack.push(i);\n  }\n  return result;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=Du881K7Jtk8', leetcodeUrl: 'https://leetcode.com/problems/next-greater-element-i/', gfgUrl: 'https://www.geeksforgeeks.org/next-greater-element/' },
          { id: 'st-2', title: 'Largest Rectangle in Histogram', difficulty: 'Hard', statement: 'Find the largest rectangle area in a histogram.', approach: 'Use monotonic stack to find boundaries where height decreases.', algorithm: ['Use stack to store indices', 'When height decreases, calculate area with popped height', 'Track maximum area'], pseudocode: 'function largestRectangleArea(heights) {\n  const stack = [];\n  let maxArea = 0;\n  for (let i = 0; i <= heights.length; i++) {\n    while (stack.length && (i === heights.length || heights[stack[stack.length-1]] > heights[i])) {\n      const h = heights[stack.pop()];\n      const w = stack.length === 0 ? i : i - stack[stack.length-1] - 1;\n      maxArea = Math.max(maxArea, h * w);\n    }\n    stack.push(i);\n  }\n  return maxArea;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=zx5Sw9130L0', leetcodeUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', gfgUrl: 'https://www.geeksforgeeks.org/largest-rectangle-under-histogram/' }
        ]
      },
      {
        name: 'Stack-based Problems',
        description: 'Use stack\'s LIFO (Last In First Out) property to solve problems involving matching pairs, nested structures, or problems requiring processing in reverse order. Common for parentheses matching, expression evaluation, or maintaining order.',
        problems: [
          { id: 'st-3', title: 'Valid Parentheses', difficulty: 'Easy', statement: 'Determine if a string containing parentheses is valid.', approach: 'Use stack to match opening and closing brackets.', algorithm: ['Use stack to store opening brackets', 'When closing bracket found, check if matches top of stack', 'If stack empty at end, valid'], pseudocode: 'function isValid(s) {\n  const stack = [];\n  const map = { "(": ")", "{": "}", "[": "]" };\n  for (let char of s) {\n    if (map[char]) {\n      stack.push(char);\n    } else {\n      if (stack.length === 0 || map[stack.pop()] !== char) return false;\n    }\n  }\n  return stack.length === 0;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=WTzjTskDFMg', leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/', gfgUrl: 'https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/' },
          { id: 'st-4', title: 'Daily Temperatures', difficulty: 'Medium', statement: 'Find how many days until a warmer temperature for each day.', approach: 'Use stack to track days waiting for warmer temperature.', algorithm: ['Use stack to store indices', 'For each temperature, pop colder days and calculate difference', 'Push current index'], pseudocode: 'function dailyTemperatures(temperatures) {\n  const result = new Array(temperatures.length).fill(0);\n  const stack = [];\n  for (let i = 0; i < temperatures.length; i++) {\n    while (stack.length && temperatures[stack[stack.length-1]] < temperatures[i]) {\n      const idx = stack.pop();\n      result[idx] = i - idx;\n    }\n    stack.push(i);\n  }\n  return result;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=cTBiBSnjO3c', leetcodeUrl: 'https://leetcode.com/problems/daily-temperatures/', gfgUrl: 'https://www.geeksforgeeks.org/daily-temperatures/' }
        ]
      }
    ]
  },
  {
    name: 'Queue',
    patterns: [
      {
        name: 'BFS (Breadth-First Search)',
        description: 'Explore level by level using a queue. Process all nodes at current level before moving to next. Guarantees shortest path in unweighted graphs. Use for level-order traversal, shortest path problems, or when you need to process nodes in order of distance from start.',
        problems: [
          { id: 'q-1', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', statement: 'Return the level order traversal of a binary tree.', approach: 'Use queue to process nodes level by level.', algorithm: ['Initialize queue with root', 'While queue not empty, process all nodes at current level', 'Add children to queue for next level'], pseudocode: 'function levelOrder(root) {\n  if (!root) return [];\n  const result = [];\n  const queue = [root];\n  while (queue.length) {\n    const level = [];\n    const size = queue.length;\n    for (let i = 0; i < size; i++) {\n      const node = queue.shift();\n      level.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    result.push(level);\n  }\n  return result;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=86g8jAugBHM', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', gfgUrl: 'https://www.geeksforgeeks.org/level-order-tree-traversal/' },
          { id: 'q-2', title: 'Rotting Oranges', difficulty: 'Medium', statement: 'Find minimum time to rot all oranges in a grid.', approach: 'Use BFS starting from all rotten oranges simultaneously.', algorithm: ['Add all rotten oranges to queue', 'BFS: process all oranges at current time', 'Increment time for each level', 'Check if all fresh oranges become rotten'], pseudocode: 'function orangesRotting(grid) {\n  const queue = [];\n  let fresh = 0;\n  for (let i = 0; i < grid.length; i++) {\n    for (let j = 0; j < grid[0].length; j++) {\n      if (grid[i][j] === 2) queue.push([i, j]);\n      if (grid[i][j] === 1) fresh++;\n    }\n  }\n  let minutes = 0;\n  const dirs = [[0,1],[1,0],[0,-1],[-1,0]];\n  while (queue.length && fresh > 0) {\n    const size = queue.length;\n    for (let i = 0; i < size; i++) {\n      const [r, c] = queue.shift();\n      for (let [dr, dc] of dirs) {\n        const nr = r + dr, nc = c + dc;\n        if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] === 1) {\n          grid[nr][nc] = 2;\n          queue.push([nr, nc]);\n          fresh--;\n        }\n      }\n    }\n    minutes++;\n  }\n  return fresh === 0 ? minutes : -1;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=y704fEOx0s0', leetcodeUrl: 'https://leetcode.com/problems/rotting-oranges/', gfgUrl: 'https://www.geeksforgeeks.org/minimum-time-required-so-that-all-oranges-become-rotten/' }
        ]
      },
      {
        name: 'Queue-based Problems',
        description: 'Use queue\'s FIFO (First In First Out) property for problems requiring order preservation. Implement queues using arrays, linked lists, or two stacks. Essential for BFS, task scheduling, or any problem requiring sequential processing.',
        problems: [
          { id: 'q-3', title: 'Implement Queue using Stacks', difficulty: 'Easy', statement: 'Implement a queue using two stacks.', approach: 'Use one stack for enqueue, another for dequeue operations.', algorithm: ['Push to stack1 for enqueue', 'For dequeue, if stack2 empty, transfer all from stack1', 'Pop from stack2'], pseudocode: 'class MyQueue {\n  constructor() {\n    this.stack1 = [];\n    this.stack2 = [];\n  }\n  push(x) {\n    this.stack1.push(x);\n  }\n  pop() {\n    if (this.stack2.length === 0) {\n      while (this.stack1.length) {\n        this.stack2.push(this.stack1.pop());\n      }\n    }\n    return this.stack2.pop();\n  }\n}', youtubeUrl: 'https://www.youtube.com/watch?v=3Et9MrMc02A', leetcodeUrl: 'https://leetcode.com/problems/implement-queue-using-stacks/', gfgUrl: 'https://www.geeksforgeeks.org/queue-using-stacks/' }
        ]
      }
    ]
  },
  {
    name: 'Hashing',
    patterns: [
      {
        name: 'Hash Map/Set',
        description: 'Use hash maps to group, categorize, or quickly look up data. Perfect for anagram problems (use sorted string as key), finding relationships between elements, or problems requiring O(1) lookup. Sets are great for tracking seen elements or checking membership.',
        problems: [
          { id: 'hash-1', title: 'Group Anagrams', difficulty: 'Medium', statement: 'Group strings that are anagrams of each other.', approach: 'Use sorted string as key in hash map.', algorithm: ['For each string, sort characters to get key', 'Group strings with same key', 'Return grouped arrays'], pseudocode: 'function groupAnagrams(strs) {\n  const map = {};\n  for (let str of strs) {\n    const key = str.split("").sort().join("");\n    if (!map[key]) map[key] = [];\n    map[key].push(str);\n  }\n  return Object.values(map);\n}', youtubeUrl: 'https://www.youtube.com/watch?v=vzdNOK2oB2E', leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/', gfgUrl: 'https://www.geeksforgeeks.org/given-a-sequence-of-words-print-all-anagrams-together/' },
          { id: 'hash-2', title: 'Longest Consecutive Sequence', difficulty: 'Medium', statement: 'Find the length of the longest consecutive sequence in unsorted array.', approach: 'Use set to check for consecutive numbers.', algorithm: ['Add all numbers to set', 'For each number, check if it\'s start of sequence', 'Count consecutive numbers', 'Track maximum length'], pseudocode: 'function longestConsecutive(nums) {\n  const numSet = new Set(nums);\n  let longest = 0;\n  for (let num of numSet) {\n    if (!numSet.has(num - 1)) {\n      let length = 1;\n      while (numSet.has(num + length)) {\n        length++;\n      }\n      longest = Math.max(longest, length);\n    }\n  }\n  return longest;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=P6RZZMu_maU', leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/', gfgUrl: 'https://www.geeksforgeeks.org/longest-consecutive-subsequence/' }
        ]
      },
      {
        name: 'Frequency Counting',
        description: 'Count occurrences of elements using hash maps. Then process frequencies to find top K elements, most frequent, or solve problems based on element counts. Use bucket sort for efficient top-K when range is limited.',
        problems: [
          { id: 'hash-3', title: 'Top K Frequent Elements', difficulty: 'Medium', statement: 'Find the k most frequent elements in an array.', approach: 'Count frequencies, then select top k.', algorithm: ['Count frequency of each element', 'Sort by frequency or use bucket sort', 'Return top k elements'], pseudocode: 'function topKFrequent(nums, k) {\n  const freq = {};\n  for (let num of nums) {\n    freq[num] = (freq[num] || 0) + 1;\n  }\n  const buckets = Array(nums.length + 1).fill().map(() => []);\n  for (let num in freq) {\n    buckets[freq[num]].push(parseInt(num));\n  }\n  const result = [];\n  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {\n    result.push(...buckets[i]);\n  }\n  return result.slice(0, k);\n}', youtubeUrl: 'https://www.youtube.com/watch?v=YPTqKIgVk-k', leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/', gfgUrl: 'https://www.geeksforgeeks.org/find-k-numbers-occurrences-given-array/' }
        ]
      }
    ]
  },
  {
    name: 'Binary Tree',
    patterns: [
      {
        name: 'DFS (Depth-First Search)',
        description: 'Explore as deep as possible before backtracking. Use recursion or explicit stack. Perfect for tree problems, path finding, or when you need to explore all possibilities. Three traversal orders: Preorder (root-left-right), Inorder (left-root-right), Postorder (left-right-root).',
        problems: [
          { id: 'bt-1', title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', statement: 'Find the maximum depth of a binary tree.', approach: 'Recursive DFS: depth = 1 + max(left, right).', algorithm: ['Base case: if null, return 0', 'Recursively find depth of left and right', 'Return 1 + max of both'], pseudocode: 'function maxDepth(root) {\n  if (!root) return 0;\n  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}', youtubeUrl: 'https://www.youtube.com/watch?v=hTM3phVI6YQ', leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', gfgUrl: 'https://www.geeksforgeeks.org/write-a-c-program-to-find-the-maximum-depth-or-height-of-a-tree/' },
          { id: 'bt-2', title: 'Same Tree', difficulty: 'Easy', statement: 'Check if two binary trees are identical.', approach: 'Recursive comparison of nodes and subtrees.', algorithm: ['If both null, return true', 'If one null or values differ, return false', 'Recursively check left and right subtrees'], pseudocode: 'function isSameTree(p, q) {\n  if (!p && !q) return true;\n  if (!p || !q || p.val !== q.val) return false;\n  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}', youtubeUrl: 'https://www.youtube.com/watch?v=vRbbcKXCxOw', leetcodeUrl: 'https://leetcode.com/problems/same-tree/', gfgUrl: 'https://www.geeksforgeeks.org/write-c-code-to-determine-if-two-trees-are-identical/' }
        ]
      },
      {
        name: 'Tree Traversal',
        description: 'Visit all nodes in a specific order. Inorder traversal of BST gives sorted order. Use iterative approach with stack for better space control. Understand when to use each traversal: Preorder for copying trees, Inorder for BST validation, Postorder for deletion.',
        problems: [
          { id: 'bt-3', title: 'Binary Tree Inorder Traversal', difficulty: 'Easy', statement: 'Return inorder traversal of binary tree.', approach: 'Left -> Root -> Right order.', algorithm: ['Recursively traverse left subtree', 'Visit root', 'Recursively traverse right subtree'], pseudocode: 'function inorderTraversal(root) {\n  const result = [];\n  function inorder(node) {\n    if (!node) return;\n    inorder(node.left);\n    result.push(node.val);\n    inorder(node.right);\n  }\n  inorder(root);\n  return result;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=5dySuyZf9Qg', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', gfgUrl: 'https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/' },
          { id: 'bt-4', title: 'Validate Binary Search Tree', difficulty: 'Medium', statement: 'Check if binary tree is a valid BST.', approach: 'Use bounds to validate each node.', algorithm: ['Each node must be within (min, max) bounds', 'Left subtree: (min, node.val)', 'Right subtree: (node.val, max)'], pseudocode: 'function isValidBST(root) {\n  function validate(node, min, max) {\n    if (!node) return true;\n    if (node.val <= min || node.val >= max) return false;\n    return validate(node.left, min, node.val) && validate(node.right, node.val, max);\n  }\n  return validate(root, -Infinity, Infinity);\n}', youtubeUrl: 'https://www.youtube.com/watch?v=s6ATEkipzow', leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/', gfgUrl: 'https://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/' }
        ]
      },
      {
        name: 'Tree Construction',
        description: 'Build trees from traversal arrays. Use preorder to find root, inorder to split left/right subtrees. Recursively construct left and right subtrees. Key insight: first element of preorder is always the root, find it in inorder to determine subtree boundaries.',
        problems: [
          { id: 'bt-5', title: 'Construct Binary Tree from Preorder and Inorder', difficulty: 'Medium', statement: 'Build binary tree from preorder and inorder traversal arrays.', approach: 'Use preorder to find root, inorder to split left/right.', algorithm: ['First element of preorder is root', 'Find root in inorder to split left and right', 'Recursively build left and right subtrees'], pseudocode: 'function buildTree(preorder, inorder) {\n  if (preorder.length === 0) return null;\n  const rootVal = preorder[0];\n  const root = new TreeNode(rootVal);\n  const rootIndex = inorder.indexOf(rootVal);\n  root.left = buildTree(preorder.slice(1, rootIndex+1), inorder.slice(0, rootIndex));\n  root.right = buildTree(preorder.slice(rootIndex+1), inorder.slice(rootIndex+1));\n  return root;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=ihj4IQGZ2zc', leetcodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', gfgUrl: 'https://www.geeksforgeeks.org/construct-tree-from-given-inorder-and-preorder-traversal/' }
        ]
      }
    ]
  },
  {
    name: 'Graph',
    patterns: [
      {
        name: 'DFS (Depth-First Search)',
        description: 'Explore graph by going as deep as possible before backtracking. Use recursion or explicit stack. Mark visited nodes to avoid cycles. Perfect for connected components, path finding, or exploring all reachable nodes. Time: O(V+E) for adjacency list representation.',
        problems: [
          { id: 'g-1', title: 'Number of Islands', difficulty: 'Medium', statement: 'Count the number of islands in a 2D grid.', approach: 'DFS to mark all connected land cells.', algorithm: ['Iterate through grid', 'When land found, DFS to mark all connected land', 'Increment island count'], pseudocode: 'function numIslands(grid) {\n  let count = 0;\n  function dfs(r, c) {\n    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] === "0") return;\n    grid[r][c] = "0";\n    dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);\n  }\n  for (let i = 0; i < grid.length; i++) {\n    for (let j = 0; j < grid[0].length; j++) {\n      if (grid[i][j] === "1") {\n        dfs(i, j);\n        count++;\n      }\n    }\n  }\n  return count;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=__98uL6wst8', leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/', gfgUrl: 'https://www.geeksforgeeks.org/find-number-of-islands/' },
          { id: 'g-2', title: 'Clone Graph', difficulty: 'Medium', statement: 'Deep copy a connected undirected graph.', approach: 'Use DFS with hash map to track cloned nodes.', algorithm: ['Use map to store original -> clone mapping', 'DFS: if node cloned, return clone', 'Otherwise create clone and recursively clone neighbors'], pseudocode: 'function cloneGraph(node) {\n  const map = {};\n  function clone(n) {\n    if (!n) return null;\n    if (map[n.val]) return map[n.val];\n    const copy = new Node(n.val);\n    map[n.val] = copy;\n    for (let neighbor of n.neighbors) {\n      copy.neighbors.push(clone(neighbor));\n    }\n    return copy;\n  }\n  return clone(node);\n}', youtubeUrl: 'https://www.youtube.com/watch?v=mQeF6bN8hMk', leetcodeUrl: 'https://leetcode.com/problems/clone-graph/', gfgUrl: 'https://www.geeksforgeeks.org/clone-an-undirected-graph/' }
        ]
      },
      {
        name: 'BFS (Breadth-First Search)',
        description: 'Explore level by level using a queue. Process all nodes at distance k before nodes at distance k+1. Guarantees shortest path in unweighted graphs. Use for shortest path problems, level-order processing, or when you need minimum steps/distance.',
        problems: [
          { id: 'g-3', title: 'Shortest Path in Binary Matrix', difficulty: 'Medium', statement: 'Find shortest path from top-left to bottom-right in binary matrix.', approach: 'BFS to find shortest path.', algorithm: ['Use queue starting from (0,0)', 'Process each level, mark visited', 'When reach target, return path length'], pseudocode: 'function shortestPathBinaryMatrix(grid) {\n  if (grid[0][0] === 1) return -1;\n  const n = grid.length;\n  const queue = [[0, 0, 1]];\n  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];\n  grid[0][0] = 1;\n  while (queue.length) {\n    const [r, c, dist] = queue.shift();\n    if (r === n-1 && c === n-1) return dist;\n    for (let [dr, dc] of dirs) {\n      const nr = r + dr, nc = c + dc;\n      if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {\n        grid[nr][nc] = 1;\n        queue.push([nr, nc, dist + 1]);\n      }\n    }\n  }\n  return -1;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=U5Mw4eyUmw4', leetcodeUrl: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/', gfgUrl: 'https://www.geeksforgeeks.org/shortest-path-in-a-binary-matrix/' }
        ]
      },
      {
        name: 'Topological Sort',
        description: 'Linear ordering of vertices in a directed acyclic graph (DAG) where for every edge (u,v), u comes before v. Use DFS with finishing times or Kahn\'s algorithm with in-degree counting. Essential for dependency resolution, course scheduling, or build systems.',
        problems: [
          { id: 'g-4', title: 'Course Schedule', difficulty: 'Medium', statement: 'Determine if you can finish all courses given prerequisites.', approach: 'Detect cycle using topological sort.', algorithm: ['Build adjacency list', 'Use DFS to detect cycles', 'If cycle found, return false'], pseudocode: 'function canFinish(numCourses, prerequisites) {\n  const graph = Array(numCourses).fill().map(() => []);\n  for (let [course, prereq] of prerequisites) {\n    graph[prereq].push(course);\n  }\n  const visited = new Set();\n  const recStack = new Set();\n  function hasCycle(node) {\n    if (recStack.has(node)) return true;\n    if (visited.has(node)) return false;\n    visited.add(node);\n    recStack.add(node);\n    for (let neighbor of graph[node]) {\n      if (hasCycle(neighbor)) return true;\n    }\n    recStack.delete(node);\n    return false;\n  }\n  for (let i = 0; i < numCourses; i++) {\n    if (hasCycle(i)) return false;\n  }\n  return true;\n}', youtubeUrl: 'https://www.youtube.com/watch?v=EgI5nU9etnU', leetcodeUrl: 'https://leetcode.com/problems/course-schedule/', gfgUrl: 'https://www.geeksforgeeks.org/find-whether-it-is-possible-to-finish-all-tasks-or-not-from-given-dependencies/' }
        ]
      }
    ]
  }
];

export const APTITUDE_DATA: Record<string, { practice: AptitudeQuestion[], learn: { content: string, videoUrl: string } }> = {
  'Quantitative': {
    practice: [
      { id: 'q-1', question: 'A train 140m long is running at 60 km/hr. In how much time will it pass a platform 160m long?', options: ['12 sec', '15 sec', '18 sec', '20 sec'], correctAnswer: 2, explanation: 'Total distance = 140 + 160 = 300m. Speed = 60 * 5/18 = 16.67 m/s. Time = 300 / 16.67 = 18 sec.', formula: 'Time = Distance / Speed', shortcut: 'Speed in m/s = km/hr * 5/18', companyTags: ['TCS', 'Infosys'] },
      { id: 'q-2', question: 'If 20% of a = b, then b% of 20 is the same as:', options: ['4% of a', '5% of a', '20% of a', 'None'], correctAnswer: 0, explanation: 'b = 0.2a. b% of 20 = (0.2a/100) * 20 = 0.04a = 4% of a.', companyTags: ['Wipro'] }
    ],
    learn: { content: 'Master percentages, profit/loss, and time-distance concepts.', videoUrl: 'https://www.youtube.com/watch?v=RBAfH_6YidA' }
  },
  'Logical Reasoning': {
    practice: [
      { id: 'lr-1', question: 'Pointing to a photograph, a man said, "I have no brother or sister but that man\'s father is my father\'s son." Whose photograph was it?', options: ['His own', 'His son\'s', 'His father\'s', 'His nephew\'s'], correctAnswer: 1, explanation: '"My father\'s son" is the man himself. So, the man in the photo\'s father is ME. Thus, it is my son.', shortcut: 'Draw a family tree diagram.', companyTags: ['Accenture'] }
    ],
    learn: { content: 'Focus on Blood Relations, Syllogisms, and Number Series.', videoUrl: 'https://www.youtube.com/watch?v=NDVIdoK2D9g' }
  }
};

export const GATE_SYLLABUS: GATESubject[] = [
  {
    name: 'Operating Systems',
    subtopics: ['CPU Scheduling', 'Deadlocks', 'Memory Management', 'Process Sync'],
    learnVideos: [
      { title: 'CPU Scheduling Algorithms', url: 'https://www.youtube.com/watch?v=bkSWJJZNgfU', duration: '22 mins' },
      { title: 'Process Synchronization - Semaphores', url: 'https://www.youtube.com/watch?v=X00XpXpC63U', duration: '18 mins' }
    ]
  },
  {
    name: 'Computer Networks',
    subtopics: ['IP Addressing', 'TCP/UDP', 'Routing Algorithms', 'Data Link Layer'],
    learnVideos: [
      { title: 'IP Addressing and Subnetting', url: 'https://www.youtube.com/watch?v=3EJlovevfcA', duration: '30 mins' }
    ]
  }
];

export const GATE_PRACTICE_QUESTIONS: Record<string, GATEQuestion[]> = {
  'CPU Scheduling': [
    { id: 'g-os-1', type: 'MCQ', question: 'Which scheduling algorithm is non-preemptive?', options: ['FCFS', 'Round Robin', 'SRTF', 'Priority'], correctAnswer: 'FCFS', explanation: 'First-Come-First-Serve is purely non-preemptive unless explicitly interrupted.' }
  ],
  'IP Addressing': [
    { id: 'g-cn-1', type: 'MCQ', question: 'What is the broadcast address for the network 192.168.1.0/24?', options: ['192.168.1.0', '192.168.1.255', '255.255.255.255', '192.168.2.1'], correctAnswer: '192.168.1.255', explanation: 'The broadcast address for a /24 network is the 255th address.' }
  ]
};

export const JLPT_DATA: Record<string, LanguageLesson[]> = {
  'N5': [
    { id: 'n5-k-1', category: 'Kanji', japanese: '一', romaji: 'Ichi', english: 'One', example: '一月 (Ichigatsu) - January' },
    { id: 'n5-v-1', category: 'Vocabulary', japanese: '先生', romaji: 'Sensei', english: 'Teacher', example: '先生は日本人です。' },
    { id: 'n5-g-1', category: 'Grammar', japanese: '〜は〜です', romaji: 'wa... desu', english: 'A is B', example: '私は学生です。 (I am a student)' },
    { id: 'n5-s-1', category: 'Speaking', japanese: 'お元気ですか', romaji: 'O-genki desu ka', english: 'How are you?', example: 'はい、元気です。', audioPrompt: 'Record yourself asking "How are you?" in Japanese.' }
  ],
  'N4': [
    { id: 'n4-v-1', category: 'Vocabulary', japanese: '経験', romaji: 'Keiken', english: 'Experience', example: 'いい経験になりました。' }
  ],
  'N3': [], 'N2': [], 'N1': []
};

export const TOEFL_DATA: TOEFLQuestion[] = [
  {
    id: 't-read-1',
    type: 'reading',
    title: 'Marine Ecosystems',
    passage: 'Coral reefs are some of the most diverse ecosystems on Earth. They are often called the rainforests of the sea.',
    questions: [
      { q: 'Why are coral reefs called rainforests of the sea?', opts: ['Rain falls on them', 'High biodiversity', 'They have trees', 'Salt water'], ans: 1, explanation: 'They support a vast variety of marine life.' }
    ]
  },
  {
    id: 't-list-1',
    type: 'listening',
    title: 'Campus Life Lecture',
    audioUrl: 'https://example.com/audio.mp3',
    questions: [
      { q: 'What is the main topic?', opts: ['Housing', 'Clubs', 'Exams', 'Grading'], ans: 0, explanation: 'The lecturer focuses on student housing options.' }
    ]
  }
];
