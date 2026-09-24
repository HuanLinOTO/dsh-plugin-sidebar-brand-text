window.__ModuleLoader__.load({ id: "@huanlin/dsh-plugin-sidebar-brand-text", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = __toESM(react_jsx_runtime);
let __deepseek_ai_dsh_client_store = require("@deepseek-ai/dsh-client-store");
__deepseek_ai_dsh_client_store = __toESM(__deepseek_ai_dsh_client_store);
let react = require("react");
react = __toESM(react);

//#region src/client/dictionaries.ts
/**
* Locale-id keyed override dictionaries, one full copy per language.
* The dict shape matches `BetterLocaleStore.register(ns, dicts)` where
* `dicts` is `Record<localeId, Record<key, string>>`.
*/
const dicts = {
	ja: {
		"card.title": "サイドバーのブランドテキスト",
		"card.intro": "サイドバーのブランド名とリビジョンバッジをカスタムテキストに置き換えます。",
		"card.unsaved": "未保存",
		"card.saved": "保存済み",
		"card.saving": "保存中…",
		"card.discard": "破棄",
		"card.save": "保存",
		"card.unavailable": "サイドバー・ブランドテキストの設定チャンネルを利用できません。後でもう一度お試しください。",
		"card.retry": "再試行",
		"field.name.label": "ブランド名",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "サイドバーでロゴの右隣に表示されるテキスト。既定の「DSH Local Build」を置き換えます。",
		"field.revision.label": "リビジョンバッジ",
		"field.revision.placeholder": "例：v1.0.0 または abc1234",
		"field.revision.hint": "ブランド名の右隣に表示される小さなバッジテキスト。空にするとバッジを非表示にします。"
	},
	de: {
		"card.title": "Seitenleisten-Brand-Text",
		"card.intro": "Ersetzt den Markennamen und das Revisions-Abzeichen in der Seitenleiste durch benutzerdefinierten Text.",
		"card.unsaved": "Nicht gespeichert",
		"card.saved": "Gespeichert",
		"card.saving": "Wird gespeichert…",
		"card.discard": "Verwerfen",
		"card.save": "Speichern",
		"card.unavailable": "Der Konfigurationskanal „sidebar-brand-text“ ist derzeit nicht verfügbar. Versuchen Sie es später erneut.",
		"card.retry": "Erneut versuchen",
		"field.name.label": "Markenname",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "Text neben dem Logo in der Seitenleiste. Ersetzt den Standardwert „DSH Local Build“.",
		"field.revision.label": "Revisions-Abzeichen",
		"field.revision.placeholder": "z. B. v1.0.0 oder abc1234",
		"field.revision.hint": "Kleiner Abzeichentext neben dem Markennamen. Leer lassen, um das Abzeichen auszublenden."
	},
	fr: {
		"card.title": "Texte de marque de la barre latérale",
		"card.intro": "Remplace le nom de la marque et le badge de révision de la barre latérale par un texte personnalisé.",
		"card.unsaved": "Non enregistré",
		"card.saved": "Enregistré",
		"card.saving": "Enregistrement…",
		"card.discard": "Annuler",
		"card.save": "Enregistrer",
		"card.unavailable": "Le canal de configuration sidebar-brand-text est indisponible. Veuillez réessayer plus tard.",
		"card.retry": "Réessayer",
		"field.name.label": "Nom de marque",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "Texte affiché dans la barre latérale à côté du logo. Remplace le « DSH Local Build » par défaut.",
		"field.revision.label": "Badge de révision",
		"field.revision.placeholder": "p. ex. v1.0.0 ou abc1234",
		"field.revision.hint": "Petit badge à côté du nom de la marque. Laisser vide pour masquer le badge."
	},
	pt: {
		"card.title": "Texto da Marca na Barra Lateral",
		"card.intro": "Substitui o nome da marca e o selo de revisão da barra lateral por texto personalizado.",
		"card.unsaved": "Não salvo",
		"card.saved": "Salvo",
		"card.saving": "Salvando…",
		"card.discard": "Descartar",
		"card.save": "Salvar",
		"card.unavailable": "O canal de configuração do sidebar-brand-text está indisponível. Tente novamente mais tarde.",
		"card.retry": "Tentar novamente",
		"field.name.label": "Nome da marca",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "Texto exibido na barra lateral ao lado do logotipo. Substitui o padrão \"DSH Local Build\".",
		"field.revision.label": "Selo de revisão",
		"field.revision.placeholder": "por exemplo, v1.0.0 ou abc1234",
		"field.revision.hint": "Texto pequeno ao lado do nome da marca. Deixe vazio para ocultar o selo."
	},
	ko: {
		"card.title": "사이드바 브랜드 텍스트",
		"card.intro": "사이드바의 브랜드 이름과 리비전 배지를 사용자 지정 텍스트로 바꿉니다.",
		"card.unsaved": "저장 안 됨",
		"card.saved": "저장됨",
		"card.saving": "저장 중…",
		"card.discard": "취소",
		"card.save": "저장",
		"card.unavailable": "sidebar-brand-text 구성 채널을 사용할 수 없습니다. 나중에 다시 시도하세요.",
		"card.retry": "다시 시도",
		"field.name.label": "브랜드 이름",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "사이드바에서 로고 옆에 표시되는 텍스트입니다. 기본값인 \"DSH Local Build\"를 대체합니다.",
		"field.revision.label": "리비전 배지",
		"field.revision.placeholder": "예: v1.0.0 또는 abc1234",
		"field.revision.hint": "브랜드 이름 옆에 표시되는 작은 배지 텍스트입니다. 비워 두면 배지가 표시되지 않습니다."
	},
	ar: {
		"card.title": "نص العلامة في الشريط الجانبي",
		"card.intro": "استبدل اسم العلامة وشارة المراجعة في الشريط الجانبي بنص مخصص.",
		"card.unsaved": "غير محفوظ",
		"card.saved": "محفوظ",
		"card.saving": "جارٍ الحفظ…",
		"card.discard": "تجاهل",
		"card.save": "حفظ",
		"card.unavailable": "قناة إعدادات نص العلامة الجانبية غير متاحة. يرجى المحاولة لاحقًا.",
		"card.retry": "إعادة المحاولة",
		"field.name.label": "اسم العلامة",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "النص المعروض في الشريط الجانبي بجانب الشعار. يستبدل النص الافتراضي «DSH Local Build».",
		"field.revision.label": "شارة المراجعة",
		"field.revision.placeholder": "مثل v1.0.0 أو abc1234",
		"field.revision.hint": "نص الشارة الصغيرة بجانب اسم العلامة. اتركه فارغًا لإخفاء الشارة."
	},
	hi: {
		"card.title": "साइडबार ब्रांड टेक्स्ट",
		"card.intro": "साइडबार का ब्रांड नाम और रिवीज़न बैज कस्टम टेक्स्ट से बदलें।",
		"card.unsaved": "सहेजा नहीं गया",
		"card.saved": "सहेजा गया",
		"card.saving": "सहेजा जा रहा है…",
		"card.discard": "छोड़ें",
		"card.save": "सहेजें",
		"card.unavailable": "sidebar-brand-text कॉन्फ़िगरेशन चैनल उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।",
		"card.retry": "पुनः प्रयास करें",
		"field.name.label": "ब्रांड नाम",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "साइडबार में लोगो के बगल में दिखाया जाने वाला टेक्स्ट। डिफ़ॉल्ट \"DSH Local Build\" को बदलता है।",
		"field.revision.label": "रिवीज़न बैज",
		"field.revision.placeholder": "जैसे v1.0.0 या abc1234",
		"field.revision.hint": "ब्रांड नाम के बगल में छोटा बैज टेक्स्ट। बैज छिपाने के लिए खाली छोड़ें।"
	},
	id: {
		"card.title": "Teks Merek Bilah Sisi",
		"card.intro": "Ganti nama merek dan lencana revisi di bilah sisi dengan teks khusus.",
		"card.unsaved": "Belum disimpan",
		"card.saved": "Tersimpan",
		"card.saving": "Menyimpan…",
		"card.discard": "Batalkan",
		"card.save": "Simpan",
		"card.unavailable": "Saluran konfigurasi sidebar-brand-text tidak tersedia. Silakan coba lagi nanti.",
		"card.retry": "Coba lagi",
		"field.name.label": "Nama merek",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "Teks yang tampil di bilah sisi di samping logo. Mengganti teks bawaan \"DSH Local Build\".",
		"field.revision.label": "Lencana revisi",
		"field.revision.placeholder": "mis. v1.0.0 atau abc1234",
		"field.revision.hint": "Teks lencana kecil di samping nama merek. Kosongkan untuk menyembunyikan lencana."
	},
	tr: {
		"card.title": "Kenar Çubuğu Marka Metni",
		"card.intro": "Kenar çubuğundaki marka adını ve sürüm rozetini özel metinle değiştirir.",
		"card.unsaved": "Kaydedilmedi",
		"card.saved": "Kaydedildi",
		"card.saving": "Kaydediliyor…",
		"card.discard": "Vazgeç",
		"card.save": "Kaydet",
		"card.unavailable": "sidebar-brand-text yapılandırma kanalı kullanılamıyor. Lütfen daha sonra tekrar deneyin.",
		"card.retry": "Tekrar dene",
		"field.name.label": "Marka adı",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "Kenar çubuğunda logonun yanında gösterilen metin. Varsayılan \"DSH Local Build\" metnini değiştirir.",
		"field.revision.label": "Sürüm rozeti",
		"field.revision.placeholder": "ör. v1.0.0 veya abc1234",
		"field.revision.hint": "Marka adının yanındaki küçük rozet metni. Rozeti gizlemek için boş bırakın."
	},
	vi: {
		"card.title": "Văn bản thương hiệu thanh bên",
		"card.intro": "Thay tên thương hiệu và huy hiệu phiên bản trên thanh bên bằng văn bản tùy chỉnh.",
		"card.unsaved": "Chưa lưu",
		"card.saved": "Đã lưu",
		"card.saving": "Đang lưu…",
		"card.discard": "Hủy bỏ",
		"card.save": "Lưu",
		"card.unavailable": "Kênh cấu hình sidebar-brand-text hiện không khả dụng. Vui lòng thử lại sau.",
		"card.retry": "Thử lại",
		"field.name.label": "Tên thương hiệu",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "Văn bản hiển thị bên cạnh logo trên thanh bên. Thay thế văn bản mặc định \"DSH Local Build\".",
		"field.revision.label": "Huy hiệu phiên bản",
		"field.revision.placeholder": "ví dụ v1.0.0 hoặc abc1234",
		"field.revision.hint": "Văn bản huy hiệu nhỏ bên cạnh tên thương hiệu. Để trống để ẩn huy hiệu."
	},
	th: {
		"card.title": "ข้อความแบรนด์ในแถบด้านข้าง",
		"card.intro": "แทนที่ชื่อแบรนด์และป้ายเวอร์ชันในแถบด้านข้างด้วยข้อความที่กำหนดเอง",
		"card.unsaved": "ยังไม่ได้บันทึก",
		"card.saved": "บันทึกแล้ว",
		"card.saving": "กำลังบันทึก…",
		"card.discard": "ยกเลิก",
		"card.save": "บันทึก",
		"card.unavailable": "ช่องการกำหนดค่า sidebar-brand-text ไม่พร้อมใช้งาน โปรดลองอีกครั้งในภายหลัง",
		"card.retry": "ลองอีกครั้ง",
		"field.name.label": "ชื่อแบรนด์",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "ข้อความที่แสดงในแถบด้านข้างถัดจากโลโก้ แทนที่ค่าเริ่มต้น \"DSH Local Build\"",
		"field.revision.label": "ป้ายเวอร์ชัน",
		"field.revision.placeholder": "เช่น v1.0.0 หรือ abc1234",
		"field.revision.hint": "ข้อความป้ายขนาดเล็กถัดจากชื่อแบรนด์ เว้นว่างไว้เพื่อซ่อนป้าย"
	},
	ru: {
		"card.title": "Текст бренда в боковой панели",
		"card.intro": "Заменяет название бренда и значок версии в боковой панели на собственный текст.",
		"card.unsaved": "Не сохранено",
		"card.saved": "Сохранено",
		"card.saving": "Сохранение…",
		"card.discard": "Отменить",
		"card.save": "Сохранить",
		"card.unavailable": "Канал настройки sidebar-brand-text недоступен. Повторите попытку позже.",
		"card.retry": "Повторить",
		"field.name.label": "Название бренда",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "Текст рядом с логотипом в боковой панели. Заменяет значение по умолчанию «DSH Local Build».",
		"field.revision.label": "Значок версии",
		"field.revision.placeholder": "например, v1.0.0 или abc1234",
		"field.revision.hint": "Мелкий значок рядом с названием бренда. Оставьте пустым, чтобы скрыть значок."
	},
	it: {
		"card.title": "Testo Brand nella Sidebar",
		"card.intro": "Sostituisce il nome del brand e il badge di revisione nella sidebar con un testo personalizzato.",
		"card.unsaved": "Non salvato",
		"card.saved": "Salvato",
		"card.saving": "Salvataggio…",
		"card.discard": "Annulla",
		"card.save": "Salva",
		"card.unavailable": "Il canale di configurazione sidebar-brand-text non è disponibile. Riprova più tardi.",
		"card.retry": "Riprova",
		"field.name.label": "Nome del brand",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "Testo mostrato nella sidebar accanto al logo. Sostituisce il \"DSH Local Build\" predefinito.",
		"field.revision.label": "Badge di revisione",
		"field.revision.placeholder": "es. v1.0.0 o abc1234",
		"field.revision.hint": "Testo del badge accanto al nome del brand. Lascia vuoto per nascondere il badge."
	},
	nl: {
		"card.title": "Merktekst in zijbalk",
		"card.intro": "Vervangt de merknaam en het revisiebadge in de zijbalk door aangepaste tekst.",
		"card.unsaved": "Niet opgeslagen",
		"card.saved": "Opgeslagen",
		"card.saving": "Opslaan…",
		"card.discard": "Verwijderen",
		"card.save": "Opslaan",
		"card.unavailable": "Het configuratiekanaal sidebar-brand-text is niet beschikbaar. Probeer het later opnieuw.",
		"card.retry": "Opnieuw proberen",
		"field.name.label": "Merknaam",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "Tekst die in de zijbalk naast het logo wordt weergegeven. Vervangt de standaard \"DSH Local Build\".",
		"field.revision.label": "Revisiebadge",
		"field.revision.placeholder": "bv. v1.0.0 of abc1234",
		"field.revision.hint": "Kleine badgetekst naast de merknaam. Leeg laten om het badge te verbergen."
	},
	sv: {
		"card.title": "Sidofältets varumärkestext",
		"card.intro": "Ersätter varumärkesnamnet och revisionsmärket i sidofältet med anpassad text.",
		"card.unsaved": "Ej sparat",
		"card.saved": "Sparat",
		"card.saving": "Sparar…",
		"card.discard": "Ignorera",
		"card.save": "Spara",
		"card.unavailable": "Konfigurationskanalen för sidebar-brand-text är inte tillgänglig. Försök igen senare.",
		"card.retry": "Försök igen",
		"field.name.label": "Varumärkesnamn",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "Text som visas i sidofältet bredvid logotypen. Ersätter standardvärdet \"DSH Local Build\".",
		"field.revision.label": "Revisionsmärke",
		"field.revision.placeholder": "t.ex. v1.0.0 eller abc1234",
		"field.revision.hint": "Liten märktext bredvid varumärkesnamnet. Lämna tomt för att dölja märket."
	},
	pl: {
		"card.title": "Tekst marki na pasku bocznym",
		"card.intro": "Zastępuje nazwę marki i odznakę rewizji na pasku bocznym niestandardowym tekstem.",
		"card.unsaved": "Niezapisane",
		"card.saved": "Zapisano",
		"card.saving": "Zapisywanie…",
		"card.discard": "Odrzuć",
		"card.save": "Zapisz",
		"card.unavailable": "Kanał konfiguracji sidebar-brand-text jest niedostępny. Spróbuj ponownie później.",
		"card.retry": "Spróbuj ponownie",
		"field.name.label": "Nazwa marki",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "Tekst wyświetlany na pasku bocznym obok logo. Zastępuje domyślny „DSH Local Build“.",
		"field.revision.label": "Odznaka rewizji",
		"field.revision.placeholder": "np. v1.0.0 lub abc1234",
		"field.revision.hint": "Mały tekst odznaki obok nazwy marki. Pozostaw puste, aby ukryć odznakę."
	},
	"zh-HK": {
		"card.title": "側邊欄品牌文字",
		"card.intro": "將側邊欄的品牌名稱與版本徽標替換為自訂文字。",
		"card.unsaved": "未儲存",
		"card.saved": "已儲存",
		"card.saving": "儲存中…",
		"card.discard": "放棄",
		"card.save": "儲存",
		"card.unavailable": "側邊欄品牌文字設定通道目前無法使用，請稍後重試。",
		"card.retry": "重試",
		"field.name.label": "品牌名稱",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "側邊欄 logo 右側顯示的文字。取代預設的「DSH Local Build」。",
		"field.revision.label": "版本徽標",
		"field.revision.placeholder": "例如 v1.0.0 或 abc1234",
		"field.revision.hint": "品牌名稱右側的小徽標文字。留空則不顯示徽標。"
	},
	"zh-TW": {
		"card.title": "側邊欄品牌文字",
		"card.intro": "將側邊欄的品牌名稱與版本徽標替換為自訂文字。",
		"card.unsaved": "未儲存",
		"card.saved": "已儲存",
		"card.saving": "儲存中…",
		"card.discard": "放棄",
		"card.save": "儲存",
		"card.unavailable": "側邊欄品牌文字設定通道目前無法使用，請稍後重試。",
		"card.retry": "重試",
		"field.name.label": "品牌名稱",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "側邊欄 logo 右側顯示的文字。取代預設的「DSH Local Build」。",
		"field.revision.label": "版本徽標",
		"field.revision.placeholder": "例如 v1.0.0 或 abc1234",
		"field.revision.hint": "品牌名稱右側的小徽標文字。留空則不顯示徽標。"
	},
	"zh-MO": {
		"card.title": "側邊欄品牌文字",
		"card.intro": "將側邊欄的品牌名稱與版本徽標替換為自訂文字。",
		"card.unsaved": "未儲存",
		"card.saved": "已儲存",
		"card.saving": "儲存中…",
		"card.discard": "放棄",
		"card.save": "儲存",
		"card.unavailable": "側邊欄品牌文字設定通道目前無法使用，請稍後重試。",
		"card.retry": "重試",
		"field.name.label": "品牌名稱",
		"field.name.placeholder": "DSH Local Build",
		"field.name.hint": "側邊欄 logo 右側顯示的文字。取代預設的「DSH Local Build」。",
		"field.revision.label": "版本徽標",
		"field.revision.placeholder": "例如 v1.0.0 或 abc1234",
		"field.revision.hint": "品牌名稱右側的小徽標文字。留空則不顯示徽標。"
	}
};

//#endregion
//#region src/types.ts
/** Runtime defaults applied when no config arrives (defensive only). */
const DEFAULT_BRAND_TEXT_CONFIG = {
	name: "DSH Local Build",
	revision: ""
};

//#endregion
//#region src/client/BrandText.tsx
/**
* Render the configured brand name and optional revision badge.
*
* While loading or on error, falls back to the shell defaults.
* @param props - the `useSnapshot` inject face (plus the slot's runtime share, unused).
* @returns the brand-name span and optional revision-badge span.
*/
function BrandText({ useSnapshot }) {
	const state = useSnapshot((s) => s);
	const cfg = state.available ? state.draft : DEFAULT_BRAND_TEXT_CONFIG;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: "sbbt-brand-name",
		children: cfg.name
	}), cfg.revision !== "" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: "sbbt-build-revision",
		children: cfg.revision
	}) : null] });
}

//#endregion
//#region src/client/BrandTextCard.tsx
const cardStyle = {
	border: "1px solid var(--dsw-alias-border-l2, rgba(128,128,128,0.22))",
	background: "var(--dsw-alias-bg-layer-3, transparent)",
	borderRadius: 12,
	listStyle: "none",
	transition: "border-color .16s, background .16s"
};
const pendingStyle = {
	whiteSpace: "nowrap",
	background: "var(--dsw-alias-bg-module-platform, rgba(128,128,128,0.12))",
	color: "var(--dsw-alias-label-secondary, inherit)",
	borderRadius: 999,
	flex: "none",
	padding: "1px 8px",
	fontSize: 11,
	fontWeight: 500,
	lineHeight: "17px"
};
const bodyStyle = { padding: "16px" };
const formStyle = {
	display: "flex",
	flexDirection: "column",
	gap: 12
};
const fieldStyle = {
	display: "flex",
	flexDirection: "column",
	gap: 4
};
const labelStyle = {
	display: "block",
	fontSize: 13,
	fontWeight: 500,
	color: "var(--dsw-alias-label-primary, inherit)"
};
const inputStyle = {
	width: "100%",
	padding: "6px 10px",
	fontSize: 13,
	borderRadius: 8,
	border: "1px solid var(--dsw-alias-border-l2, rgba(128,128,128,0.3))",
	background: "var(--dsw-alias-bg-layer-3, transparent)",
	color: "var(--dsw-alias-label-primary, inherit)",
	boxSizing: "border-box",
	fontFamily: "inherit"
};
const hintStyle = {
	fontSize: 12,
	color: "var(--dsw-alias-label-tertiary, rgba(128,128,128,0.6))",
	margin: 0,
	lineHeight: 1.5
};
const footerStyle = {
	borderTop: "1px solid var(--dsw-alias-border-l2, rgba(128,128,128,0.22))",
	justifyContent: "flex-end",
	alignItems: "center",
	gap: 8,
	padding: "12px 0 4px",
	display: "flex"
};
const btnBase = {
	appearance: "none",
	font: "inherit",
	cursor: "pointer",
	border: "1px solid transparent",
	borderRadius: 8,
	padding: "5px 14px",
	fontSize: 13,
	fontWeight: 500,
	lineHeight: "20px",
	color: "var(--dsw-alias-label-primary, inherit)",
	background: "var(--dsw-alias-bg-module-platform, rgba(128,128,128,0.12))",
	transition: "background .16s, opacity .16s"
};
const noticeStyle = {
	color: "var(--dsw-alias-label-tertiary, rgba(128,128,128,0.7))",
	margin: "0 0 8px",
	fontSize: 12,
	lineHeight: 1.5
};
const savedStyle = {
	color: "var(--dsw-alias-state-success-primary, #30d158)",
	margin: "0 0 12px",
	fontSize: 12,
	lineHeight: 1.5
};
const errorStyle = {
	color: "var(--dsw-alias-label-error, #ff453a)",
	margin: "0 0 12px",
	fontSize: 12,
	lineHeight: 1.5,
	minWidth: 0
};
/**
* Render the sidebar-brand-text settings editor.
* @param props - locale + controller/useSnapshot inject.
* @returns a `<li>` card element with the always-expanded editor body.
*/
function BrandTextCard({ view, t, controller, useSnapshot }) {
	const state = useSnapshot((s) => s);
	if (state.status === "idle") controller.load();
	if (view === "summary") return t("card.intro");
	const applyState = state.applyState ?? { kind: "idle" };
	const saving = applyState.kind === "saving";
	const saved = applyState.kind === "saved";
	const errorText = applyState.kind === "error" ? applyState.message : void 0;
	const busy = !state.writable || saving;
	let body = null;
	if (state.status === "ready") if (!state.available) body = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		style: bodyStyle,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
			style: noticeStyle,
			role: "status",
			children: t("card.unavailable")
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			style: footerStyle,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				style: btnBase,
				onClick: () => {
					controller.load();
				},
				children: t("card.retry")
			})
		})]
	});
	else body = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		style: bodyStyle,
		children: [
			saved ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				style: savedStyle,
				role: "status",
				children: t("card.saved")
			}) : null,
			errorText !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				style: errorStyle,
				role: "status",
				children: errorText
			}) : null,
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: formStyle,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					style: fieldStyle,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							style: labelStyle,
							htmlFor: "sbbt-name",
							children: t("field.name.label")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							id: "sbbt-name",
							type: "text",
							style: inputStyle,
							value: state.draft.name,
							placeholder: t("field.name.placeholder"),
							disabled: busy,
							onChange: (e) => controller.edit("name", e.target.value)
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							style: hintStyle,
							children: t("field.name.hint")
						})
					]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					style: fieldStyle,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							style: labelStyle,
							htmlFor: "sbbt-revision",
							children: t("field.revision.label")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							id: "sbbt-revision",
							type: "text",
							style: inputStyle,
							value: state.draft.revision,
							placeholder: t("field.revision.placeholder"),
							disabled: busy,
							onChange: (e) => controller.edit("revision", e.target.value)
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							style: hintStyle,
							children: t("field.revision.hint")
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: footerStyle,
				children: [
					state.dirty ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						style: {
							...pendingStyle,
							marginRight: "auto"
						},
						children: t("card.unsaved")
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						style: {
							...btnBase,
							opacity: !state.dirty || saving ? .5 : 1
						},
						disabled: !state.dirty || saving,
						onClick: () => controller.discard(),
						children: t("card.discard")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						style: {
							...btnBase,
							background: "var(--dsw-alias-brand-primary, #0a84ff)",
							color: "var(--dsw-alias-bg-layer-1, #fff)",
							opacity: !state.dirty || saving ? .5 : 1
						},
						disabled: !state.dirty || saving,
						onClick: () => {
							controller.save();
						},
						children: saving ? t("card.saving") : t("card.save")
					})
				]
			})
		]
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", {
		style: cardStyle,
		children: body
	});
}

//#endregion
//#region src/client/controller.ts
/** Initial state before the first load. */
function initialState() {
	return {
		status: "idle",
		available: false,
		writable: false,
		draft: { ...DEFAULT_BRAND_TEXT_CONFIG },
		dirty: false,
		applyState: { kind: "idle" }
	};
}
/**
* Controller managing the brand-text config lifecycle.
*
* Constructed once in the client `apply()` and shared between the
* `sidebar.brand.name` slot and the `plugins.row.config` card.
*/
var BrandTextSettingsController = class {
	store;
	loaded = false;
	generation = 0;
	constructor() {
		this.store = (0, __deepseek_ai_dsh_client_store.createSnapshotStore)(initialState());
	}
	/** Fetch the config from `/sbbt/api/get` and update the store. */
	async load() {
		const gen = ++this.generation;
		this.store.update((s) => {
			s.status = "loading";
		});
		try {
			const res = await fetch("/sbbt/api/get", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: "{}"
			});
			if (!res.ok) {
				this.markUnavailable(gen);
				return;
			}
			const parsed = await res.json().catch(() => null);
			if (gen !== this.generation) return;
			if (!parsed || parsed.ok !== true || !parsed.value) {
				this.markUnavailable(gen);
				return;
			}
			const config = parsed.value.config;
			this.loaded = true;
			this.store.update((s) => {
				s.status = "ready";
				s.available = true;
				s.writable = true;
				if (config) s.draft = {
					name: config.name,
					revision: config.revision
				};
				s.dirty = false;
				s.applyState = { kind: "idle" };
			});
		} catch {
			this.markUnavailable(gen);
		}
	}
	/** Stage an edit to a field (does not save). */
	edit(field, value) {
		this.store.update((s) => {
			if (field === "name") s.draft.name = value;
			else s.draft.revision = value;
			s.dirty = true;
			s.applyState = { kind: "idle" };
		});
	}
	/** Discard staged edits and reload from the host. */
	discard() {
		this.load();
	}
	/** Save the staged draft via `/sbbt/api/set`. */
	async save() {
		const gen = ++this.generation;
		const snapshot = this.store.getSnapshot();
		if (!snapshot.dirty) return;
		this.store.update((s) => {
			s.applyState = { kind: "saving" };
		});
		try {
			const parsed = await (await fetch("/sbbt/api/set", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ patch: snapshot.draft })
			})).json().catch(() => null);
			if (gen !== this.generation) return;
			if (!parsed || parsed.ok !== true || !parsed.value) {
				const message = parsed?.error?.message ?? "Save failed";
				this.store.update((s) => {
					s.applyState = {
						kind: "error",
						message
					};
				});
				return;
			}
			const config = parsed.value.config;
			this.store.update((s) => {
				s.applyState = { kind: "saved" };
				if (config) s.draft = {
					name: config.name,
					revision: config.revision
				};
				s.dirty = false;
			});
		} catch (error) {
			if (gen !== this.generation) return;
			const message = error instanceof Error ? error.message : String(error);
			this.store.update((s) => {
				s.applyState = {
					kind: "error",
					message
				};
			});
		}
	}
	/** Mark the store as unavailable (route unreachable or settings service absent). */
	markUnavailable(gen) {
		if (gen !== this.generation) return;
		this.store.update((s) => {
			s.status = "ready";
			s.available = false;
			s.writable = false;
		});
	}
};

//#endregion
//#region src/client/bindSnapshotSelector.ts
/**
* Bind a React selector hook to a {@link HostObservable} snapshot source.
* @param source - the observable snapshot store.
* @returns a `useSelector(sel, eq?)` hook.
*/
function bindSnapshotSelector(source) {
	const subscribe = (fn) => source.subscribe(fn);
	const getSnapshot = () => source.getSnapshot();
	return function useSelector(sel) {
		const snapshot = (0, react.useSyncExternalStore)(subscribe, getSnapshot);
		const prevSnapshotRef = (0, react.useRef)(void 0);
		const prevSelectedRef = (0, react.useRef)(void 0);
		if (prevSnapshotRef.current !== snapshot) {
			prevSnapshotRef.current = snapshot;
			prevSelectedRef.current = sel(snapshot);
		}
		return prevSelectedRef.current;
	};
}

//#endregion
//#region src/client/titleWriter.ts
/**
* Start overriding `document.title` with the configured brand name.
*
* @param sessions - the cordis `sessions` service (read-only face).
* @param store - the shared `BrandTextSettingsController` store; the title
*   updates when the config changes (card save) as well as when the current
*   session changes.
* @returns a disposer that tears down all subscriptions and the observer.
*/
function startTitleWriter(sessions, store) {
	if (sessions === void 0) return () => {};
	if (typeof document === "undefined") return () => {};
	/** Compute the title we want, from the current session + brand config. */
	const computeTitle = () => {
		const state = store.getSnapshot();
		const cfg = state.available ? state.draft : DEFAULT_BRAND_TEXT_CONFIG;
		const list = sessions.list.getSnapshot();
		const id = list.current;
		const sessionTitle = id === void 0 ? void 0 : list.byId[id]?.title;
		return sessionTitle === void 0 || sessionTitle === "" ? cfg.name : `${sessionTitle} — ${cfg.name}`;
	};
	/** Write the computed title if it differs (avoids spurious observer fires). */
	const applyTitle = () => {
		const expected = computeTitle();
		if (document.title !== expected) document.title = expected;
	};
	/** Deferred writer: runs after React's useEffect via microtask. */
	const deferredApply = () => {
		queueMicrotask(applyTitle);
	};
	const stopSessionSub = sessions.list.subscribe(deferredApply);
	const stopStoreSub = store.subscribe(deferredApply);
	let observer = null;
	const titleEl = document.querySelector("title");
	if (titleEl !== null) {
		observer = new MutationObserver(applyTitle);
		observer.observe(titleEl, {
			childList: true,
			subtree: true,
			characterData: true
		});
	}
	queueMicrotask(applyTitle);
	return () => {
		stopSessionSub();
		stopStoreSub();
		observer?.disconnect();
		observer = null;
	};
}

//#endregion
//#region src/client/locales.ts
/** The locale namespace name; matches the `locale: NS` passed at slot register. */
const NS = "dsh-plugin-sidebar-brand-text";
/** English dictionary. */
const en = {
	"card.title": "Sidebar Brand Text",
	"card.intro": "Replace the sidebar brand name and revision badge with custom text.",
	"card.unsaved": "Unsaved",
	"card.saved": "Saved",
	"card.saving": "Saving…",
	"card.discard": "Discard",
	"card.save": "Save",
	"card.unavailable": "The sidebar-brand-text configuration channel is unavailable. Please retry later.",
	"card.retry": "Retry",
	"field.name.label": "Brand name",
	"field.name.placeholder": "DSH Local Build",
	"field.name.hint": "Text shown in the sidebar next to the logo. Replaces the default \"DSH Local Build\".",
	"field.revision.label": "Revision badge",
	"field.revision.placeholder": "e.g. v1.0.0 or abc1234",
	"field.revision.hint": "Small badge text beside the brand name. Leave empty to hide the badge."
};
/** Chinese dictionary. */
const zh = {
	"card.title": "侧边栏品牌文案",
	"card.intro": "替换侧边栏左上角的品牌名与构建徽标文案。",
	"card.unsaved": "未保存",
	"card.saved": "已保存",
	"card.saving": "保存中…",
	"card.discard": "放弃",
	"card.save": "保存",
	"card.unavailable": "侧边栏品牌文案配置通道不可用，请稍后重试。",
	"card.retry": "重试",
	"field.name.label": "品牌名称",
	"field.name.placeholder": "DSH Local Build",
	"field.name.hint": "侧边栏 logo 右侧显示的文案。替换默认的「DSH Local Build」。",
	"field.revision.label": "版本徽标",
	"field.revision.placeholder": "如 v1.0.0 或 abc1234",
	"field.revision.hint": "品牌名右侧的小徽标文案。留空则不显示徽标。"
};

//#endregion
//#region src/client/styles.ts
/**
* One scoped stylesheet injected for the lifetime of the client activation.
*
* The shell's `sidebar.brand.name` fallback renders two CSS-Module-hashed
* spans (`.fallbackBrandName` + `.buildRevision`); those class names are
* not stable across builds and not addressable from outside the sidebar
* package. This plugin ships its own class names with the same visual
* intent, all colors and typography drawn from the shared `--dsw-*`
* tokens (never literals) so the badge tracks the active theme.
*
* The parent `.brandName` span (inline-flex, gap: 6px, font-size: 18px,
* font-weight: 600) is owned by the sidebar shell and wraps whatever the
* slot occupant returns, so this stylesheet only needs to style the two
* child spans.
*/
const CSS = `
.sbbt-brand-name {
  font-size: 17px;
  letter-spacing: 0px;
  white-space: nowrap;
}

.sbbt-build-revision {
  display: inline-flex;
  align-items: center;
  height: 16px;
  padding: 0 4px;
  border-radius: 3px;
  color: var(--dsw-alias-label-primary-inverted);
  background: var(--dsw-alias-label-primary);
  font-family: var(--ds-font-family-code);
  font-size: 8px;
  font-weight: 500;
  line-height: 16px;
}
`;
/**
* Install the stylesheet and return its disposer.
* @returns a cleanup function that removes the injected `<style>` tag.
*/
function installStyles() {
	if (typeof document === "undefined") return () => {};
	const style = document.createElement("style");
	style.setAttribute("data-sidebar-brand-text-style", "");
	style.textContent = CSS;
	document.head.appendChild(style);
	return () => {
		style.remove();
	};
}

//#endregion
//#region src/client/index.ts
/** Required services: slots + locale + sessions (sessions drives the title writer). */
const inject = [
	"slots",
	"locale",
	"sessions"
];
/**
* Client plugin body: register the brand-name slot occupant, the settings
* card, the locale dictionary, and the stylesheet.
*
* A single `BrandTextSettingsController` is shared between the card and
* the brand text so a save is instantly reflected in the sidebar.
* @param ctx - client root context.
*/
function apply(ctx) {
	ctx.effect(() => ctx.locale.register(NS, {
		zh,
		en
	}), "sidebar-brand-text: dictionaries");
	ctx.effect(() => {
		let dispose;
		const sync = () => {
			dispose?.();
			dispose = void 0;
			const store = ctx.get("betterLocale");
			if (store !== void 0) dispose = store.register(NS, dicts);
		};
		sync();
		const unsubscribe = ctx.locale.subscribe(sync);
		return () => {
			unsubscribe();
			dispose?.();
		};
	}, "dsh-plugin-sidebar-brand-text: better-locale override dicts");
	ctx.effect(installStyles, "sidebar-brand-text: styles");
	const controller = new BrandTextSettingsController();
	const useSnapshot = bindSnapshotSelector(controller.store);
	controller.load();
	ctx.effect(() => startTitleWriter(ctx.sessions, controller.store), "sidebar-brand-text: document.title override");
	const brandInjected = () => ({ useSnapshot });
	ctx.slots.inject("sidebar.brand.name", () => ctx.slots.register({
		name: "sidebar.brand.name",
		inject: brandInjected
	}, BrandText));
	const cardInjected = () => ({
		controller,
		useSnapshot
	});
	ctx.slots.inject("plugins.row.config", function* () {
		yield ctx.slots.register({
			name: "plugins.row.config",
			key: "@huanlin/dsh-plugin-sidebar-brand-text#sidebar-brand-text",
			locale: NS,
			inject: cardInjected
		}, BrandTextCard);
	});
}

//#endregion
exports.apply = apply;
exports.inject = inject;
return module.exports; } });
//# sourceMappingURL=client.js.map