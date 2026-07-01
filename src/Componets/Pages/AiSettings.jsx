import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const API_URL = "https://cosmetic-backend-e6ia.onrender.com";

const AiSettings = () => {
  const [enabled, setEnabled] = useState(true);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [suggestedQuestions, setSuggestedQuestions] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/ai/settings`);
        setEnabled(data.enabled);
        setSystemPrompt(data.systemPrompt || "");
        setWelcomeMessage(data.welcomeMessage || "");
        setSuggestedQuestions((data.suggestedQuestions || []).join("\n"));
      } catch (error) {
        console.error("Failed to load AI settings", error);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/ai/settings`,
        {
          enabled,
          systemPrompt,
          welcomeMessage,
          suggestedQuestions: suggestedQuestions
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("AI settings updated successfully");
    } catch (error) {
      toast.error("Unable to update AI settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 dark:bg-black dark:text-white">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">AI Assistant Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Control the website chatbot behavior, welcome text, and suggested questions.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6 rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900">
          <label className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4 dark:border-zinc-700">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(event) => setEnabled(event.target.checked)}
              className="h-4 w-4"
            />
            <span className="font-medium">Enable AI chatbot</span>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Welcome message
            <textarea
              value={welcomeMessage}
              onChange={(event) => setWelcomeMessage(event.target.value)}
              className="min-h-24 rounded-xl border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            System prompt
            <textarea
              value={systemPrompt}
              onChange={(event) => setSystemPrompt(event.target.value)}
              className="min-h-32 rounded-xl border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Suggested questions (one per line)
            <textarea
              value={suggestedQuestions}
              onChange={(event) => setSuggestedQuestions(event.target.value)}
              className="min-h-28 rounded-xl border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
            />
          </label>

          <div className="flex items-center justify-between">
            <Button type="submit" className="bg-black text-white" disabled={saving}>
              {saving ? "Saving..." : "Save AI Settings"}
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Settings are stored server-side and applied instantly.
            </p>
          </div>
        </form>
      </div>
      <Toaster position="top-right" />
    </main>
  );
};

export default AiSettings;
