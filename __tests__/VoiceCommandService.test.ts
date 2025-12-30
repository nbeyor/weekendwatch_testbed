import { MockVoiceCommandService } from '@/services/VoiceCommandService';

describe('VoiceCommandService', () => {
  let service: MockVoiceCommandService;

  beforeEach(() => {
    service = new MockVoiceCommandService();
  });

  describe('parseCommand', () => {
    it('should parse message commands correctly', async () => {
      const result = await service.parseCommand('Text Sarah I\'m running late');

      expect(result.intent).toBe('SEND_MESSAGE');
      expect(result.confidence).toBeGreaterThan(0.5);
      expect(result.params.contactName).toBe('Sarah Johnson');
      expect(result.params.text).toContain('running late');
    });

    it('should parse call commands correctly', async () => {
      const result = await service.parseCommand('Call Mike');

      expect(result.intent).toBe('CALL');
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.params.contactName).toBe('Mike Davis');
    });

    it('should parse navigation commands correctly', async () => {
      const result = await service.parseCommand('Navigate to home');

      expect(result.intent).toBe('NAVIGATE');
      expect(result.params.destination).toBe('home');
    });

    it('should parse media play commands', async () => {
      const result = await service.parseCommand('Play some music');

      expect(result.intent).toBe('MEDIA_PLAY');
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    it('should parse media pause commands', async () => {
      const result = await service.parseCommand('Pause');

      expect(result.intent).toBe('MEDIA_PAUSE');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    it('should parse media skip commands', async () => {
      const result = await service.parseCommand('Skip to next song');

      expect(result.intent).toBe('MEDIA_SKIP');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    it('should return UNKNOWN for unrecognized commands', async () => {
      const result = await service.parseCommand('Do something random');

      expect(result.intent).toBe('UNKNOWN');
      expect(result.confidence).toBe(0.0);
      expect(result.suggestions).toBeDefined();
      expect(result.suggestions!.length).toBeGreaterThan(0);
    });

    it('should handle partial message commands with suggestions', async () => {
      const result = await service.parseCommand('Text John something');

      expect(result.intent).toBe('SEND_MESSAGE');
      expect(result.confidence).toBeLessThan(0.5); // Low confidence for unknown contact
    });
  });
});
