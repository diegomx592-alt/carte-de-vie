export async function translateText(text, targetLang) {
  if (!text || text.trim() === '') return '';
  
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    return data[0].map(item => item[0]).join('');
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Fallback to original text if API fails
  }
}

export async function translateToAll(text) {
  if (!text || text.trim() === '') return { fr: '', en: '', es: '' };
  
  const fr = await translateText(text, 'fr');
  await new Promise(r => setTimeout(r, 250)); // prevents rate limit
  const en = await translateText(text, 'en');
  await new Promise(r => setTimeout(r, 250));
  const es = await translateText(text, 'es');

  return { fr, en, es };
}
