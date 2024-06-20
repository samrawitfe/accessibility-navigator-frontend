import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { MdMic } from "react-icons/md";

const SpeechRecognizer = ({ onSpeechRecognition }) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "cs-CZ";
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onSpeechRecognition(transcript);
      };
      recognition.onend = () => {
        setTimeout(() => {
          setIsRecording(false);
        }, 1000);
      };
      recognitionRef.current = recognition;
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
          fontSize: 32,
          color: "#fff",
        }}
      />
    </Button>
  );
};

export default SpeechRecognizer;
