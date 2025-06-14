
import React, { useState, useRef, useEffect } from 'react';
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
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CodingTerminal = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [isGeneratingProblem, setIsGeneratingProblem] = useState(false);
  const { toast } = useToast();
  const outputRef = useRef(null);

  const languages = [
    { id: 'javascript', name: 'JavaScript', extension: 'js' },
    { id: 'python', name: 'Python', extension: 'py' },
    { id: 'java', name: 'Java', extension: 'java' },
    { id: 'cpp', name: 'C++', extension: 'cpp' },
    { id: 'c', name: 'C', extension: 'c' },
    { id: 'go', name: 'Go', extension: 'go' },
    { id: 'rust', name: 'Rust', extension: 'rs' },
    { id: 'typescript', name: 'TypeScript', extension: 'ts' }
  ];

  const defaultCode = {
    javascript: `// JavaScript Solution
function twoSum(nums, target) {
    // Your code here
    return [];
}

// Test case
console.log(twoSum([2, 7, 11, 15], 9));`,
    python: `# Python Solution
def two_sum(nums, target):
    # Your code here
    return []

# Test case
print(two_sum([2, 7, 11, 15], 9))`,
    java: `// Java Solution
public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{};
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] result = sol.twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(Arrays.toString(result));
    }
}`,
    cpp: `// C++ Solution
#include <iostream>
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    vector<int> result = twoSum(nums, 9);
    // Print result
    return 0;
}`,
    c: `// C Solution
#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Your code here
    *returnSize = 0;
    return NULL;
}

int main() {
    int nums[] = {2, 7, 11, 15};
    int returnSize;
    int* result = twoSum(nums, 4, 9, &returnSize);
    return 0;
}`,
    go: `// Go Solution
package main

import "fmt"

func twoSum(nums []int, target int) []int {
    // Your code here
    return []int{}
}

func main() {
    result := twoSum([]int{2, 7, 11, 15}, 9)
    fmt.Println(result)
}`,
    rust: `// Rust Solution
impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        // Your code here
        vec![]
    }
}

fn main() {
    let result = Solution::two_sum(vec![2, 7, 11, 15], 9);
    println!("{:?}", result);
}`,
    typescript: `// TypeScript Solution
function twoSum(nums: number[], target: number): number[] {
    // Your code here
    return [];
}

// Test case
console.log(twoSum([2, 7, 11, 15], 9));`
  };

  useEffect(() => {
    setCode(defaultCode[selectedLanguage] || '');
  }, [selectedLanguage]);

  const generateProblemWithGemini = async () => {
    setIsGeneratingProblem(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAYkHjBl1SD0FHlb-DdJ4A26JCKrVWCVrg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a LeetCode-style coding problem with the following format:
              
              Title: [Problem Title]
              Difficulty: [Easy/Medium/Hard]
              
              Problem Description:
              [Clear problem description with examples]
              
              Example 1:
              Input: [input]
              Output: [output]
              Explanation: [explanation]
              
              Example 2:
              Input: [input]
              Output: [output]
              Explanation: [explanation]
              
              Constraints:
              - [constraint 1]
              - [constraint 2]
              
              Hints:
              - [hint 1]
              - [hint 2]
              
              Make it a medium difficulty problem focusing on arrays, strings, or basic algorithms. Keep it educational and solvable.`
            }]
          }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]) {
        const problemText = data.candidates[0].content.parts[0].text;
        setCurrentProblem(problemText);
        toast({
          title: "New Problem Generated!",
          description: "A fresh coding challenge is ready for you.",
        });
      }
    } catch (error) {
      console.error('Error generating problem:', error);
      toast({
        title: "Error",
        description: "Failed to generate problem. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingProblem(false);
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running code...\n');
    
    // Simulate code execution
    setTimeout(() => {
      const mockOutputs = {
        javascript: `Running JavaScript code...
> [0, 1]
✅ Test passed!
Execution time: 1.2ms
Memory usage: 45.3KB`,
        python: `Running Python code...
> [0, 1]
✅ Test passed!
Execution time: 2.1ms  
Memory usage: 38.7KB`,
        java: `Compiling Java code...
Running Java code...
> [0, 1]
✅ Test passed!
Execution time: 15.3ms
Memory usage: 52.1KB`,
        cpp: `Compiling C++ code...
Running C++ code...
> Result: [0, 1]
✅ Test passed!
Execution time: 0.8ms
Memory usage: 12.4KB`
      };
      
      setOutput(mockOutputs[selectedLanguage] || `Running ${selectedLanguage} code...\n> Output generated\n✅ Execution completed!`);
      setIsRunning(false);
      
      toast({
        title: "Code Executed!",
        description: "Your code ran successfully.",
      });
    }, 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard.",
    });
  };

  const saveCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solution.${languages.find(l => l.id === selectedLanguage)?.extension || 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Code Saved!",
      description: "File downloaded successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <TerminalIcon className="h-8 w-8" />
              Coding Terminal
            </h1>
            <p className="text-muted-foreground mt-2">
              Practice coding in multiple programming languages with AI-generated problems
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
          {/* Problem Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Problem Statement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                {currentProblem ? (
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm">{currentProblem}</pre>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      No problem loaded yet. Generate an AI problem to get started!
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

          {/* Code Editor Panel */}
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

        {/* Output Panel */}
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
