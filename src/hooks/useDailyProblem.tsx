
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface DailyProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  solution?: string;
  tags: string[];
  acceptance: string;
  frequency: 'Low' | 'Medium' | 'High';
  companies: string[];
  testCases?: Array<{
    input: any;
    expected: any;
    description?: string;
  }>;
}

export const useDailyProblem = () => {
  return useQuery({
    queryKey: ['daily-problem', new Date().toDateString()],
    queryFn: async (): Promise<DailyProblem> => {
      // Get today's date as seed for consistent daily problem
      const today = new Date().toDateString();
      const seed = today.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
      
      // Try to get from database first
      const { data: problems } = await supabase
        .from('problems')
        .select('*')
        .limit(10);

      if (problems && problems.length > 0) {
        const dailyIndex = seed % problems.length;
        const problem = problems[dailyIndex];
        return {
          id: problem.id,
          title: problem.title,
          difficulty: problem.difficulty as 'Easy' | 'Medium' | 'Hard',
          description: problem.description || '',
          solution: problem.solution,
          tags: problem.tags || [],
          acceptance: '45.2%', // Default value
          frequency: 'High' as const,
          companies: ['Google', 'Amazon', 'Microsoft']
        };
      }

      // Fallback to predefined problems if database is empty
      const fallbackProblems: DailyProblem[] = [
        {
          id: 'daily-1',
          title: 'Two Sum',
          difficulty: 'Easy',
          description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nExample 1:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n\nConstraints:\n- 2 <= nums.length <= 10^4\n- -10^9 <= nums[i] <= 10^9\n- -10^9 <= target <= 10^9',
          solution: 'function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}',
          tags: ['Array', 'Hash Table'],
          acceptance: '50.1%',
          frequency: 'High',
          companies: ['Amazon', 'Google', 'Microsoft'],
          testCases: [
            {
              input: { nums: [2, 7, 11, 15], target: 9 },
              expected: [0, 1],
              description: 'Basic case: nums = [2,7,11,15], target = 9'
            },
            {
              input: { nums: [3, 2, 4], target: 6 },
              expected: [1, 2],
              description: 'Different indices: nums = [3,2,4], target = 6'
            },
            {
              input: { nums: [3, 3], target: 6 },
              expected: [0, 1],
              description: 'Same numbers: nums = [3,3], target = 6'
            }
          ]
        },
        {
          id: 'daily-2',
          title: 'Valid Parentheses',
          difficulty: 'Easy',
          description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.\n\nExample 1:\nInput: s = "()"\nOutput: true\n\nExample 2:\nInput: s = "()[]{}"\nOutput: true\n\nConstraints:\n- 1 <= s.length <= 10^4\n- s consists of parentheses only \'()[]{}\'.', 
          tags: ['String', 'Stack'],
          acceptance: '40.8%',
          frequency: 'High',
          companies: ['Amazon', 'Microsoft', 'Google'],
          testCases: [
            {
              input: { s: "()" },
              expected: true,
              description: 'Simple parentheses: s = "()"'
            },
            {
              input: { s: "()[]{}" },
              expected: true,
              description: 'Mixed brackets: s = "()[]{}"'
            },
            {
              input: { s: "(]" },
              expected: false,
              description: 'Invalid order: s = "(]"'
            }
          ]
        },
        {
          id: 'daily-3',
          title: 'Reverse Linked List',
          difficulty: 'Easy',
          description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.\n\nExample 1:\nInput: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]\n\nConstraints:\n- The number of nodes in the list is the range [0, 5000].\n- -5000 <= Node.val <= 5000',
          tags: ['Linked List', 'Recursion'],
          acceptance: '72.1%',
          frequency: 'High',
          companies: ['Amazon', 'Microsoft', 'Apple'],
          testCases: [
            {
              input: { head: [1, 2, 3, 4, 5] },
              expected: [5, 4, 3, 2, 1],
              description: 'Basic reversal: [1,2,3,4,5] -> [5,4,3,2,1]'
            },
            {
              input: { head: [1, 2] },
              expected: [2, 1],
              description: 'Two nodes: [1,2] -> [2,1]'
            },
            {
              input: { head: [] },
              expected: [],
              description: 'Empty list: [] -> []'
            }
          ]
        },
        {
          id: 'daily-4',
          title: 'Maximum Subarray',
          difficulty: 'Medium',
          description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.\n\nExample 1:\nInput: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: The subarray [4,-1,2,1] has the largest sum 6.\n\nConstraints:\n- 1 <= nums.length <= 10^5\n- -10^4 <= nums[i] <= 10^4',
          tags: ['Array', 'Dynamic Programming'],
          acceptance: '49.9%',
          frequency: 'High',
          companies: ['Amazon', 'Microsoft', 'LinkedIn'],
          testCases: [
            {
              input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
              expected: 6,
              description: 'Basic case: [-2,1,-3,4,-1,2,1,-5,4] -> 6'
            },
            {
              input: { nums: [1] },
              expected: 1,
              description: 'Single element: [1] -> 1'
            },
            {
              input: { nums: [5, 4, -1, 7, 8] },
              expected: 23,
              description: 'All positive subarray: [5,4,-1,7,8] -> 23'
            }
          ]
        },
        {
          id: 'daily-5',
          title: 'Climbing Stairs',
          difficulty: 'Easy',
          description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\n\nExample 1:\nInput: n = 2\nOutput: 2\nExplanation: There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps\n\nConstraints:\n- 1 <= n <= 45',
          tags: ['Math', 'Dynamic Programming'],
          acceptance: '51.5%',
          frequency: 'High',
          companies: ['Amazon', 'Adobe', 'Apple'],
          testCases: [
            {
              input: { n: 2 },
              expected: 2,
              description: 'Two steps: n = 2 -> 2 ways'
            },
            {
              input: { n: 3 },
              expected: 3,
              description: 'Three steps: n = 3 -> 3 ways'
            },
            {
              input: { n: 1 },
              expected: 1,
              description: 'One step: n = 1 -> 1 way'
            }
          ]
        }
      ];

      const dailyIndex = seed % fallbackProblems.length;
      return fallbackProblems[dailyIndex];
    },
    refetchOnWindowFocus: false,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};
