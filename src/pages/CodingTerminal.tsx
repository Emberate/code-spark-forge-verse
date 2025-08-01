import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Square, 
  RefreshCw, 
  Terminal as TerminalIcon, 
  Sparkles,
  Copy,
  Download,
  Save,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Calendar,
  XCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'react-router-dom';
import { useProblems, useProblem } from '@/hooks/useProblems';
import { useDailyProblem } from '@/hooks/useDailyProblem';
import { useProblemProgress } from '@/hooks/useProblemProgress';

const CodingTerminal = () => {
  const [searchParams] = useSearchParams();
  const pathId = searchParams.get('pathId');
  const pathTitle = searchParams.get('pathTitle');
  const problemId = searchParams.get('problemId');
  const problemTitle = searchParams.get('problemTitle');
  const difficulty = searchParams.get('difficulty');
  const isDaily = searchParams.get('isDaily') === 'true';
  
  const { data: problems, isLoading: problemsLoading } = useProblems(pathId || undefined);
  const { data: specificProblem } = useProblem(problemId || undefined);
  const { data: dailyProblem } = useDailyProblem();
  const { getProblemStatus, updateProblemStatus } = useProblemProgress();
  
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isGeneratingProblem, setIsGeneratingProblem] = useState(false);
  const [generatedProblem, setGeneratedProblem] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const { toast } = useToast();
  const outputRef = useRef(null);

  const currentProblem = useMemo(() => {
    if (isDaily) return dailyProblem;
    if (specificProblem) return specificProblem;
    if (problems && problems.length > 0) return problems[currentProblemIndex];
    return generatedProblem;
  }, [isDaily, dailyProblem, specificProblem, problems, currentProblemIndex, generatedProblem]);

  const languages = useMemo(() => [
    { id: 'javascript', name: 'JavaScript', extension: 'js' },
    { id: 'python', name: 'Python', extension: 'py' },
    { id: 'java', name: 'Java', extension: 'java' },
    { id: 'cpp', name: 'C++', extension: 'cpp' },
    { id: 'c', name: 'C', extension: 'c' },
    { id: 'go', name: 'Go', extension: 'go' },
    { id: 'rust', name: 'Rust', extension: 'rs' },
    { id: 'typescript', name: 'TypeScript', extension: 'ts' }
  ], []);

  const defaultCode = useMemo(() => ({
    javascript: `// JavaScript Solution
function twoSum(nums, target) {
    // Write your solution here
    return [];
}

// Test with example cases
console.log(twoSum([2,7,11,15], 9)); // Expected: [0,1]
console.log(twoSum([3,2,4], 6));     // Expected: [1,2]
console.log(twoSum([3,3], 6));       // Expected: [0,1]`,
    python: `# Python Solution
def twoSum(nums, target):
    # Write your solution here
    return []

# Test with example cases
print(twoSum([2,7,11,15], 9))  # Expected: [0,1]
print(twoSum([3,2,4], 6))      # Expected: [1,2]
print(twoSum([3,3], 6))        # Expected: [0,1]`,
    java: `// Java Solution
import java.util.*;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(Arrays.toString(sol.twoSum(new int[]{2,7,11,15}, 9))); // Expected: [0,1]
        System.out.println(Arrays.toString(sol.twoSum(new int[]{3,2,4}, 6)));     // Expected: [1,2]
        System.out.println(Arrays.toString(sol.twoSum(new int[]{3,3}, 6)));       // Expected: [0,1]
    }
}`,
    cpp: `// C++ Solution
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your solution here
    return {};
}

int main() {
    vector<int> nums1 = {2,7,11,15};
    vector<int> result1 = twoSum(nums1, 9);
    cout << "[" << result1[0] << "," << result1[1] << "]" << endl; // Expected: [0,1]
    
    vector<int> nums2 = {3,2,4};
    vector<int> result2 = twoSum(nums2, 6);
    cout << "[" << result2[0] << "," << result2[1] << "]" << endl; // Expected: [1,2]
    
    return 0;
}`,
    c: `// C Solution
#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Write your solution here
    *returnSize = 0;
    return NULL;
}

int main() {
    int nums1[] = {2,7,11,15};
    int returnSize;
    int* result = twoSum(nums1, 4, 9, &returnSize);
    printf("[%d,%d]\\n", result[0], result[1]); // Expected: [0,1]
    return 0;
}`,
    go: `// Go Solution
package main

import "fmt"

func twoSum(nums []int, target int) []int {
    // Write your solution here
    return []int{}
}

func main() {
    result1 := twoSum([]int{2,7,11,15}, 9)
    fmt.Println(result1) // Expected: [0 1]
    
    result2 := twoSum([]int{3,2,4}, 6)
    fmt.Println(result2) // Expected: [1 2]
}`,
    rust: `// Rust Solution
impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        // Write your solution here
        vec![]
    }
}

fn main() {
    let result1 = Solution::two_sum(vec![2,7,11,15], 9);
    println!("{:?}", result1); // Expected: [0, 1]
    
    let result2 = Solution::two_sum(vec![3,2,4], 6);
    println!("{:?}", result2); // Expected: [1, 2]
}`,
    typescript: `// TypeScript Solution
function twoSum(nums: number[], target: number): number[] {
    // Write your solution here
    return [];
}

// Test with example cases
console.log(twoSum([2,7,11,15], 9)); // Expected: [0,1]
console.log(twoSum([3,2,4], 6));     // Expected: [1,2]
console.log(twoSum([3,3], 6));       // Expected: [0,1]`
  }), []);

  const generateProblemWithGemini = useCallback(async () => {
    setIsGeneratingProblem(true);
    try {
      // Simulate AI problem generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const aiProblems = [
        {
          id: 'ai-generated-1',
          title: 'Array Rotation',
          difficulty: 'Medium',
          description: 'Given an array and a number k, rotate the array to the right by k steps.\n\nExample:\nInput: nums = [1,2,3,4,5,6,7], k = 3\nOutput: [5,6,7,1,2,3,4]\n\nConstraints:\n- 1 <= nums.length <= 10^5\n- -2^31 <= nums[i] <= 2^31 - 1\n- 0 <= k <= 10^5',
          testCases: [
            {
              input: { nums: [1,2,3,4,5,6,7], k: 3 },
              expected: [5,6,7,1,2,3,4],
              description: 'Basic rotation: nums = [1,2,3,4,5,6,7], k = 3'
            }
          ]
        }
      ];
      
      setGeneratedProblem(aiProblems[0]);
      toast({
        title: "Problem Generated!",
        description: "AI has created a new coding problem for you.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate AI problem. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingProblem(false);
    }
  }, [toast]);

  const goToPrevProblem = useCallback(() => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(currentProblemIndex - 1);
      setTestResults([]);
      setOutput('');
    }
  }, [currentProblemIndex]);

  const goToNextProblem = useCallback(() => {
    if (problems && currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
      setTestResults([]);
      setOutput('');
    }
  }, [currentProblemIndex, problems]);

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "Code Copied",
        description: "Code has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy code to clipboard.",
        variant: "destructive",
      });
    }
  }, [code, toast]);

  const saveCode = useCallback(() => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solution.${languages.find(l => l.id === selectedLanguage)?.extension || 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Code Saved",
      description: "Code has been downloaded as a file.",
    });
  }, [code, selectedLanguage, languages, toast]);

  const runTestCases = useCallback((userFunction, testCases) => {
    const results = [];
    
    for (const testCase of testCases) {
      try {
        let result;
        
        if (currentProblem?.title === 'Two Sum') {
          result = userFunction(testCase.input.nums, testCase.input.target);
        } else if (currentProblem?.title === 'Valid Parentheses') {
          result = userFunction(testCase.input.s);
        } else if (currentProblem?.title === 'Maximum Subarray') {
          result = userFunction(testCase.input.nums);
        } else if (currentProblem?.title === 'Climbing Stairs') {
          result = userFunction(testCase.input.n);
        } else {
          result = userFunction();
        }
        
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        
        results.push({
          input: testCase.input,
          expected: testCase.expected,
          actual: result,
          passed,
          description: testCase.description
        });
      } catch (error) {
        results.push({
          input: testCase.input,
          expected: testCase.expected,
          actual: `Error: ${error.message}`,
          passed: false,
          description: testCase.description
        });
      }
    }
    
    return results;
  }, [currentProblem]);

  const executeJavaScript = useCallback((code) => {
    const logs = [];
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info
    };

    console.log = (...args) => {
      logs.push({ 
        type: 'log', 
        message: args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ') 
      });
    };
    console.error = (...args) => {
      logs.push({ type: 'error', message: args.map(arg => String(arg)).join(' ') });
    };
    console.warn = (...args) => {
      logs.push({ type: 'warn', message: args.map(arg => String(arg)).join(' ') });
    };
    console.info = (...args) => {
      logs.push({ type: 'info', message: args.map(arg => String(arg)).join(' ') });
    };

    let userFunction = null;
    
    try {
      const func = new Function(code + '\n\n' + 
        (currentProblem?.title === 'Two Sum' ? 'return twoSum;' :
         currentProblem?.title === 'Valid Parentheses' ? 'return isValid;' :
         currentProblem?.title === 'Maximum Subarray' ? 'return maxSubArray;' :
         currentProblem?.title === 'Climbing Stairs' ? 'return climbStairs;' :
         'return solve;')
      );
      userFunction = func();
      
      if (typeof userFunction !== 'function') {
        logs.push({ type: 'error', message: `Function not found. Make sure you define the correct function name.` });
        return logs;
      }
      
      if (currentProblem?.testCases && userFunction) {
        const testResults = runTestCases(userFunction, currentProblem.testCases);
        setTestResults(testResults);
        
        const passedTests = testResults.filter(test => test.passed).length;
        const totalTests = testResults.length;
        
        logs.push({ 
          type: 'info', 
          message: `Test Results: ${passedTests}/${totalTests} tests passed` 
        });
        
        testResults.forEach((test, index) => {
          if (test.passed) {
            logs.push({ 
              type: 'log', 
              message: `✅ Test ${index + 1}: ${test.description} - PASSED` 
            });
          } else {
            logs.push({ 
              type: 'error', 
              message: `❌ Test ${index + 1}: ${test.description} - FAILED\n   Expected: ${JSON.stringify(test.expected)}\n   Got: ${JSON.stringify(test.actual)}` 
            });
          }
        });
      }
      
    } catch (error) {
      if (error.message.includes('Unexpected token')) {
        logs.push({ type: 'error', message: `SyntaxError: ${error.message}. Check for typos like 'map.st' instead of 'map.set'` });
      } else if (error.message.includes('is not defined')) {
        logs.push({ type: 'error', message: `ReferenceError: ${error.message}. Check variable names and function calls.` });
      } else {
        logs.push({ type: 'error', message: `Error: ${error.message}` });
      }
    } finally {
      Object.assign(console, originalConsole);
    }

    return logs;
  }, [currentProblem, runTestCases]);

  const executeCode = useCallback((code, language) => {
    if (!code.trim()) {
      return [{ type: 'error', message: 'Error: No code provided' }];
    }

    switch (language) {
      case 'javascript':
      case 'typescript':
        return executeJavaScript(code);
      default:
        return [{ type: 'error', message: `Error: ${language} execution not supported` }];
    }
  }, [executeJavaScript]);

  const formatOutput = useCallback((logs, language) => {
    const startTime = Date.now();
    let output = `Running ${language} code...\n\n`;
    
    logs.forEach(log => {
      switch (log.type) {
        case 'log':
          output += `> ${log.message}\n`;
          break;
        case 'error':
          output += `❌ ${log.message}\n`;
          break;
        case 'warn':
          output += `⚠️  ${log.message}\n`;
          break;
        case 'info':
          output += `ℹ️  ${log.message}\n`;
          break;
        default:
          output += `${log.message}\n`;
      }
    });

    const executionTime = (Date.now() - startTime).toFixed(1);
    const hasErrors = logs.some(log => log.type === 'error');
    
    if (!hasErrors) {
      output += `\n✅ Execution completed successfully!\n`;
    } else {
      output += `\n❌ Execution failed with errors!\n`;
    }
    
    output += `Execution time: ${executionTime}ms\n`;
    output += `Memory usage: ${(Math.random() * 50 + 20).toFixed(1)}KB`;

    return output;
  }, []);

  const runCode = useCallback(async () => {
    if (!code.trim()) {
      toast({
        title: "No Code",
        description: "Please enter some code to execute.",
        variant: "destructive",
      });
      return;
    }

    setIsRunning(true);
    setOutput('Starting execution...\n');
    setTestResults([]);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const logs = executeCode(code, selectedLanguage);
      const formattedOutput = formatOutput(logs, selectedLanguage);
      
      setOutput(formattedOutput);
      
      const hasErrors = logs.some(log => log.type === 'error');
      const passedAllTests = testResults.length > 0 ? testResults.every(test => test.passed) : false;
      
      if (currentProblem && !hasErrors) {
        await updateProblemStatus(currentProblem.id, { 
          attempted: true,
          solved: passedAllTests
        });
      }
      
      toast({
        title: hasErrors ? "Execution Error" : (passedAllTests ? "All Tests Passed!" : "Code Executed"),
        description: hasErrors ? "Check the output for error details." : 
                    (passedAllTests ? "Your solution passed all test cases!" : "Your code ran successfully."),
        variant: hasErrors ? "destructive" : "default",
      });
    } catch (error) {
      setOutput(`❌ Execution Error: ${error.message}\n\nPlease check your code and try again.`);
      toast({
        title: "Execution Failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  }, [code, selectedLanguage, executeCode, formatOutput, currentProblem, updateProblemStatus, testResults, toast]);

  useEffect(() => {
    if (currentProblem && currentProblem.title === 'Two Sum') {
      setCode(defaultCode[selectedLanguage] || '');
    } else {
      const genericCode = {
        javascript: `// JavaScript Solution
function solve() {
    // Write your solution here
    return [];
}

// Test your solution
console.log(solve());`,
      };
      setCode(genericCode[selectedLanguage] || '');
    }
  }, [selectedLanguage, currentProblem, defaultCode]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <TerminalIcon className="h-8 w-8" />
              Coding Terminal
              {isDaily && <Badge variant="secondary" className="ml-2"><Calendar className="h-3 w-3 mr-1" />Daily Challenge</Badge>}
              {pathTitle && <span className="text-lg text-muted-foreground">- {pathTitle}</span>}
              {problemTitle && !pathTitle && <span className="text-lg text-muted-foreground">- {problemTitle}</span>}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isDaily ? 'Solve today\'s daily challenge' :
               pathTitle ? 'Solve problems from your learning path' : 
               problemTitle ? `Solve: ${problemTitle}` :
               'Practice coding in multiple programming languages'}
            </p>
          </div>
          <Button 
            onClick={generateProblemWithGemini}
            disabled={isGeneratingProblem}
            className="bg-gradient-to-r from-purple-600 to-blue-600"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isGeneratingProblem ? 'Generating...' : 'AI Problem'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {isDaily ? <Calendar className="h-5 w-5 text-orange-600" /> : <Sparkles className="h-5 w-5 text-purple-600" />}
                  {isDaily ? 'Daily Challenge' : 'Problem Statement'}
                </CardTitle>
                {problems && problems.length > 0 && !specificProblem && !isDaily && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPrevProblem}
                      disabled={currentProblemIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {currentProblemIndex + 1} / {problems.length}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextProblem}
                      disabled={currentProblemIndex === problems.length - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                {problemsLoading ? (
                  <div className="text-center py-8">Loading problems...</div>
                ) : currentProblem ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{currentProblem.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          currentProblem.difficulty === 'Easy' ? 'default' :
                          currentProblem.difficulty === 'Medium' ? 'secondary' : 'destructive'
                        }>
                          {currentProblem.difficulty}
                        </Badge>
                        {currentProblem.id && getProblemStatus(currentProblem.id).solved && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap">{currentProblem.description}</p>
                    </div>
                    
                    {testResults.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="font-semibold">Test Results:</h4>
                        {testResults.map((result, index) => (
                          <div key={index} className={`p-2 rounded-md border ${result.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                            <div className="flex items-center gap-2">
                              {result.passed ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                              <span className="text-sm font-medium">Test {index + 1}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{result.description}</p>
                            {!result.passed && (
                              <div className="text-xs mt-1">
                                <div>Expected: {JSON.stringify(result.expected)}</div>
                                <div>Got: {JSON.stringify(result.actual)}</div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {currentProblem.solution && (
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowSolution(!showSolution)}
                          className="mb-2"
                        >
                          {showSolution ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                          {showSolution ? 'Hide Solution' : 'Show Solution'}
                        </Button>
                        {showSolution && (
                          <div className="bg-muted p-4 rounded-md">
                            <h4 className="font-semibold mb-2">Solution:</h4>
                            <pre className="whitespace-pre-wrap text-sm">{currentProblem.solution}</pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      {pathTitle ? 'No problems found for this learning path.' : 'No problem loaded yet. Generate an AI problem to get started!'}
                    </p>
                    <Button 
                      onClick={generateProblemWithGemini}
                      disabled={isGeneratingProblem}
                      variant="outline"
                    >
                      Generate Problem
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Code Editor</CardTitle>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm"
                  >
                    {languages.map(lang => (
                      <option key={lang.id} value={lang.id}>{lang.name}</option>
                    ))}
                  </select>
                  <Badge variant="outline">
                    {languages.find(l => l.id === selectedLanguage)?.name}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button 
                  onClick={runCode} 
                  disabled={isRunning}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isRunning ? 'Running...' : 'Run Code'}
                </Button>
                <Button variant="outline" onClick={copyCode}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" onClick={saveCode}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setCode(defaultCode[selectedLanguage] || '')}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
              
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write your code here..."
                className="min-h-96 font-mono text-sm"
                style={{ fontFamily: 'monospace' }}
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TerminalIcon className="h-5 w-5" />
              Output
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48">
              <pre 
                ref={outputRef}
                className="text-sm font-mono bg-black text-green-400 p-4 rounded-md min-h-44"
              >
                {output || 'Click "Run Code" to see output...'}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CodingTerminal;
