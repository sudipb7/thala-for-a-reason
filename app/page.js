"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      setResult(data.text);
    } catch (error) {
      console.error("Error:", error);
      setResult("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-blue-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Thala Checker</CardTitle>
          <CardDescription className="text-center">
            Enter any text and discover its connection to 7
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Enter any text..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full"
            />
            <Button
              type="submit"
              className="w-full"
              disabled={loading || !input.trim()}
            >
              {loading ? "Processing..." : "Check"}
            </Button>
          </form>
        </CardContent>
        {result && (
          <CardFooter className="flex flex-col">
            <div className="mt-4 p-4 bg-blue-50 rounded-md w-full">
              <p className="whitespace-pre-wrap">{result}</p>
            </div>
          </CardFooter>
        )}
      </Card>
    </main>
  );
}
