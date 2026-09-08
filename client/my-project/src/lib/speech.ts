export const speakToken = (token: string) => {
  if (!("speechSynthesis" in window)) {
    console.warn("Speech synthesis is not supported.");
    return;
  }

  window.speechSynthesis.cancel();

  const cleanToken = token.replace(/-/g, " ");

  const utterance = new SpeechSynthesisUtterance(
    `Token number ${cleanToken}, please proceed to the laboratory.`
  );

  utterance.rate = 0.85;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
};