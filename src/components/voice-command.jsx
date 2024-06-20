import { useEffect, useRef, useState, useCallback } from "react";
import { useLanguage } from "../language-context";

const VoiceCommand = ({ onSearch }) => {
  const { language } = useLanguage();
  const recognitionRef = useRef(null);
  const isRecognizingRef = useRef(false);
  const isAssistantSpeakingRef = useRef(false);
  const isWaitingForDestinationRef = useRef(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceResponse, setVoiceResponse] = useState("");

  const speak = useCallback((text) => {
    const utt = new SpeechSynthesisUtterance(text);
    utt.volume = 1;
    utt.rate = 1;

    window.speechSynthesis.onvoiceschanged = () => {
      const voices = window.speechSynthesis.getVoices();
      utt.voice = voices.find((voice) => voice.lang === "en-US");
      window.speechSynthesis.speak(utt);
    };

    console.log("speaking");
    console.log(window.speechSynthesis.speaking);
    window.speechSynthesis.speak(utt);
    console.log(window.speechSynthesis.speaking);

    utt.addEventListener("end", () => {
      console.log("end event triggered");
      isAssistantSpeakingRef.current = false;
      if (recognitionRef.current && isRecognizingRef.current) {
        recognitionRef.current.start();
      }
    });

    utt.addEventListener("error", (err) => {
      console.error("Speech synthesis error:", err);
    });

    isAssistantSpeakingRef.current = true;
  }, []);

  const announceListening = useCallback(() => {
    setTimeout(() => {
      speak("I am listening. Please say a command.");
    }, 1000);
  }, [speak]);

  const handleVoiceCommand = useCallback(
    (command) => {
      console.log("Voice command received handling \n:", command);
      setIsProcessing(true);

      const announceReceived = (message) => {
        speak(message);
        setVoiceResponse(message);
      };

      const processCommand = (command) => {
        if (command.includes("start")) {
          announceReceived("Where would you like to go?");
          isWaitingForDestinationRef.current = true;
        } else if (command.includes("cancel")) {
          announceReceived("Search canceled. How else can I assist you?");
        } else if (command.includes("help")) {
          announceReceived(
            "Welcome, You can say commands like 'Start', 'I want to go to [destination]', 'Cancel', and 'Help'."
          );
        } else if (command.includes("repeat")) {
          speak(voiceResponse);
        } else if (command.includes("i want to go to")) {
          if (isWaitingForDestinationRef.current) {
            const destination = command.replace("i want to go to", "").trim();
            speak(`Searching for ${destination}...`);
            onSearch(destination);
            isWaitingForDestinationRef.current = false;
          } else {
            announceReceived("Please say 'Start' to begin a search.");
          }
        } else {
          announceReceived("Please say 'Start' to begin a search.");
        }
      };

      const listenTimeout = setTimeout(() => {
        if (!isRecognizingRef.current) {
          announceListening();
        }
      }, 10000);

      processCommand(command);
      clearTimeout(listenTimeout);
      setIsProcessing(false);
    },
    [announceListening, onSearch, speak, voiceResponse]
  );

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = language;

      recognition.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript
          .trim()
          .toLowerCase();
        console.log("VoiceCommand Transcript onResult\n:", transcript);
        if (!isProcessing && !isAssistantSpeakingRef.current) {
          handleVoiceCommand(transcript);
        }
      };

      recognition.onstart = () => {
        console.log("Voice recognition started");
        isRecognizingRef.current = true;
        announceListening();
      };

      recognition.onend = () => {
        console.log("Voice recognition ended");
        isRecognizingRef.current = false;
        if (recognitionRef.current && !isAssistantSpeakingRef.current) {
          recognitionRef.current.start();
        }
      };

      recognition.onerror = (event) => {
        try {
          console.error("Voice recognition error", event.error);
          if (event.error === "no-speech" && recognitionRef.current) {
            console.log("No speech detected, restarting...");
            recognitionRef.current.start();
          } else if (event.error !== "aborted" && recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current.start();
          }
        } catch (e) {
          console.error("Voice recognition error", e);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();

      return () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
          recognitionRef.current = null;
        }
      };
    } else {
      console.error("Speech recognition not supported");
    }
  }, [language, announceListening, handleVoiceCommand, isProcessing, speak]);

  useEffect(() => {
    speak(
      "Voice command enabled. Say commands like 'Start', 'Cancel', 'Help', 'Repeat', and 'I want to go to [destination]'."
    );
  }, [speak]);

  return null;
};

export default VoiceCommand;
