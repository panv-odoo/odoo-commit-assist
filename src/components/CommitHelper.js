import React, { useState } from "react";
import { FaClipboard, FaCheck } from "react-icons/fa";

const CommitHelper = () => {
    const [commitType, setCommitType] = useState("IMP");
    const [title, setTitle] = useState("");
    const [commitMessage, setCommitMessage] = useState("");
    const [taskId, setTaskId] = useState("");
    const [enhancedMessage, setEnhancedMessage] = useState("");
    const [copied, setCopied] = useState(false);
    
    const wrapText = (text, length = 73) => {
        return text
        .split("\n")
        .map((line) => {
            const words = line.split(" ");
            let wrappedLine = "";
            let currentLine = "";
            words.forEach((word) => {
                if (currentLine.length + word.length + 1 > length) {
                    wrappedLine += currentLine.trim() + "\n";
                    currentLine = word + " ";
                } else {
                    currentLine += word + " ";
                }
            });
            wrappedLine += currentLine.trim();
            return wrappedLine;
        })
        .join("\n");
    };
    
    const showDirectMessage = () => {
        setEnhancedMessage(wrapText(`[${commitType}] ${title}\n\n${commitMessage}\n\ntask-${taskId}`));
    };
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(enhancedMessage).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => console.error("Failed to copy: ", err));
    };
    
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", background: "#f4f4f9", fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <div style={{ width: "800px", background: "#ffffff", padding: "30px", borderRadius: "12px", boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}>
        <h2 style={{ color: "#333", textAlign: "center", marginBottom: "20px" }}>Commit Message Helper</h2>
        <label style={{ fontWeight: "bold", color: "#444" }}>Title:</label>
        <div style={{ display: "flex", gap: "10px" }}>
        <select style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "6px", width: "70px" }} value={commitType} onChange={(e) => setCommitType(e.target.value)}>
        <option value="IMP">IMP</option>
        <option value="FIX">FIX</option>
        </select>
        <input type="text" style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }} value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <label style={{ fontWeight: "bold", color: "#444", marginTop: "10px" }}>Commit Message:</label>
        <textarea rows="4" style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px", marginBottom: "10px" }} value={commitMessage} onChange={(e) => setCommitMessage(e.target.value)}></textarea>
        <label style={{ fontWeight: "bold", color: "#444" }}>Task ID:</label>
        <input type="text" style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px", marginBottom: "20px" }} value={taskId} onChange={(e) => setTaskId(e.target.value.replace(/\D/g, ""))} />
        <div style={{ textAlign: "center" }}>
        <button onClick={showDirectMessage} style={{ padding: "10px 20px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
        Show Direct Message
        </button>
        </div>
        </div>
        <div style={{ width: "800px", marginTop: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "6px", background: "#f9f9f9", position: "relative" }}>
        <h4 style={{ color: "#333", marginBottom: "10px" }}>Generated Commit Message:</h4>
        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", background: "#eee", padding: "10px", borderRadius: "6px", fontSize: "14px" }}>{enhancedMessage}</pre>
        <button onClick={copyToClipboard} style={{ position: "absolute", top: "10px", right: "10px", padding: "6px 12px", border: "none", borderRadius: "6px", cursor: "pointer", backgroundColor: copied ? "green" : "#007bff", color: "white" }}>
        {copied ? <FaCheck /> : <FaClipboard />}
        </button>
        </div>
        </div>
    );
};

export default CommitHelper;
