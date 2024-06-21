import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../language-context";
import { Button } from "@mui/material";
import { MdMic } from "react-icons/md";

const VoiceSearch = ({ onSpeechRecognition }) => {
  const recognitionRef = useRef(null);
  const { language } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language;
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onSpeechRecognition(transcript);
      };
      recognition.onend = () => {
        setTimeout(() => {
          setIsRecording(false);
        }, 500);
      };
      recognitionRef.current = recognition;
      console.log(language);
    } else {
      console.error("Speech recognition not supported");
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsRecording(!isRecording);
  };

  return (
    <Button
      variant="contained"
      color={isRecording ? "secondary" : "primary"}
      onClick={toggleRecording}
      style={{
        height: "100%",
        backgroundColor: isRecording ? "#f44336" : "#2196f3",
        marginLeft: "10px",
      }}
    >
      <MdMic
        style={{
          fontSize: 40,
          color: "#fff",
        }}
      />
    </Button>
  );
};

export default VoiceSearch;
