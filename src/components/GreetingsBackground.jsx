const GREETINGS = [
  { text: "Привет", locale: "ru" },
  { text: "Hello", locale: "en" },
  { text: "Hola", locale: "es" },
  { text: "Bonjour", locale: "fr" },
  { text: "Hallo", locale: "de" },
  { text: "Ciao", locale: "it" },
  { text: "Olá", locale: "pt" },
  { text: "你好", locale: "zh" },
  { text: "こんにちは", locale: "ja" },
  { text: "안녕하세요", locale: "ko" },
  { text: "مرحبا", locale: "ar" },
  { text: "שלום", locale: "he" },
  { text: "नमस्ते", locale: "hi" },
  { text: "Selam", locale: "tr" },
  { text: "Szia", locale: "hu" },
  { text: "Sveiki", locale: "lt" },
  { text: "Hej", locale: "sv" },
  { text: "Hei", locale: "no" },
  { text: "Halo", locale: "id" },
  { text: "Salam", locale: "fa" },
];

export default function GreetingsBackground() {
  return (
    <div className="greetings-background" aria-hidden>
      {GREETINGS.map((item, index) => {
        const delay = index * 2.5;
        const duration = 12 + (index % 5) * 2.5;
        const horizontal = ((index * 17) % 100) / 100;
        const vertical = ((index * 23) % 100) / 100;
        const fontSize = 1.2 + ((index % 4) / 10) * 2.5;
        return (
          <span
            key={`${item.locale}-${index}`}
            className="greetings-word"
            style={{
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              left: `${horizontal * 100}%`,
              top: `${vertical * 100}%`,
              fontSize: `${fontSize}rem`,
            }}
          >
            {item.text}
          </span>
        );
      })}
    </div>
  );
}
