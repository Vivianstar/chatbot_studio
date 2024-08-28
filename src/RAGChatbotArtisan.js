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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

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

const quickFeatures = [
  {
    name: "Context-Aware Prompt Adjustment",
    description:
      "Automatically adjust prompts based on the context of the conversation",
  },
  {
    name: "Feedback Loop Integration",
    description:
      "Enable users to provide feedback directly within the chat interface",
  },
  {
    name: "Sentiment Analysis",
    description: "Analyze user sentiment to adapt responses",
  },
  {
    name: "Real-Time Response Quality Monitoring",
    description: "Continuously assess the quality of chatbot responses",
  },
];

const integrations = [
  "Website Embed",
  "Slack",
  "Discord",
  "Facebook Messenger",
  "WhatsApp",
];

const RAGChatbotArtisan = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [params, setParams] = useState({});
  const [chatbotGenerated, setChatbotGenerated] = useState(false);
  const [overlap, setOverlap] = useState(20);
  const [temperature, setTemperature] = useState(0.7);

  const [prompts, setPrompts] = useState([]);
  const [newPrompt, setNewPrompt] = useState({ name: "", content: "" });
  const [activeFeatures, setActiveFeatures] = useState([]);
  const [selectedIntegration, setSelectedIntegration] = useState("");
  const [customizationOptions, setCustomizationOptions] = useState({
    primaryColor: "#ff0000",
    fontStyle: "Modern",
    chatBubbleStyle: "Round",
  });
  const [previewMode, setPreviewMode] = useState("desktop");
  const [currentTab, setCurrentTab] = useState("setup"); // Track the current tab

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
    if (paramName === "Overlap") {
      setOverlap(value);
    } else if (paramName === "Temperature") {
      setTemperature(value);
    }
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
    setCurrentTab("setup");
  };

  const handleAddPrompt = () => {
    if (newPrompt.name && newPrompt.content) {
      setPrompts([...prompts, newPrompt]);
      setNewPrompt({ name: "", content: "" });
    }
  };

  const handleFeatureToggle = (featureName) => {
    setActiveFeatures((prev) =>
      prev.includes(featureName)
        ? prev.filter((f) => f !== featureName)
        : [...prev, featureName]
    );
  };

  const handleCustomizationChange = (option, value) => {
    setCustomizationOptions((prev) => ({ ...prev, [option]: value }));
  };

  const ChatbotPreview = () => {
    const [messages, setMessages] = useState([
      { sender: "bot", text: "Hello! How can I assist you today?" },
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleSendMessage = () => {
      if (inputValue.trim()) {
        setMessages([...messages, { sender: "user", text: inputValue.trim() }]);
        setInputValue("");

        // Simulate bot response after user message
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: "This is a simulated response." },
          ]);
        }, 1000);
      }
    };

    return (
      <div
        className={`chatbot-preview ${previewMode}`}
        style={{
          backgroundColor: customizationOptions.primaryColor,
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div
          className="chat-messages"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            marginBottom: "10px",
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === "bot" ? "bot" : "user"}`}
              style={{
                margin: "5px 0",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor:
                  message.sender === "bot" ? "#2d3748" : "#4a5568",
                alignSelf: message.sender === "bot" ? "flex-start" : "flex-end",
                color: "white",
                maxWidth: "60%",
              }}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input" style={{ display: "flex" }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              marginRight: "10px",
            }}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff0000",
              border: "none",
              borderRadius: "10px",
              color: "white",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black text-white p-8 font-mono">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap");
        body {
          font-family: "DM Mono", monospace;
        }
      `}</style>
      <h1 className="text-5xl font-bold text-center mb-12 text-red-300">
        Chatbot Studio
      </h1>
      <div className="max-w-4xl mx-auto">
        <Tabs
          value={currentTab}
          onValueChange={(value) => setCurrentTab(value)}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="features">Quick Features</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
            <TabsTrigger value="integrate">Integrate</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="setup">
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
                        <Label className="text-sm font-medium">
                          {param.name}
                          {param.type === "slider" && (
                            <span className="ml-2">
                              (
                              {param.name === "Overlap" ? overlap : temperature}
                              )
                            </span>
                          )}
                        </Label>
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
          </TabsContent>
          <TabsContent value="features">
            <Card className="bg-gray-800 border-red-500 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-3xl font-semibold">
                  Quick Add Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                {quickFeatures.map((feature) => (
                  <div
                    key={feature.name}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <h3 className="font-semibold">{feature.name}</h3>
                      <p className="text-sm text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                    <Switch
                      checked={activeFeatures.includes(feature.name)}
                      onCheckedChange={() => handleFeatureToggle(feature.name)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="customize">
            <Card className="bg-gray-800 border-red-500 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-3xl font-semibold">
                  Customize Your Chatbot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    value={customizationOptions.primaryColor}
                    onChange={(e) =>
                      handleCustomizationChange("primaryColor", e.target.value)
                    }
                    className="w-full h-10 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Font Style
                  </label>
                  <Select
                    onValueChange={(value) =>
                      handleCustomizationChange("fontStyle", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select font style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Modern">Modern</SelectItem>
                      <SelectItem value="Classic">Classic</SelectItem>
                      <SelectItem value="Playful">Playful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Chat Bubble Style
                  </label>
                  <Select
                    onValueChange={(value) =>
                      handleCustomizationChange("chatBubbleStyle", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select chat bubble style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Round">Round</SelectItem>
                      <SelectItem value="Square">Square</SelectItem>
                      <SelectItem value="Bubble">Bubble</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="integrate">
            <Card className="bg-gray-800 border-red-500 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-3xl font-semibold">
                  Integrate Your Chatbot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select Integration Platform
                  </label>
                  <Select
                    onValueChange={(value) => setSelectedIntegration(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {integrations.map((integration) => (
                        <SelectItem key={integration} value={integration}>
                          {integration}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card className="bg-gray-800 border-red-500 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-3xl font-semibold">
                  Preview Your Chatbot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <Button
                    onClick={() => setPreviewMode("desktop")}
                    className={`${
                      previewMode === "desktop" ? "bg-red-600" : "bg-gray-700"
                    } rounded-xl px-4 py-2 mx-2`}
                  >
                    Desktop
                  </Button>
                  <Button
                    onClick={() => setPreviewMode("mobile")}
                    className={`${
                      previewMode === "mobile" ? "bg-red-600" : "bg-gray-700"
                    } rounded-xl px-4 py-2 mx-2`}
                  >
                    Mobile
                  </Button>
                </div>
                <ChatbotPreview />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex justify-around mt-8">
        <Button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="bg-red-600 hover:bg-red-700 rounded-xl px-6 py-3"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="bg-red-600 hover:bg-red-700 rounded-xl px-6 py-3"
        >
          {currentStep < steps.length - 1 ? "Next" : "Generate Chatbot"}
        </Button>
      </div>
      {chatbotGenerated && currentTab === "setup" && (
        <div className="mt-12 text-center">
          <h2 className="text-4xl font-bold text-red-300 mb-4">
            Chatbot Generated Successfully!
          </h2>
          <Button
            onClick={handleReset}
            className="bg-red-600 hover:bg-red-700 rounded-xl px-6 py-3"
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default RAGChatbotArtisan;
