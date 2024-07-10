import { pipeline } from '@xenova/transformers'
import player from 'play-sound';
import wavefile from 'wavefile'
import fs from 'fs'

const synthesizer = await pipeline('text-to-speech', 'Xenova/speecht5_tts', { quantized: false, vocoder: 'speechT5_hifigan' });

const speaker_embeddings = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin';
const result = await synthesizer('Hello, my dog is cute', { speaker_embeddings });

const wav = new wavefile.WaveFile();
wav.fromScratch(1, result.sampling_rate, '32f', result.audio);

fs.writeFileSync('result.wav', wav.toBuffer());
console.log('Archivo WAV generado con éxito.');

player().play('result.wav', (err) => {
  if (err) console.error('Error al reproducir el audio:', err);
});
