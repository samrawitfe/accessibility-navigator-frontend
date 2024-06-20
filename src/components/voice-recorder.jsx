import React, { useState, useRef } from "react";
import { Button } from "@mui/material";

const VoiceRecorder = ({ onStop }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      audioChunksRef.current = [];
      onStop(audioBlob);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color={isRecording ? "secondary" : "primary"}
        onClick={isRecording ? handleStopRecording : handleStartRecording}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
    </div>
  );
};

const onStop = async (audioBlob) => {
  const formData = new FormData();
  formData.append("audio", audioBlob, "recording.wav");

  try {
    const response = await axios.post(
      "http://localhost:3001/transcribe",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    setSearchText(response.data.transcription);
    handleSearch();
  } catch (error) {
    console.error("Error transcribing audio", error);
  }
};

export default VoiceRecorder;
