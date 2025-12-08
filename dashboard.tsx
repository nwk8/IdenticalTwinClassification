import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  Maximize2, 
  Minus, 
  X, 
  Search, 
  Database, 
  Settings, 
  User, 
  AlertTriangle,
  CheckCircle,
  Activity,
  FileText,
  Camera,
  Save,
  Printer
} from "lucide-react";
import person1 from "@assets/generated_images/low_res_digital_photo_of_a_person_for_facial_recognition.png";
import person2 from "@assets/generated_images/low_res_digital_photo_of_a_woman_for_facial_recognition.png";

export default function Dashboard() {
  const [scanning, setScanning] = useState(false);
  const [matchPercent, setMatchPercent] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] WhoRU? Engine v2.0 initialized.",
    "[NETWORK] Connected to local biometric node (192.168.1.105).",
    "[DB] Loaded 4,291 records from cache.",
    "[READY] Waiting for input stream..."
  ]);

  const startScan = () => {
    setScanning(true);
    setMatchPercent(0);
    setLogs(prev => [...prev, "[CMD] Initiating comparison sequence..."]);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 5;
      if (progress >= 87) { // Stop at 87% for a "partial match" or realistic vibe
        progress = 87.4;
        clearInterval(interval);
        setScanning(false);
        setLogs(prev => [...prev, "[SUCCESS] Match found: ID #9921-X (Confidence: 87.4%)"]);
      }
      setMatchPercent(Math.min(progress, 100));
    }, 100);
  };

  return (
    <div className="w-[1024px] h-[768px] java-window flex flex-col font-ui text-sm select-none">
      {/* Title Bar */}
      <div className="java-title-bar h-7 shrink-0">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-white" />
          <span>WhoRU? Platform v2.0 [Administrator Mode]</span>
        </div>
        <div className="flex gap-1">
          <button className="java-button w-6 h-5 flex items-center justify-center p-0"><Minus size={10} /></button>
          <button className="java-button w-6 h-5 flex items-center justify-center p-0"><Maximize2 size={10} /></button>
          <button className="java-button w-6 h-5 flex items-center justify-center p-0 bg-red-800 text-white border-red-900"><X size={10} /></button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="java-menu-bar flex gap-4 px-2 py-1 text-black shrink-0">
        <span className="cursor-pointer hover:bg-blue-200 px-1">File</span>
        <span className="cursor-pointer hover:bg-blue-200 px-1">Edit</span>
        <span className="cursor-pointer hover:bg-blue-200 px-1">View</span>
        <span className="cursor-pointer hover:bg-blue-200 px-1">Database</span>
        <span className="cursor-pointer hover:bg-blue-200 px-1">Tools</span>
        <span className="cursor-pointer hover:bg-blue-200 px-1">Window</span>
        <span className="cursor-pointer hover:bg-blue-200 px-1">Help</span>
      </div>

      {/* Toolbar */}
      <div className="bg-[#ECE9D8] border-b border-gray-400 p-1 flex gap-2 shrink-0">
        <ToolbarButton icon={<Database size={16} />} label="Load DB" />
        <ToolbarButton icon={<Camera size={16} />} label="Capture" />
        <div className="w-[1px] bg-gray-400 mx-1"></div>
        <ToolbarButton icon={<Search size={16} />} label="Analyze" onClick={startScan} />
        <ToolbarButton icon={<Printer size={16} />} label="Report" />
        <div className="w-[1px] bg-gray-400 mx-1"></div>
        <ToolbarButton icon={<Settings size={16} />} label="Config" />
      </div>

      {/* Main Content Area - Split Pane */}
      <div className="flex-1 flex p-1 gap-1 overflow-hidden bg-[#808080]">
        
        {/* Left Pane - Source */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="bevel-out bg-[#ECE9D8] px-2 py-1 font-bold text-blue-900 flex justify-between items-center">
            <span>SOURCE INPUT [CAM_01]</span>
            <span className="text-green-600 text-xs flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> LIVE</span>
          </div>
          <div className="flex-1 bevel-in bg-black relative flex items-center justify-center overflow-hidden p-1">
            <div className="relative w-full h-full bg-black border border-gray-600">
               <img src={person1} className="w-full h-full object-cover opacity-90" />
               <div className="absolute inset-0 scanlines opacity-30"></div>
               
               {/* Face Detection Box */}
               <div className="absolute top-[20%] left-[25%] w-[50%] h-[60%] border-2 border-green-400 opacity-70">
                  <div className="absolute -top-4 left-0 bg-green-400 text-black text-[10px] px-1 font-tech">FACE_DETECT</div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-green-400"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-green-400"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-green-400"></div>
               </div>

               {/* Metrics Overlay */}
               <div className="absolute bottom-2 left-2 text-green-400 font-tech text-xs bg-black/50 p-1">
                 ISO: 400<br/>
                 EXP: 1/60<br/>
                 IRIS: LOCKED
               </div>
            </div>
          </div>
          <div className="h-24 bevel-out p-2 font-tech text-xs flex flex-col gap-1">
            <div className="flex justify-between">
              <span>Subject ID:</span>
              <span className="font-bold">UNKNOWN</span>
            </div>
            <div className="flex justify-between">
              <span>Biometric Hash:</span>
              <span className="text-gray-500 truncate w-32">a1-f9-00-22...</span>
            </div>
            <div className="flex justify-between">
              <span>Emotion:</span>
              <span>NEUTRAL (92%)</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-1 bg-[#ECE9D8] border-x border-white cursor-col-resize flex flex-col justify-center items-center">
           <div className="w-full h-1 bg-gray-400 mb-1"></div>
           <div className="w-full h-1 bg-gray-400 mb-1"></div>
           <div className="w-full h-1 bg-gray-400"></div>
        </div>

        {/* Right Pane - Match */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="bevel-out bg-[#ECE9D8] px-2 py-1 font-bold text-blue-900">
            <span>WhoRU - Facial Recognition Platform</span>
          </div>
          <div className="flex-1 bevel-in bg-[#001000] relative p-1 flex items-center justify-center">
             <div className="relative w-full h-full border border-gray-600 bg-black">
               <img src={person2} className="w-full h-full object-cover grayscale opacity-80" />
               <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
               
               {/* Match Overlay */}
               {scanning && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="text-green-400 font-tech text-2xl animate-pulse">SEARCHING...</div>
                 </div>
               )}
               
               <div className="absolute top-2 right-2 text-yellow-400 font-tech text-xs text-right">
                  CONFIDENCE: {matchPercent.toFixed(1)}%<br/>
                  ERR MARGIN: 0.04%
               </div>
             </div>
          </div>
          
          {/* Match Details Panel */}
          <div className="h-48 bevel-out p-2 flex flex-col gap-2">
            <div className="flex gap-2 h-full">
               <div className="flex-1 border border-gray-400 bg-white p-2 font-ui text-xs overflow-y-auto">
                  <div className="font-bold underline mb-1">Personal Record</div>
                  <div className="grid grid-cols-[80px_1fr] gap-1">
                    <span className="text-gray-500">Name:</span> <span>Jane DOE</span>
                    <span className="text-gray-500">DOB:</span> <span>12/05/1982</span>
                    <span className="text-gray-500">Status:</span> <span className="text-red-600 font-bold">FLAGGED</span>
                    <span className="text-gray-500">Notes:</span> <span>Prior involvement in Sector 7 incident. Surveillance recommended.</span>
                  </div>
               </div>
               <div className="w-32 flex flex-col justify-between">
                  <div className="bevel-in bg-black p-1 h-full relative">
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-600 via-yellow-500 to-red-500 opacity-80 transition-all duration-300"
                      style={{ height: `${matchPercent}%` }}
                    ></div>
                    <div className="absolute inset-0 grid grid-rows-10 pointer-events-none">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className="border-b border-black/50 w-full"></div>
                      ))}
                    </div>
                  </div>
                  <div className="text-center text-[10px] mt-1">MATCH LEVEL</div>
               </div>
            </div>
          </div>
        </div>

      </div>

      {/* Log Console */}
      <div className="h-32 bg-[#ECE9D8] p-1 shrink-0 flex flex-col gap-1">
        <div className="text-xs font-bold text-gray-700 px-1">SYSTEM LOGS</div>
        <div className="flex-1 bevel-in bg-white overflow-y-auto p-1 font-tech text-xs text-black border border-gray-400">
          {logs.map((log, i) => (
            <div key={i} className="mb-0.5">{log}</div>
          ))}
          <div className="animate-pulse">_</div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 border-t border-white bg-[#ECE9D8] flex items-center px-2 text-xs text-gray-600 gap-4 shrink-0 shadow-[inset_0_1px_0_#f0f0f0]">
        <div className="bevel-in px-2 py-0.5 w-48 bg-[#ECE9D8]">Ready</div>
        <div className="bevel-in px-2 py-0.5 flex-1 bg-[#ECE9D8]">User: ADMIN_01</div>
        <div className="bevel-in px-2 py-0.5 w-32 bg-[#ECE9D8] text-center">MEM: 64MB OK</div>
      </div>
    </div>
  );
}

function ToolbarButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center w-14 h-12 hover:bg-white/50 active:translate-y-px active:shadow-inner border border-transparent hover:border-gray-400 rounded-sm transition-colors group"
    >
      <div className="text-gray-700 group-hover:text-blue-600 mb-0.5">{icon}</div>
      <span className="text-[10px] text-gray-600">{label}</span>
    </button>
  );
}