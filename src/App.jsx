import { useState } from "react";
import { Copy, Trash2, Code2, Sparkles, ArrowRight } from "lucide-react";

function App() {
  const [inputCode, setInputCode] = useState("print('hello')");
  const [language, setLanguage] = useState("python");
  const [outputCode, setOutputCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const permanentPrompt =
    "Convert the given code into the specified language accurately and return ONLY the converted code.";

  const handleConvert = async () => {
    if (!inputCode.trim()) return alert("Please enter some code!");

    setLoading(true);

    const fullPrompt = `
${permanentPrompt}
Target Language: ${language}
Input Code:
${inputCode}
`;

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "AI Code Converter",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-8b-instruct",
          messages: [{ role: "user", content: fullPrompt }],
        }),
      });

      const data = await res.json();

      setOutputCode(
        data?.choices?.[0]?.message?.content || "No output received"
      );
    } catch (err) {
      console.error(err);
      setOutputCode("Error converting code");
    }

    setLoading(false);
  };

  const handleCopy = () => {
    if (outputCode) {
      navigator.clipboard.writeText(outputCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInputCode("");
    setOutputCode("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-3">
            <Code2 className="w-10 h-10 text-indigo-600" />
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Code Converter
            </h1>
          </div>
          <p className="text-gray-600 text-base md:text-lg">
            Transform your code across languages instantly
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Section */}
            <div className="p-4 md:p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-b md:border-b-0 md:border-r border-gray-200 rounded-t-2xl md:rounded-tl-2xl md:rounded-bl-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  Input Code
                </h2>
              </div>

              <textarea
                className="w-full h-64 md:h-80 p-4 bg-white border-2 border-indigo-200 rounded-xl resize-none focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-mono text-sm"
                placeholder="Paste or type your code here..."
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />

              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Convert to:
                  </label>
                  <select
                    className="w-full p-3 bg-white border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all cursor-pointer"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {/* All language options */}
                    <option value="pseudo code">Pseudo Code</option>
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="c++">C++</option>
                    <option value="c">C</option>
                    <option value="java">Java</option>
                    <option value="c#">C#</option>
                    <option value="go">Go</option>
                    <option value="rust">Rust</option>
                    <option value="php">PHP</option>
                    <option value="ruby">Ruby</option>
                    <option value="kotlin">Kotlin</option>
                    <option value="swift">Swift</option>
                    <option value="r">R</option>
                    <option value="dart">Dart</option>
                    <option value="scala">Scala</option>
                    <option value="perl">Perl</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="sql">SQL</option>
                    <option value="matlab">MATLAB</option>
                    <option value="shell">Shell / Bash</option>
                    <option value="objective-c">Objective-C</option>
                    <option value="lua">Lua</option>
                    <option value="assembly">Assembly</option>
                    <option value="powershell">PowerShell</option>
                    <option value="julia">Julia</option>
                    <option value="f#">F#</option>
                    <option value="visual-basic">Visual Basic</option>
                  </select>
                </div>

                <button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  onClick={handleConvert}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Convert Code
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Output Section */}
            <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-b-2xl md:rounded-br-2xl md:rounded-tr-2xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    Output Code
                  </h2>
                </div>

                <div className="flex gap-2">
                  <button
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleCopy}
                    disabled={!outputCode}
                    title="Copy code"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                    onClick={handleClear}
                    title="Clear all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative">
                <pre className="w-full h-64 md:h-80 p-4 bg-gray-900 text-green-400 rounded-xl overflow-auto font-mono text-sm border-2 border-gray-700">
                  {outputCode || "// Converted code will appear here..."}
                </pre>

                {copied && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
                    ✓ Copied!
                  </div>
                )}
              </div>

              {outputCode && (
                <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    ✓ Code converted successfully!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Powered by AI • Supports multiple programming languages
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
