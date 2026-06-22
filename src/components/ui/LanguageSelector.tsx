"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, Search, X } from "lucide-react";

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "中文 (简体)" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
  { code: "th", name: "Thai", nativeName: "ไทย" },
  { code: "pl", name: "Polish", nativeName: "Polski" },
  { code: "fa", name: "Persian", nativeName: "فارسی" },
  { code: "he", name: "Hebrew", nativeName: "עברית" },
  { code: "sv", name: "Swedish", nativeName: "Svenska" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά" },
  { code: "cs", name: "Czech", nativeName: "Čeština" },
  { code: "ro", name: "Romanian", nativeName: "Română" },
  { code: "hu", name: "Hungarian", nativeName: "Magyar" },
  { code: "fi", name: "Finnish", nativeName: "Suomi" },
  { code: "da", name: "Danish", nativeName: "Dansk" },
  { code: "no", name: "Norwegian", nativeName: "Norsk" },
  { code: "sk", name: "Slovak", nativeName: "Slovenčina" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu" },
  { code: "tl", name: "Tagalog", nativeName: "Tagalog" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "am", name: "Amharic", nativeName: "አማርኛ" },
  { code: "km", name: "Khmer", nativeName: "ខ្មែរ" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली" },
  { code: "si", name: "Sinhala", nativeName: "සිංහල" },
  { code: "my", name: "Burmese", nativeName: "ဗမာစာ" },
  { code: "ka", name: 'Georgian', nativeName: 'ქართული' },
  { code: "hy", name: 'Armenian', nativeName: 'Հայերեն' },
  { code: "az", name: 'Azerbaijani', nativeName: 'Azərbaycan' },
  { code: "kk", name: 'Kazakh', nativeName: 'Қазақ тілі' },
  { code: "uz", name: 'Uzbek', nativeName: 'Oʻzbek' },
  { code: "ky", name: 'Kyrgyz', nativeName: 'Кыргызча' },
  { code: "tg", name: 'Tajik', nativeName: 'Тоҷикӣ' },
  { code: "mn", name: 'Mongolian', nativeName: 'Монгол' },
  { code: "lo", name: 'Lao', nativeName: 'ລາວ' },
  { code: "bg", name: 'Bulgarian', nativeName: 'Български' },
  { code: "sr", name: 'Serbian', nativeName: 'Српски' },
  { code: "hr", name: 'Croatian', nativeName: 'Hrvatski' },
  { code: "bs", name: 'Bosnian', nativeName: 'Bosanski' },
  { code: "sl", name: 'Slovenian', nativeName: 'Slovenščina' },
  { code: "mk", name: 'Macedonian', nativeName: 'Македонски' },
  { code: "sq", name: 'Albanian', nativeName: 'Shqip' },
  { code: "lt", name: 'Lithuanian', nativeName: 'Lietuvių' },
  { code: "lv", name: 'Latvian', nativeName: 'Latviešu' },
  { code: "et", name: 'Estonian', nativeName: 'Eesti' },
  { code: "is", name: 'Icelandic', nativeName: 'Íslenska' },
  { code: "ga", name: 'Irish', nativeName: 'Gaeilge' },
  { code: "cy", name: 'Welsh', nativeName: 'Cymraeg' },
  { code: "mt", name: 'Maltese', nativeName: 'Malti' },
  { code: "eu", name: 'Basque', nativeName: 'Euskara' },
  { code: "gl", name: 'Galician', nativeName: 'Galego' },
  { code: "ca", name: 'Catalan', nativeName: 'Català' },
  { code: "af", name: 'Afrikaans', nativeName: 'Afrikaans' },
  { code: "zu", name: 'Zulu', nativeName: 'isiZulu' },
  { code: "xh", name: 'Xhosa', nativeName: 'isiXhosa' },
  { code: "st", name: 'Sesotho', nativeName: 'Sesotho' },
  { code: "sn", name: 'Shona', nativeName: 'chiShona' },
  { code: "ny", name: 'Chichewa', nativeName: 'Chichewa' },
  { code: "ig", name: 'Igbo', nativeName: 'Igbo' },
  { code: "yo", name: 'Yoruba', nativeName: 'Yorùbá' },
  { code: "ha", name: 'Hausa', nativeName: 'Hausa' },
  { code: "so", name: 'Somali', nativeName: 'Soomaali' },
  { code: "mg", name: 'Malagasy', nativeName: 'Malagasy' },
  { code: "jw", name: 'Javanese', nativeName: 'Basa Jawa' },
  { code: "su", name: 'Sundanese', nativeName: 'Basa Sunda' },
  { code: "ceb", name: 'Cebuano', nativeName: 'Cebuano' },
  { code: "mi", name: 'Maori', nativeName: 'Māori' },
  { code: "sm", name: 'Samoan', nativeName: 'Gagana fa\'a Sāmoa' },
  { code: "ht", name: 'Haitian Creole', nativeName: 'Kreyòl Ayisyen' },
  { code: "eo", name: 'Esperanto', nativeName: 'Esperanto' },
  { code: "la", name: 'Latin', nativeName: 'Latina' },
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentLang, setCurrentLang] = useState("en");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initialize selected language from cookie
  useEffect(() => {
    const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
    if (match) {
      const val = match[2];
      const code = val.split('/').pop();
      if (code) {
        setCurrentLang(code);
      }
    }
  }, []);

  const changeLanguage = (code: string) => {
    // Set the google translate cookie
    // Format is googtrans=/en/target_language
    document.cookie = `googtrans=/en/${code}; path=/;`;
    document.cookie = `googtrans=/en/${code}; path=/; domain=${window.location.hostname};`;
    
    // Reload page to apply translation via Google Translate script
    window.location.reload();
  };

  const filteredLanguages = languages.filter(
    (lang) => 
      lang.name.toLowerCase().includes(search.toLowerCase()) || 
      lang.nativeName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed bottom-24 left-6 md:bottom-8 md:left-8 z-50" ref={dropdownRef}>
      {/* The Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#2d3748] hover:bg-[#1a202c] text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center group border-2 border-white/20"
        aria-label="Change Language"
      >
        <Globe className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* The Dropdown Modal */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 w-[300px] sm:w-[350px] overflow-hidden flex flex-col transform origin-bottom-left transition-all animate-in slide-in-from-bottom-5">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 font-serif text-lg">Select Language</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 bg-white p-1 rounded-full shadow-sm">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-3 border-b border-gray-100 bg-white relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search language..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#e07a5f] outline-none text-gray-700 font-medium"
              />
            </div>
          </div>

          <div className="overflow-y-auto max-h-[350px] p-2 bg-white custom-scrollbar">
            {filteredLanguages.length > 0 ? (
              <div className="grid grid-cols-1 gap-1">
                {filteredLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors text-left ${
                      currentLang === lang.code 
                      ? 'bg-[#e07a5f]/10 text-[#e07a5f] font-bold' 
                      : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="font-medium">{lang.name}</span>
                    <span className={`text-sm ${currentLang === lang.code ? 'text-[#e07a5f]/80' : 'text-gray-400'}`}>
                      {lang.nativeName}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500 text-sm font-medium">
                No languages found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
