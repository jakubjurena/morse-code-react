const AudioContext = window.AudioContext;
const audioCtx = new AudioContext();
const dot = 1 / 10;

export const playSound = (input: string): number => {
    let t = audioCtx.currentTime;
    const startT = t;

    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = 400;

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, t);
    input.split("").forEach(char => {
        switch (char) {
            case ".":
                gainNode.gain.setValueAtTime(1, t);
                t += dot;
                gainNode.gain.setValueAtTime(0, t);
                t += dot;
                break;
            case "-":
                gainNode.gain.setValueAtTime(1, t);
                t += 4 * dot;
                gainNode.gain.setValueAtTime(0, t);
                t += dot;
                break;
            case " ":
                t += 6 * dot;
                break;
        }
    })
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    // return () => oscillator.stop();
    return t - startT;
}
