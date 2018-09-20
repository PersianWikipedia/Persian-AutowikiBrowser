// <nowiki> // DO NOT REMOVE THIS LINE EVER
/**
 * Persian text style improvement tools
 * Tests: [[مدیاویکی:Gadget-Extra-Editbuttons-tests.js]] [[وپ:تست]]
 * See also:
 * * [[مدیاویکی:Gadget-Extra-Editbuttons-persianwikitools.js]]
 * * [[مدیاویکی:Gadget-Extra-Editbuttons-dictionary.js]]
 */
var persianTools = (function () {
	'use strict';
	
	var persianGlyphs, persianDigits, arabicIndicDigits, arabicDigits,
		vowels, persianCharacters, persianCharactersNoVowels, persianPastVerbs,
		persianPresentVerbs, persianComplexPastVerbs, persianComplexPresentVerbs, similarPersianCharacters, hamza;

	arabicDigits = '0123456789';
	arabicIndicDigits = '٠١٢٣٤٥٦٧٨٩';
	//نویسه\u200cهای غیرفارسی ي-ك-ە و موارد مشابه پیش از تبدیل به نویسهٔ فارسی در سایر ریجکس\u200cها باید به عنوان کاراکتر فارسی شناخته شوند.
	similarPersianCharacters = '\u0643\uFB91\uFB90\uFB8F\uFB8E\uFEDC\uFEDB\uFEDA\uFED9\u0649\uFEEF\u064A\u06C1\u06D5\u06BE\uFEF0-\uFEF4';
	vowels = '\u064B-\u0650\u0652\u0670';
	persianCharacters = '\u0621-\u0655\u067E\u0686\u0698\u06AF\u06A9\u0643\u06AA\uFED9\uFEDA\u06CC\uFEF1\uFEF2' + similarPersianCharacters;
	persianCharactersNoVowels = '\u0621-\u064A\u0653-\u0655\u067E\u0686\u0698\u06AF\u06A9\u0643\u06AA\uFED9\uFEDA\u06CC\uFEF1\uFEF2' + similarPersianCharacters;
	persianDigits = '۰۱۲۳۴۵۶۷۸۹';
	hamza = '\u0654';

	function normalizeZwnj(text) {
		return text
			// Replace LRM، RLM characters with ZWNJ and it will remove unneeded ZWNJ at next lines
			// .replace(/[\u180E\u2028\u2029\u202A\u202B\u202C\u202D\u202E\u200F¬]/g, '\u200c')
			.replace(new RegExp('([' + persianCharacters + '] *)[\u200F\u200E]+( *[' + persianCharacters + '])', 'g'), '$1\u200c$2')
			// Remove more than a ZWNJs
			.replace(/\u200c{2,}/g, '\u200c')
			// Convert ¬ to zwnj in Persian context
			.replace(new RegExp('([' + persianCharacters + '])¬(?=[' + persianCharacters + '])', 'g'), '$1\u200c')
			// Clean ZWNJs after characters that don't conncet to the next letter
			.replace(/([۰-۹0-9إأةؤورزژاآدذ،؛,\:«»\\\/@#$٪×\*\(\)ـ\-=\|ء])\u200c/g, '$1')
			// Clean ZWNJs before and after English characters
			.replace(/\u200c([\w])/g, '$1')
			.replace(/([\w])\u200c/g, '$1')
			// Clean ZWNJs before and after Persian characters
			.replace(new RegExp('\\u200c([' + vowels + arabicIndicDigits + persianDigits + hamza+'])','g'), '$1')
			.replace(new RegExp('(['+arabicIndicDigits+'])\\u200c','g'), '$1')
			.replace(/([\w])\u200c/g, '$1')
			// Clean ZWNJs after and before punctuation
			.replace(/\u200c([ء\n\s\[\]\.،«»\:\(\)\؛\؟\?\;\$\!\@\-\=\+\\\|])/g, '$1')
			.replace(/([\n\s\[\.،«»\:\(\)\؛\؟\?\;\$\!\@\-\=\+\\\|])\u200c/g, '$1')
			// Clean ZWNJs before brakets which have sapce after\before them
			.replace(/\u200c(\]\][\s\n])/g, '$1')
			.replace(/([\n\s]\[\[)\u200c/g, '$1');
	}

	persianGlyphs = {
		// these two are for visually available ZWNJ #visualZwnj
		'\u200cه': 'ﻫ',
		'ی\u200c': 'ﻰﻲ',
		'أ': 'ﺄﺃﺃ',
		'آ': 'ﺁﺁﺂ',
		'إ': 'ﺇﺈﺇ',
		'ا': 'ﺍﺎ',
		'ب': 'ﺏﺐﺑﺒ',
		'پ': 'ﭖﭗﭘﭙ',
		'ت': 'ﺕﺖﺗﺘ',
		'ث': 'ﺙﺚﺛﺜ',
		'ج': 'ﺝﺞﺟﺠ',
		'چ': 'ﭺﭻﭼﭽ',
		'ح': 'ﺡﺢﺣﺤ',
		'خ': 'ﺥﺦﺧﺨ',
		'د': 'ﺩﺪ',
		'ذ': 'ﺫﺬ',
		'ر': 'ﺭﺮ',
		'ز': 'ﺯﺰ',
		'ژ': 'ﮊﮋ',
		'س': 'ﺱﺲﺳﺴ',
		'ش': 'ﺵﺶﺷﺸ',
		'ص': 'ﺹﺺﺻﺼ',
		'ض': 'ﺽﺾﺿﻀ',
		'ط': 'ﻁﻂﻃﻄ',
		'ظ': 'ﻅﻆﻇﻈ',
		'ع': 'ﻉﻊﻋﻌ',
		'غ': 'ﻍﻎﻏﻐ',
		'ف': 'ﻑﻒﻓﻔ',
		'ق': 'ﻕﻖﻗﻘ',
		'ک': 'ﮎﮏﮐﮑﻙﻚﻛﻜ',
		'گ': 'ﮒﮓﮔﮕ',
		'ل': 'ﻝﻞﻟﻠ',
		'م': 'ﻡﻢﻣﻤ',
		'ن': 'ﻥﻦﻧﻨ',
		'ه': 'ﻩﻪﻫﻬ',
		'هٔ': 'ﮤﮥ',
		'و': 'ﻭﻮ',
		'ؤ': 'ﺅﺅﺆ',
		'ی': 'ﯼﯽﯾﯿﻯﻰﻱﻲﻳﻴ',
		'ئ': 'ﺉﺊﺋﺌ',
		'لا': 'ﻻﻼ',
		'لإ': 'ﻹﻺ',
		'لأ': 'ﻸﻷ',
		'لآ': 'ﻵﻶ'
	};

	function toStandardPersianCharacters(text) {
		var i;
		for (i in persianGlyphs) {
			if (persianGlyphs.hasOwnProperty(i)) {
				text = text.replace(new RegExp('[' + persianGlyphs[i] + ']', 'g'), i);
			}
		}
		return normalizeZwnj(text) // needed because of #visualZwnj
			.replace(/ك/g, 'ک') // Arabic
			.replace(/ڪ/g, 'ک') // Urdu
			.replace(/ﻙ/g, 'ک') // Pushtu
			.replace(/ﻚ/g, 'ک') // Uyghur
			.replace(/ي/g, 'ی') // Arabic
			.replace(/ى/g, 'ی') // Urdu
			.replace(/ے/g, 'ی') // Urdu
			.replace(/ۍ/g, 'ی') // Pushtu
			.replace(/ې/g, 'ی') // Uyghur
			.replace(/ہ/g, 'ه') // Convert &#x06C1; to &#x0647; ہہہہ to ههه
			.replace(/ە/g, 'ه\u200c') // Kurdish
			.replace(/ھ/g, 'ه'); // Kurdish
	}

	function toPersianDigits(text) {
		var i = 0;
		for (i = 0; i <= 9; i = i + 1) {
			text = text.replace(new RegExp('[' + arabicIndicDigits[i] + arabicDigits[i] + ']', 'g'), persianDigits[i]);
		}
		return text
			.replace(new RegExp('([' + persianDigits + ']) ?%', 'g'), '$1٪')
			.replace(new RegExp('٪([' + persianDigits + ']+(?:[.٬٫][' + persianDigits + ']*)*)', 'g'), '$1٪')
			.replace(new RegExp('([' + persianDigits + '])\\.(?=[' + persianDigits + '])', 'g'), '$1٫') // persian decimal separator
			.replace(new RegExp('([' + persianDigits + '])\\،(?=[' + persianDigits + '])', 'g'), '$1٬'); // جایگزینی جداکننده هزاگان به جای ویرگول در میان اعداد
	}

	function applyOrthography(text) {
		return text
			.replace(/\r/g, '')
			//تمیزکاری autoFormatter.js
			.replace( /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFEFF\u00AD]+/g, '' )
			.replace(/[ \xA0\xAD\u1680\u180E\u2000-\u200D\u2028\u2029\u202F\u205F\u2060\u3000]+\n/g,'\n')
			//تبدیل تب و فاصله نشکن اول خط به هیچ چون مدیاویکی آن را در نظر نمی‌گیرد
			.replace(/\n[\t\u00A0]+/g, '\n')
			//تبدیل انواع فاصله‌ها به فاصله ساده
			.replace(/[\u0020\u0085\u00A0\u180E\u2000-\u200A\u202F\u205F\u3000]/g, ' ')
			.replace(/[\u0085]/g, '')
			//http://kb.mozillazine.org/Network.IDN.blacklist_chars
			.replace(/[\u01C3\uFE15]/g, '!')
			.replace(/[\u02D0\u0589\u05C3\uA789]/g, ':')
			.replace(/[\u0338\u2044\u2215\u2571\u29F8\u3033\uFF0F]/g, '/')
			.replace(/[\u05F4]/g, '"')
			.replace(/[\u06D4\u0701\uFF0E\uFF61]/g, '.')
			.replace(/\u3014/g, '(')
			.replace(/\u3015/g, ')')
			// جایگزینی ۀ غیراستاندار+حرف بعدی بدون فاصله به ه+همزه+فاصله
			.replace(/ۀ(?![\s\n])/g, 'هٔ ')
			// Replace ه followed by (space|ZWNJ|lrm) follow by ی with هٔ
			.replace(/ه[\u200c\u200e\s]+ی([\s\n])/g, 'هٔ$1')
			// Replace ه followed by (space|ZWNJ|lrm|nothing) follow by ء or with هٔ
			.replace(/ه[\u200c\u200e\s]*[ءٔ]([\s\n])/g, 'هٔ$1')
			// Replace هٓ or single-character ۀ with the standard هٔ
			.replace(/(ۀ|هٓ)/g, 'هٔ')
			// Replace ه followed by ئ or ی, and then by ی, with ه\u200cای, example: خانهئی becomes خانه\u200cای
			.replace(/ه\u200c[ئی]ی/g, 'ه\u200cای')
			// Function for removing incorrect ZWNJs
			.replace(/([\u200c\u200e])([\s\n])/g, '$2')
			.replace(/([\s\n])([\u200c\u200e])/g, '$1')
			//فاصلهٔ پیش از واکه\u200cهای کوتاه اشتباه است و برای جلوگیر از به هم چسبیدن کلمات فاصله و واکه جابجا باید گردند.
			.replace(new RegExp('([' + persianCharacters + vowels + hamza + '])(\\s)([' + vowels + hamza + '])', 'g'), '$1$3$2')
			//واکه\u200cهای کوتاه پشت سرهم نمی\u200cآیند و یک حرف باید بینشان فاصله باشد
			.replace(new RegExp('([' + vowels + hamza + ']){2,}', 'g'), '$1')
			.replace(/ئء/g, 'یء') //two hamzes after each other
			.replace(/أء/g, 'اء') //two hamzes after each other
			.replace(/ؤء/g, 'ؤ') //two hamzes after each other
			//.replace(/وء/g, 'ؤ')//bug on  سوء
			.replace(/سؤ ?استفاده/g, 'سوءاستفاده')//bug on سوءاستفاده و سوء
			//افزودن همزه
			.replace(/درباره (ام|ات|اش|مان|تان|شان|ای)(\s|$)/g, 'درباره‌$1$2')//i برای جلوگیری از باگ احتمالی برای افزودن همزه به درباره
			.replace(/درباره /g, 'دربارهٔ ')
			.replace(new RegExp('صفحه(\\s|)(['+persianDigits+']+)(\\n|\\.|\\,|\\||\\<)', 'g'), 'صفحهٔ $2$3');//[[Special:PermaLink/15326391#افزودن همزه]]
	}

	/**
	 * Replaces Persian characters with Arabic's ones so an Arabic sorter can sort Persian lines
	 */
	function dePersian(text) {
		return text
			.replace(/ی/g, 'ي')
			.replace(/ک/g, 'ك')
			.replace(/گ/g, 'كی')
			.replace(/ژ/g, 'زی')
			.replace(/چ/g, 'جی')
			.replace(/پ/g, 'بی');
	}

	function persianSortText(text) {
		return text.split('\n').sort(function (x, y) {
			var keyX = dePersian(x),
				keyY = dePersian(y);
			if (keyX < keyY) {
				return -1;
			}
			if (keyX > keyY) {
				return 1;
			}
			return 0;
		}).join('\n');
	}

	persianPastVerbs = '(' +
		'ارزید|افتاد|افراشت|افروخت|افزود|افسرد|افشاند|افکند|انباشت|انجامید|انداخت|اندوخت|اندود|اندیشید|انگاشت|انگیخت|انگیزاند|اوباشت|ایستاد' +
		'|آراست|آراماند|آرامید|آرمید|آزرد|آزمود|آسود|آشامید|آشفت|آشوبید|آغازید|آغشت|آفرید|آکند|آگند|آلود|آمد|آمرزید|آموخت|آموزاند' +
		'|آمیخت|آهیخت|آورد|آویخت|باخت|باراند|بارید|بافت|بالید|باوراند|بایست|بخشود|بخشید|برازید|برد|برید|بست|بسود|بسیجید|بلعید' +
		'|بود|بوسید|بویید|بیخت|پاشاند|پاشید|پالود|پایید|پخت|پذیراند|پذیرفت|پراکند|پراند|پرداخت|پرستید|پرسید|پرهیزید|پروراند|پرورد|پرید' +
		'|پژمرد|پژوهید|پسندید|پلاسید|پلکید|پناهید|پنداشت|پوسید|پوشاند|پوشید|پویید|پیچاند|پیچانید|پیچید|پیراست|پیمود|پیوست|تاباند|تابید|تاخت' +
		'|تاراند|تازاند|تازید|تافت|تپاند|تپید|تراشاند|تراشید|تراوید|ترساند|ترسید|ترشید|ترکاند|ترکید|تکاند|تکانید|تنید|توانست|جَست|جُست' +
		'|جست|جنباند|جنبید|جنگید|جهاند|جهید|جوشاند|جوشید|جوید|چاپید|چایید|چپاند|چپید|چراند|چربید|چرخاند|چرخید|چرید|چسباند|چسبید' +
		'|چشاند|چشید|چکاند|چکید|چلاند|چلانید|چمید|چید|خاراند|خارید|خاست|خایید|خراشاند|خراشید|خرامید|خروشید|خرید|خزید|خست|خشکاند' +
		'|خشکید|خفت|خلید|خمید|خنداند|خندانید|خندید|خواباند|خوابانید|خوابید|خواست|خواند|خوراند|خورد|خوفید|خیساند|خیسید|داد|داشت|دانست' +
		'|درخشانید|درخشید|دروید|درید|دزدید|دمید|دواند|دوخت|دوشید|دوید|دید|دیدم|راند|ربود|رخشید|رساند|رسانید|رست|رَست|رُست' +
		'|رسید|رشت|رفت|رُفت|رقصاند|رقصید|رمید|رنجاند|رنجید|رندید|رهاند|رهانید|رهید|روبید|روفت|رویاند|رویید|ریخت|رید|ریسید' +
		'|زاد|زارید|زایید|زد|زدود|زیست|سابید|ساخت|سپارد|سپرد|سپوخت|ستاند|ستد|سترد|ستود|ستیزید|سرایید|سرشت|سرود|سرید' +
		'|سزید|سفت|سگالید|سنجید|سوخت|سود|سوزاند|شاشید|شایست|شتافت|شد|شست|شکافت|شکست|شکفت|شکیفت|شگفت|شمارد|شمرد|شناخت' +
		'|شناساند|شنید|شوراند|شورید|طپید|طلبید|طوفید|غارتید|غرید|غلتاند|غلتانید|غلتید|غلطاند|غلطانید|غلطید|غنود|فرستاد|فرسود|فرمود|فروخت' +
		'|فریفت|فشاند|فشرد|فهماند|فهمید|قاپید|قبولاند|کاست|کاشت|کاوید|کرد|کشاند|کشانید|کشت|کشید|کفت|کفید|کند|کوبید|کوچید' +
		'|کوشید|کوفت|گَزید|گُزید|گایید|گداخت|گذارد|گذاشت|گذراند|گذشت|گرازید|گرایید|گرداند|گردانید|گردید|گرفت|گروید|گریاند|گریخت|گریست' +
		'|گزارد|گزید|گسارد|گستراند|گسترد|گسست|گسیخت|گشت|گشود|گفت|گمارد|گماشت|گنجاند|گنجانید|گنجید|گندید|گوارید|گوزید|لرزاند|لرزید' +
		'|لغزاند|لغزید|لمباند|لمدنی|لمید|لندید|لنگید|لهید|لولید|لیسید|ماسید|مالاند|مالید|ماند|مانست|مرد|مکشید|مکید|مولید|مویید' +
		'|نازید|نالید|نامید|نشاند|نشست|نکوهید|نگاشت|نگریست|نمایاند|نمود|نهاد|نهفت|نواخت|نوردید|نوشاند|نوشت|نوشید|نیوشید|هراسید|هشت' +
		'|ورزید|وزاند|وزید|یارست|یازید|یافت' +
		')';

	persianPresentVerbs = '(' +
		'ارز|افت|افراز|افروز|افزا|افزای|افسر|افشان|افکن|انبار|انباز|انجام|انداز|اندای|اندوز|اندیش|انگار|انگیز|انگیزان' +
		'|اوبار|ایست|آرا|آرام|آرامان|آرای|آزار|آزما|آزمای|آسا|آسای|آشام|آشوب|آغار|آغاز|آفرین|آکن|آگن|آلا|آلای' +
		'|آمرز|آموز|آموزان|آمیز|آهنج|آور|آویز|آی|بار|باران|باز|باش|باف|بال|باوران|بای|باید|بخش|بخشا|بخشای' +
		'|بر|بَر|بُر|براز|بساو|بسیج|بلع|بند|بو|بوس|بوی|بیز|بین|پا|پاش|پاشان|پالا|پالای|پذیر|پذیران' +
		'|پر|پراکن|پران|پرداز|پرس|پرست|پرهیز|پرور|پروران|پز|پژمر|پژوه|پسند|پلاس|پلک|پناه|پندار|پوس|پوش|پوشان' +
		'|پوی|پیچ|پیچان|پیرا|پیرای|پیما|پیمای|پیوند|تاب|تابان|تاران|تاز|تازان|تپ|تپان|تراش|تراشان|تراو|ترس|ترسان' +
		'|ترش|ترک|ترکان|تکان|تن|توان|توپ|جنب|جنبان|جنگ|جه|جهان|جو|جوش|جوشان|جوی|چاپ|چای|چپ|چپان' +
		'|چر|چران|چرب|چرخ|چرخان|چسب|چسبان|چش|چشان|چک|چکان|چل|چلان|چم|چین|خار|خاران|خای|خر|خراش' +
		'|خراشان|خرام|خروش|خز|خست|خشک|خشکان|خل|خم|خند|خندان|خواب|خوابان|خوان|خواه|خور|خوران|خوف|خیز|خیس' +
		'|خیسان|دار|درخش|درخشان|درو|دزد|دم|ده|دو|دوان|دوز|دوش|ران|ربا|ربای|رخش|رس|رسان' +
		'|رشت|رقص|رقصان|رم|رنج|رنجان|رند|ره|رهان|رو|روب|روی|رویان|ریز|ریس|رین|زا|زار|زای|زدا' +
		'|زدای|زن|زی|ساب|ساز|سای|سپار|سپر|سپوز|ستا|ستان|ستر|ستیز|سر|سرا|سرای|سرشت|سز|سگال|سنب' +
		'|سنج|سوز|سوزان|شاش|شای|شتاب|شکاف|شکف|شکن|شکوف|شکیب|شمار|شمر|شناس|شناسان|شنو|شو|شور|شوران|شوی' +
		'|طپ|طلب|طوف|غارت|غر|غلت|غلتان|غلط|غلطان|غنو|فرسا|فرسای|فرست|فرما|فرمای|فروش|فریب|فشار|فشان|فشر' +
		'|فهم|فهمان|قاپ|قبولان|کار|کاه|کاو|کش|کَش|کُش|کِش|کشان|کف|کن|کوب|کوچ|کوش|گا|گای|گداز' +
		'|گذار|گذر|گذران|گرا|گراز|گرای|گرد|گردان|گرو|گری|گریان|گریز|گز|گزار|گزین|گسار|گستر|گستران|گسل|گشا' +
		'|گشای|گمار|گنج|گنجان|گند|گو|گوار|گوز|گوی|گیر|لرز|لرزان|لغز|لغزان|لم|لمبان|لند|لنگ|له|لول' +
		'|لیس|ماس|مال|مان|مک|مول|موی|میر|ناز|نال|نام|نشان|نشین|نکوه|نگار|نگر|نما|نمای|نمایان|نه' +
		'|نهنب|نواز|نورد|نوش|نوشان|نویس|نیوش|هراس|هست|هل|ورز|وز|وزان|یاب|یار|یاز' +
		')';

	persianComplexPastVerbs={
		'باز':'آفرید|آمد|آموخت|آورد|ایستاد|تابید|جست|خواند|داشت|رساند|ستاند|شمرد|ماند|نمایاند|نهاد|نگریست|پرسید|گذارد'+
			'|گرداند|گردید|گرفت|گشت|گشود|گفت|یافت',
		'در':'بر ?داشت|بر ?گرفت|آمد|آمیخت|آورد|آویخت|افتاد|افکند|انداخت|رفت|ماند|نوردید|کشید|گرفت',//bug: در گذشته 
		'بر':'آشفت|آمد|آورد|افتاد|افراشت|افروخت|افشاند|افکند|انداخت|انگیخت|تاباند|تابید|تافت|تنید|جهید|خاست|خواست|خورد'+
			'|داشت|دمید|شمرد|نهاد|چید|کرد|کشید|گرداند|گردانید|گردید|گزید|گشت|گشود|گمارد|گماشت',
		'فرو':'آمد|خورد|داد|رفت|نشاند|کرد|گذارد|گذاشت',
		'وا':'داشت|رهاند|ماند|نهاد|کرد',
		'ور':'آمد|افتاد|رفت',
		'یاد':'گرفت',
		'پدید':'آورد',
		'پراکنده':'ساخت',
		'زمین':'خورد',
		'گول':'زد',
		'لخت':'کرد'
	}

	persianComplexPresentVerbs={
		'باز':'آفرین|آموز|آور|ایست|تاب|جو|خوان|دار|رس|ستان|شمار|مان|نمایان|نه|نگر|پرس|گذار|گردان|گرد|گشا|گو|گیر|یاب',
		'در':'بر ?دار|بر ?گیر|آمیز|آور|آویز|افت|افکن|انداز|مان|نورد|کش|گذر|گیر',//مشکل با: در روم باستان، در ده 
		'بر':'آشوب|آور|افت|افراز|افروز|افشان|افکن|انداز|انگیز|تابان|تاب|تن|جه|خواه|خور|خیز|دار|دم|شمار|نه|چین|کش|کن'+
			'|گردان|گزین|گشا|گمار',
		//مشکل با : بر گردن
		'فرو':'خور|ده|رو|نشین|کن|گذار',
		'وا':'دار|رهان|مان|نه|کن',
		'ور':'افت|رو',
		'یاد':'گیر',
		'پدید':'آور',
		'پراکنده':'ساز',
		'زمین':'خور',
		'گول':'زن',
		'لخت':'کن'
	}

	function complexVerbsApplyZwnj(text) {
		for (var x in persianComplexPastVerbs) {
			var y = persianComplexPastVerbs[x]
			text = text.replace(new RegExp(
				  '(^|[^' + persianCharacters + '])(' + x + ') ?(می|نمی|)( |\u200c|)(ن|)('
					 + y + ')(م|ی|یم|ید|ند|ه|ن|)($|[^' + persianCharacters + '])', 'g'),
				'$1$2\u200c$3\u200c$5$6$7$8');
		}
		for (var x in persianComplexPresentVerbs) {
			var y = persianComplexPresentVerbs[x]
			text = text.replace(new RegExp(
				  '(^|[^' + persianCharacters + '])(' + x + ') ?(می|نمی|)( |\u200c|)(ن|)('
					 + y + ')(م|ی|د|یم|ید|ند|ن)($|[^' + persianCharacters + '])', 'g'),
				'$1$2\u200c$3\u200c$5$6$7$8');
		}
		return text;
	}

	function applyZwnj(text) {
		text=complexVerbsApplyZwnj(text);
		return normalizeZwnj(text)
			.replace(
				new RegExp('(^|[^' + persianCharacters + '])(می|نمی) ?' + persianPastVerbs +
					'(م|ی|یم|ید|ند|ه|)($|[^' + persianCharacters + '])', 'g'),
				'$1$2\u200c$3$4$5'
			)
			.replace(
				new RegExp('(^|[^' + persianCharacters + '])(می|نمی) ?' + persianPresentVerbs +
					'(م|ی|د|یم|ید|ند)($|[^' + persianCharacters + '])', 'g'),
				'$1$2\u200c$3$4$5'
			)
			
			// بن فعل مضارع «دان» جدا آمد چون پسوند «ی» با عبارت «میدانی» تداخل داشت
			.replace(
				new RegExp('(^|[^' + persianCharacters + '])(می|نمی) ?(دان)(م|د|یم|ید|ند)($|[^' + persianCharacters + '])', 'g'),
				'$1$2\u200c$3$4$5'
			)
			// ای «توان» ناقلا!
			.replace(/(\s)(می|نمی) ?توان/g, '$1$2\u200cتوان')
			// چسباندن تمام «ها»ها با فاصلهٔ مجازی
			.replace(/ ها([\]\.،\:»\)\s]|\'{2,3}|\={2,})/g, '\u200cها$1')
			.replace(/ ها(ی|یی|یم|یت|یش|مان|تان|شان)([\]\.،\:»\)\s])/g, '\u200cها$1$2')
			.replace(/هها/g, 'ه‌ها')
			// چسباندن تمام «ترین»ها با فاصلهٔ مجازی
			.replace(/ ترین([\]\.،\:»\)\s]|\'{2,3}|\={2,})/g, '\u200cترین$1')
			// برای حذف علامت ستاره اضافی قبل از عنوان ها
			.replace(/\n\*\s*(\=+.+?\=+\n)/g, '\n$1')
			// عضو علامت های نقل قول تکی از عنوان ها
			.replace(/(\n=+)(.*?)(?:'+)(.*?)(?:'+)(.*?)(=+\n)/g, '$1$2$3$4$5')
			// اول و آخر هم خط اگر فاصلهٔ مجازی باشد، حذف شود
			.replace(/(^\u200c|\u200c$)/mg, '')
			// شناسه ها
			// توجه: «است» تعدماً از شناسه ها حذف شده چون به عنوان فعل مستقل هم کاربرد دارد و در آن موارد باید جدا نوشته شود
			// مثال: «این یک خانه است» که است در آن باید از خانه جدا نوشته شود
			.replace(new RegExp('ه +(ایم|اید|اند)($|[^' + persianCharacters + '\u200c])', 'g'), 'ه\u200c$1$2')
			// موارد جزئی دیگر و بی ربط به فاصلهٔ مجازی، باید منتقل شود
			.replace(/ا\sً/g, 'اً')
			// رفع اشکال که\u200cای
			.replace(/ که\u200cای /g, ' که ای ')
			//رفع اشکال میستری (Mystery)
			.replace(/می\u200cستری/g, 'میستری')
			.replace(new RegExp('می\u200cگوی($|[^' + persianCharacters + '\u200c])', 'g'), 'میگوی$1') // for میگوی دریایی
			.replace(new RegExp('می\u200cدوی($|[^' + persianCharacters + '\u200c])', 'g'), 'میدوی$1');// for [[میدوی (ابهام‌زدایی)]]
	}

	function punctuation(text) {
		return text
			/// سجاوندی غیرفارسی
			.replace(/ː/g, ':') // Replace incorrect : character
			// استفاده از ؟ فارسی
			.replace(new RegExp('([' + persianCharacters + '])[ ]*[?]', 'g'), '$1؟')
			// استفاده از ; فارسی
			.replace(new RegExp('([' + persianCharacters + '])[ ]*[;]', 'g'), '$1؛ ')
			// استفاده از ، فارسی
			.replace(new RegExp('([' + persianCharacters + '])(\]\]|»|)[ ]*[,]', 'g'), '$1$2، ')
			//حذف دو فاصله بعد از سجاوندی
			.replace(/(،|؛|؟|\.)  /g, '$1 ')
			.replace(/\r/g, '')
			// افزودن یا حذف فاصله
			// حذف فاصله‌های تکراری میان واژه‌ها، به جز بین نام پارامتر و علامت مساوی
			.replace(/(. ) +(?=[^= ])/g, '$1')
			//فاصله بعد از سجاوندی به جز ! به دلیل (<!-- و !! در بالای جدول‌ها)
			.replace(/([،\.\؛\؟»])([^\s\.\(\)«»\"\[\]<>\d\w\{\}\|۰۱۲۳۴۵۶۷۸۹\'])/g, '$1 $2')
			// افزودن فاصله به بعد از سجاوندی
			.replace(new RegExp('([' + persianCharacters + ']+|\\]|\\)|»)([؟،؛\\!\\.])([' + persianCharacters +persianDigits + ']+|\\[|\\(|«)', 'g'), '$1$2 $3')
			// حذف فاصله بعد از گیومه، پرانتز، براکت باز
			.replace(/([\(«\[]) /g, '$1')
			// حذف فاصله قبل از گیومه، پرانتز، براکت بسته
			.replace(/ ([\)»\]])/g, '$1')
			// افزودن فاصله قبل از گیومه باز
			.replace(/([^ \(\[\|\r\n>'])(«)/g, '$1 $2')
			.replace(/ +\( +/g, ' (')
			.replace(new RegExp('([' + persianCharacters + ']|\\]|») *\\( *(?=[' + persianCharacters + '])(?!ها\\)|ان\\))', 'g'), '$1 (')
			.replace(new RegExp('([' + persianCharacters + ']) *\\) *(?=[' + persianCharacters + ']|\\[|«)', 'g'), '$1) ')
			// خط جدید
			.replace(/\n\s{1,}\n/g, '\n\n')
			// Removes extra line between two items list
			.replace(/(\n\*.*?)\n+(?=\n\*)/g, '$1')
			// Removes extra line between two items list
			.replace(/(\n#.*?)\n+(?=\n#)/g, '$1')
			// Convert , to ، if there are Persian characters on both sides of it 
			.replace(new RegExp('([' + persianCharacters + ']), ?(?=[' + persianCharacters + "])", 'g'), '$1$2، ')
			// بعد از نقطه‌ویرگول فارسی علامتی قرار نمی‌گیرد
			.replace(/(؛)(([\s]+)?[\.،؛:!؟\-…])/g, '$1')
			// در انتهای پاراگراف نقطه‌ویرگول فارسی نمی‌آید
			.replace(/(؛)(\s|)\n\n/g, '.\n\n')
			// سجاوندی در ابتدای علامت باز قرار نمی‌گیرد
			.replace(/([\(«])[\s]([؛\.،])/g, '$1')
			// ویرگول فارسی
			// بعد از ویرگول فارسی این علامت‌ها قرار نمی‌گیرد
			.replace(/(،)([\s]+)?([،؛!؟\-][\.،؛!؟\-]*|\.(?!\.))/g, '$1')
			// نقطه
			// باید سه نقطه باشد
			.replace(new RegExp('([' + persianCharacters + '])( *)(\\.{3,})', 'g'), '$1$2…')
			.replace(/ \.\.\. /g, ' … ')
			// بعد از نقطه این علایم نمی‌آیند
			.replace(new RegExp('([' + persianCharacters + '])\\.( *[،؛:!؟\\?]+)', 'g'), '$1.')
			// سجاوندی در ابتدای پرانتز و گیومه باز قرار نمی‌گیرد
			.replace(new RegExp('(\\(|«)[\\.،؛](\\s|)([' + persianCharacters + '])', 'g'), '$1$3')
			// سجاوندی در داخل پرانتز
			.replace(new RegExp('([' + persianCharacters + '])(\\s|)[\\.،؛](\\s|)(\\))', 'g'), '$1$2$3$4')
			// در صورت وابستگی معنی جملات بهتر است نقطه‌ویرگول فارسی قرار گیرد
			.replace(new RegExp('([' + persianCharacters + '])(\\s|)(\\.)(\\s|)(ولی|که\\s|و\\s|بنابراین|لذا)', 'g'), '$1؛ $5')
			/// Question & exclamation mark
			// علامت تعجب تکراری به دلیل وجود !! در عنوان جدول‌های مدیاویکی نباید اصلاح شود.
			// تكرار علامت سوال فارسی
			.replace(/(؟(\s|)){2,}/g, '؟')
			// علامت‌گذاری نادرست
			.replace('؟ !', '؟!').replace('! ؟', '!؟')
			// Remove space preceding punctuation, except for ellipses
			.replace(/([^ \.]) +([؟،\:؛!\.])(\s[^ \.]|<|$)/g, '$1$2$3')
			// تبدیل نیم‌خط به تمام خط بین اعداد فارسی (وپ:خط تیره)
			.replace(new RegExp('([' + persianDigits + ']+\\s?(?:\\_\\_|\\-|ـ+)\\s?)*([' + persianDigits + ']+)\\s?(?:\\_\\_|\\-|ـ+)\\s?([' + persianDigits + ']+)(?!\\s?(?:\\_\\_|\\-|ـ+)\\s?[' + persianDigits + ']+)', 'g'), function ($0, $1, $2, $3) { return ($1 ? $0 : $2 + '–' + $3) })
			// عبارت «ها» درون پرانتز می‌تواند به کلمه قبلی خود بچسبد
			.replace(/ \(ها\)/g, '(ها)')
			.replace(/ه‍\. (ق|خ|ش)([\n ])/g, 'ه‍.$1$2')//iاصلاح تاریخ هجری
			// حذف فاصلهٔ میان دو عبارت مختصر که دارای نقطهٔ اختصار باشند
			.replace(new RegExp('(\^|\\||\\(|«|\\}|"|\\s|\\*|\\#)(([' + persianCharacters + ']\{1,2\})\\. \?)\{2,6\}', 'g'), function (m) { return m.replace(/\. (.)/g, '.$1'); });
	}
	return {
		applyOrthography: applyOrthography,
		applyZwnj: applyZwnj,
		normalizeZwnj: normalizeZwnj,
		persianSortText: persianSortText,
		punctuation: punctuation,
		toPersianDigits: toPersianDigits,
		toStandardPersianCharacters: toStandardPersianCharacters,
		vowels: vowels,
		persianCharacters: persianCharacters,
		persianCharactersNoVowels: persianCharactersNoVowels
	};
}());
if (typeof window !== 'undefined') {
	window.persianTools = persianTools;
}
// </nowiki>
// <nowiki> // DO NOT REMOVE THIS LINE EVER
/**
 * Wikipedia specific Persian text style improvement tools
 * Tests: [[مدیاویکی:Gadget-Extra-Editbuttons-tests.js]] [[وپ:تست]]
 * See also: [[مدیاویکی:Gadget-Extra-Editbuttons-persiantools.js]]
 */
/*global persianTools, persianToolsDictionary, autoEd*/
var persianWikiTools = (function () {
	'use strict';
        //http://www.entitycode.com/
	var HTMLEntityCodes = {"&iexcl;": "¡","&cent;": "¢","&pound;": "£","&curren;": "¤","&yen;": "¥",
		"&brvbar;": "¦","&sect;": "§","&copy;": "©","&middot;": "·","&times;": "×","&rdquo;": "”","&dagger;": "†",
		"&Dagger;": "‡","&euro;": "€","&laquo;": "«","&reg;": "®","&deg;": "°","&plusmn;": "±","&sup2;": "²",
		"&sup3;": "³","&para;": "¶","&sup1;": "¹","&raquo;": "»","&frac14;": "¼","&frac12;": "½","&frac34;": "¾",
		"&iquest;": "¿","&divide;": "÷","&ndash;": "–","&mdash;": "—","&lsquo;": "‘","&rsquo;": "’","&ldquo;": "“",
		"&trade;": "™","&bull;": "•","&hellip;": "…","&permil;": "‰","&lsaquo;": "‹","&rsaquo;": "›","&larr;": "←",
		"&uarr;": "↑","&rarr;": "→","&darr;": "↓","&harr;": "↔","&crarr;": "↵","&minus;": "−","&radic;": "√","&infin;": "∞",
		"&loz;": "◊","&spades;": "♠","&rfloor;": "⌋","&nbsp;": " ","&ne;": "≠","&ap;": "≈", "&approx;": "≈", "&asymp;": "≈",
		"&rceil;": "⌉","&lfloor;": "⌊","&diams;": "♦","&auml;": "ä","&ouml;": "ö","&uuml;": "ü","&szlig;": "ß","&aring;": "å",
		"&oline; ": "‾ ","&aelig;": "æ","&ccedil;": "ç","&ntilde;": "ñ","&acirc;": "â","&aacute;": "á","&agrave;": "à","&#36;": "$",
		"&clubs;": "♣","&hearts;": "♥","&Prime;": "″","&prime;": "′","&lceil;": "⌈","&mldr;": "…","&bullet;": "•",
		"&grave;": "`","&pm;": "±", "&acute;": "´", "&centerdot;": "·","&half;": "½","&Auml;": "Ä", "&Ouml;": "Ö",  "&Uuml;": "Ü", 
		"&rsquor;": "’","&lsquor;": "‚", "&sbquo;": "‚", "&rdquor;": "”","&bdquo;": "„", "&ldquor;": "„",  "&ddagger;": "‡", "&div;": "÷",
		"&leq;": "≤",  "&geq;": "≥","&le;": "≤","&ge;": "≥"} // &quot; , &amp; &lt; &gt; &#124;
	var patterns = {
		arabicDigitsEnglishContext: /[a-z]([\|a-z %"'\._:\;,\-\\\/\(\)\#\^\+\d><–\[\]&?{}](?!\|\|))*\d|(\d|[a-z])[a-z %"'\._:\;\|,\-\\\/\(\)\#\^\+\d><–\[\]&?{}]*[a-z]\d*/gi,
		arabicTagEnclosed: /\{\{(?:عربی|شروع عربی|آغاز عربی)\}\}([\s\S]*?)\{\{(?:پایان عربی)\}\}/g,
		LtRTagEnclosed: /\{\{(?:چپ چین|چپ‌چین)\}\}([\s\S]*?)\{\{(?:پایان چپ‌چین|پایان چپ چین|پایان)\}\}/g,
		argumentsBlacklist: /(?:accessdate|namespace|legend1start|image|تصویر|doi|style|شابک|عرض|bibcode|isbn|issn|pmid|arxiv|upright|upleft|padding|spacing|border|filename|نام پرونده)\s*\=\s*[^\|\}\]]*/gi,
		color: /#(?:[abcdef0-9]{8}|[abcdef0-9]{6}|[abcdef0-9]{3})/gi,
		//colorAsParameter: /\=\s*(?:[abcdef0-9]{8}|[abcdef0-9]{6}|[abcdef0-9]{3})(?:[\s\|\}]|$)/gi,
		// space, ", \t, \n, {, |, }, ... they will interfere with wiki markup
		decodeUriBlacklist: /(?:%20|%27|%5C|%5E|%60|%23|%25|%3C|%3E|%5B|%5D|%22|%09|%0A|%7B|%7C|%7D)/gi,
		diffLink: /\[\[(?:ویژه|Special):(?:تفاوت|Diff)\/[^\|\]]*/gi,
		englishDate: /\d{1,2},? [a-z]{3,} \d{2,4}/gi, // 3, May 2013
		fileNames: /(?:پرونده|File|تصویر|Image)\:.*?(?=\||\]|\n|$)/gi, // don't capture | after
		fileParameter: /\|\s*(image|تصویر)\s*\=\s*.*/g,
		ipSign: /\[\[ویژه:مشارکت\u200cها.*?\]\]/g,
		isbn: /(?:ISBN|ISSN|PMID) [\d\-]*/gi,
		galleryTag: /<gallery.*?>[\s\S]*?<\/gallery>/g,
		htmlAttributes: /(?:style|perrow|colspan|color|rowspan|cellpadding|cellspacing|height|width|size|border|thumbtime|name|perrow|upright|upleft)\s*[\=\:]\s*(?:['\"].*?['\"]|[\da-z]+)/gi,
		htmlEntity: /&#\d+;/,
		imagePixelSize: /[\|=] *[x\d]+?(px|پیکسل)[\]\|\s]/g, // means it will capture |10px| and |10x10px|
		insideQuote: /[^ا]".*?"/g,
		wikilinkTargets: /\[[^\[|\]]+/g,
		nowikiTag:/<nowiki>.+?<\/nowiki>/g,
		preTag:/<pre.*?>.*?<\/pre>/g,
		insideHtmlComment: /<\!\-\-[\s\S]*?\-\->/g,
		linksOnEnglishContext: /[a-z][\:\,\. ]*\[\[[\da-z\-\, ]*/gi,
		mathTag: /<math.*?>[\s\S]*?<\/math>/g,
		otherLanguagesInline: /\{\{(?:به .+?|پم|به انگلیسی|انگلیسی|عربی|متن عربی|عبارت عربی|حدیث|به عربی|به اردو|اردو|lang\-[au]r|پینگ|ping)[\s\S]*?\}\}/g,
		parameter: /\{\{\{\d+/gi,
		parenthesesAfterDigits: /\w\s?\([\w\s\.\-]*?\)/g,
		parenthesesHa: /\)ها/g,
		ref: /(?:<ref[^\/]*?>[\s\S]*?<\/ref>|<ref[^\/]*?\/>)/g, // inside <ref></ref> and <ref/>
		refname: /\<ref name\=.*?\>/g,
		citation:/\{\{\s*(?:[Cc]it|یادکرد).*?[_\s]*(?:\{\{.*?\}\}|[^\}])*\}\}/g,
		signatures: /\[\[(?:کاربر|User|بحث[ _]کاربر|User[_ ]talk)\:.*?\]\]/gi,
		sourceTag: /(<source.*?>[\s\S]*?<\/source>|<syntaxhighlight.*?>[\s\S]*?<\/syntaxhighlight>|<code.*?>[\s\S]*?<\/code>|<timeline.*?>[\s\S]*?<\/timeline>)/g,
		tagNames: /<\/?[a-zA-Z\d]*/g,
		templateEnglishName: /(الگو|Template):[a-z][a-z\d\-\+_]+/gi,
		templateWithEnglishName: /\{\{[ \_]*(?:(?:الگو|Template):)?(?:start\-date)[ \_]*\|.*?\}\}/gi,
		templateParameterName: /\|\s*(?=[a-z_]*\d)[a-z_\d]*\s*\=/gi,
		globalExceptionTag: /(<nowiki>.+?<\/nowiki>|<!--[\s]*ابر[\s]*-->.+?<!--[\s]*\/[\s]*ابر[\s]*-->)/gi,
		translatedUrl: /.(کام|نت|آی‌آر)/g,
		boxVar: /([a-zA-Z][۱۲۳۴۵۶۷۸۹۰]+) *\=/g,
		url: /\/\/.*?(?=[\s\n\|\}\]<]|$)/gi,	 // بدون https?: هم ممکن است
		mediawikiFunctions: /\{\{\#(?:\{\{.*?\}\}|[^\}])*\}\}/gi,
	};

	function escapeRE( s ) {
		return s.replace( /([$()*+\-.?[\\\]^{|}])/g, '\\$1' );
	}

	function descendingFromComparetor(x, y) {
		return x.from - y.from;
	}

	function replaceExcept(text, callback, excepts) {
		var match, result = [], i, ranges, minRange, to, min, max;
		while (text !== '') {
			ranges = [];

			for (i in excepts) {
				if (excepts.hasOwnProperty(i)) {
					// a global regex should be reset before calls
					excepts[i].lastIndex = 0;
					match = excepts[i].exec(text);
					if (match !== null) {
						ranges.push({
							from: match.index,
							to: match.index + match[0].length
						});
					}
				}
			}

			// so nothing is matched
			if (ranges.length === 0) {
				result.push(callback(text));
				break;
			}

			minRange = ranges.sort(descendingFromComparetor)[0];
			min = minRange.from;

			to = [];
			for (i in ranges) {
				if (ranges.hasOwnProperty(i)) {
					if (ranges[i].from <= minRange.to) {
						to.push(ranges[i].to);
					}
				}
			}
			max = Math.max.apply(null, to);

			result.push(callback(text.substr(0, min)));
			result.push(text.substr(min, max - min));
			// console.log('Excepted: "' + text.substr(min, max - min) + '"');
			text = text.substr(max);
		}
		return result.join('');
	}

	function wikiConvertToPersianCharacters(text) {
		return replaceExcept(
			text,
			persianTools.toStandardPersianCharacters,
			[patterns.globalExceptionTag, patterns.otherLanguagesInline, patterns.arabicTagEnclosed, patterns.fileNames, patterns.signatures, patterns.url]
		);
	}

	if (!String.prototype.trim) { // if is not available currently
		String.prototype.trim = function () {
			return this.replace(/^\s+|\s+$/g, '');
		};
	}

	function autoFormatCleanReferences ( str ) {
		// تمیزکاری autoFormater.js > cleanReferences
		str = str.replace(
			/<\s*references\s*(\s\b[^<>]*?)?\s*(?:\/|>\s*<\s*\/\s*references)\s*>/gi,
			'<references$1 />'
		);
		str = str.replace(/\<ref[^>]*\>\[?(?:https?:)?\/\/fa.(?:m\.)?wikipedia.org\/[^\<\n\}\]\[]+\]?\<\/ref\>/gi,'')
		str = str.replace( /<\s*references\s*(\s\b[^<\/>]*?)?\s*>/gi, '<references$1>' );
		str = str.replace( /<\s*\/\s*references\s*>/gi, '<\/references>' );
		var re = /(<references[^<\/>]*)>/g, m;
		while ( m = re.exec( str ) ) {
			if ( str.indexOf( '<\/references>', m.index ) < 0 ) {
				str = str.slice( 0, m.index ) + m[1] + ' />' + str.slice( m.index + m[0].length );
			}
		}
		str = str.replace( /< *ref\s*(\s\b[^<>]*?)\s*(?:\/+|>\s*<\s*\/+\s*ref) *>/gi, '<ref$1 />' );

		/* remove line breaks with assays only the top of the article */
		var i = str.indexOf( '<references' ),
			slice;
		if ( i > 0 ) {
			slice = str.slice( i );
			slice = slice.replace( /< *ref\s*(\s\b[^<\/>]*?)?\s*>[\t ]*/gi, '<ref$1>' );
			slice = slice.replace( /(?:(\n[\t ]*)|[\t ]*)<\s*\/+\s*ref\s*>/gi, '$1<\/ref>' );
			str = str.slice( 0, i );
		}
		str = str.replace( /< *ref\s*(\s\b[^<\/>]*?)?\s*>\s*/gi, '<ref$1>' );
		str = str.replace( /\s*<\s*\/+\s*ref\s*>/gi, '<\/ref>' );
		if ( slice ) {
			str += slice;
		}

		/* Space between the end of block and remove <ref> or two <ref> */
		str = str.replace( /([!,.;?]|<ref\b[^<>]*(?:\/|>[^<>]*<\/ref)>) +(?=<ref[ >])/gi, '$1' );
		/* Two identical punctuation before and cut after a <ref> on one */
		str = str.replace( /([!,.:;?])(<ref\b[^<>]*(?:\/|>[^<>]*<\/ref)>)\1/gi, '$1$2' );
		/* ref inside small */
		return str.replace( /\<small\> *\<ref/gi, '<ref' ).replace( /\<\/ref\> *\<\/small\>/gi, '</ref>' );
	}

	function autoFormatCleanTags(str) {
		str = str.replace( /(<\/?s)trike\b/gi, '$1' );
		str = str.replace(
			/<sub\s*(>[^<>]*<)\s*(?:su[bp]\s*[.\/\\]+|[.\/\\]+\s*su[bp])\s*>/gi,
			'<sub$1/sub>'
		);
		str = str.replace(
			/\<u\>([^\<]+)\<\/u\>/gi,
			"''$1''"
		);
		str = str.replace(
			/<sup\s*(>[^<>]*<)\s*(?:su[bp]\s*[.\/\\]+|[.\/\\]+\s*su[bp])\s*>/gi,
			'<sup$1/sup>'
		);

		/* Drop default font attributes */
		str = str.replace(
			/(<font\b[^<>]*?)\s+fa\w+(?:[\s"',=]*(?:Arial|Helvetica(?:\W?N\w*)?|sans\W?serif)\b)+[\s"';]*(?=\s\w+\s*=|>)/gi,
			'$1'
		);
		str = str.replace(
			/(<font\b[^<>]*?)\s+size[\s"',=]*(?:-1\b|2\b|100\b[ ,.]*\d*%|1(?:\.0*)?em\b)["';]*/gi,
			'$1'
		);
		/* Remove inline elements with no attributes */
		while ( /<(font|span)\s*>\s*(?:<(?!\1)|[^<])*?\s*<\/\1[^<>]*>/i.test( str ) ) {
			str = str.replace( /<(font|span)\s*>\s*((?:<(?!\1)|[^<])*?)\s*<\/\1[^<>]*>/gi, '$2' );
		}
		str = str.replace(
			/<font\s+color[\s"',=]*(#[\dA-F]{3,6}|[a-z]{3,20})[\s"';]*>((?:<(?!font)|[^<])*?)<\/font[^<>]*>/gi,
			'<span style="color:$1;">$2<\/span>'
		);
		str = str.replace(
			/<font\s+size[\s"',=]*(?:-[2-9]|[01])[\s"';]*>((?:<(?!font)|[^<])*?)<\/font[^<>]*>/gi,
			'<small>$1<\/small>'
		);
		str = str.replace(
			/<font\s+size[\s"',=]*(?:[+-]0|3)[\s"';]*>((?:<(?!font)|[^<])*?)<\/font[^<>]*>/gi,
			'<span style="font-size:larger;">$1<\/span>'
		);
		/* Merge nested inline tags */
		str = str.replace(
			/<(abbr|cite|mark|q|s|small|u)\s*><(font|span)\s+style\s*=\s*["']?([^\n"<>]*?);?["']?\s*>([^<>]*)<\/\2\s*>\s*(?=<\/\1\s*>)/gi,
			'<$1 style="$3;">$4'
		);
		str = str.replace(
			/(<span\b[^<>]*?)\s+style\s*=\s*["']?([^\n"<>]*?);?["']?\s*><span\s+style\s*=\s*["']?([^\n"<>]*?);?["']?\s*>([^<>]*)<\/span\s*>\s*(?=<\/span\s*>)/gi,
			'$1 style="$2; $3;">$4'
		);

		/* Verschiedenste Formen von HTML-Zeilenumbrüchen durch einheitliche ersetzen */
		str = str.replace( /<(?:[\s\/\\]*br\b)+\s*(\s\w[^<>]*?)?[\s.\/\\]*>/gi, '<br$1 />' );
		/* Unnötige HTML-Zeilenumbrüche entfernen, wenn sowieso ein Absatz folgt */
		str = str.replace( / *(?:{{سخ}}|<br \/>)(?=[\r\n][\n#*:;\|}\]])/gi, '' );
		str = str.replace(
			/<(ref|small|su[bp])\b\s*(\s\w[^<>]*?)?\s*><small\s*>([^<>]*)<\/small\s*><\/\1\s*>/gi,
			'<$1$2>$3<\/$1>'
		);
		str = str.replace(
			/<small\s*><(ref|small|su[bp])\b\s*(\s\w[^<>]*?)?\s*?( ?\/|>[^<>]*<\/\1)\s*><\/small\s*>/gi,
			'<$1$2$3>'
		);
		/* Drop old navigation bar wrapper, see [[Template:NaviBlock]] */
		return str.replace(
			/<div\s+class[^<>\w]*BoxenVerschmelzen[^<>\w]*>\s*(\{\{[^#:<>{}]*\}\})\s*<\/div>/gi,
			'$1'
		);
	}

	function autoFormatCleanDuplicateLinks(str) {
		/* Exclude files and infoboxes from the start of the article */
		var m = /^(?:\s*\[\[\w+:(?:\[\[[^\n\]]*\]\]|[^\n\]])*\]\])*(?:\s*\{\{(?:\{\{[^}]*\}\}|[^}])*\}\})+/.exec( str ),
			start = m ? m[0].length : 0,
			found = [],
			a = [];
		/* Unlink years that are linked more than one time */
		var re = /\[\[ *([۱۲][۱۲۳۴۵۶۷۸۹۰]{3}|[۱۲][۱۲۳۴۵۶۷۸۹۰]{3} \((میلادی|قمری)\)) *\]\]/g;
		/* In each case the first discovery of a year noted entlinken thereafter */
		while ( m = re.exec( str ) ) {
			if ( m.index >= start ) {
				found[m[1]] ? a.push( m ) : found[m[1]] = true;
			}
		}
		var r = '',
			p = 0;
		for ( var i = 0; i < a.length; i++ ) {
			r += str.slice( p, a[i].index ) + a[i][1];
			p = a[i].index + a[i][0].length;
		}
		return p ? r + str.slice( p ) : str;
	}

	function autoFormatCleanDates(str){
		var months = ["ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن", "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر", 'فروردین', 'اردیبهشت', 'خرداد', 'تیر',
			'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		/* Add missing space between day and month */
		str = str.replace( new RegExp( '([\\s!\'(>|„](?:3[01]|[12]\\d|0?[1-9])\\.?)(?=(?:' +
			months.join( '|' ) + ')\\b)', 'g' ), '$1 ' );
		/* No non-breaking space between month and year */
		str = str.replace( new RegExp( '(\\b(?:3[01]|[12]\\d|0?[1-9])\\.?(?:[\\s\\xA0]|&nbsp;)+(?:' +
			months.join( '|' ) + '))(?:\xA0|&nbsp;)(?=[12]\\d{3}\\b)', 'g' ), '$1 ' );
		/* Missverständliches deutsches Datumsformat durch Langform ersetzen */
		var separator= ' ';
		str = str.replace(
			/([\s'(>„])(3[01]|[12]\d|0?[1-9])\. *(1[012]|0?[1-9])\. *(?=[12]\d{3}[!,.:;?]?[\s')<\]“])/g,
			function( $0, $1, $2, $3 ) {
				return $1 + ( $2 | 0 ) + separator + months[$3 | 0] + ' ';
			}
		);
		// عدد فارسی
		str = str.replace( new RegExp( '([\\s!\'(>|„](?:۳[۰۱]|[۱۲][۱۲۳۴۵۶۷۸۹]|۰?[۱۲۳۴۵۶۷۸۹])\\.?)(?=(?:' +
			months.join( '|' ) + ')[\\s\')<\\]»}|])', 'g' ), '$1 ' );
		/* No non-breaking space between month and year */
		str = str.replace( new RegExp( '([\\s\'(>«](?:۳[۰۱]|[۱۲][۱۲۳۴۵۶۷۸۹]|۰?[۱۲۳۴۵۶۷۸۹])\\.?(?:[\\s\\xA0]|&nbsp;)+(?:' +
			months.join( '|' ) + '))(?:\xA0|&nbsp;)(?=[۱۲][۱۲۳۴۵۶۷۸۹]{3}[\\s\')<\\]»}|])', 'g' ), '$1 ' );
		/* Missverständliches deutsches Datumsformat durch Langform ersetzen */
		var separator= ' ';
		str = str.replace(
			/([\s'(>«])(۳[۰۱]|[۱۲][۱۲۳۴۵۶۷۸۹]|۰?[۱۲۳۴۵۶۷۸۹])\. *(۱[۰۱۲]|۰?[۱۲۳۴۵۶۷۸۹])\. *(?=[۱۲][۱۲۳۴۵۶۷۸۹]{3}[!,.:;?]?[\s')<\]»}|])/g,
			function( $0, $1, $2, $3 ) {
				return $1 + ( $2 | 0 ) + separator + months[$3 | 0] + ' ';
			}
		);
		return str
	}

	function quotation(text) {
		// این تابع زمانی گیومه را به فارسی تیدیل می‌کند که در پاراگراف مورد نظر تعداد گیومهٔ لاتین زوج باشد.
		var lines = text.split(/\n\n/);
		var result = [];
		for (var i = 0; i < lines.length; ++i) {
			var line = lines[i];
			if ((line.match(/"/g) || []).length % 2 === 0) { // count of quote marks
				// تبدیل گیومهٔ لاتین به فارسی
				// این دستور در ابتدا باشد تا فاصله‌های قبل و بعد گیومه هم اصلاح شود
				line = line.replace(
					new RegExp('(^|[' + persianTools.persianCharacters + '\\:>،»؛\\s\\n\\}\\]\\.\\)]+)"((?:\\[\\[|).*?[' + persianTools.persianCharacters + '؛\\n،]+?(?:\\]\\]|\\.|\\<|\\:|…|))"([' + persianTools.persianCharacters + '،«؛\\s\\n\\.\\[\\{\\(]|$)', 'g'),
					'$1«$2»$3'
				);
				// if some of quote marks are remained from conversion, something might wrong, revert
				var testline=line.replace(/(?:<ref[^\/]*?>[\s\S]*?<\/ref>|<ref[^\/]*?\/>)/g,'')

				if (testline.match(/"/g)) {
					line = lines[i];
				}
			}
			// رفع مشکل استفاده از ـً به جای گیومه لاتین در متن فارسی
			line=line.replace(new RegExp('ا\\"([ ]*[' +persianTools.persianCharacters + '])', 'g'), 'اً$1')
			// ”“ تبدیل 
			line = line.replace(
				new RegExp('(^|[' + persianTools.persianCharacters + '\\:>،»؛\\s\\n\\}\\]\\.]+)“((?:\\[\\[|).*?[' + persianTools.persianCharacters + '\\n]+?(?:\\]\\]|\\.|\\<|\\:|\\{|\\[|…|))”([' + persianTools.persianCharacters + '،«؛\\s\\n\\.\\[\\{]|$)', 'g'),
				'$1«$2»$3'
			);
			//وارونه ”“ تبدیل 
			line = line.replace(
				new RegExp('(^|[' + persianTools.persianCharacters + '\\:>،»؛\\s\\n\\}\\]\\.]+)”((?:\\[\\[|).*?[' + persianTools.persianCharacters + '\\n]+?(?:\\]\\]|\\.|\\<|\\:|\\{|\\[|…|))“([' + persianTools.persianCharacters + '،«؛\\s\\n\\.\\[\\{]|$)', 'g'),
				'$1«$2»$3'
			);
			// ‘’ تبدیل 
			line = line.replace(
				new RegExp('(^|[' + persianTools.persianCharacters + '\\:>،»؛\\s\\n\\}\\]\\.]+)‘((?:\\[\\[|).*?[' + persianTools.persianCharacters + '\\n]+?(?:\\]\\]|\\.|\\<|\\:|\\{|\\[|…|))’([' + persianTools.persianCharacters + '،«؛\\s\\n\\.\\[\\{]|$)', 'g'),
				'$1«$2»$3'
			);
			//وارونه ‘’ تبدیل 
			line = line.replace(
				new RegExp('(^|[' + persianTools.persianCharacters + '\\:>،»؛\\s\\n\\}\\]\\.]+)’((?:\\[\\[|).*?[' + persianTools.persianCharacters + '\\n]+?(?:\\]\\]|\\.|\\<|\\:|\\{|\\[|…|))‘([' + persianTools.persianCharacters + '،«؛\\s\\n\\.\\[\\{]|$)', 'g'),
				'$1«$2»$3'
			);
			// ‚’ تبدیل 
			line = line.replace(
				new RegExp('(^|[' + persianTools.persianCharacters + '\\:>،»؛\\s\\n\\}\\]\\.]+)‚((?:\\[\\[|).*?[' + persianTools.persianCharacters + '\\n]+?(?:\\]\\]|\\.|\\<|\\:|\\{|\\[|…|))’([' + persianTools.persianCharacters + '،«؛\\s\\n\\.\\[\\{]|$)', 'g'),
				'$1«$2»$3'
			);
			// „” تبدیل 
			line = line.replace(
				new RegExp('(^|[' + persianTools.persianCharacters + '\\:>،»؛\\s\\n\\}\\]\\.]+)„((?:\\[\\[|).*?[' + persianTools.persianCharacters + '\\n]+?(?:\\]\\]|\\.|\\<|\\:|\\{|\\[|…|))”([' + persianTools.persianCharacters + '،«؛\\s\\n\\.\\[\\{]|$)', 'g'),
				'$1«$2»$3'
			);
			// << >> تبدیل 
			line = line.replace(
				new RegExp('(^|[' + persianTools.persianCharacters + '\\:>،»؛\\s\\n\\}\\]\\.]+)\\<\\<((?:\\[\\[|).*?[' + persianTools.persianCharacters + '\\n]+?(?:\\]\\]|\\.|\\<|\\:|\\{|\\[|…|))\\>\\>([' + persianTools.persianCharacters + '،«؛\\s\\n\\.\\[\\{]|$)', 'g'),
				'$1«$2»$3'
			);
			// (()) تبدیل 
			line = line.replace(
				new RegExp('(^|[' + persianTools.persianCharacters + '\\:>،»؛\\s\\n\\}\\]\\.]+)\\(\\(((?:\\[\\[|).*?[' + persianTools.persianCharacters + '\\n]+?(?:\\]\\]|\\.|\\<|\\:|\\{|\\[|…|))\\)\\)([' + persianTools.persianCharacters + '،«؛\\s\\n\\.\\[\\{]|$)', 'g'),
				'$1«$2»$3'
			);
			result.push(line);
		}
		return result.join('\n\n');
	}
	/**
	 * افزودن ستون به الگوی پانویس
	 * @param {string} text محتوا
	*/
	function addColumnToRefTemplate(text) {
		var refTemplate = /\{\{پانویس([^\}\{]+)?\}\}/i.exec(text), needChange = false;
		if (refTemplate) {
			if ((text.match(/<ref/gi) || []).length >= 6) {
				if (refTemplate[1] !== undefined) {
					var refParams = refTemplate[1].split('|');
					for (var i = refParams.length - 1; i >= 0; i--) {
						// اگر از پیش ستون یا پارامتر عرض تعریف شده‌باشد تغییری ایجاد نمی‌شود.
						if (refParams[i].length == 1 || refParams[i].indexOf('عرض') > -1) {
							needChange = true;
							break;
						}
					}
				}
				if (refTemplate[1] === undefined || !needChange) {
					return text.replace(refTemplate[0], refTemplate[0].replace('}}', '|۲}}'));
				}
			}
		}else{
			if ((text.match(/<ref/gi) || []).length > 0) {
				var text2 = text.replace ('== منابع ==','== منابع ==\n{{پانویس}}')
				if (text2==text){
					text2 = text.replace ('== پانویس ==','== پانویس ==\n{{پانویس}}')
				}
				if (text2==text){
					text2 = text.replace ('[[رده:','== منابع ==\n{{پانویس}}\n\n[[رده:')
				}
				if (text2==text){
					text2 = text + '\n== منابع ==\n{{پانویس}}'
				}
				text=text2
			}
		}
		return text;
	}
	
	/**
	 * اصلاح پیوندها
	 * @param  {string} text محتوا
	 * @return {string}
	 */
	function fixBadLinks(text) {
		// حذف متن جایگزین پیوند اگر با نشانی پیوند برابر باشد؛ مانند [[سلام|سلام]]
		text = text.replace(/\[{2}([^\|]+)\|\1\]{2}/gi, '[[$1]]');

		// حذف پیوند سال و روز ماه
		text = text.replace(/\[{2}([۰-۹]+|[۰-۹]+ [\)\(\u0621-\u0655\u067E\u0686\u0698\u06AF\u06A9\u0643\u06AA\uFED9\uFEDA\u06CC\uFEF1\uFEF2]+)(?:\|([^\]\|\[]+))?\]{2}/g, function (match, p1, p2) {
		// اگر فقط سال پیوند شده‌باشد یا به شکل [[سال|همان سال]] باشد فقط سال را می‌گرداند.
		if (p1 !== p2 && p1.replace(/ \((میلادی|قمری|خورشیدی|شمسی)\)/g,'') === p2){
			return p2;
		}//[[Special:Permalink/19908981#حذف پیوند تاریخ‌ها]]
		if (p2 === undefined || p1 === p2) {
			// اگر پیوند به روز و ماه بود، برای جلوگیری از اشتباه و تداخل، بررسی می‌شوند که حتما یکی از ماه‌ها داخل رشته باشد.
			if (p1.indexOf(" ") > -1) {
				var
					months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
	"ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن", "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر",
	"محرم", "صفر", "ربیع‌الاول", "ربیع‌الثانی", "جمادی‌الاول", "جمادی‌الثانی", "رجب", "شعبان", "رمضان", "شوال", "ذیقعده", "ذیحجه"],
					i;
				for (i = months.length - 1; i >= 0; i--) {
					if (p1.indexOf(months[i]) > -1) {
						return p1;
					}
				}
				return "[[" + p1 + "]]";
			}
			return p1;
		}
		// اگر متن جایگزین پیوند مخالف پیوند سال بود، متن جایگزین را برمی‌گرداند.
		return p2;
	});

	return text;
}

	function wikiPunctuation(text) {
		text = autoFormatCleanReferences (text)
		text = autoFormatCleanTags(text)
		text = autoFormatCleanDuplicateLinks(text)
		text = replaceExcept(
			text,
			function (text) {
				return quotation(text);
			},
			[patterns.ref]
		);
			var old_text=text.replace(/\=\=/g, '')
			if (old_text==text){//در صورتی که در مقاله بخش‌بندی وجود نداشته باشد
				text=text.replace(/(\n\{\{سخ\}\}|\n\n)(\s|_|)\'\'\'(.*?)\'\'\'(\s|_|)(\{\{سخ\}\}|\n)([\n\#\*])/g, '\n\n== $3 ==\n$6')
			}
		text = replaceExcept(
			text,
			function (text) {
				text = text.replace(
					new RegExp('([' + persianTools.persianCharactersNoVowels + '])ـ+([' + persianTools.persianCharactersNoVowels + '])', 'g'),
					'$1$2'
				);
				return text.replace(new RegExp('([' + persianTools.persianCharacters + '])(\\]\\]|), (\\[\\[|)?(?=[' + persianTools.persianCharacters + "])", 'g'), '$1$2، $3');
			},
			[patterns.globalExceptionTag, patterns.fileNames, patterns.url, patterns.galleryTag, patterns.sourceTag, patterns.translatedUrl, patterns.parenthesesHa]
		);
		text = replaceExcept(
			text,
			function (text) {
				return text.replace(/(<\/ref>)\s+(<ref)/g, '$1$2').replace(/([^=])\s+<ref(?!erences)/g, '$1<ref');
			},
			[/\{\{(پانویس|پانویس‌ها|پی‌نوشت)\s*\|[\s\S]*/]
		);
		return replaceExcept(
			text,
			function (text) {
				return persianTools.punctuation(text)
					.replace(/^([*#]+)([^*#\:\s])/mg, '$1 $2') // Adds a space after the # or * for lists
					.replace(/^([*#]+) {2,}([^*#\:\s])/mg, '$1 $2'); // Trim more that one space after the # or * for lists
			},
			[patterns.globalExceptionTag, patterns.mathTag, patterns.fileNames, patterns.url, patterns.wikilinkTargets,
				patterns.galleryTag, patterns.sourceTag, patterns.translatedUrl, patterns.parenthesesHa]
		)
			.replace(/\u00A0/g, ' ') // convert implicit nbsp to space, probably is being added by some bug on ContentTranslation
			.replace(/٬ /g, '، ')
			.replace(new RegExp('([' + persianTools.persianCharacters + '\]])٬', 'g'), '$1،')
			.replace(new RegExp('([' + persianTools.persianCharacters + '])(\]\]|»|)[ ]*[,]', 'g'), '$1$2، ')
			.replace(/\[\[([^\|\]]+)\|(\'{2,3})\1'{2,3}\]\]/g,'$2[[$1]]$2')// for [[foo|'''foo''']] > '''[[foo]]'''
			//برگرفته از https://tools.wmflabs.org/checkwiki/cgi-bin/checkwikin.cgi?project=fawiki&view=project
			.replace(/\[\[([^\|\]]+)\|\1([\u200c ]*(های?))\]\]/g, '[[$1]]$2')//[[Special:Diff/17515365/17865938]]
			.replace(/([\S]*)[\s\u200c]*-[\s\u200c]*(تاکنون)(?![ ]+)/g, '$1-اکنون')//[[Special:Diff/17515365/17865938]]
			//مشکل در نشانی اینترنتی
			.replace(/(\<ref.*?\>) *(\[|)\www(6|3|)\./gi, '$1$2http://www$3.')
			.replace(/\[\[ *(https?\:\/\/.*?) *\]\]/g, '[$1]')
			.replace(/\[\[ *(\/\/.*?) *\]\]/g, '[$1]')
			.replace(/(https?:\/?\/?){2,}/g, '$1')
			// تمیزکاری autoFormatter.js > cleanExternalLinks
			.replace(/\b(?:http(s?)(?::+\/*|\/\/+:*)\b)+/gi, 'http$1://')
			// repair links with vertical stroke
			.replace(/(\[https?:\/\/[^\s[\]|]*?) *\| *(?=[^\s=[\]|]+\])/gi, '$1 ')
			// supplement slashes at the end easier Domains
			.replace(/(\[https?:\/\/\w[\w.-]*\w\.\w+) +/gi, '$1/ ')
			// Domains lowercase, whether labeled or not
			.replace(/\bhttps?:\/\/\b[0-9a-z.-]*[A-Z][\w.-]*/g, function ($0) {
				return $0.toLowerCase();
			})
			// پیوند به بیرون‌هایی که در میان پیوند نویسهٔ رفتن به خط بعد، وجود داشته باشد
			.replace(/\[(?:https?\:|)\/\/[^\]\[]+\]/g, function (x) {
				x = x.replace(/[\n\r]/g,'');
				return x
			})
			// فاصله اول زیربخش
			.replace(/پیوند\n\=/,'پیوند=')// [[Special:Diff/20238012/20244702]]
			.replace(/^ +(\=+[^\=]+\=+)/mg, '$1')
			.replace(/\[\[\|/g, '[[')
			.replace(/(\< *\/ *br *\>|\< *br *\\ *\>|\< *br *\. *\>)/g, '<br/>')
			.replace(/(\<br *\/\>|\{\{سخ\}\})([\r\n])(\*|\#|\=\=)/g, '$2$3')
			.replace(/(\<br *\/\>|\{\{سخ\}\}) *\]\]/g, ']]')
			.replace(/\[\[ *(\<br *\/\>|\{\{سخ\}\})/g, '[[')
			.replace(/(\< *span *\/ *\>|\< *\/ *span *\/ *\>)/gi, '</span>')
			.replace(/(\< *center *\/ *\>|\< *\/ *center *\/ *\>)/gi, '</center>')
			.replace(/(\< *b *\/ *\>|\< *\/ *b *\/ *\>)/gi, '</b>')
			.replace(/(\< *div *\/ *\>|\< *\/ *div *\/ *\>)/gi, '</div>')
			.replace(/(\< *p *\/ *\>|\< *\/ *p *\/ *\>)/gi, '</p>')
			.replace(/(\< *td *\/ *\>|\< *\/ *td *\/ *\>)/gi, '</td>')
			.replace(/(\< *small *\/ *\>|\< *\/ *small *\/ *\>)/gi, '</small>')
			.replace(/\[\[([^\]]+)\{\{\!\}\}([^\]]+)\]\]/g, '[[$1|$2]]')//وجود {{!}} درون پیوند
			.replace(/\[{2}([^\|]+)\|\1\]{2}/gi, '[[$1]]')//زمانی که بخش هدف و نمایه پیوند یکی باشند
			.replace(/\[\[(.+)\|('+)(.+\b)('+)\]\]/gi, '$2[[$1|$3]]$4')// انتقال ''' به بیرون پیوند
			// تمیزکاری autoFormatter.js > CleanGalleries
			.replace(/<gallery\b([^<>]*)>([^<>]+)<\/gallery\b[^<>]*>/gi,
				function( $0, $1, $2 ) {
					return '<gallery' + $1 + '>' + $2
						.replace( /^(\s*)\[+([^[\]]*)\]\]?\s*$/gm, '$1$2' )
						.replace( /^(\s*)\[+/gm, '$1' ) + '<\/gallery>';
				}
			)
			// تمیزکاری پرونده‌ها
			// زمانی که برچسب کوچک در توضیحات تصویر می‌آید برای دستگاه‌های با مانیتور کوچک خواندن متن مشکل می‌شود
			//https://tools.wmflabs.org/checkwiki/cgi-bin/checkwiki.cgi?project=fawiki&view=only&id=77
			.replace(/\[\[(پرونده|[Ff]ile)\:((?:\[\[.*?\]\]|[^\]])*)\]\]/g, function ($0, $1, $2) {
				$2 = $2.replace(/\<\/?(big|center|small)>/g,'');
				return '[['+$1+':'+$2+']]'
			})
			.replace( /\[\[ *تصو[يی]ر\:/gi, '[[پرونده:' )
			// تمیزکاری الگو autoFormater.js > cleanTemplates
			.replace( /\{\{\s*:?\s*(?:الگو|Template)\s*:\s*/gi, '{\{' )
			// حذف خط زیر از عنوان الگو
			.replace(/(?:^|[^{])\{\{[ 0-9a-z\xC0-\u024F-]*_[ \w\xC0-\u024F-]*/gi,
				function( $0 ) {
					return $0.replace( /_+$/, '' ).replace( /[ _]+/g, ' ' ).replace( /\{ +/, '{' );
				}
			)
			//سایر موارد
			.replace(/\[\[(رده|الگو|ویکی\u200cپدیا)\: +/g, '[[$1:')
			.replace(/[\n\s]*\{\{[•·ن](w?)\}\}\s*/g, '{{•$1}} ')
			.replace(/\=\{\{[•·ن](w?)\}\}\s*/g, '=\n{{•$1}} ')//رفع باگ [[Special:Diff/14799178/16387261]] در خط بالا 
			.replace(/ *(<\/? ?br ?\/?>|\{\{بر\}\}) */g, '{{سخ}}')
			.replace(/\{\{سخ\}\}\n\n/g, '\n\n')
			.replace(/\n\n\{\{سخ\}\}/g, '\n\n')
			.replace(/\{\{سخ\}\}\]/g, ']')
			.replace(/\[\{\{سخ\}\}/g, '[')
			.replace(/\n\n(\*|\#)/g,'\n$1')
			.replace(/\n(\#|\*)( |)\n/g,'\n$1')
			.replace(/\n(\*|\#)( |)(\={2,})/g,'\n$3')
			.replace(/(\n?)\s+?<\/ref>/g, '$1</ref>')
			.replace(/\{ *\|/g, '{|')
			.replace(/\| *\}/g, '|}')
			.replace(/\{\| *\{\|/g, '{|')
			.replace(/\|\} *\|\}/g, '|}')
			.replace( /^=.*&nbsp;.*=$/gim, function( $0 ) {
						return $0.replace( /(?:&nbsp;|\s)+/gi, ' ' );
			})
			.replace(/([^=])\n+(\=.*?\=\n+)/g, '$1\n\n$2')
			.replace(/^(=+([^=].*?)=+)[\t\s]{1,}\n/g, '$1\n')
			.replace(/^(\={2,}) +[\:,;>&\^#@•→←↔↑↓—–…~٫،؛ٔ]/mg, '$1') // Cleanup headers
			.replace(/[\:,;<&\^#@•→←↔↑↓—–…~٫،؛ٔ] +(\={2,})$/mg, '$1')
			.replace(/^(\={2,}\s*)(«)([^\n«»]*?)(»)(\s*\={2,})/mg, '$1 $3 $5')
			.replace(/^(\={2,}) *'+(.*?)'+ *(\={2,})/mg, '$1 $2 $3')
			.replace(/^[•●⚫⬤]/mg, '*') // Wikify bullets in start of lines
			.replace(/^#\s*(REDIRECT|تغییر[ _]?مسیر)/gi, '#تغییرمسیر')
			.replace(/^#تغییرمسیر(?=\S)/g, '#تغییرمسیر ') // Adds a space after #REDIRECT
			.replace(/(\={2,}) *([^\n\r]*?) *(\={2,})/g, '$1 $2 $3') // Format headings level 2 and above
			// زیربخش نیازی به برچسب بزرگ و کوچک ندارد
			.replace(/(\=+) \<(?:small|big)\>([^\=\n\r]+)\<\/(?:small|big)\> (\=+)/g, '$1 $2 $3') 
			// فاصله‌های اضافی را از داخل پیوند به بیرون منتقل کند تا اگر اضافه بودند در کدهای دیگر حذف شوند
			.replace(/\[\[(\s*)(.*?)(\s*)\]\]/g, '$1[[$2]]$3')
			//حذف فاصلهٔ اضافی درون {{}}
			.replace(/\{\{(\s*)(.*?)(\s*)\}\}/g, '{{$2}}')
			// تبدیل به نویسه / یکی کردن فاصله های مجازی پشت سرهم
			.replace(/(\{\{فم\}\}|\&zwnj\;|\u200c+)/g, '\u200c')
			// Full stop and comma should be before citation. See en:WP:REFPUNC
			.replace(/ *((?:<ref[^\/]*?>.*?<\/ref>)+)([\.،,:])?/g, '$2$1')
			.replace(/([^.])([\.،,:]){2}((?:<ref[^\/]*?>.*?<\/ref>)+)/g, '$1$2$3')
			.replace(/ *((?:<ref[^\/]*?\/>)+)([\.،,:])/g, '$2$1')
			.replace(/([^.])([\.،,:]){2}(((?:<ref[^\/]*?\/>)+)+)/g, '$1$2$3')
			/* هر رده در یک خط */
			.replace( /([^\s>-]) *(\[\[رده:[^\n[\]]*\]\])/gi, '$1\n$2' )
			.replace( /(\[\[رده:[^\n[\]]*\]\]) *(?![\s<-]|$)/gi, '$1\n' )
			.replace( /(\[\[رده:[^\n[\]]*\]\]\n) *(?!\[\[رده:|[\s<-]|$)/gi,'$1\n')
			//ترتیب‌پیش‌فرض
			.replace(/\{\{(?:DEFAULTSORT|[Dd]efaultsort|ترتیب|ترتیب[‌ ]پیش[‌ ]?فرض) *[|:] *(?=.*?}})/g, '{{ترتیب‌پیش‌فرض:')
			.replace(/\{\{(ترتیب‌پیش‌فرض|DEFAULTSORT)\:[-\w,\s\(\)]+\}\}\n?/g, '')
			.replace(/(\{\{(?:ترتیب‌پیش‌فرض|DEFAULT\w*SORT\w*):[^\n{}]*\}\})\s*(?=\[\[رده:)/gi,'$1\n')
			.replace(/(\{\{ترتیب‌پیش‌فرض\:)\s/g, '$1')
			.replace( /(==\n)\n+(?=<references[^\n<>]*\/>\n\n)/gi, '$1' )
			//نچسبیدن و+فاصله به براکت که محصول اشتباه در تایپ کردن است
			.replace(/\]\]و /g, ']] و ')
			.replace(/(\s|^)\'\'\'(\s|)(.*?)(\s|)\'\'\'(\s)/g, "$1'''$3'''$5") // حذف فاصلهٔ اضافی درون ویکی کد
			.replace(/'''\{\{به /g, "''' {{به ")
			.replace(/\*(\s+|\n)?\{\{پانویس/g, "{{پانویس")
			.replace(/((?:^|\n\s)\=+\s+\=+(?:\s+|)\n)/g, "\n\n")
			.replace(/\n{3,}/g, '\n\n')
			.trim();
	}

	function wikiSubsection(text) {
		return text.replace(/\<(?:\s*)references?(?:\s*\/|\s*\/\s*)\>/g, '{{پانویس}}')
			   .replace(/\{\{(?:[Rr]eflist|[Rr]eferences?|پانویس[‌ ]?ها)(?=\||\})/g, '{{پانویس')
			   .replace(/\{\{راست(| |‌)چین\}\}\s*\{\{پانویس(.*?)\}\}\s*\{\{(پایان راست(| |‌)چین|پایان)\}\}/g, '{{پانویس$2}}')
			   .replace(/\{\{چپ(| |‌)چین\}\}\s*\{\{پانویس(.*?)\}\}\s*\{\{(پایان چپ(| |‌)چین|پایان)\}\}/g, '{{پانویس$2|چپ‌چین=بله}}')
			   .replace(/\<small\>\s*\{\{پانویس(.*?)\}\}\s*\<\/small\>/g, '{{پانویس$1|اندازه=کوچک}}')
			   .replace(/(({\{پانویس.*?\}\})(\n|)){1,}/g, '$1')
			   .replace(/\=\s*لیست\s*\=/g, '= فهرست =')
			   .replace(/\=\s*(?:[gG]allery|نگارستان|گالری (تصویر|عکس|))\s*\=/g, '= نگارخانه =')
			   .replace(/\=\s*(?:بیوگرافی|زندگینامه)\s*\=/g, '= زندگی‌نامه =')
			   .replace(/\=\s*(?:[eE]xternal links|لینک‌?های بیرونی|پیوندهای خارجی|لینک‌?های خارجی|پیوندهای بیرونی)\s*\=/g, '= پیوند به بیرون =')
			   .replace(/\=\s*(?:[nN]otes|[fF]ootnotes?|پاورقی|پاورقی‌ها|پانوشت|پانویس‌ها)\s*\=/g, '= پانویس =')
			   .replace(/\=\s*(?:[Ss]ee [Aa]lso|همچنین ببینی[مد]|بیشتر ببینی[مد]|بیشتر بخوانی[مد]|همچنین نگاه کنید|بیشتر بدانی[مد]|مراجعات مرتبط|جستار وابسته|مطلب مرتبط|مطالب مرتبط|جستارهای مشابه)\s*\=/g, '= جستارهای وابسته =')
			   .replace(/\=\s*(?:منبع|منبع[‌ ]?ها|رفرنس|رفرنس[‌ ]?ها|ارجاع[‌ ]?ها|ارجاع|مرجع[‌ ]?ها|رفرنس|برگرفته از|مراجع|منابع و یادداشت[‌ ]?ها|منبع|مرجع|م[آا]خذ|منابع و م[آا]خذ|منابع و پانویس‌ها|فهرست مراجع|لیست مراجع|فهرست ارجاع[‌ ]?ها|فهرست ارجاع|[rR]eferences)\s*\=/g, '= منابع =')
			   .replace(/^\={3,}\s*(جستارهای وابسته|پانویس|منابع)\s*\={3,}$/g, '== $1 ==');
	}
	function wikiUrlMinifier(text) {
		return text
			.replace(patterns.url, function (x) {
				return replaceExcept(
					x,
					function (x) {
						try {
							x = decodeURI(x);
						} catch (e) {
							try {
								x = decodeURIComponent(unescape(x));
							} catch (e) { }
						}
						return x;
					},
					[patterns.globalExceptionTag, patterns.decodeUriBlacklist]
				);
			})

			// Strip the http(s) prefix
			.replace(/\[(https?\:)(?=\/\/(?:[\w\-]+)\.(?:m\.)?(wiki(pedia|media|data|source|news|oyage|quote)|wiktionary)\.org\/[^\s\]]*)/g, '[')
			.replace(/[\[\=](?:https?\:|)\/\/[\w\-]{2,}\.(?:m\.)?wikipedia\.org\/w(?:iki)?\/([^\n?]*?)[\]\|]/g, function (x) {
				x = x.replace(/\[(?:https?\:|)\/\/([\w\-]{2,})\.(?:m\.)?wikipedia\.org\/w(?:iki)?\/(.*?) (.*?)\]/g,'[[:$1:$2|$3]]')
				x = x.replace(/\[(?:https?\:|)\/\/([\w\-]{2,})\.(?:m\.)?wikipedia\.org\/w(?:iki)?\/(.*?)\]/g,'[[:$1:$2]]')
				x = x.replace(/\=(?:https?\:|)\/\/([\w\-]{2,})\.(?:m\.)?wikipedia\.org\/w(?:iki)?\/(.*?)\|/g,'=[[:$1:$2]]|')
				x = x.replace(/\_/g,' ').replace(/\[\[\:fa\:/g,'[[').replace(/٪۲۰/g,' ').replace(/%20/g,' ').replace(/\[\[[a-zA-Z\'0-9 ]+\|/g,'[[')
				return x
			}).replace(/\[{2}([^\|]+)\|\1\]{2}/gi, '[[$1]]');
	}
	function SubSectionLeveling (text) {
		// تنظیم سطح زیربخش‌ها
		text=text.replace(/^(\={2,}) *(.*?) *(\={2,})/mg, '$1 $2 $3')
			//مقاله‌ای که فقط زیربخش سطح ۱ دارد
			if (text.replace(/\=\=/g,'')===text){
				var text2 = text.replace(new RegExp('^\=([^\=\r\n]+)\=$', 'gm'), "== $1 ==")
				if (text!==text2){
					text=text2.replace(/\n\=  /g,'\n= ').replace(/  \=\n/g,' =\n')
				};
			};
			//مقاله‌ای که فقط زیربخش سطح ۳ یا ۴ دارد
			var text_test=text.replace(/^\=+ (منابع|جستارهای وابسته|پیوند به بیرون|پانویس|نگارخانه) \=+\n/gm,'')
			if (text_test.replace(/^\=\= /gm,'')===text_test){
				if (text_test.replace(/^\=\=\= /gm,'')!==text_test){
					//سطح ۳
					text = text.replace(new RegExp('^\=\=\=([^\=\r\n]+)\=\=\=$', 'gm'), "== $1 ==")
					text = text.replace(new RegExp('^\=\=\=\=([^\=\r\n]+)\=\=\=\=$', 'gm'), "=== $1 ===")
				} else if (text_test.replace(/^\=\=\=\= /gm,'')!==text_test) {
					//سطح ۴
					text = text.replace(new RegExp('^\=\=\=\=([^\=\r\n]+)\=\=\=\=$', 'gm'), "== $1 ==")
				}else{
					text=text.replace(/===/g,'==')
				};
			};
			text=text.replace(/==  /g,'== ').replace(/  ==/g,' ==')
		return text;
	};
	function wikiTextDigitsToPersian(text) {
		text = replaceExcept(
			text,
			toEnglishDigits,
			[patterns.argumentsBlacklist,patterns.fileNames,patterns.fileParameter]);
		text = replaceExcept(
			text,
			persianTools.toPersianDigits,
			[patterns.globalExceptionTag, patterns.url, patterns.argumentsBlacklist, patterns.mathTag, patterns.imagePixelSize, patterns.fileNames, patterns.ref,
				patterns.sourceTag, patterns.arabicDigitsEnglishContext, patterns.signatures, patterns.htmlEntity, patterns.diffLink,
				patterns.htmlAttributes, patterns.fileParameter, patterns.templateParameterName, patterns.ipSign,
				patterns.parenthesesAfterDigits, patterns.otherLanguagesInline, patterns.preTag , patterns.isbn, patterns.englishDate,
				patterns.parameter, patterns.color, patterns.templateEnglishName, patterns.linksOnEnglishContext, patterns.citation, patterns.refname,
				patterns.LtRTagEnclosed, patterns.boxVar, patterns.mediawikiFunctions]
		);
		return text
			// Decimal point, and thousands' separator
			.replace(/([۱۲۳۴۵۶۷۸۹۰])\.([۱۲۳۴۵۶۷۸۹۰])/g, '$1٫$2')
			.replace(/([۱۲۳۴۵۶۷۸۹۰]),([۱۲۳۴۵۶۷۸۹۰])/g, '$1٬$2')
			.replace(/([۱۲۳۴۵۶۷۸۹۰])( |)\u0652/g, '$1°')//تبدیل نویسه سکون+عدد فارسی به نویسه درجه و عدد فارسی
			.replace(/\u0652( |)([۱۲۳۴۵۶۷۸۹۰])/g, '°$2')
			//فاصله بین نویسه درجه و حروف الفبای فارسی به جز عدد فارسی
			.replace(/([\u0621-\u064A\u0653-\u0655\u067E\u0686\u0698\u06AF\u06A9\u0643\u06AA\uFED9\uFEDA\u06CC\uFEF1\uFEF2])°/g, '$1 °');
	}

	function dictationReplace(x, y, extensions, text) {
		return text.replace(
			new RegExp(
				'(^|[^' + persianTools.persianCharacters + '])(\\s|\u200c|_|)(' + x + ')(\\s|_)(' + y + ')(\\s|\u200c|_|)(' +
					extensions + ')($|[^' + persianTools.persianCharacters + '])',
				'g'
			),
			'$1$2$3\u200c$5$6$7$8'
		);
	}

	// it has dependency to MediaWiki:Gadget-Extra-Editbuttons-Dictionary.js
	function dictation(text) {
		var i,
			dictionary = persianToolsDictionary,
			NASB = '\u064b', // ًـ
			ZAMM = '\u064c'; // ُـ
		for (i in dictionary.complexes) {
			if (dictionary.complexes.hasOwnProperty(i)) {
				text = dictationReplace(
					i,
					dictionary.complexes[i],
					'ی|یی|ها|های|هایی|هایم|هایت|هایش|هایمان|هایتان|هایشان|',
					text
				);
			}
		}
		// for last name
		text = dictationReplace(
			dictionary.personNames,
			'ی|یی|زاده|نیا|گان|فر|نژاد|یان|ی\u200cها|یها',
			'ی|',
			text
		);
		// for 'آباد's
		text = dictationReplace(
			dictionary.personNames + '|' + dictionary.addToAbad,
			'آباد',
			'زاده|نیا|پور|گان|فر|نژاد|ی|یان|ها|های|یی|هایی|ی\u200cها|یها|',
			text
		);
		// for first names
		for (i in dictionary.firstNameComplex) {
			if (dictionary.firstNameComplex.hasOwnProperty(i)) {
				text = text.replace(
					new RegExp(
						'(^|[^' + persianTools.persianCharacters + ']|\\s|_)(' + i + ')(\\s|_)(' +
							dictionary.firstNameComplex[i] + ')(\\s|_)($|[^' + persianTools.persianCharacters + ']|[^' +
							persianTools.persianCharacters + '])',
						'g'
					),
					'$1$2\u200c$4$5$6'
				);
			}
		}
		// for colors
		text = dictationReplace(
			dictionary.colorsNames,
			'فام|گون',
			'زاده|نیا|پور|گان|فر|نژاد|ی|یی|ها|های|هایی|ی\u200cها|یها|هایم|هایت|هایش|هایمان|هایتان|هایشان|',
			text
		);
		// for numbers
		text = dictationReplace(
			dictionary.persianNumbers,
			'گانه|ماهه',
			'زاده|نیا|پور|گان|فر|نژاد|ی|یی|ها|های|هایی|هایم|هایت|هایش|هایمان|هایتان|هایشان|',
			text
		);
		// wrong dictation
		for (i in dictionary.forReplace) {
			if (dictionary.forReplace.hasOwnProperty(i)) {
				text = text.replace(
					new RegExp(
						'(^|[^' + persianTools.persianCharacters + '])(\\s|\u200c|_|)(' + i + ')(\\s|\u200c|_|)($|[^' +
							persianTools.persianCharacters + '])',
						'g'
					),
					'$1$2' + dictionary.forReplace[i] + '$4$5'
				);
			}
		}

		// کلماتی که آ دارند
		text = text.replace(
			new RegExp("(^|\\s|_|«|»|\\[|\\(|\\<|\\>|\\')(" + dictionary.wordsWithA + ")(ی|ئی|یی|ٔ|)(?= |«|»|\\.|،|_|\\]|\\s|\\:|\\)|\\<|\\>|؟|\\'|\\!|$)", 'g'),
			function (x) { return x.replace(/ا/i, 'آ'); } // 'i' is just to trick bidi algorithm on code view
		);
		// بن مضارع که آ دارند
		text = text.replace(
			new RegExp("(^|\u200c|\\s|_|«|»|\\[|\\(|\\<|\\>|\\')(" + dictionary.PresentVerbsWithA + ")(م|ی|د|یم|ید|ند)(?= |«|»|\\.|،|_|\\s|\\]|\\:|\\)|\\<|\\>|؟|\\!|\\'|$)", 'g'),
			function (x) { return x.replace(/ا/i, 'آ'); } // 'i' is just to trick bidi algorithm on code view
		);

		// بن ماضی که آ دارند
		text = text.replace(
			new RegExp("(^|\u200c|\\s|_|«|»|\\[|\\(|\\<|\\>|\\')(" + dictionary.PastVerbsWithA + ")(م|ی|یم|ید|ند|ه|)(?= |«|»|\\.|،|_|\\s|\\]|\\:|\\)|\\<|\\>|؟|\\!|\\'|$)", 'g'),
			function (x) { return x.replace(/ا/i, 'آ'); } // 'i' is just to trick bidi algorithm on code view
		);

		// همزه ضم
		text = text.replace(
			new RegExp("(^|\\s|_|«|»|\\[|\\(|\\<|\\>|\\')(" + dictionary.HamzehZam + ")(‌ها|ها|ین|ان|ی|ئی|یی|ٔ|)(?= |«|»|\\.|،|_|\\s|\\]|\\:|\\)|\\<|\\>|؟|\\!|\\'|$)", 'g'),
			function (x) { return x.replace(/وء/, 'ؤ').replace(/و/i, 'ؤ'); } // 'i' is just to trick bidi algorithm on code view
		);
		//همزه نصب
		text = text.replace(
			new RegExp("(^|\\s|_|«|»|\\[|\\(|\\<|\\>|\\')(" + dictionary.HamzehNasb + ")(ی|ئی|یی|ٔ|)(?= |«|»|\\.|،|_|\\s|\\]|\\:|\\)|\\<|\\>|؟|\\!|\\'|$)", 'g'),
			function (x) { return x.replace(/ا/i, 'أ'); } // 'i' is just to trick bidi algorithm on code view
		);

		//همزه وسط کلمه
		for (i in dictionary.HamzehAtInside) {
			text = text.replace(new RegExp(
				"(^|\\s|_|«|»|\\[|\\(|\\<|\\>|\\')(" + i + ')(| )(' + dictionary.HamzehAtInside[i] + ")(?= |«|»|\\.|،|_|\\s|\\]|\\:|\\)|\\<|\\>|؟|\\!|\\'|$)",
				'g'
			), '$1$2ء$4');
		}

		// در مورد افزودن یا حذف همزهٔ پایانی اجماعی وجود ندارد.
		/* text = text.replace(new RegExp("(^|\\s|_|«|»|\\[|\\(|\\<|\\>|\\')(" + dictionary.HamzehAtEnd + ")(?= |«|»|\\.|،|_|\\s|\\]|\\:|\\)|\\<|\\>|؟|\\!|\\'|$)", 'g'),'$1$2ء'); */

		//الف مقصوره
		text = text.replace(
			new RegExp("(^|\\s|_|«|»|\\[|\\(|\\<|\\>|\\')(" + dictionary.AlefMaghsooreh + ")(?= |«|»|\\.|،|_|\\s|\\]|\\:|\\)|\\<|\\>|؟|\\!|\\'|$)", 'g'),
			function (x) { return x.replace(/ا/i, 'ی'); } // 'i' is just to trick bidi algorithm on code view
		);

		// صفت+تر
		text = text.replace(new RegExp("(^|\\s|_|«|»|\\]|\\[|\\(|\\<|\\>|\\')(" + dictionary.adjective + ")( |_)تر(?= |«|»|\\.|\\[|\\]|،|_|\\s|\\:|\\)|\\<|\\>|؟|\\!|\\'|$)", 'g'),'$1$2\u200cتر');
		
		// اسامی رنگ‌ها (به‌عنوان صفت)+تر
		text = text.replace(new RegExp("(^|\\s|_|«|»|\\]|\\[|\\(|\\<|\\>|\\')(" + dictionary.colorsNames + ")( |_)تر(?= |«|»|\\.|\\[|\\]|،|_|\\s|\\:|\\)|\\<|\\>|؟|\\!|\\'|$)", 'g'),'$1$2\u200cتر');
		
		text = text.replace(/به دست\u200cآورد/g, 'به دست آورد'); // Solving a bug!
		text = persianTools.normalizeZwnj(text);
		return text.replace(new RegExp("(^|[؛\\s\\n\\.،«»\'\\<\\>؟])(" + dictionary.needsNasb + ')[' + NASB + ZAMM + ']?([؛؟\\s\\n\\.،«»\'"\\<\\>]|$)', 'g'), function (match) {
			return match
				.replace(new RegExp('ا([\\s\\n\\.،«»؟؛"\'\\>\\<' + ZAMM + '])', 'i'), 'ا' + NASB + '$1')
				.replace(new RegExp(NASB + '["' + NASB + ZAMM + ']'), NASB);
		});
	}

	function wikiDictation(text) {
		return replaceExcept(
			text,
			dictation,
			[patterns.globalExceptionTag, patterns.fileNames, patterns.signatures, patterns.url, patterns.galleryTag, patterns.insideQuote, patterns.argumentsBlacklist]
		);
	}
	function wikiApplyOrthography(text) {
		text=text //en:Wikipedia:HTML5
				//big
				.replace(/((?:\<big\>){5})([^<]+)((?:\<\/big\>){5})/g,'<span style="font-size: 56px;">$2</span>')
				.replace(/((?:\<big\>){4})([^<]+)((?:\<\/big\>){4})/g,'<span style="font-size: 38px;">$2</span>')
				.replace(/((?:\<big\>){3})([^<]+)((?:\<\/big\>){3})/g,'{{خیلی بزرگ|$2}}')
				.replace(/((?:\<big\>){2})([^<]+)((?:\<\/big\>){2})/g,'{{بزرگ|$2}}')
				.replace(/((?:\<big\>){1})([^<]+|[\s\S]+)((?:\<\/big\>){1})/g,'{{درشت|$2}}')
				//center
				.replace(/<center><gallery>([\S\s]+?)\<\/gallery><\/center>/g,'<gallery class="center">$1</gallery>')
				//.replace(/<center>([\S\s]+?)<\/center>/g,'{{وسط|$1}}')
				//empty tag
				.replace(/<span style="font-size: [^>]+"><\/span>/g,'')
				.replace(/{{(?:درشت|خیلی بزرگ|بزرگ|وسط)\|}}/g,'')

		//حذف برچسب‌های خالی نرم‌افزار مدیاویکی
		var tags = ['math', 'div', 'grammarly\\-btn','code', 'nowiki', 'pre', 'syntaxhighlight' ,'source', 's', 'noinclude', 'includeonly', 'big', 'small','gallery'];// has bug for sub , sup [[Special:Diff/19450140/19490903]]
		text = replaceExcept(
		  text,
		  function (text) {
			for (var i = 0; i < tags.length; ++i) {
				for (var b = 0; b < 5; ++b) {//خیلی از برچسب‌های خالی تو در تو هستند مانند [[Special:PermaLink/19223877]]
			  	text = text.replace(new RegExp('\<' + tags[i] + '[^\>]*\>(\\n|\\s|\u200c)*?\<\\/' + tags[i] + '\>', 'g'), '');
				}
			  // remove the tags if they occurred multiple times consequently
				text = text.replace(new RegExp('(\<' + tags[i] + '\>){2,}', 'g'), '$1')
				  .replace(new RegExp('(\<\\/' + tags[i] + '\>){2,}', 'g'), '$1');
			}
			text=text.replace(/\<ref\>[\s\n]*\<\/ref\>/g,'').replace(/\<ref\>[\s\n]*\<ref\>/g,'<ref>').replace(/\<\/ref\>[\s\n]*\<\/ref\>/g,'</ref>').replace(/\<ref\/\>/g,'</ref>');
			return text
		  },
		  [patterns.insideHtmlComment]
		);
		return replaceExcept(
			text,
			persianTools.applyOrthography,
			[patterns.globalExceptionTag, patterns.fileNames, patterns.signatures, patterns.url, patterns.galleryTag, patterns.wikilinkTargets]
		).replace(patterns.galleryTag, function (gallery) {
			// apply `applyOrthography` on gallery descriptions separately
			return gallery.replace(/^([^\|]*?\|)(.*)$/mg, function (x, y, z) {
				return y + persianTools.applyOrthography(z);
			});
		});
	}
	
	// probably should be exactly same above but for applyZwnj
	function wikiApplyZwnj(text) {
		return replaceExcept(
			text,
			persianTools.applyZwnj,
			[patterns.globalExceptionTag, patterns.fileNames, patterns.signatures, patterns.url, patterns.galleryTag]
		).replace(patterns.galleryTag, function (gallery) {
			// apply `applyOrthography` on gallery descriptions separatly
			return gallery.replace(/^([^\|]*?\|)(.*)$/mg, function (x, y, z) {
				return y + persianTools.applyZwnj(z);
			});
		});
	}

	function replaceEnMonth(text) {
		var enMonth = {
			'آگست':'اوت',
			'آگوست':'اوت',
			'جولای':'ژوئیه',
			'مارچ':'مارس',
			'آپریل':'آوریل',
			'فوریوری':'فوریه',
			'january': 'ژانویه',
			'jan': 'ژانویه',
			'february': 'فوریه',
			'feb': 'فوریه',
			'march': 'مارس',
			'mar': 'مارس',
			'april': 'آوریل',
			'apr': 'آوریل',
			'may': 'مه',
			'june': 'ژوئن',
			'jun': 'ژوئن',
			'july': 'ژوئیه',
			'august': 'اوت',
			'aug': 'اوت',
			'september': 'سپتامبر',
			'sept': 'سپتامبر',
			'sep': 'سپتامبر',
			'october': 'اکتبر',
			'oct': 'اکتبر',
			'november': 'نوامبر',
			'nov': 'نوامبر',
			'december': 'دسامبر',
			'dec': 'دسامبر'
		};
		for (var i in enMonth) {
			var text_new = text.replace(new RegExp(i, 'ig'), enMonth[i])
			if (text_new != text) {
				return text_new
			}
		}
		return text
	};
	function autoFormatCleanDatesException (text) {
		return replaceExcept(
			text,
			autoFormatCleanDates,
			[patterns.globalExceptionTag, patterns.fileNames, patterns.galleryTag, patterns.mathTag, patterns.sourceTag, patterns.templateWithEnglishName, patterns.citation, patterns.argumentsBlacklist]
		)
	}
	function wikitranslateEnMonth(text) {
		text=autoFormatCleanDatesException(text)
		return replaceExcept(
			text,
			function translateEnMonth(text) {
				var enMonthRegex = '(آگست|آگوست|جولای|مارچ|آپریل|january|jan|february|feb|march|mar|april|apr|may|jun|june|july|august|aug|sep|sept|september|oct|october|nov|november|december|dec)';
				return text.replace(new RegExp('([^a-zA-Z])(\^|\\||\\s|\\=|\\n|\\(|«|\\:)' + enMonthRegex + ' (\\d{1,2}|[۱۲۳۴۵۶۷۸۹۰]{1,2})\\, (\\d{3,4}|[۱۲۳۴۵۶۷۸۹۰]{3,4})(\\||\\s|\\n|\$|\\)|\\}|»)([\^a\-zA\-Z])', 'ig'),
						function (x) {
							x=x.replace(new RegExp('([\^a\-zA\-Z])(\^|\\||\\s|\\=|\\n|\\(|«|\\:)' + enMonthRegex + ' (\\d{1,2}|[۱۲۳۴۵۶۷۸۹۰]{1,2})\\, (\\d{3,4}|[۱۲۳۴۵۶۷۸۹۰]{3,4})(\\||\\s|\\n|\$|\\)|\\}||»)([^a-zA-Z])', 'ig'),
							'$1$2$4 $3 $5$6$7')
							x = persianTools.toPersianDigits(x);
							x = replaceEnMonth(x);
							return x;
						})
					.replace(new RegExp('([\^a\-zA\-Z])(\^|\\||\\s|\\=|\\n|\\(|«)((\\d{1,2}|[۱۲۳۴۵۶۷۸۹۰]{1,2}) |)' + enMonthRegex + ' (\\d{3,4}|[۱۲۳۴۵۶۷۸۹۰]{3,4})(\\||\\s|\\n|$|\\)|\\}|»|\\:)([\^a\-zA\-Z])', 'ig'),
						function(x) {
							x = persianTools.toPersianDigits(x);
							x = replaceEnMonth(x);
							return x;
						}
					);
			}, [patterns.globalExceptionTag, patterns.fileNames, patterns.ref, patterns.fileParameter, patterns.galleryTag, patterns.mathTag, patterns.sourceTag, patterns.templateWithEnglishName, patterns.citation, patterns.argumentsBlacklist]
		)
	}
	
	var arabicDigits = '0123456789', persianDigits = '۰۱۲۳۴۵۶۷۸۹';
	function robustToEnglishDigits(text) {
		var i = 0;
		for (i = 0; i <= 9; i = i + 1) {
			text = text.replace(new RegExp('[' + persianDigits[i] + ']', 'g'), arabicDigits[i]);
		}
		return text;
	}
		
	function toEnglishDigits(text) {
		text = text.replace(/[a-zA-Z]([\_\s\:\.\,\;\]\[\"\'\)\(\}\{\/\\ ]+|)([۱۲۳۴۵۶۷۸۹۰٪\.٫\-\—\–°÷×\+\,\s\_\:،»«؛]+)([\_\s\:\.\,\;\]\[\"\'\)\(\}\{\/\\\<\> ]+|)([a-zA-Z\>]|$)/g, function (x) {
			var i = 0;
			for (i = 0; i <= 9; i = i + 1) {
				x = x.replace(new RegExp('[' + persianDigits[i] + ']', 'g'), arabicDigits[i]);
			}
			return x.replace(/،/g,',').replace(/»/g,'"').replace(/«/g,'"').replace(/؛/g,';');
		});
		// bug [[Special:Diff/17760890/17760898]]
		text = text.replace(/([a-zA-Z][۱۲۳۴۵۶۷۸۹۰]+) *\=/g, function (x) {
			var i = 0;
			for (i = 0; i <= 9; i = i + 1) {
				x = x.replace(new RegExp('[' + persianDigits[i] + ']', 'g'), arabicDigits[i]);
			}
			return x;
		});
		// ISBN, ISSN and PMID's numbers should in english
		text = text.replace(/\b(ISBN|ISSN|PMID|PubMed) *:? *([۱۲۳۴۵۶۷۸۹۰0-9–—−ـ_\-]+)([^۱۲۳۴۵۶۷۸۹۰0-9–—−ـ_\-]|$)/gi, function (x) {
			x=x.replace(/[–—−ـ_\-]+/g,'-')
			var i = 0;
			for (i = 0; i <= 9; i = i + 1) {
				x = x.replace(new RegExp('[' + persianDigits[i] + ']', 'g'), arabicDigits[i]);
			}
			x = x.replace(/\b(ISBN|ISSN|PMID|PubMed) *:? *([۱۲۳۴۵۶۷۸۹۰\-0-9]+)([^۱۲۳۴۵۶۷۸۹۰\-0-9]|$)/gi,'$1 $2$3')
			x = x.replace('PubMed','PMID')
			return x;
		});
		text = text.replace(/ISBN \-note/g,'ISBN-note');
		// تبدیل عددهای فارسی در عدد ترتیبی انگلیسی
		text = text.replace(/(?:^|["\'\s_«\(\[\{])([۱۲۳۴۵۶۷۸۹۰]+)(st|nd|rd|th)[\s_\.,»"\'\)\]\}]/g, function (x) {
			var i = 0;
			for (i = 0; i <= 9; i = i + 1) {
				x = x.replace(new RegExp('[' + persianDigits[i] + ']', 'g'), arabicDigits[i]);
			}
			return x;
		});
		return text
			.replace(new RegExp('([' + arabicDigits + ']) ?٪', 'g'), '$1%')
			.replace(new RegExp('([' + arabicDigits + '])٫(?=[' + arabicDigits + '])', 'g'), '$1.') // English decimal separator
	}
	function cleanTemplateBracesFromArticle (text) {// like [[Special:Diff/18828723]]
            var i =0
            for (i = 0; i <= 5; i = i + 1) {
				text = text.replace(/\{\{\{[^\|\}]+\|([^\}]+)\}\}\}/g, '$1')
				           .replace(/\{\{\{[^\|\}]+\| *\}\}\}/g, '')
			}

            return text.replace(/\{\{\#/g, '{{جا:#')
                       .replace(/\{\{ *(PAGENAME|FULLPAGENAMEE|SITENAME|NAMESPACE) *\}\}/g, '{{جا:$1}}')
                       .replace('{{ترتیب‌پیش‌فرض:}}', '');
	}
	function decodeHTMLSymbolEntitiesCodes (text) {
		//&copy; > ©
		return replaceExcept(
			text,
			function decodeEntitiesCodes (text) {
				for (var i in HTMLEntityCodes) {
					var entityInput=i;
					var entityoutput=HTMLEntityCodes[i];
					text=text.replace(new RegExp(entityInput, 'g'),entityoutput);
				}
				return text;
			}, [patterns.globalExceptionTag, patterns.fileNames, patterns.ref, patterns.fileParameter,
			patterns.galleryTag, patterns.mathTag, patterns.sourceTag, patterns.templateWithEnglishName,
			patterns.citation,patterns.url]
		)
	}
	function removeWikiSigne (text) {
		return replaceExcept(
			text,
			function (text) {
				text=text.replace(/\[\[([^\|\]]+)\|([^\]]+)\]\]/g, '$2');
				text=text.replace(/\[\[([^\|\]]+)\]\]/g, '$1');
				return text;
			}, [patterns.globalExceptionTag, patterns.fileNames, patterns.fileParameter,
		 patterns.mathTag, patterns.sourceTag, patterns.templateWithEnglishName,patterns.nowikiTag , patterns.preTag,
		 patterns.insideHtmlComment]
		)
	}
	function autoEdHTMLtoWikitextWikiTools (text) {
		return replaceExcept(
			text,
			autoEd.autoEdHTMLtoWikitext,
			[patterns.fileParameter, patterns.mathTag, patterns.sourceTag]
		)
	}
	function superTool(text) {
		text = decodeHTMLSymbolEntitiesCodes (text);
		text = cleanTemplateBracesFromArticle (text);
		text = persianWikiTools.wikiConvertToPersianCharacters(text);
		text = persianWikiTools.wikiApplyZwnj(text);
		text = persianWikiTools.wikiApplyOrthography(text);
		text = persianWikiTools.wikitranslateEnMonth(text);
		text = persianWikiTools.wikiTextDigitsToPersian(text);
		text = persianWikiTools.wikiUrlMinifier(text);
		text = persianWikiTools.wikiDictation(text);
		text = persianWikiTools.wikiPunctuation(text);
		text = persianWikiTools.wikiSubsection(text);
		text = persianWikiTools.SubSectionLeveling (text)
		//ابزارهای بیشتر برگرفته از ویکی‌پدیای انگلیسی [[Mediawiki:Gadget-Extra-Editbuttons-autoed.js]]
		text = autoEd.autoEdISBN(text);
		text = autoEd.autoEdWhitespace(text);
		text = autoEdHTMLtoWikitextWikiTools(text);
		text = autoEd.autoEdHeadlines(text);
		text = autoEd.autoEdTablestoWikitext(text);
		text = autoEd.autoEdExtraBreaks(text);
		text = persianWikiTools.addColumnToRefTemplate(text);
		return text;
	}
	
	function superToolMove(text) {
		text = ' ' + text + ' '; // بعضی از کدها اگر فاصله در انتها یا اول نباشد عمل نمی‌کنند مانند افزودن تنوین به کلمه بعدا
		text = persianWikiTools.wikiConvertToPersianCharacters(text);
		text = persianTools.applyZwnj(text);
		text = persianWikiTools.wikiApplyOrthography(text);
		text = persianWikiTools.wikiTextDigitsToPersian(text);
		text = persianWikiTools.wikiUrlMinifier(text);
		text = persianWikiTools.wikiDictation(text);
		text = persianWikiTools.wikiPunctuation(text);
		return text.trim();
	}

	return {
		removeWikiSigne: removeWikiSigne,
		superTool: superTool,
		superToolMove: superToolMove,
		dictation: dictation,
		wikiApplyOrthography: wikiApplyOrthography,
		wikiApplyZwnj: wikiApplyZwnj,
		wikiConvertToPersianCharacters: wikiConvertToPersianCharacters,
		wikiDictation: wikiDictation,
		wikiPunctuation: wikiPunctuation,
		wikiSubsection:wikiSubsection,
		SubSectionLeveling:SubSectionLeveling,
		wikiUrlMinifier: wikiUrlMinifier,
		wikiTextDigitsToPersian: wikiTextDigitsToPersian,
		wikitranslateEnMonth: wikitranslateEnMonth,
		addColumnToRefTemplate: addColumnToRefTemplate,
		fixBadLinks: fixBadLinks,
		robustToEnglishDigits: robustToEnglishDigits,
		toEnglishDigits: toEnglishDigits
	};
}());
if (typeof window !== "undefined") {
	window.persianWikiTools = persianWikiTools;
}
// </nowiki>
var persianToolsDictionary = (function () {
    'use strict';
    var dictionary = {};

    dictionary.adjective = 'اخمو|ارزان|ارغه|الکن|الکی|انبوه|آبدار|(نا)?آرام|آرغنده|(نا)?آشکار|(نا)?آماده|آهسته|(بی\u200c|با)انضباط|باریک|بد|بدحساب|بددل|بدریخت' +
        '|بر|براق|برخوردار|برومند|بزدل|بلند|بی‌آلایش|بی دست و پا|بیچاره|بیدار|بیمار|پخ|پخش|پخمه|پرت|پرنور|پست|پشمالو|پلید|پوچ|(سر|نا)?پوشیده|پوک' +
        '|پیر|پیروز|تار|تپل|ترد|ترسو|تفت|تلخ|تنبل|تندرو|تنک|تنگ|تنها|تهی|تیره|جلو|چابک|چاپلوس|چالاک|چپ|چرند|چسبان|چفته|چیره|خام|خانم|خراب' +
        '|خرم|خسته|خشک|(نا)?خفته|خفن|خل|خنگ|(نا)?خوانا|خوب|خوشکل|خوش‌گوار|خیراندیش|دراز|درخور|درستکار|دلباخته|دلیر|دوست|دون|رحیم|رسمی|روانی|روشن' +
        '|ریغو|زبر|زبردست|زبل|زشت|زیبا|زیرک|ژرف|ژنده|ساده|(نا)?سالم|ساکت|سبک|سخاوتمند|سر|سرکش|سفت|سوسول|شایسته|شکیبا|شل|شور|طولانی|عالم|فراوان|فرز' +
        '|فنی|قرتی|قشنگ|قلنبه|قهرمان|کارکن|کال|کبود|کج|کچل|کر|کلان|کلفت|کم|کند|کنس|کوتاه|کوتوله|کوچک|کوچولو|کودن|گدا|گران|گرسنه|گشاد' +
        '|گنگ|گود|گیج|لاغر|لبریز|لخت|لغزنده|له|مات|مچاله|مچل|(نا)?مرد|مردمی|مردنی|مست|مشکوک|مفید|ناپدید|ناپسند|ناتوان|ناجنس|ناجور|ناچیز|ناخوش' +
        '|نادان|(نا)?درست|نازک|ناسپاس|نافرمان|ناگوار|نامرد|نرم|نیازمند|نیرومند|هشیار|هیز|واژگون|ول|ولرم|ولنگار|یکپارچه|یکدست|یکرنگ|(نا)?پیدا' +
        '|گناهکار|ریز|دانا|کثیف|آقا|(با|بی\u200c)سواد|عاشق|(با|بی\u200c)محبت|صاف|زمخت|فریبنده|پیچیده|سخت|دشوار|تمیز|(نا)?پاکیزه|بزرگ|پهن|پخته|بی‌مورد' +
        '|بی‌نیاز|(بی\u200c|با|)تجربه';

    dictionary.personNames = 'الله|محمد|علی|حسن|حسین|جواد|باقر|مهدی|تقی|نقی|نازی|نجم|' +
        'اکرم|کاظم|عباس|منصور|خسرو|محمود|شمس|ملک|شوکت|' +
        'نصر|همت|جهان|جلال|موسی|ابراهیم|جعفر|احمد|قاسم|کمال|هاشم|' +
        'شفیع|صمد|شیخ|اسماعیل|ربیع|سلیمان|رستم|شاهرخ|فرخ|شریف|نعمت|' +
        'امیر|خلیل|جلیل|مجید|اسد|شوکت|رضا|عجل|ید|عبد|سهیل|معصوم|عظیم' +
        'اکبر|اصغر|بهمن|قلی';

    dictionary.wordsWithA = 'ورامدن|هرزاب|هراینه|هجوامیز|نوش‌اذر|نواوری|نواموز|نهراب|میراخور|میراب|می‌اید|می‌اورند|مرات' +
        '|ماخذ|مابی|لس‌انجلس|گل‌اذین|گزنداور|گرداوری|گرداوردن|گرداورد|گردامدن|کنداور|کفرامیز|فرودامدن|عطراگین|طنزامیز' +
        '|شیرابه|شهرا[یئ]ین|شهراشوب|سوداور|سراوردن|سرامدن|سرامد|سراشپز|سحرامیز|زیرابی|زوراور|زهرالود|زهراگین|زردالو|دوداهنگ|دواتشه' +
        '|دژاهنگ|دژالود|درداور|دردالود|درایند|دراید|دراویختن|دراوری|دراورنده|دراورند|دراوردن|درامده|درامدن|درامد|خیزاب|خشم‌الود' +
        '|چندش‌اور|جگراور|تیراهن|تهورامیز|تنفراور|تنداب|پسندامدن|پرنداور|پردرامد|پراشوب|پراب|بی‌اب|بوا|بنداوردن' +
        '|بنداور|سرامدن|برایند|براورده|براوردن|براورد|برامده|برامدن|برامدگی|برامد|براشفته|براشفتن|براشفتگی|براسودن|بداهنگ' +
        '|بداموزی|بدامدن|بدامد|ائورت|ائسه|ا[یئ]ینه|ا[یئ]ین‌نامه|ا[یئ]ین|ایه‌یاب|ایه|اینه‌دار|اینده|ایندگان|ایفون' +
        '|ایروپلن|ایدین|ایتم|ایت‌الله|ایت|ایات|اویشن|اویسا|اویژه|اویزون|اویزه|اویزند|اویزگر|اویزش' +
        '|اویزدار|اویزان|اویز|اویخته|اویختنی|اویختن|اویختگی|اویخت|اویتخه|اووکادو|اونگون|اونگان|اونگ|اوند|اوریل' +
        '|اوریدن|اورنده|اورند|اورنجن|اوردیدن|اورده|اوردنی|اوردن|اوردگه|اوردگاه|اوردجو|اورد' +
        '|اوایش|اوانویس|اوانگارد|اوانتاژ|اواکس|اواشناس|اوازه‌خوان|اوازهای|اوازه|اوازخوان|اواز|اواره|اوارگی|اوارگان' +
        '|اوار|اهو|اهنین|اهنگ‌ساز|اهنگرخانه|اهنگر|اهنگ|اهن‌فروش|اهن‌ربا' +
        '|اهن‌پاره|اهن‌بر|اهن‌الات|اهن|اهک‌سازی|اهک‌پزی|اهک‌پز|اهک|اهسته|اهستگی|اهای|اهان' +
        '|انیون|انوقت|انود|انها|ان‌گه|ان‌گاه|ان‌که|ان‌کس|انکارا|ان‌قدر|انفولانزا|انفلوانزا' +
        '|انفارکتوس|ان‌طور|ان‌طرف|ان‌سو|انژیوگرافی|انژین|انزیم|ان‌روی|ان‌روز|ان‌رو|اندوسکوپی|ان‌چه|ان‌جا|انتیل|انتیک' +
        '|انتی|انتن|انتریک|انتراکت|انتراسیت|انتالیا|اناهیتا|اناناس|انان|انالیز|انالوگ|انارشیسم|اناتومی|اناتولی' +
        '|انابولیسم|امینه|امیغه|امیغ|امیزه|امیزگار|امیزش|امیز|امیخته|امیختن|امیختگی|امیب|امونیوم|امونیت|امونیاک|امون' +
        '|اموکسی|اموزه|اموزنده|اموزگان|اموزگار|اموزش‌یار|اموزشگاه|اموزشکده|اموزش|اموزانه|اموزاندن|اموز|اموده|امودن|امودریا' +
        '|اموخته|اموختن|اموختگی|اموختار|امله|امریکا|امرزیده|امرزیدن|امرزیدگی|امرزنده|امرزگار|امرزش|امرز|امرانه' +
        '|امدید|امدوشد|امدورفت|امده|امدن|امدگی|امدکردن|امد|امخته|امپلی|امپرسنج|امپر|امبولی|امبولانس|امایه|امایش|امال' +
        '|اماسیده|اماسیدن|اماسانیدن|اماس|امازون|امارگیر|امارگر|امارشناسی|امارشناس|اماده‌کردن|اماده|امادگی|امادگاه' +
        '|اماج‌گاه|اماج|اماتور|الیداد|الیاژهای|الیاژ|الونک|الومینیوم|الومینیم|الوزرد|الوده|الودن|الودگی|الودگر|الود|الوچه' +
        '|الوبخارا|الما|الفرد|الفا|الرژی|التو|الترناتیو|الت|الپ|البومین|البوم|البانی|البالوئی|البالو|الا[یئ]یدن' +
        '|الایشی|الایش|الای|الاسکا|الاخون|الاچیق|الات|الاباما|اگنه|اگنده|اگندن|اگاهی‌نامه|اگاهی‌دادن|اگاهی|اگاهگان' +
        '|اگاهانیدن|اگاهانه|اگاهاندن|اگاه|اکوستیک|اکوردئون|اکواریوم|اکنه|اکنش|اکنده|اکندن|اکله|اکسفورد|اکروبات|اکتئون' +
        '|اکتینیوم|اکانتاسه|اکادمیک|اکادمی|اق‌بانو|اقائی|اقایان|اقامنشانه|اقامنش|اقاسی|اقازاده|اقاجان|اقا' +
        '|افریننده|افرینش|افرین|افریکانس|افریقا|افریده|افریدن|افریدگار|افتومات|افتابه|افتاب‌مهتاب|افتاب‌گیر' +
        '|افتاب‌گردان|افتاب‌زده|افتاب‌زدگی|افتاب‌رو|افتاب‌خورده|افتاب‌پرست|افتاب|افاقی|افاق|افات|اغول|اغوشیدن|اغوش|اغل' +
        '|اغشته|اغشتن|اغشتگی|اغش|اغالش|اغاسی|اغازین|اغازیدن|اغازیان|اغازی|اغازه|اغازگر|اغاز|اغاجی|اغا|اشیل|اشیانی|اشیانه' +
        '|اشیان‌بندی|اشیان|اشور|اشوبیدن|اشوب‌ناک|اشوب‌گرانه|اشوب‌گر|اشوب‌کن|اشوب‌طلب|اشوب‌انگیز|اشوب|اشنایان|اشناوری' +
        '|اشناگر|اشناسازی|اشنا|اشکوخیدن|اشکاره|اشکارگر|اشکارساز|اشکارا|اشکار|اشفته|اشفتن|اشفتگی|اشغالدان|اشتی' +
        '|اشفتگی|اشپزخانه|اشپز|اشامیدنی|اشامیدن|اشامه|اشامنده|اشام|اشاب|اسیمه|اسیمگی|اسیب‌زدن' +
        '|اسیب‌دیده|اسیب|اسیاکردن|اسیاسنگ|اسیازنه|اسیاچرخ|اسیابان|اسیاب|اسیا|اسوده‌خاطر|اسوده‌حال|اسوده|اسودن' +
        '|اسودگی|اسمون|اسمانه|اسمان‌سنجی|اسمان‌خراش|اسمانخانه|اسمان|اسکاریس|اسفالت|استینه|استرکاری' +
        '|استردوز|استانه|اسپیرین|اسپرین|اسائی|اسا[یئ]یدن|اساینده|اسایشگاه|اسایش|اسان‌گیری|اسانسورچی' +
        '|اسانسور|اسان|اژیرهوائی|اژیر|اژیانه|اژنگ|اژند|اژفنداک|اژدار|اژانس|ازیدن|ازیتا|ازوقه|ازمون‌گر|ازمون‌گاه|ازمون|ازموده' +
        '|ازمودن|ازمودگی|ازمندی|ازمند|ازمائی|ازمایه|ازماینده|ازمایشی|ازمایشو|ازمایشگاه|ازمایشات|ازمایش|ازمابنده|ازما|ازگار' +
        '|ازرده|ازردن|ازردگی|ازرد|ازاریدن|ازارنده|ازاررسان|ازاردهنده|ازار|ازادی‌خواه|ازادوار' +
        '|ازاده|ازادمنش|ازادمرد|ازادگی|ازادگان|ازادکامی|ازادانه|ازاد|اریانا|اریان|اریا|ار[و]غ' +
        '|ارواره|ارنولد|ارنگ|ارنج|ارنائوت|ارمینا|ارمین|ارمیس|ارمیده|ارمیدن|ارمیدگی|ارمیچر|ارمه|ارمان‌شهر|ارماگدون|ارگون' +
        '|ارکاد|ارشیو|ارشیتکت|ارشه|ارشام|ارش|ارستن|ارسان|ارژانتین|ارزومندانه|ارزومند|ارزوخواه|ارزو|ارتین|ارتیشو|ارتیست' +
        '|ارتور|ارتمیس|ارتروز|ارا[یئ]یدن|ارایه‌گر|ارایشی|ارایشگر|ارایشگاه|ارایش|ارامیدن|ارامگاه|ارامگان|ارام‌کردن' +
        '|ارامش|ارامانیدن|ارام|اراسته|اراستن|اراستگی|ارارات|اراء|اذین|اذرین|اذرنوش|اذرنگ|اذرگون|اذرشهر|اذرسنجی' +
        '|اذرروز|اذرخش|اذربرزین|اذربایجان|اذر|ادینه|ادیس|ادونیس|ادنیس|ادمی‌گرا|ادمیزاد' +
        '|ادمیرال|ادمیت|ادم‌گرا|ادم‌کش|ادمک|ادم‌فروش|ادم‌ربا|ادم‌خوار|ادرنالین|ادرس|ادامس|اداب|اخوندک|اخوند' +
        '|اخور|اخرین|اخرسالار|اخرزمان|اخرت‌شناسی|اخرت|اخرالدواء|اخرالامر|اخر|اختن|احاد|اچمز|اچارکشی|اچاردار|اچار|اجیل|اجودان' +
        '|اجرنما|اجرکاری|اجرچین|اجرپز|اجان|اثار|اتیه|اتیکا|اتیسا|اتلیه|اتشین|اتش‌ناک|اتش‌گیره|اتش‌گیر' +
        '|اتش‌گون|اتش‌گرفتن|اتش‌گاه|اتشکده|اتش‌کار|اتش‌فشان|اتش‌زنه|اتش‌زدن|اتش‌زا|اتش‌دان|اتش‌خوار|اتش‌خانه|اتش‌پاره|اتش‌بان|اتش‌بازی|اتش‌بار' +
        '|اتش|اتریوم|اتروپین|اتابای|اپولو|اپوستروف|اپاندیسیت|اپاندیس|اپارتمان|اپارتاید|اپارات|ابیار|ابونه|ابونمان' +
        '|ابها|ابنوس|اب‌نمک|اب‌نما|اب‌[ن]شدنی|ابنبات|ابمیوه‌گیر|اب‌میوه|اب‌لیمو|ابله‌کوب|ابله‌رو|ابگینه|ابگیر|ابگونه|ابگون‌ساز' +
        '|اب‌گوشت|اب‌گرمکن|اب‌گردان|اب‌گذر|اب‌گاه|اب‌کش|اب‌کانه|اب‌کامه|اب‌کار|اب‌فشان|ابغوره|ابشی|ابشور|اب‌شنگولی|ابشش|اب‌شدنی' +
        '|ابش‌خور|ابشتگاه|ابشار|ابسوار|ابسه|ابسکون|ابستن|ابسالان|اب‌سال|ابزی‌گاه|ابزی‌دان|ابزی|ابریزگاه|ابریزگان|ابریزش' +
        '|ابریز|ابرومند|ابروریزی|ابرنگ|ابرفت|ابراهه|ابراهک|ابراه|ابدیده|ابدزدک|ابدانک|ابدان|ابداری|ابدارخانه|ابدارچی' +
        '|ابدارباشی|ابدار|اب‌خیز|ابخوری|ابجی|ابجوفروشی|ابجوساز|ابجوساختن|ابجو|ابتین|ابتنی|اب‌پنیر|اگهی' +
        '|اب‌پاش|اب‌بها|اب‌بند|اب‌باز|اب‌انبار|ابان|اباژور|اباده|ابادکردن|ابادسازی|ابادان|اباد|اباء'; // first charcter should be آ
         //removed ان for [[ان بی سی]]
    // match ZWNJ also as a space or optional
    dictionary.wordsWithA = dictionary.wordsWithA.replace(/\u200c/g, '[\u200c ]?');

    dictionary.PresentVerbsWithA = 'ارا|ارام|ارامان|ارای|ازار|ازما|ازمای|اسا|اسای|اشام|اشوب|اغار|اغاز|افرین|اکن|اگن|الای' +
        '|امرز|اموز|اموزان|امیز|اهنج|اور|اویز';

    dictionary.PastVerbsWithA = 'اراماند|ارامید|ارمید|ازرد|ازمود|اشامید|اشفت|اشوبید|اغازید|اغشت|افرید|اکند|اگند|الود' +
        '|امد|امرزید|اموخت|اموزاند|امیخت|اهیخت|اورد|اویخت';

    dictionary.needsNasb = 'اتفاقا|الزاما|لزوما|یقینا|قطعا|حتما|قاعدتا|طبیعتا|طبعا|قهرا|جدّا|حقیقتا|واقعا|مطمئنا|واضحا|مسلما|تماما|کاملا' +
        '|عینا|اکیدا|مطلقا|دقیقا|مستقیما|اصولا|اصلا|اصالتا|نسبا|نسبتا|تقریبا|حدودا|معمولا|قانونا|شرعا|اخلاقا|خلقا|احتمالا' +
        '|استثنائا|اساسا|کلّا|جزئا|مجموعا|جمعا|اجماعا|شدیدا|نهایتا|اقلا|اکثرا|غالبا|عمدتا|ندرتا|بعضا|گاها|صریحا|صراحتا|عموما' +
        '|اختصاصا|خصوصا|مجملا|اجمالا|اختصارا|مختصرا|مشروحا|ظاهرا|باطنا|عمیقا|ذاتا|فطرتا|جسما|ابتدائا|مقدمتا|بدوا|بعدا|قبلا' +
        '|جدیدا|سابقا|اخیرا|ابدا|عمرا|تلویحا|علنا|حضورا|غیابا|نیابتا|لطفا|اجبارا|اختیارا|عالما|عمدا|عامدا|تعمدا|متعمدا|عادتا' +
        '|مستقلا|احتیاطا|احیانا|غفلتا|سهوا|اشتباها|عاجلا|عجالتا|مرتجلا|ارتجالا|سریعا|فورا|دا[یئ]ما|ضرورتا|نقدا|منحصرا|صرفا|دفعتا' +
        '|کرارا|مکررا|مجددا|مرتبا|مستمرا|متواترا|تدریجا|تصادفا|عملا|فعلا|موقتا|ضمنا|نتیجتا|نوعا|اصطلاحا|جسارتا|بالا ?غیرتا|م[وؤ]کدا' +
        '|ذیلا|شخصا|مشترکا|مفصلا|رسما|ترجیحا|قلبا|ر[اأ]سا|تو[اأ]ما|متناوبا|متوالیا|متقابلا|متعاقبا|متّ?فقا|مثلا|فرضا|ایضا|مضافا' +
        '|مصرّ?ا|ارفاقا|انصافا|جهارا|متدرجا|غانما|احتراما|ناچارا|سفارشا|تلفنا|زبانا|کتبا|شفاها|چهارما|ثانیا|ثالثا' +
        '|رابعا|خامسا|سادسا|سابعا|ثامنا|تاسعا|عاشرا|مخصوصا';//اولا و سوما می‌تواند یک نام خاص باشد.

    dictionary.HamzehZam ='امیرالمومنین|مومن|رویا|فواد|موذن|مودب|موخر|موتمن|مواخذه|مولف|موثر|مونث|موکد|موسس(?! خورناتسی)|سوال|موسسه';//for[[ران مودی]]removedمودی
    dictionary.HamzehZam = dictionary.HamzehZam.replace(/و/g, 'وء?');
 
    dictionary.HamzehNasb ='تاکید|تالیف|تاسیس|تاسیسات|تامل|تفال|تاهل|تامین|تا[یئ]ید|تادیب|تاثیر|تاثر|تاثیرات|تاثیرگذار|تاجیل'+
        '|تاخر|تاخیر|توام|ماوا|مستاجر|مبدا|منشا|متاسفانه|متاسف|متاثر|مساله|متاهل|خلا|ملا عام|رافت|ماخذ|مایوس|ماخوذ'+
        '|مامور|مامورین|ماموران|ماموریت|مامون|مانوس';//removed راس، تالم

    dictionary.HamzehAtEnd ='اجزا|احشا|ارتجا|ارتقا|ازا|استثنا|استغنا|استقرا|استمنا|استهزا|اشبا|اشقیا|اشیا|اطبا|اطفا|اعتلا'+
       '|اغوا|افترا|اقتضا|امنا|انبیا|انقضا|اولیا|ماورا';//re املا-انشا-اعضا-امضا-انزوا-ابتلا-استعفا-اعلا-اعتنا بدون همزه متداولترند، ابدا می‌تواند با همزه یا نتوین باشد در نتیجه برداشته شد

    dictionary.HamzehAtInside ={'سو':'استفاده|تعبیر|تفاهم|برداشت','ما':'الشعیر','ماورا':'الطبیعه|النهر'};

    dictionary.AlefMaghsooreh ='یحیا|حتا|خنثا|مبرا|مرتضا|مصطفا|موسا|مجتبا|عیسا|عظما|علارغم';//removed اولا- الا

    dictionary.colorsNames = 'زرد|قرمز|آبی|سفید|سیاه|بنفش|سرخ|گلگون|ازرق|ابیض|نارنجی|توسی|کبود|ارغوانی|سورمه‌ای|سپید|مشکی|کرم|قهوه‌ای|سبز|طلا[یئ]ی';

    dictionary.persianNumbers = 'یک|دو|سه|چهار|پنج|شش|هفت|هشت|نه|ده|یازده|دوازده|سیزده|چهارده|' +
        'پانزده|شانزده|هفده|هجده|نوزده|بیست|سی|چهل|پنجاه|شصت|هفتاد|هشتاد|نود|صد|هزار';

    dictionary.addToAbad = 'گلون|افضل|رقی|خیر|دل|حاجی|سید|مبارک|گنج|نهنگ|چنگ|' +
        'سرخ|جنگل|خرم|خونی|دولت|به|نیاز|حفظ|عیش|نجم|بلاش|شیار|' +
        'فتح|فضل|خدر|ساق|کج|زین|اسلام|بالش|پارس|اسکل|یاخچی|مهندس|قوژد';

    dictionary.firstNameComplex = {
        'حمید|احمد|محمود': 'رضا',
        'خدا': 'بنده|داد',
        'امیر': 'علی|حسین|محمد|رضا|مهدی|عباس',
        'محمد': 'حسین|رضا|مهدی|جواد|باقر|کاظم|حسن|علی|امیر|طاها|هادی|وحید|حمید',
        'علی': 'رضا|محمد|اصغر|اکبر|قلی'
    };

    dictionary.complexes = {
        'ویکی': 'پدیا|مدیا|انبار|واژه|نبشته|خبر|کتاب|داده|دیتا|سفر|تراول|دانشگاه',
        'ایده': 'آل',
        'سخت|نرم|پای|جنگ|نوشت|بد|ماشین': 'افزار',
        'جنگ': 'افروز',
        'پیاده': 'روی|رو|نظام',
        'انسان|روان|گیاه|زیست|جانور|نماد|زمین|هوا|ریخت|خدا|جامعه|رفتار|فرهنگ|معرفت|زبان|کتاب|ستاره|اختر|شرق|اسلام|ریشه|آسیب|باستان|حق': 'شناس',
        'بهره|نتیجه|فاصله|اندازه|مچ|رونق|دست|پا|پاچه|آبمیوه|آتش|آمار|اوج|کشتی|رأی|رای|یار|تصمیم': 'گیر',
        'بهره': 'مند|کشی|دهی',
        'اوج': 'دهی',
        'آزاد|بد|نیک|مثبت|مصلحت': 'اندیش',
        'هم': 'اندیشی|ارزی|راهی|سانی|رزم|خانه|نشین|سان|بند|مرز|سایه|مسلک|زمان|معنی|گام',
        'گرم|نرم|سرد|جمع|خنک|خشک|مرطوب|ضرب|تقسیم|کم|سرگرم|خوشحال|ناراحت|سخت|روان|باز|زیبا|زشت|مصرف|تولید': 'کننده|کنندگی|کنندگان',
        'خود|درون|پیه': 'سوز|خواه',
        'دل': 'افروز|آزار|آرا|آزرده|بریده|افسرده|ربا|سوز|خواه|گشا',
        'تفریق|افزایش|کاهش|ویرایش|کوزه|سفال|غارت|چپاول|صنعت|امداد|توطئه|حساب|افسون|ریخته': 'گر',
        'آهن': 'ربا',
        'طیف|امکان|اقتصاد|نور|زمان|عمق|گرما|فشار|قطر': 'سنج',
        'فیزیک|شیمی|ریاضی|تاریخ|قلم|کتاب': 'دان',
        'نام|اسم|سیاهه|خود|فیلم‌نامه|فیلمنامه|کتاب|روان|نسخه': 'نویس',
        'بار|سرمایه|تخم|کتاب|خواب': 'گذار',
        //اسم خاص
        'شهر': 'بانو|زاد|ناز|نوش',
        'اسد|اسماء?|اسم|امان|امر|امیر|امین|انصار|انعام|اهل|اولیاء?|اکرم|باب|بدیع|برات|بقیة|بهاء?|جار|جند|حبیب|حجت|حزب|حفظ|حمد|خلق|خلیل|خیر|ذبیح|ذکر|رام|رحمت|رحم|رسول|روح|سیف|شمس|شکر|صدق|صدیق|عبد|عزت|عزیز|عین|فتح|فرج|فضل|قدرت|لطف|لعنت|نصرت|نصر|نظیر|نعمت|نور|هیبت|ولی|کلام|کلیم|ید|یوم': 'الله|اللهی',
        //اسم مرکب
        'مستند|هوا|روان|جریان|کار|مجسمه|ایمن|پیاده|مقاوم|امن|ساده|بهینه|مرتب|شبیه|ویکی|پل|جاده|راه': 'ساز',
        'احترام|اختلاف|اضطراب|اعجاب|افتخار|بحث|بر|تحسین|ترحم|تعجب|تعصب|تنفر|ت[اأ]ثر|ت[اأ]سف|ت[اأ]مل|جالب|جدل|جنجال|حزن|حیرت|خفت|خوف|خیال|چالش|دل|رعب|رقت|روح|شهوت|شور|شوق|شگفت|طرب|عبرت|غرور|غم|فرح|ملال|مهر|نشاط|نفرت|هراس|هوس|وحشت|ی[اأ]س': 'برانگیز|انگیز',
        'چهره|دور|تاریخ|خبر|روزنامه|روز|لرزه': 'نگار',
        'خود|روان|پاک|چرک|دست|پشت|زیر|پا|داستان': 'نویس',
        'زود|آرام|آب|کله|آش|بخار': 'پز',
        'مه|پیمان|یخ|سنگ|بت|صف': 'شکن',
        'خون': 'آشام|خوار|بار|گرم|سرد|بها',
        'شیطان|خدا|بت|خورشید|مهر|آتش|یزدان|ایزد|گاو|خود|آفتاب|یکتا|پول|حق|مال|میهن|نژاد': 'پرست',
        'پا[یئ]ین|بالا|عقب|جلو|کنار|ساده|بزرگ|کوچک|عمیق|رقیق|ضخیم|فهیم|گسترده': 'تر',
        'برگشت|انحنا|برش|انعطاف|مهمان|امکان|تفکیک|تغییر|آسیب|تأثیر|دل|سازش|مهاجر': 'پذیر|ناپذیر',
        'دانش': 'آموخته|پژوه|آموختگی',
        'بی': 'آلایش|ابهت|احترام|احساس|اختیار|اخلاق|ادب|اراده|ارزش|استعداد|استقامت|اصالت|اعتماد|اعتبار|اقتدار|امان|امنیت|انتها|اهمیت|بها|بو|تدبیر|تربیت|تسلط|تعصب|تقوی|توجه|ثبات|جنبه|حس|دریغ|دست و پا|دین|رنگ|روح|رویه|سابقه|سیم|شرف|شعور|لیاقت|مایه|مبالات|مزد|مزه|مصرف|معرفت|معنی|مقدار|مورد|نتیجه|نزاکت|نهایت|نیاز|وجدان|پایه|پرستیژ|پناه|پول|چاره|چیز|کار|دلیل|خبر|طرف|حجاب|هویت',
        //فعل
        'می': 'دانم',
        'عرضه': 'کننده|کنندگان',
        //صفت مرکب
        'ابرو': 'کمان|قیطان',
        'ابله': 'گونه',
        'ابن': 'الیوم|الوقت|السبیل|عباس',
       'اغراق|خشونت': 'آمیز',
        'اجاق': 'کور|زاده|سوز',
        'اجل': 'برگشته',
        'اسفل': 'السافلین',
        'اطلاع': 'رسان|رسانی|دهی',
        'انگشت': 'نما|نشان|پیچ',
        'سپاس|نام': 'گزار',
        'گوشت|گیاه|علف|شیر': 'خوار',
        'آدم': 'برفی|فروش|ربا|خوار',
        'آب': 'لمبو|تنی',
        'آتشین': 'پنجه',
        'ریش|سنگ|قلم': 'تراش',
        'آزرده': 'جان',
        'آزادی|جمهوری|تمامیت|عدالت|وطن|بنفشه|خود|بد': 'خواه',
        'آسوده': 'خاطر|وجدان',
        'آسیمه': 'سر',
        'آش': 'دهن|خور|پز',
        'آشفته': 'سامان|دماغ|روز',
        'آکنده': 'گوش|پهلو',
        'آلاخون': 'والاخون',
        'آمد': 'نیامد|شد',
        //'با': 'پرستیژ|ابهت|احساس|اخلاق|ادب|ارزش|استعداد|استقامت|اصالت|اقتدار|اهمیت|تدبیر|تربیت|تسلط|تعصب|تقوی',
        'باب': 'الحوائج',
        //'باقی|ته': 'مانده', bug > باقی مانده بود- ته مانده بود.
        'باد': 'نشسته|گرفته',
        'بار': 'خاطر',
        'بالا|پایین|پائین': 'تنه',
        'برنامه': 'نویس',
        'برنامه|طرح|بتون': 'ریز',
        'بزرگ': 'سال|مرد',
        'بزن': 'دررو|بهادر',
        'بد|خوش': 'سیرت|اخلاق|تراش|ترکیب|ریخت|ادا|استیل|اندام|بو|بینانه|بینی|پخت|برخورد|یمن|خوراک|خیم|رکاب|حال|مزه|حساب|پوش|اقبال|قلق|منظر|نام|نما',
        'بد': 'انجام|پیله|خوی|عنق|کاره|گمان|گوهر|لگام|مسب|مست|مهر',
        'بن': 'بست',
        'به': 'غایت',
        'حمله|بهره|پیشه|شعله|طاعت|طالع': 'ور',
        'بین': 'النهرین|الملل|الممالک',
        'پاچه': 'ورمالیده',
        'تکه|پاره|آتش|آهن|جگر|چهار': 'پاره',
        'ترویج|امداد|جهاد': 'گران|گر',
        'جهان|خدا|سود|شفا|نیرو|گرما|سرما': 'بخش',
        'پاک': 'نفس|سرشت|دامن|سیرت|منش|دیده',
        'پالان': 'سا[یئ]یده|دوز',
        'پراگنده|تاریک|شکسته|آشفته|آزرده|آسوده|بد|خوش|خونین|سیاه|نازک': 'دل',
        'پری': 'نژاد|چهر',
        'نیک|پست': 'فطرت',
        'پی': 'گم|گرد|فراخ|سپید|نوشت',
        'پیچ': 'واپیچ|پیچ',
        'سفید|سیاه|قهوه‌ای|قرمز|زرد|سبز|بنفش|گلگون|سرخ|پیروزه|مشک|نیل|مشکین': 'فام',
        'پیش': 'مرگ|کسوت',
        'تازه': 'وارد|خط|نفس|کار',
        'تام': 'الاختیار',
        'خوش|زشت|ترش': 'رو',
        'ترگل': 'ور گل',
        'تکه': 'تکه',
        'تن': 'فروش|آسان|آرا|تن|پرور',
        'تند': 'خو|خوی',
        'تنگ': 'چشم',
        'تی': 'تیش',
        'پا|تن|زیر|سبز|سرخ|قرمز': 'پوش',
        'تیره': 'روز',
        'جامع': 'الشرایط|الاطراف',
        'جان': 'سخت|جانی',
        'یدک|فرو|نسل|آدم|ویروس|نقشه|سر|آب|آچار': 'کش',
        'کشتی|گرده|دشت|نگه|دید|زمین|جنگل|دروازه': 'بان',
        'چابک': 'سوار|دست',
        'نقاره|چاپ': 'چی',
        'چرب': 'زبان|ترازو',
        'چشمه': 'چشمه',
        'چل': 'کلید|تاج|تکه',
        'ناقاره|چوبک|دف|دمبک|ساز|نی|سنتور|تار|ارگ': 'زن',//رده:نوازندگان گیتار زن اهل
        'چیره': 'دست',
        'پول|فنگ|قالی|ظرف|خشک|لباس': 'شو[ئی]ی',
        'چیز': 'فهم',
        'حرف': 'شنو',
        'حق': 'السکوت|التدریس|الزحمه',
        'حکیم': 'باشی',
        'حرام|حلال': 'زاده',
        'حیرت': 'زده',
        'حیرت|نام|مقام|یاد|خواب|درد|شگفت|جمع': 'آور',
        'خاله': 'زنک',
        'خام': 'طمع|طبع',
        'خشک': 'سر',
        'خنده': 'رو|خریش',
        'خواجه': 'سرا|تاش',
        'سگ|مرغ|خوک': 'دانی',
        'خونین': 'جگر|چشم|شهر',
        'دایم': 'الخمر',
        'دائم': 'الصوم|الخمر',
        'درشت': 'خو',
        'دست': 'نویس|خوش|پاچه|چین|آورد',
        'دم': 'کلفت',
        'دندان': 'گرد',
        'دودوزه': 'باز',
        'ذوات': 'الارحام|الاذناب',
        'ذوی': 'القربی|الاوتار|العقول',
        'ذی': 'نفع|صلاحیت|فقار|ربط|قیمت|شعور|علاقه|حیات|فن|روح|عقل|حق',
        'چشم|بار|بر|پس|تیر|رو|زیر|غلط': 'انداز',
        'رای': 'دهنده|دهندگان',
        'راست': 'راستکی',
        'رحمت': 'العالمین',
        'رسم': 'الخط',
        'رقیق': 'القلب|الفکر',
        'رنگ': 'وارنگ',
        'اندود': 'کاری',
        'سنگ|ریز|دانه|تک|بزرگ|رنگ': 'دانه',
        'رو[یئ]ین|پاد|نرم|سخت': 'تن',
        'ریش': 'ریش',
        'رئیس': 'الوزراء|الرؤسا',
        'تصویب|کار|واژه|اجازه|تکذیب|شب|پایان|اساس|آ[یئ]ین': 'نامه',
        'زنگی': 'مزاج',
        'زوار': 'دررفته',
        'زیست': 'محیط|بوم',
        'سابق|اخیر|فوق|لازم': 'الذکر',
        'سابقه': 'سالار',
        'سبک': 'مغز|سنگ|عنان|روح|لقا|سایه|سنگین|دست',
        'سربه': 'مهر',
        'سریع': 'السیر|الانتقال',
        'سست': 'زخم|رگ|ریش|عنصر',
        'سنگ': 'فرش',
        'دو|سه|چهار': 'پایه',
        'سیاه': 'مست|سوخته|چرده',
        'سینه': 'چاک',
        'شب': 'رنگ|پره|اداری',
        'شبانه': 'روزی',
        'شکسته': 'ناخن|مزاج',
        'شلم': 'شوربا',
        'شوخ': 'طبع|رو|دیده|چشم',
        'شوم|نیک|بلند|بد': 'اختر|اقبال',
        'شوی': 'دیده',
        'شیرین': 'عقل|دهن',
        'صد': 'شاخ',
        'قتل|بار': 'عام',
        'صف': 'آوار',
        'ضرب': 'المثل|العجل',
        //طبق بندهای    شماره ..
        //'طبق|زمان': 'بند', 
        'طبقه|زمان|درجه|رده|گروه|رتبه|دسته|جمله|تقسیم|بسته|آرماتور|اسکلت|امتیاز|بخش|جدول|جمع|جناح|رنگ|ساز|سایز|سرهم|سطح|شرط|شکم|فاز|فصل|قاب|پارتیشن|چشم|کادر|کمر|گاو|نیم': 'بند',
        'طوطی': 'وار',
        'وطن': 'پرست',
        'طویل': 'المدت',
        'طی': 'الارض',
        'هنر|عاشق': 'پیشه',
        'عالی': 'نسب',
        'عام': 'المنفعه',
        'عدیم': 'النظیر',
        'عقب': 'گرد|نشینی',
        'علی': 'البدل',
        'عیال': 'وار',
        'غلط': 'غلوط',
        'فارغ': 'الاکناف|التحصیل',
        'فراخ': 'رو|شکم|بال|کام|دیده|سخن|آهنگ|دست|آستین|ابرو|روزی',
        'فرخ': 'لقا|دیم|فال|پی',
        'فرمان': 'روا|بر',
        'فرنگی': 'مآب',
        'غیر': 'قابل|متعهد|اخلاقی|شرعی|انسانی|اصولی|مجاز|حضوری|دولتی|نظامی|انتفاعی|منتظره|قانونی|معمولی|ممکن|رسمی|فعال|نفتی|منقول|ارادی|جایز|طبیعی|عادی|عمد|لازم|مسئول|عادلانه|خودی|عاقلانه|کافی',
        'وفا|فره|نیاز|جفا|خرد|غیرت|باور|ارزش|نعل|درد|علاقه': 'مند',
        'فرو': 'نهادن|داشت|گذاشت|مایه|بست|پاشی|پاشیده',
        'فوق': 'الذکر',
        'خارق|فوق': 'العاده',
        'کیلو|سانتی|میلی|دسی|نانو|ولت': 'متر|آمپر|گرم',
        'قاچ': 'قاچ',
        'قافله': 'سالار',
        'قایم': 'الزاویه',
        'قدسی': 'مآب',
        'قره': 'قاطی',
        'قریب': 'الوقوع',
        'کاه|قطره|دله|آفتابه': 'دزد',
        'قوی': 'پنجه',
        'قیمه': 'قیمه',
        'کاسه': 'یکی|سیاه|لیس',
        'کج': 'نهاد|خلق|کلاه',
        'کلاه': 'گوشه|گذار',
        'کله': 'معلق|خشک|گنده|خر|شق|پوک',
        'زبانه|زمین|ماشین|فرمان|کمان|کنگره|گوشه|دامنه|خانه|پول|مقام|آ[یئ]ینه|عهده': 'دار',
        'مصاحبه': 'شونده|شوندگان|کننده|کنندگان',
        'کهن': 'سال|دیار',
        'کینه': 'توز|ورز',
        'گران': 'مغز|سایه|قدر|رکاب|سرشت|پایه|قیمت|روح|سنگ|جان|سر|فروش',
        'گربه': 'گون|کوره',
        'گشاده': 'رو|دست',
        'گل': 'چهره|ریزان|ریز|گون|باران|آرا|اندام|برگ',
        'گلوله': 'باران',
        'ناهم|هم|گندم': 'گون',
        'لازم': 'الوصول|الاجراء',
        'مشکوک|معلوم|مجهول|فارغ': 'الحال',
        'لت': 'لت|انبان|انبار',
        'لسان': 'الغیب',
        'مالک': 'الرقاب',
        'ماه': 'طلعت',
        'مشغول': 'الذمه',
        'معظم': 'له|القدر',
        'ملی|همجنس|زمینه|آرمان': 'گرا',
        'میرزا': 'قلمدان|قشمشم|بنویس',
        'ناخن': 'خشک',
        'نازک': 'نی|نارنجی|خیال',
        'جهان|نافه': 'گشا',
        'ندید': 'بدید',
        'نظریه|رویا|رؤیا': 'پرداز',
        'نقشه|وزنه|بهره|کلاه': 'بردار',
        'نق': 'نقو',
        'نگون': 'طشت|بخت',
        'نیک': 'روز|انجام|پی|اختر|بخت',
        'نیم': 'ته|بسمل',
        'هرکن': 'پرکن',
        'همایون': 'فال|آثار|بخت',
        'همه': 'کاره|جانبه',
        'هیچ': 'کاره|گاه|یک|کس|کدام',
        'ول': 'خرج|معطل',
        'یکه': 'شناس|بزن|سوار|تاز',
        'ابجد': 'خوان',
        'ابر': 'آلود|قدرت|ابزار',
        'ابو': 'العجب|الکلام|الهول',
        'اولو': 'الالباب|الامر|العزم',
        'حسب|صاحب|واجب': 'الامر',
        'گل|آذر': 'گون',
        'آزاد': 'مرد|وار',
        'باز': 'خرید|خواست|دید|بین',
        'بر': 'هم|آشفتگی|آشفته|پایی',
        'بلند': 'آوازه|پایه',
        'آتش': 'بس|نشان|سوزی|افروز|افکن|افزار',
        'پا': 'برجا|برهنه|بست|پتی|کار',
        'پایه|بنیان': 'گذار|گذاری',
        //'مادر|خواهر|برادر|فرزند|پدر': 'خوانده', // bug > وی پدر خوانده شد.(پدر صدا زده شد)
        'پر': 'ابهام|ابهت|اتلاف|ادا|ادویه|ازدحام|استرس|استقامت|اشک|برخورد|ترانه|تردد|ترشح|تشبیه|تصادف|تعصب|تقلب|تلاش|تملق|شور',
        'کم': 'محل|بضاعت|کم|یاب',
        'پر|کم': 'نظیر|کار|تعداد|اشتباه|اشکال|اهمیت|تحرک|تحول|ترافیک|تراکم|تقاضا|تکرار|تنش|تنوع|رو|آب',
        'تنگا': 'تنگ',
        'تیز': 'پا|دست|دندان|هوش|بین',
        'چادر|تخت|زاغه|شهر|ته|آب|کاخ|پایتخت|یکجا|ییلاق': 'نشین',
        'چهار': 'شانه',
        'ویروس': 'شناس|یاب',
        'یاد': 'داشت|دهی',
        'یار': 'کشی',
        'ی[اأ]س': 'آلود',
        'حاضر': 'جواب|یراق',
        'خرد': 'سال',
        'دو': 'برجی|تخمه|سره|قلو|به‌شک',
        'ذو': 'الجلال|العرش|القدر|القوافی|اللسانین|المجد|المکارم|المن|المناقب|المنن|النور|الوجهین|جسدین',
        'رنگا': 'رنگ',
        'رو': 'سفید|سیاه|باز',
        'قهوه|نگار|آبدار|گل|کتاب': 'خانه',
        'روز': 'افزون|انه',
        'زود': 'باور',
        'شاد': 'روان|کام|مان|مانه',
        'فرا': 'خور|روی',
        'کد': 'خدا|بانو',
        'گردا': 'گرد',
        'لا': 'ابالی|جون|کردار|مذهب|مروت|یتغیر|یتناهی|یزال|یعقل',
        'نا': 'جوانمرد|خودآگاه|نجیب|امید|آزموده|آشنا|آگاه|برابر|تمام',
        'ایمن|پیاده|مقاوم|امن|ساده|بهینه|مرتب|آماده|رها|آگاه|زیبا|یکسان|روان|ذخیره|استاندار|متمایز|جدا|شخصی|انبوه|خصوصی': 'سازی'
    };

    //----------------------------------------Wrong dictations-----------------------
    dictionary.forReplace = {
       'آندروید': 'اندروید',
       'واشنگتن': 'واشینگتن',
       'واشنگتون': 'واشینگتن',
       'واشینگتون': 'واشینگتن',
       'زیمباوه': 'زیمبابوه',
       'به شخصه': 'بشخصه',
       'به‌شخصه': 'بشخصه',
       'به عینه': 'بعینه',
       'به‌عینه': 'بعینه',
       'احمدی نژاد': 'احمدی‌نژاد',
       'جابه جا': 'جابه‌جا',
       'جا به جا': 'جابه‌جا',
       'جا به‌جا': 'جابه‌جا',
       'بی بی سی': 'بی‌بی‌سی',
       'اف بی آی': 'اف‌بی‌آی',
        'می سی سی پی': 'می‌سی‌سی‌پی',
        //'میسیسیپی': 'می‌سی‌سی‌پی',
        'ویژه‌گی': 'ویژگی',
        'دایره‌المعارف': 'دایرةالمعارف',
        'دایره المعارف': 'دایرةالمعارف',
        'تأئید': 'تأیید',
        'تائید': 'تأیید',
        'بقیه‌الله': 'بقیةالله',
        'بقیه الله': 'بقیةالله',
        'بقیة الله': 'بقیةالله',
        'دگمه': 'دکمه',
        'وحله': 'وهله',
        //'هاوی': 'حاوی', ممکن است اسم خاص باشد
        'نقطه‌نظر': 'دیدگاه',
        'ناچاراً': 'به‌ناچار',
        'ناچارا': 'به‌ناچار',
        'منیت': 'منی',
        'منیٔت': 'منی',
        'فرآیند': 'فرایند',
        'فرآیندها': 'فرایندها',
        'کارآیی': 'کارایی',
        'ملاحضه': 'ملاحظه',
        'ملیون': 'میلیون',
        'ملیارد': 'میلیارد',
        'مطمعن': 'مطمئن',
        'مرهمت': 'مرحمت',
        'مرحم': 'مرهم',
        'محصوب': 'محسوب',
        'مذبور': 'مزبور',
        'متعصفانه|متاصفانه': 'متأسفانه',
        'متغییر': 'متغیر',
        'لشگر': 'لشکر',
        'لحجه': 'لهجه',
        'گاهاً': 'گاهی',
        'گاها': 'گاهی',
        'کهکیلویه': 'کهگیلویه',
        'قائله': 'غائله',
        'فارق‌التحصیل': 'فارغ‌التحصیل',
        'علاالدین': 'علاءالدین',
        'علم‌شنگه': 'الم‌شنگه',
        'غلطاندن': 'غلتاندن',
        'ظبط': 'ضبط',
        'طنبور': 'تنبور',
        'طپش': 'تپش',
        'ضمینه': 'زمینه',
        'زخامت|ذخامت': 'ضخامت',
        'زخیم|ذخیم': 'ضخیم',
        'صحفه': 'صفحه',
        //'سوماً': 'سوم',
        //'سوما': 'سوم',
        'سفارشاً': 'سفارشی',
        'سفارشا': 'سفارشی',
        'سرلشگر': 'سرلشکر',
        'سپاسگذار': 'سپاسگزار',
        'خبرگذار': 'خبرگزار',
        'ساتع': 'ساطع',
        'زنده‌گی': 'زندگی',
        'زباناً': 'زبانی',
        'زبانا': 'زبانی',
        'رهبریت': 'رهبری',
        'در باره': 'درباره',
        'دوئیت': 'دوگانگی',
        //'دوماً': 'دوم',
        //'دوما': 'دوم',
        'داوطلبین': 'داوطلبان',
        'خوشنود': 'خشنود',
        'خوبیت': 'خوبی',
        'خوانواده': 'خانواده',
        'خواستگاه': 'خاستگاه',
        'خرشید': 'خورشید',
        'خردن': 'خوردن',
        'خانند': 'خوانند',
        'خابیدن': 'خوابیدن',
        'حظور': 'حضور',
        'حظرت': 'حضرت',
        'حدلامکان': 'حتی‌الامکان',
        'حاظر': 'حاضر',
        'چهارماً': 'چهارم',
        'چهارما': 'چهارم',
        'چارشنبه': 'چهارشنبه',
        'جاناً': 'جانی',
        //'جانا': 'جانی', باگ در [[جانا رودین]]
        'توجیح': 'توجیه',
        'توضیع': 'توزیع',
        'تلوزیون': 'تلویزیون',
        'تضاهر': 'تظاهر',
        'ترجیه': 'ترجیح',
        'پنچ': 'پنج',
        'پزشگی': 'پزشکی',
        'پرفسور': 'پروفسور',
        'پاتوغ': 'پاتوق',
        'بی‌مهابا': 'بی‌محابا',
        'بنیانگزار': 'بنیانگذار',
        'بلقور': 'بلغور',
        'بلاخره': 'بالاخره',
        'برخواستن': 'برخاستن',
        'برعلیه': 'علیه',
        'برخواست': 'برخاست',
        'بدیت': 'بدی',
        'باطلاق': 'باتلاق',
        'بازرسین': 'بازرسان',
        'بارگزار': 'بارگذار',
        'باجناق': 'باجناغ',
        'باباقوری': 'باباغوری',
        'آروق': 'آروغ',
        'انظباط': 'انضباط',
        'التفاط': 'التفات',
        'افضل‌تر': 'بهتر',
        'افسنطین': 'افسنتین',
        'اعلم‌تر': 'داناتر',
        'اطو': 'اتو',
        'اطراق': 'اتراق',
        'اطاق': 'اتاق',
        'اصطرلاب': 'اسطرلاب',
        'ارتقاع': 'ارتقا',
        'اختاپوث': 'اختاپوس',
        'ابولفضل': 'ابوالفضل',
        'امپراطور': 'امپراتور',
        //'طوسی': 'توسی', خواجه نصیرالدین طوسی را به تبدیل می کرد
        'آزوقه': 'آذوقه',
        'ذکام': 'زکام',
        'بگیر و ببند': 'بگیر ببند',
        'ساز و کار': 'سازوکار',
        'جر و بحث': 'جربحث',
        'خوار و بار': 'خواربار',
        'احجام': 'حجم‌ها',
        'اقشار': 'قشرها',
        'لازم به ذکر است': 'لازم است ذکر شود',
        'بدلیل':'به دلیل',
        //برپایه http://www.persianacademy.ir/fa/pishvand.aspx
        'آن‌را': 'آن را',
        'این‌را': 'این را',
        'هیات': 'هیئت',
        'هیأت': 'هیئت',
        'رییسه': 'رئیسه',
        'رییس': 'رئیس',
        'مساله': 'مسئله',
        'مسأله': 'مسئله',
        'همین جا': 'همین‌جا',
        'همینجا': 'همین‌جا',
        'همینطور': 'همین‌طور',
        'همین طور': 'همین‌طور',
        'همان جا': 'همان‌جا',
        'همانجا': 'همان‌جا',
        'همان طور': 'همان‌طور',
        'همانطور': 'همان‌طور',
        'هیچکدام': 'هیچ‌کدام',
        'هیچ کدام': 'هیچ‌کدام',
        'هیچکس': 'هیچ‌کس',
        'هیچ کس': 'هیچ‌کس',
        'هیچیک': 'هیچ‌یک',
        'هیچ یک': 'هیچ‌یک',
        'هم‌دیگر': 'همدیگر',
        'عبدالهی': 'عبداللهی',
        'آن چه': 'آنچه',
        'آن‌چه': 'آنچه',
        'چنان چه': 'چنانچه',
        'چنانچه': 'چنانچه',
        'چنان که': 'چنان‌که',
        'چنانکه': 'چنان‌که',
        'ئیدروژن': 'هیدروژن',
        //بدل از تنوین
        'بعضن': 'بعضاً',
        'غالبن': 'غالباً',
        'کاملن': 'کاملاً',
        'احتمالن': 'احتمالاً',
        'اصلن': 'اصلاً',
        'اشتباهن': 'اشتباهاً',
        'منشاء': 'منشأ',
        'مبداء': 'مبدأ',
        //وپ:کوته‌نوشت
        //رجوع کنید
       'ر\\. ?ک\\.?': 'ر.ک.',
        //هجری خورشیدی
        '[هﻫﻩ]\\u200D?\\. ?خ\\.?': 'ه‍.خ',
        '[هﻫﻩ]\\u200D?[\\u200C ]خ': 'ه‍.خ',
        //هجری قمری
        '[هﻫﻩ]\\u200D?\\. ?ق\\.?': 'ه‍.ق',
        '[هﻫﻩ]\\u200D?[\\u200C ]ق': 'ه‍.ق',
        //هجری شمسی
        '[هﻫﻩ]\\u200D?\\. ?ش\\.?': 'ه‍.ش',
        '[هﻫﻩ]\\u200D?[\u200C ]ش': 'ه‍.ش',
        //الی آخر
        'الخ\\.': 'الخ'
    };

    return dictionary;
}());
if (typeof window !== 'undefined') {
    window.persianToolsDictionary = persianToolsDictionary;
}
/*global mw*/
//Selected from [[:en:WP:AutoEd]] scripts
var autoEd = (function () {
    "use strict";
    //---------------------isbn.js--------------------------------------
    function autoEdISBN(str) { //MAIN FUNCTION describes list of fixes

        //Allows WikiMagic to work with ISBNs
        str = str.replace(/ISBN *\-10:|ISBN *\-13:|ISBN *\-10|ISBN *\-13|ISBN:/gi, "ISBN");
        //ISSN regexs from [[:en:Wikipedia:AutoWikiBrowser/Settings/ISSN]]
        str = str.replace(/ISSN\s*(\d)/gi,"ISSN $1");
        str = str.replace(/ISSN (\d)(\d)(\d)(\d)[\.\: ~\=]*(\d)(\d)(\d)([\dx])/gi,"ISSN $1$2$3$4-$5$6$7$8 ");
        str = str.replace(/ISSN (\d)(\d)(\d)(\d)\-(\d)(\d)(\d)x/gi,"ISSN $1$2$3$4-$5$6$7X");
        str = str.replace(/ISSN (\d)(\d)(\d)(\d)\-(\d)(\d)(\d)x/gi,"ISSN $1$2$3$4-$5$6$7X");

        //ISBN regexs from [[:Wikipedia:AutoWikiBrowser/Settings/ISBN-hyph]]
        str = str.replace(/ISBN(\d)/gi,"ISBN $1");
        str = str.replace(/\[\[ *(ISBN [\d\-x]{10,13}) *\]\]/gi,"$1");
        str = str.replace(/\[\[ISBN\|(ISBN\s*[^\]]*)\]\]/gi,"$1");
        str = str.replace(/\[*ISBN\]*\:*[ \t]+([0-9X\-]+)/gi,"ISBN $1");
        str = str.replace(/ISBN +([\d-]{1,9}) (\d+|X\W)/gi,"ISBN $1$2");
        str = str.replace(/\[*ISBN\]*\:* *\[\[Special\:Booksources\/\d*\|([\dxX\- ]+)\]\]/gi,"ISBN $1");
        str = str.replace(/\[isbn\]\:* *(\d)/gi,"ISBN $1");
        str = str.replace(/ISBN (\d{10,10}) - *(\d)/gi,"ISBN $1 ,$2");
        var loopcount = 0;
        while (loopcount<10) { //'
            str = str.replace(/ISBN (\d{1,9}) (\d|x)/gi,"ISBN $1$2");
            loopcount++;
        }
        str = str.replace(/ISBN (\d{1,9})(x)/gi,"ISBN $1X");
        str = str.replace(/ISBN (\d\d\d\d\d\d\d\d\d(\d|x)) +(\d)/gi,"ISBN $1, $3");
        str = str.replace(/ISBN ([\d-]{12,12}) (\d|x)/gi,"ISBN $1-$2");
        /* broken ISBNs with hyphens */
        // autoFormatter.js > cleanISBNs 
        str = str.replace(
            /(^|[\s#'(*>|])(?:(ISBN\d?\s*=\s*)|ISBN(?:-?1[03]\b| *1[03]:)?:?\s*)(9-?7-?[89]-?)?([013][\d\u2010-\u2012\u2212-]{8,}[\dX]\b)/gim,
            function( $0, $1, $2, $3, $4 ) {
                return $1 + ( $2 || 'ISBN ' ) + ( $3 || '' ).replace( /^9\D*7\D*(\d)\D*/, '97$1-' ) + $4
                    /* Remove all dashes */
                    .replace( /[^\dX]+/gi, '' )
                    /* Group 0 for English books */
                    .replace( /^0([01]\d)(\d{6})\B/, '0$1-$2-' )
                    .replace( /^0([2-6]\d\d)(\d{5})\B/, '0$1-$2-' )
                    .replace( /^0(7\d{3}|8[0-4]\d\d)(\d{4})\B/, '0$1-$2-' )
                    .replace( /^0(8[5-9]\d{3})(\d{3})\B/, '0$1-$2-' )
                    .replace( /^0(9[0-4]\d{4})(\d\d)\B/, '0$1-$2-' )
                    .replace( /^0(9[5-9]\d{5})(\d)\B/, '0$1-$2-' )
                    /* Group 1 for English books */
                    .replace( /^1(0\d)(\d{6})\B/, '1$1-$2-' )
                    .replace( /^1([1-3]\d\d)(\d{5})\B/, '1$1-$2-' )
                    .replace( /^1(4\d{3}|5[0-4]\d\d)(\d{4})\B/, '1$1-$2-' )
                    .replace( /^1(5[5-9]\d{3}|[67]\d{4}|8[0-5]\d{3}|86[0-8]\d\d|869[0-7]\d)(\d{3})\B/, '1$1-$2-' )
                    .replace( /^1(869[89]\d\d|8[7-9]\d{4}|9[0-8]\d{4}|99[0-8]\d{3})(\d\d)\B/, '1$1-$2-' )
                    .replace( /^1(999\d{4})(\d)\B/, '1$1-$2-' )
                    /* Group 3 for German books */
                    .replace( /^3(0[0-24-9]|1\d)(\d{6})\B/, '3$1-$2-' )
                    .replace( /^3(03[0-3]|[2-6]\d\d)(\d{5})\B/, '3$1-$2-' )
                    .replace( /^3(03[4-6]\d|7\d{3}|8[0-4]\d\d)(\d{4})\B/, '3$1-$2-' )
                    .replace( /^3(03[7-9]\d\d|8[5-9]\d{3}|95[4-9]\d\d|9[69]\d{3})(\d{3})\B/, '3$1-$2-' )
                    .replace( /^3(9[0-4]\d{4})(\d\d)\B/, '3$1-$2-' )
                    .replace( /^3(95[0-3]\d{4}|9[78]\d{5})(\d)\B/, '3$1-$2-' )
                    /* Add missing dash after group */
                    .replace( /^([0-57]|6\d\d|8\d|9[0-4]|9[5-8]\d|99[0-8]\d|999\d\d)\B/, '$1-' );
            }
        );
        return str
    }

    //---------------------whitespace.js--------------------------------
    function autoEdWhitespace(str) { //MAIN FUNCTION describes list of fixes

        str = str.replace(/\t/g, " ");

        str = str.replace(/^ ? ? \n/gm, "\n");
        str = str.replace(/(\n\n)\n+/g, "$1");
        str = str.replace(/== ? ?\n\n==/g, "==\n==");
        str = str.replace(/\n\n(\* ?\[?http)/g, "\n$1");

        str = str.replace(/^ ? ? \n/gm, "\n");
        str = str.replace(/\n\n\*/g, "\n*");
        //  str = str.replace(/[ \t][ \t]+/g, " ");
        str = str.replace(/([=\n]\n)\n+/g, "$1");
        str = str.replace(/ \n/g, "\n");

        //==Headings==
        str = str.replace(/^(={1,4} )[ ]*([^= ][^=]*[^= ])[ ]*( ={1,4})$/gm, "$1$2$3");
        str = str.replace(/^(={1,4})([^= ][^=]*[^= ])[ ]+(={1,4})$/gm, "$1$2$3");
        str = str.replace(/^(={1,4})[ ]+([^= ][^=]*[^= ])(={1,4})$/gm, "$1$2$3");

        return str;
    }

    //---------------------htmltowikitext.js--------------------------------
    //Convert HTML to wikitext
    function autoEdHTMLtoWikitext(str) {
        // <b>, <strong>, <i>, and <em> tags
        str = str.replace(/<(B|STRONG)[ ]*>((?:[^<>]|<[a-z][^<>]*\/>|<([a-z]+)(?:| [^<>]*)>[^<>]*<\/\3>)*?)<\/\1[ ]*>/gi, "'''$2'''");
        str = str.replace(/<(I|EM)[ ]*>((?:[^<>]|<[a-z][^<>]*\/>|<([a-z]+)(?:| [^<>]*)>[^<>]*<\/\3>)*?)<\/\1[ ]*>/gi, "''$2''");
        // </br>, <\br>, <br\>, <BR />, ...
        str = str.replace(/<[\\\/]+BR[\\\/\s]*>/gim, "<br />");
        str = str.replace(/<[\\\/\s]*BR[\s]*[\\\/]+[\s]*>/gim, "<br />");
        // <.br>, <br.>, <Br>, ...
        str = str.replace(/<[\s\.]*BR[\s\.]*>/gim, "<br>");
        // <br>>, <<br />, <<br >> ...
        str = str.replace(/<[\s]*(<br[\s\/]*>)/gim, "$1");
        str = str.replace(/(<br[\s\/]*>)[\s]*>/gim, "$1");

        str = str.replace(/<[\\\/\s]*REFERENCES[\\\/\s]*>/gim, "<references />");
        // Repeated references tag
        str = str.replace(/(<references \/>)[\s]*\1/gim, "$1");
        // Make sure <H1>, ..., <H6> is after a newline
        str = str.replace(/([^\r\n ])[\t ]*(<H[1-6][^<>]*>)/gim, "$1\n$2");
        // Make sure </H1>, ..., </H6> is before a newline
        str = str.replace(/(<\/H[1-6][^<>]*>)[\t ]*([^\r\n ])/gim, "$1\n$2");
        // Remove newlines from inside <H1>, ..., <H6>
        var loopcount = 0;
        while (str.search(/<H([1-6])[^<>]*>(?:[^<>]|<\/?[^\/h\r\n][^<>]*>)*?<\/H\1[^<>]*>/gim) >= 0 && loopcount <= 10) {
            str = str.replace(/(<H)([1-6])([^<>]*>(?:[^<>]|<\/?[^\/h\r\n][^<>]*>)*?)[\r\n]((?:[^<>]|<\/?[^\/h\r\n][^<>]*>)*?<\/H)\2([^<>]*>)/gim, "$1$2$3 $4$2$5");
            loopcount++;
        }
        // Replace <H1>, ..., <H6> with wikified section headings
        str = str.replace(/(^|[\r\n])[\t ]*<H1[^<>]*>([^\r\n]*?)<\/H1[\r\n\t ]*>[\t ]*([\r\n]|$)/gim, '$1=$2=$3');
        str = str.replace(/(^|[\r\n])[\t ]*<H2[^<>]*>([^\r\n]*?)<\/H2[\r\n\t ]*>[\t ]*([\r\n]|$)/gim, '$1==$2==$3');
        str = str.replace(/(^|[\r\n])[\t ]*<H3[^<>]*>([^\r\n]*?)<\/H3[\r\n\t ]*>[\t ]*([\r\n]|$)/gim, '$1===$2===$3');
        str = str.replace(/(^|[\r\n])[\t ]*<H4[^<>]*>([^\r\n]*?)<\/H4[\r\n\t ]*>[\t ]*([\r\n]|$)/gim, '$1====$2====$3');
        str = str.replace(/(^|[\r\n])[\t ]*<H5[^<>]*>([^\r\n]*?)<\/H5[\r\n\t ]*>[\t ]*([\r\n]|$)/gim, '$1=====$2=====$3');
        str = str.replace(/(^|[\r\n])[\t ]*<H6[^<>]*>([^\r\n]*?)<\/H6[\r\n\t ]*>[\t ]*([\r\n]|$)/gim, '$1======$2======$3');
        //Replace <ol><li> with #
        str = str.replace(
                    /(\<ol\>[\s\S]+\<\/ol\>)/g,
                    function($1) {
                        return $1.replace(/[\r\n] *\<li\>/g,'\n# ').replace(/\<\/li\>/g,'');
                    }
                ).replace(/\n\<\/?ol\>/g,'')
        //Replace <ul><li> with *
        str = str.replace(
                    /(\<ul\>[\s\S]+\<\/ul\>)/g,
                    function($1) {
                        return $1.replace(/[\r\n] *\<li\>/g,'\n* ').replace(/\<\/li\>/g,'');
                    }
                ).replace(/\n\<\/?ul\>/g,'')

        return str;
    }

    //---------------------headlines.js--------------------------------
    function autoEdHeadlines(str) { //MAIN FUNCTION describes list of fixes

        // Remove bold from section headings
        var loopcount = 0;
        while (str.search(/^[=]{1,5}[^=\r\n]*'''[^=\r\n]*[=]{1,5}/gim) >= 0 && loopcount <= 10) { //'
            str = str.replace(/(^[=]{1,5}[^=\r\n]*)'''([^=\r\n]*[=]{1,5})[\t ]*/gim, "$1$2"); //'
            loopcount++;
        }

        // Remove trailing colon from section headings
        str = str.replace(/(^[=]{1,5}[^=\r\n]*)[:]([\t ]*[=]{1,5})[\t ]*/gim, "$1$2");

        // Correct caps in "See also" section
        str = str.replace(/(==[\t ]*)see also([\t ]*==)/gi, "$1See also$2");

        // Change common synonyms for "See also" to "See also", but only if "See also" doesn't exist
        if (!str.match(/=[\t ]*See also[\t ]*=/gi)) {
            str = str.replace(/(==[\t ]*)(?:related topics|related articles|internal links|also see)([\t ]*==)/gi, "$1See also$2");
        }
        // Common synonyms for "External links"
        str = str.replace(/(==[\t ]*)(?:external links?|outside links?|web ?links?|exterior links?)([\t ]*==)/gi, "$1External links$2");

        // Capitalization and/or plural of "References", "Sources", "Further reading"
        str = str.replace(/(==[\t ]*)references([\t ]*==)/gi, "$1References$2");
        str = str.replace(/(==[\t ]*)sources([\t ]*==)/gi, "$1Sources$2");
        str = str.replace(/(==[\t ]*)further readings?([\t ]*==)/gi, "$1Further reading$2");

        return str;
    }


    //---------------------tablestowikitext.js--------------------------------
    function autoEdTablestoWikitext(str) { //MAIN FUNCTION describes list of fixes

        // Remove newlines from inside table specific tags
        var loopcount = 0;
        while (str.search(/(?:<\/?table|<\/?tr|<\/?td|<\/?th)[^<>]*[\r\n]/gi) >= 0 && loopcount <= 10) {
            str = str.replace(/((?:<\/?table|<\/?tr|<\/?td|<\/?th)[^<>]*)[\r\n]/gi, "$1 ");
            loopcount++;
        }
        // Remove extra whitespace from inside table specific tags
        str = str.replace(/(<table|<tr|<td|<th)([^<>]*?)[\s]+(>)/gim, "$1$2$3");
        str = str.replace(/(<table|<tr|<td|<th)([^<>]*?)[\s][\s]+/gim, "$1$2 ");
        // Remove any extra junk </tr>, </td>, </th>, </table>
        str = str.replace(/(<\/table|<\/tr|<\/td|<\/th)[^<>]+(>)/gim, "$1$2");
        // Remove space whitespace after </tr>, </td>, </th>, <table>
        str = str.replace(/(<\/tr>|<\/td>|<\/th>|<table[^<>]*>)[\s]+/gim, "$1");
        // Remove space before <tr>, <td>, <th>, </table>
        str = str.replace(/[\s]+(<\/table>|<tr[^<>]*>|<td[^<>]*>|<th[^<>]*>)/gim, "$1");
        // Replace '<table>' with '{|'
        str = str.replace(/<table( [^<>]*|)>[\s]*/gim, "{|$1\n");
        // Replace '</table>' with '|}'
        str = str.replace(/[\s]*<\/table>/gi, "\n|}");
        // Replace '</td><td>' with '||'
        str = str.replace(/<\/td[\s]*>[\s]*<td[\s]*>/gim, "||");
        str = str.replace(/<\/td[\s]*>[\s]*<td ([^<>]+)>/gim, "|| $1 |");
        // Replace '</th><th>' with '!!'
        str = str.replace(/<\/th[\s]*>[\s]*<th[\s]*>/gim, "!!");
        str = str.replace(/<\/th[\s]*>[\s]*<th ([^<>]+)>/gim, "!! $1 |");
        // Replace '</td></tr>' and '</th></tr>' with EOL
        str = str.replace(/<\/(?:td|th)>[\s]*<\/tr>[\s]/gim, "\n");
        // Replace '</td>', '</th>', '</tr>' with EOL
        str = str.replace(/<\/(?:td|th|tr)>[\s]*/gim, "\n");
        // Replace '<tr>' with '|-'
        str = str.replace(/[\s]*<tr>[\s]*/gim, "\n|-\n");
        str = str.replace(/[\s]*<tr ([^<>]*)>[\s]*/gim, "\n|- $1\n");
        // Replace '<td>' with "|"
        str = str.replace(/[\s]*<td>([^\s])/gim, "\n| $1");
        str = str.replace(/[\s]*<td>([\s])/gim, "\n|$1");
        str = str.replace(/[\s]*<td[\s]*([^<>]*?)[\s]*>([^\s])/gim, "\n| $1 | $2");
        str = str.replace(/[\s]*<td[\s]*([^<>]*?)[\s]*>([\s])/gim, "\n| $1 |$2");
        // Replace '<th>' with '!'
        str = str.replace(/[\s]*<th>([^\s])/gim, "\n! $1");
        str = str.replace(/[\s]*<th>([\s])/gim, "\n!$1");
        str = str.replace(/[\s]*<th[\s]*([^<>]*?)[\s]*>([^\s])/gim, "\n! $1 | $2");
        str = str.replace(/[\s]*<th[\s]*([^<>]*?)[\s]*>([^\s])/gim, "\n! $1 |$2");

        return str;
    }

    //---------------------extrabreaks.js--------------------------------
    function autoEdExtraBreaks(str) { //MAIN FUNCTION describes list of fixes

        //Usually unneeded BR tags from ends of image descriptions and wikilinks (]]), templates (}}), template parameters (|)
        str = str.replace(/[\t ]*<[\s\/\.]*br[\s\/\.]*>[\t ]*([\t\n ]*?)(\]\]|}}|\|)/gim, "$1$2");
        //BR tag before a list item
        str = str.replace(/[\t ]*<[\s\/\.]*br[\s\/\.]*>[\t ]*([\s]*?[\n]\*)/gim, "$1");
        //BR tag followed by at least two newlines
        str = str.replace(/[\t ]*<[\s\/\.]*br[\s\/\.]*>[\t ]*([\n])[\t ]*([\n])/gim, "$1$2");

        return str;
    }
    
    return {
        autoEdISBN: autoEdISBN,
        autoEdWhitespace: autoEdWhitespace,
        autoEdHTMLtoWikitext: autoEdHTMLtoWikitext,
        autoEdHeadlines: autoEdHeadlines,
        autoEdTablestoWikitext: autoEdTablestoWikitext,
        autoEdExtraBreaks: autoEdExtraBreaks
    };
}());
if (typeof window !== "undefined") {
    window.autoEd = autoEd;
}
// </nowiki>
////------------------------------------^^^^^^^^^^^^^^^---------------------------------
/// if you want to update this code from fa.wikipedia
///copy [[مدیاویکی:Gadget-Extra-Editbuttons-persiantools.js]],[[مدیاویکی:Gadget-Extra-Editbuttons-persianwikitools.js]]
///[[مدیاویکی:Gadget-Extra-Editbuttons-dictionary.js]],[[مدیاویکی:Gadget-Extra-Editbuttons-autoed.js]]
/// to above these lines.
///you should remove any part of code which have mw.
///remove تبدیل بندهای ترتیبی به قالب‌بندی ویکی because it needs human edits
///
///last update 2017/Jun/26 or 1396/04/05
var fs = require('fs');
var wiki_text = fs.readFileSync('io.txt').toString();
wiki_text = persianWikiTools.superTool(wiki_text);
fs.writeFileSync('io.txt', wiki_text);