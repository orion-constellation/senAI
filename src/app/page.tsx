"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/app/components/ui/buttons/Button";
//import { Input } from "@/app/components/ui/input/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card/Card";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'
import { Google, Zap } from "lucide-react";



export function OrionAnalysisTool() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [showLightning, setShowLightning] = useState(false);
  return { setIsLoggedIn, setIsToolOpen, setSelectedFunction, setResult, setIsLoading, setNotification, setShowLightning }
}

const performAnalysis = async (input: string) => {
  console.log("Performing analysis on:", input);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return `Analysis result for: ${input}`;
};

const loginWithGoogle = async () => {
  console.log("Logging in with Google");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return true;
};


const handleGoogleLogin = async () => {
  try {
    const success = await loginWithGoogle();
    if (success) {
      setIsLoggedIn(true);
    }
  } catch (error) {
    console.error("Error logging in", error);
    // Provide feedback to the user in case of an error
  }
};

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const success = await loginWithGoogle();
      if (success) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Google login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = async () => {
    if (selectedFunction) {
      setIsLoading(true);
      try {
        const analysisResult = await performAnalysis(selectedFunction);
        setResult(analysisResult);
      } catch (error) {
        console.error("Error during analysis", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleTool = useCallback(() => {
    if (isLoggedIn) {
      setIsToolOpen((prev) => !prev);
    } else {
      alert("Please log in first");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.metaKey && event.altKey && event.key === "d") {
        toggleTool();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [toggleTool]);

  OrionAnalysisTool()

  return (

    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {!isLoggedIn && (
        <div className="flex space-x-4 mb-6">
          <Button onClick={handleLogin} className="bg-white text-black">
            {isLoading ? "Loading..." : "Login"}
          </Button>
          <Button onClick={handleGoogleLogin} className="bg-white text-black">
            <Google className="mr-2 h-4 w-4" />
            Login with Google
          </Button>
        </div>
      )}

      {isLoggedIn && isToolOpen && (
        <Card className="w-96 bg-black text-white border-2 border-green-500 shadow-lg relative">
          <CardHeader>
            <CardTitle className="text-right text-sm text-white">Orion Analysis Tool</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              className="bg-white text-black border-2 border-green-500 rounded-lg h-10 px-3 py-2 w-full"
              value={selectedFunction}
              onChange={(e) => setSelectedFunction(e.target.value)}
            >
              <option value="" disabled>
                Select a function
              </option>
              <option value="get_cyber_info">get_cyber_info</option>
              <option value="run analysis">run analysis</option>
            </select>

            <Button onClick={handleInput} className="w-full bg-white text-black mt-4">
              {isLoading ? "Processing..." : "Submit"}
            </Button>

            {result && (
              <div className="mt-4 bg-white text-black p-3 border-2 border-green-500 rounded-lg">
                {result}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );