import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  {
    title: "Select Data Source",
    options: ["PDF Documents", "Web Scraping", "Database Records", "API Feeds"],
    additionalParams: [
      { name: "Source File Name", type: "text", placeholder: "my-files" },
      {
        name: "Parser Tool",
        type: "select",
        options: ["PyPDF", "PyMuPdfMarkdown", "Unstructured.IO", "PyMuPdf"],
      },
    ],
  },
  {
    title: "Choose Chunking Strategy",
    options: [
      "Fixed Size",
      "Semantic Paragraphs",
      "Sliding Window",
      "Sentence-based",
    ],
    additionalParams: [
      { name: "Chunk Size", type: "number", min: 100, max: 1000, default: 500 },
      { name: "Overlap", type: "slider", min: 0, max: 100, default: 20 },
    ],
  },
  {
    title: "Select Embedding Model",
    options: ["GTE Large", "BGE Large", "Bert", "Sentence Transformers"],
    additionalParams: [
      {
        name: "Embedding Dimension",
        type: "number",
        min: 64,
        max: 1024,
        default: 256,
      },
    ],
  },
  {
    title: "Vector Search Strategy",
    options: ["Similarity Search", "Hybrid Search"],
    additionalParams: [
      { name: "Index Name", type: "text", placeholder: "my-index" },
    ],
  },
  {
    title: "Manage Prompts",
    isPromptManagement: true,
  },
  {
    title: "Select Language Model",
    options: [
      "DBRX Instruct",
      "Meta Llama 3.1 405B",
      "Meta Llama 3.1 70B",
      "GPT-4",
    ],
    additionalParams: [
      {
        name: "Temperature",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.1,
        default: 0.7,
      },
      { name: "Max Tokens", type: "number", min: 1, max: 4096, default: 256 },
    ],
  },
];

const RAGChatbotGenerator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [params, setParams] = useState({});
  const [chatbotGenerated, setChatbotGenerated] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [newPrompt, setNewPrompt] = useState({ name: "", content: "" });

  const handleSelection = (value) => {
    setSelections({ ...selections, [steps[currentStep].title]: value });
  };

  const handleParamChange = (paramName, value) => {
    setParams({
      ...params,
      [steps[currentStep].title]: {
        ...params[steps[currentStep].title],
        [paramName]: value,
      },
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setChatbotGenerated(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelections({});
    setParams({});
    setChatbotGenerated(false);
  };

  const handleAddPrompt = () => {
    if (newPrompt.name && newPrompt.content) {
      setPrompts([...prompts, newPrompt]);
      setNewPrompt({ name: "", content: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black text-white p-8 font-mono">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap");
        body {
          font-family: "DM San", sans-serif;
        }
      `}</style>
      <h1 className="text-5xl font-bold text-center mb-12 text-red-300 animate-pulse">
        RAG Chatbot Artisan
      </h1>
      <div className="max-w-4xl mx-auto">
        {!chatbotGenerated ? (
          <Card className="bg-gray-800 border-red-500 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold flex items-center">
                {steps[currentStep].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {steps[currentStep].isPromptManagement ? (
                <div className="space-y-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-red-600 hover:bg-red-700 rounded-xl">
                        Add New Prompt
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 text-white rounded-xl">
                      <DialogHeader>
                        <DialogTitle>Add New Prompt</DialogTitle>
                      </DialogHeader>
                      <Input
                        placeholder="Prompt Name"
                        value={newPrompt.name}
                        onChange={(e) =>
                          setNewPrompt({ ...newPrompt, name: e.target.value })
                        }
                        className="bg-gray-700 border-red-500 rounded-xl"
                      />
                      <Textarea
                        placeholder="Prompt Content"
                        value={newPrompt.content}
                        onChange={(e) =>
                          setNewPrompt({
                            ...newPrompt,
                            content: e.target.value,
                          })
                        }
                        className="bg-gray-700 border-red-500 rounded-xl"
                      />
                      <Button
                        onClick={handleAddPrompt}
                        className="bg-red-600 hover:bg-red-700 rounded-xl"
                      >
                        Add Prompt
                      </Button>
                    </DialogContent>
                  </Dialog>
                  <div className="max-h-64 overflow-y-auto">
                    {prompts.map((prompt, index) => (
                      <div
                        key={index}
                        className="bg-gray-700 p-2 rounded-xl mb-2"
                      >
                        <h4 className="font-bold">{prompt.name}</h4>
                        <p className="text-sm">{prompt.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <Select onValueChange={handleSelection}>
                    <SelectTrigger className="w-full bg-gray-700 border-red-500 rounded-xl">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {steps[currentStep].options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {steps[currentStep].additionalParams?.map((param) => (
                    <div key={param.name} className="space-y-2">
                      <label className="text-sm font-medium">
                        {param.name}
                      </label>
                      {param.type === "slider" ? (
                        <Slider
                          min={param.min}
                          max={param.max}
                          step={param.step || 1}
                          defaultValue={[param.default]}
                          onValueChange={(value) =>
                            handleParamChange(param.name, value[0])
                          }
                        />
                      ) : param.type === "select" ? (
                        <Select
                          onValueChange={(value) =>
                            handleParamChange(param.name, value)
                          }
                        >
                          <SelectTrigger className="w-full bg-gray-700 border-red-500 rounded-xl">
                            <SelectValue placeholder="Select a tool" />
                          </SelectTrigger>
                          <SelectContent>
                            {param.options.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          type={param.type}
                          placeholder={param.placeholder}
                          min={param.min}
                          max={param.max}
                          defaultValue={param.default}
                          onChange={(e) =>
                            handleParamChange(param.name, e.target.value)
                          }
                          className="bg-gray-700 border-red-500 rounded-xl"
                        />
                      )}
                    </div>
                  ))}
                </>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-gray-800 border-red-500 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold text-red-300">
                Chatbot Masterpiece Created!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {Object.entries(selections).map(([key, value]) => (
                  <li key={key} className="flex items-center space-x-2">
                    <span className="text-red-400">•</span>
                    <span>{`${key}: ${value}`}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
        <div className="mt-8 flex justify-between items-center">
          <Button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="bg-gray-700 hover:bg-gray-600 rounded-xl"
          >
            Back
          </Button>
          <div className="flex-1 mx-4">
            <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          {!chatbotGenerated ? (
            <Button
              onClick={handleNext}
              disabled={
                !selections[steps[currentStep].title] &&
                !steps[currentStep].isPromptManagement
              }
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 rounded-xl"
            >
              {currentStep === steps.length - 1 ? "Generate Chatbot" : "Next"}
            </Button>
          ) : (
            <Button
              onClick={handleReset}
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 rounded-xl"
            >
              Craft Another Masterpiece
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RAGChatbotGenerator;
