'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Loader } from 'lucide-react';
import { voiceCommandService } from '@/services/VoiceCommandService';
import { ParsedCommand } from '@/models/types';

interface VoiceInputProps {
  onCommand: (command: ParsedCommand) => void;
  placeholder?: string;
}

export function VoiceInput({
  onCommand,
  placeholder = 'Press & hold to speak, or type...',
}: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [micActive, setMicActive] = useState(false);

  useEffect(() => {
    // Initialize speech recognition if available
    if (typeof window !== 'undefined') {
      const recognition = voiceCommandService.getSpeechRecognition();
      if (recognition) {
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setText(transcript);
          handleSubmit(transcript);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          setMicActive(false);
        };

        recognition.onend = () => {
          setIsListening(false);
          setMicActive(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setMicActive(true);
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setMicActive(false);
    }
  };

  const handleSubmit = async (commandText: string) => {
    if (!commandText.trim()) return;

    setIsProcessing(true);

    try {
      const parsed = await voiceCommandService.parseCommand(commandText);
      onCommand(parsed);
      setText('');
    } catch (error) {
      console.error('Failed to parse command:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(text);
  };

  return (
    <div className="border-2 border-black p-3 space-y-3">
      <form onSubmit={handleFormSubmit} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="input flex-1"
          disabled={isProcessing}
        />
        <button
          type="submit"
          disabled={!text.trim() || isProcessing}
          className="btn-primary px-4"
        >
          {isProcessing ? '...' : 'Go'}
        </button>
      </form>

      {/* Mic button - press and hold */}
      <div className="text-center">
        <button
          type="button"
          onMouseDown={startListening}
          onMouseUp={stopListening}
          onMouseLeave={stopListening}
          onTouchStart={startListening}
          onTouchEnd={stopListening}
          disabled={isProcessing || !recognitionRef.current}
          className={`btn-secondary inline-flex items-center gap-2 min-w-44 justify-center ${
            micActive ? 'bg-black text-white' : ''
          }`}
        >
          {isListening ? (
            <>
              <Mic className="w-4 h-4 animate-pulse" />
              <span>Listening...</span>
            </>
          ) : isProcessing ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              <span>Hold to Speak</span>
            </>
          )}
        </button>

        {!recognitionRef.current && (
          <p className="text-xs text-gray-dark mt-2">
            Voice input not available in this browser
          </p>
        )}
      </div>
    </div>
  );
}
