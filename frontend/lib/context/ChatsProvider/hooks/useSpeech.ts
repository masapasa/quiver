/* eslint-disable */
import { useEffect, useState } from "react";

import { isSpeechRecognitionSupported } from "@/lib/helpers/isSpeechRecognitionSupported";

import useChatsContext from "./useChatsContext";

export const useSpeech = () => {
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const { setMessage } = useChatsContext();

  useEffect(() => {
    if (isSpeechRecognitionSupported()) {
      setSpeechSupported(true);
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      const mic = new SpeechRecognition();

      mic.continuous = true;
      mic.interimResults = false;
      mic.lang = "en-US";

      mic.onstart = () => {
        console.log("Mics on");
      };

      mic.onend = () => {
        console.log("Mics off");
      };

      mic.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.log(event.error);
        setIsListening(false);
      };

      mic.onresult = (event: SpeechRecognitionEvent) => {
        const interimTranscript =
          event.results[event.results.length - 1][0].transcript;
        setMessage((prevMessage) => ["user", prevMessage + interimTranscript]);
      };

      if (isListening) {
        mic.start();
      }

      return () => {
        if (mic) {
          mic.stop();
        }
      };
    }
  }, [isListening, setMessage]);

  const startListening = () => {
    setIsListening((prevIsListening) => !prevIsListening);
  };

  return { startListening, speechSupported, isListening };
};
