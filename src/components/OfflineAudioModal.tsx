import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FaCheck,
  FaCheckCircle,
  FaCloudDownloadAlt,
  FaPlane,
  FaTimes,
  FaTrashAlt,
} from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { SupportedLanguageId } from '../data/languages/types';

const ALL_LANGUAGE_IDS = Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguageId[];
import { getLocalizedLanguageName } from '../utils/pageDictionary';
import { FlagIcon } from './FlagIcon';
import {
  OFFLINE_AUDIO_PACK_INFO,
  OfflineDownloadProgress,
  downloadOfflineLanguages,
  getVerifiedOfflineLanguages,
  isCacheStorageSupported,
  readStoredDownloadedLanguages,
  removeOfflineLanguage,
  subscribeOfflineAudioChanges,
} from '../services/offlineAudioService';

interface OfflineAudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  openedFromInstall?: boolean;
}

interface OfflineModalCopy {
  title: string;
  subtitle: string;
  installPromptBanner: string;
  activePairHeading: string;
  allCoursesHeading: string;
  selectActivePair: string;
  selectAll?: string;
  offlineReady: string;
  clipsUnit: string;
  downloadSelected: string;
  allSelectedReady: string;
  downloadingLabel: string;
  cancel: string;
  done: string;
  removePackTitle: string;
  unsupportedNote: string;
  completedBanner: string;
}

const OFFLINE_MODAL_COPY: Record<SupportedLanguageId, OfflineModalCopy> = {
  en: {
    title: 'Offline Audio Courses',
    subtitle: 'Download studio pronunciation packs so lessons & listening quizzes work in Airplane Mode.',
    installPromptBanner: 'App ready! Download your active language pair now for full offline audio.',
    activePairHeading: 'Active Course Pair (Recommended)',
    allCoursesHeading: 'More Languages',
    selectActivePair: 'Active Pair Only',
    selectAll: 'Select All',
    offlineReady: 'Offline Ready',
    clipsUnit: 'clips',
    downloadSelected: 'Download Selected',
    allSelectedReady: 'Selected Courses Ready Offline',
    downloadingLabel: 'Downloading audio:',
    cancel: 'Cancel',
    done: 'Done',
    removePackTitle: 'Remove offline audio to free space',
    unsupportedNote: 'Offline Cache Storage is not available in this browser mode.',
    completedBanner: 'Offline audio saved! You can now practice in Airplane Mode.',
  },
  es: {
    title: 'Cursos de audio sin conexión',
    subtitle: 'Descarga paquetes de pronunciación para practicar y hacer cuestionarios en modo avión.',
    installPromptBanner: '¡Aplicación lista! Descarga tu par de idiomas activo para escuchar sin conexión.',
    activePairHeading: 'Par de cursos activo (Recomendado)',
    allCoursesHeading: 'Más idiomas',
    selectActivePair: 'Solo par activo',
    selectAll: 'Seleccionar todos',
    offlineReady: 'Listo sin conexión',
    clipsUnit: 'audios',
    downloadSelected: 'Descargar seleccionados',
    allSelectedReady: 'Cursos listos sin conexión',
    downloadingLabel: 'Descargando audio:',
    cancel: 'Cancelar',
    done: 'Listo',
    removePackTitle: 'Eliminar audio sin conexión',
    unsupportedNote: 'El almacenamiento sin conexión no está disponible en este navegador.',
    completedBanner: '¡Audio guardado! Ya puedes practicar en modo avión.',
  },
  fr: {
    title: 'Cours audio hors ligne',
    subtitle: 'Téléchargez les packs vocaux pour pratiquer et écouter en mode avion.',
    installPromptBanner: 'Application prête ! Téléchargez votre paire de langues active pour le mode hors ligne.',
    activePairHeading: 'Paire active (Recommandé)',
    allCoursesHeading: 'Autres langues',
    selectActivePair: 'Paire active',
    selectAll: 'Tout sélectionner',
    offlineReady: 'Prêt hors ligne',
    clipsUnit: 'audios',
    downloadSelected: 'Télécharger la sélection',
    allSelectedReady: 'Cours prêts hors ligne',
    downloadingLabel: 'Téléchargement audio :',
    cancel: 'Annuler',
    done: 'Terminé',
    removePackTitle: 'Supprimer le pack hors ligne',
    unsupportedNote: 'Le cache hors ligne n’est pas disponible dans ce navigateur.',
    completedBanner: 'Audio enregistré ! Vous pouvez pratiquer en mode avion.',
  },
  de: {
    title: 'Offline-Audiokurse',
    subtitle: 'Lade Sprachpakete herunter, damit Aussprache & Hörquiz im Flugmodus funktionieren.',
    installPromptBanner: 'App bereit! Lade jetzt dein aktives Sprachpaar für den Offline-Modus herunter.',
    activePairHeading: 'Aktives Sprachpaar (Empfohlen)',
    allCoursesHeading: 'Weitere Sprachen',
    selectActivePair: 'Nur aktives Paar',
    selectAll: 'Alle auswählen',
    offlineReady: 'Offline bereit',
    clipsUnit: 'Clips',
    downloadSelected: 'Auswahl herunterladen',
    allSelectedReady: 'Kurse offline bereit',
    downloadingLabel: 'Audio wird geladen:',
    cancel: 'Abbrechen',
    done: 'Fertig',
    removePackTitle: 'Offline-Audio entfernen',
    unsupportedNote: 'Offline-Speicher ist in diesem Browsermodus nicht verfügbar.',
    completedBanner: 'Offline-Audio gespeichert! Bereit für den Flugmodus.',
  },
  pt: {
    title: 'Cursos de áudio offline',
    subtitle: 'Baixe pacotes de pronúncia para estudar e ouvir mesmo no modo avião.',
    installPromptBanner: 'App pronto! Baixe seu par de idiomas ativo para usar offline.',
    activePairHeading: 'Par de cursos ativo (Recomendado)',
    allCoursesHeading: 'Mais idiomas',
    selectActivePair: 'Apenas par ativo',
    selectAll: 'Selecionar todos',
    offlineReady: 'Pronto offline',
    clipsUnit: 'áudios',
    downloadSelected: 'Baixar selecionados',
    allSelectedReady: 'Cursos prontos offline',
    downloadingLabel: 'Baixando áudio:',
    cancel: 'Cancelar',
    done: 'Concluído',
    removePackTitle: 'Remover áudio offline',
    unsupportedNote: 'O armazenamento offline não está disponível neste navegador.',
    completedBanner: 'Áudio salvo! Pronto para usar no modo avião.',
  },
  ru: {
    title: 'Офлайн-аудиокурсы',
    subtitle: 'Скачайте пакеты озвучки, чтобы заниматься и слушать в авиарежиме без интернета.',
    installPromptBanner: 'Приложение готово! Скачайте активную языковую пару для работы офлайн.',
    activePairHeading: 'Активная языковая пара (Рекомендуется)',
    allCoursesHeading: 'Другие языки',
    selectActivePair: 'Только активная пара',
    selectAll: 'Выбрать все',
    offlineReady: 'Доступно офлайн',
    clipsUnit: 'аудио',
    downloadSelected: 'Скачать выбранные',
    allSelectedReady: 'Курсы готовы к офлайн-режиму',
    downloadingLabel: 'Загрузка аудио:',
    cancel: 'Отмена',
    done: 'Готово',
    removePackTitle: 'Удалить офлайн-аудио',
    unsupportedNote: 'Офлайн-хранилище недоступно в этом режиме браузера.',
    completedBanner: 'Аудио сохранено! Теперь всё работает в авиарежиме.',
  },
  id: {
    title: 'Kursus Audio Offline',
    subtitle: 'Unduh paket pelafalan studio agar latihan & kuis tetap berfungsi dalam Mode Pesawat.',
    installPromptBanner: 'Aplikasi siap! Unduh pasangan bahasa aktif Anda untuk mode offline.',
    activePairHeading: 'Pasangan Kursus Aktif (Disarankan)',
    allCoursesHeading: 'Bahasa Lainnya',
    selectActivePair: 'Hanya Pasangan Aktif',
    selectAll: 'Pilih Semua',
    offlineReady: 'Siap Offline',
    clipsUnit: 'klip',
    downloadSelected: 'Unduh Pilihan',
    allSelectedReady: 'Kursus Siap Offline',
    downloadingLabel: 'Mengunduh audio:',
    cancel: 'Batal',
    done: 'Selesai',
    removePackTitle: 'Hapus audio offline',
    unsupportedNote: 'Penyimpanan offline tidak tersedia di mode browser ini.',
    completedBanner: 'Audio offline tersimpan! Siap digunakan di Mode Pesawat.',
  },
  tr: {
    title: 'Çevrimdışı Ses Kursları',
    subtitle: 'Uçak modunda bile telaffuz ve dinleme testleri için ses paketlerini indirin.',
    installPromptBanner: 'Uygulama hazır! Çevrimdışı kullanım için aktif dil çiftinizi şimdi indirin.',
    activePairHeading: 'Aktif Dil Çifti (Önerilen)',
    allCoursesHeading: 'Diğer Diller',
    selectActivePair: 'Yalnızca Aktif Çift',
    selectAll: 'Tümünü Seç',
    offlineReady: 'Çevrimdışı Hazır',
    clipsUnit: 'ses',
    downloadSelected: 'Seçilenleri İndir',
    allSelectedReady: 'Kurslar Çevrimdışı Hazır',
    downloadingLabel: 'Ses indiriliyor:',
    cancel: 'İptal',
    done: 'Tamam',
    removePackTitle: 'Çevrimdışı sesi kaldır',
    unsupportedNote: 'Bu tarayıcı modunda çevrimdışı depolama kullanılamıyor.',
    completedBanner: 'Çevrimdışı ses kaydedildi! Uçak modunda çalışmaya hazırsınız.',
  },
  ja: {
    title: 'オフライン音声コース',
    subtitle: '機内モードでも発音再生やリスニングクイズが使えるように音声パックを保存します。',
    installPromptBanner: 'アプリの準備完了！現在の学習ペアをダウンロードしてオフラインに対応しましょう。',
    activePairHeading: '現在の学習ペア（おすすめ）',
    allCoursesHeading: 'その他の言語',
    selectActivePair: '現在のペアのみ',
    selectAll: 'すべて選択',
    offlineReady: 'オフライン対応済',
    clipsUnit: '音声',
    downloadSelected: '選択したコースを保存',
    allSelectedReady: 'オフライン準備完了',
    downloadingLabel: '音声をダウンロード中:',
    cancel: 'キャンセル',
    done: '完了',
    removePackTitle: 'オフライン音声を削除',
    unsupportedNote: 'このブラウザではオフライン保存を利用できません。',
    completedBanner: '保存完了！機内モードでもすべての音声を再生できます。',
  },
  ko: {
    title: '오프라인 오디오 코스',
    subtitle: '비행기 모드에서도 발음 듣기와 리스닝 퀴즈가 작동하도록 음성 팩을 다운로드하세요.',
    installPromptBanner: '앱 준비 완료! 오프라인 학습을 위해 현재 언어 쌍을 지금 다운로드하세요.',
    activePairHeading: '현재 학습 언어 쌍 (추천)',
    allCoursesHeading: '다른 언어',
    selectActivePair: '현재 언어 쌍만',
    selectAll: '전체 선택',
    offlineReady: '오프라인 준비됨',
    clipsUnit: '클립',
    downloadSelected: '선택 항목 다운로드',
    allSelectedReady: '오프라인 사용 준비 완료',
    downloadingLabel: '오디오 다운로드 중:',
    cancel: '취소',
    done: '완료',
    removePackTitle: '오프라인 오디오 삭제',
    unsupportedNote: '이 브라우저 모드에서는 오프라인 저장소를 사용할 수 없습니다.',
    completedBanner: '오프라인 오디오 저장 완료! 비행기 모드에서 연습할 수 있습니다.',
  },
  zh: {
    title: '离线语音课程包',
    subtitle: '下载母语级标准发音包，开启飞行模式也能畅听所有词汇与听力测验。',
    installPromptBanner: '应用已就绪！立即下载当前学习语言组合，离线无网也能随时练习。',
    activePairHeading: '当前学习组合（推荐）',
    allCoursesHeading: '更多语言课程',
    selectActivePair: '仅选当前组合',
    selectAll: '全选未下载',
    offlineReady: '已离线就绪',
    clipsUnit: '条语音',
    downloadSelected: '下载所选语音包',
    allSelectedReady: '所选课程已离线就绪',
    downloadingLabel: '正在下载语音：',
    cancel: '取消',
    done: '完成',
    removePackTitle: '删除离线语音包以释放空间',
    unsupportedNote: '当前浏览器模式不支持离线缓存存储。',
    completedBanner: '离线语音下载完成！现在可在飞行模式下随时学习。',
  },
  hi: {
    title: 'ऑफ़लाइन ऑडियो कोर्स',
    subtitle: 'उच्चारण पैक डाउनलोड करें ताकि एयरप्लेन मोड में भी पाठ और लिसनिंग क्विज़ चल सकें।',
    installPromptBanner: 'ऐप तैयार है! ऑफ़लाइन अभ्यास के लिए अपनी सक्रिय भाषा जोड़ी अभी डाउनलोड करें।',
    activePairHeading: 'सक्रिय भाषा जोड़ी (अनुशंसित)',
    allCoursesHeading: 'अन्य भाषाएँ',
    selectActivePair: 'केवल सक्रिय जोड़ी',
    selectAll: 'सभी चुनें',
    offlineReady: 'ऑफ़लाइन तैयार',
    clipsUnit: 'क्लिप',
    downloadSelected: 'चयनित डाउनलोड करें',
    allSelectedReady: 'चयनित कोर्स ऑफ़लाइन तैयार हैं',
    downloadingLabel: 'ऑडियो डाउनलोड हो रहा है:',
    cancel: 'रद्द करें',
    done: 'पूर्ण',
    removePackTitle: 'ऑफ़लाइन ऑडियो हटाएँ',
    unsupportedNote: 'इस ब्राउज़र मोड में ऑफ़लाइन स्टोरेज उपलब्ध नहीं है।',
    completedBanner: 'ऑफ़लाइन ऑडियो सहेजा गया! अब एयरप्लेन मोड में अभ्यास करें।',
  },
  ar: {
    title: 'دورات الصوت دون اتصال',
    subtitle: 'نزّل حزم النطق الصوتي لتعمل الدروس واختبارات الاستماع في وضع الطيران.',
    installPromptBanner: 'التطبيق جاهز! نزّل زوج اللغات النشط الآن للاستماع دون إنترنت.',
    activePairHeading: 'زوج اللغات النشط (موصى به)',
    allCoursesHeading: 'لغات إضافية',
    selectActivePair: 'الزوج النشط فقط',
    selectAll: 'تحديد الكل',
    offlineReady: 'جاهز دون اتصال',
    clipsUnit: 'مقطع',
    downloadSelected: 'تنزيل المحدد',
    allSelectedReady: 'الدورات جاهزة دون اتصال',
    downloadingLabel: 'جارٍ تنزيل الصوت:',
    cancel: 'إلغاء',
    done: 'تم',
    removePackTitle: 'حذف الصوت المحفوظ لتوفير المساحة',
    unsupportedNote: 'التخزين دون اتصال غير مدعوم في وضع المتصفح هذا.',
    completedBanner: 'تم حفظ الصوت! يمكنك الآن التدرب في وضع الطيران.',
  },
  bn: {
    title: 'অফলাইন অডিও কোর্স',
    subtitle: 'উচ্চারণ প্যাক ডাউনলোড করুন যাতে এয়ারপ্লেন মোডেও পাঠ ও লিসেনিং কুইজ চলে।',
    installPromptBanner: 'অ্যাপ প্রস্তুত! অফলাইনে অনুশীলনের জন্য আপনার সক্রিয় ভাষা জুটি ডাউনলোড করুন।',
    activePairHeading: 'সক্রিয় ভাষা জুটি (প্রস্তাবিত)',
    allCoursesHeading: 'আরও ভাষা',
    selectActivePair: 'শুধু সক্রিয় জুটি',
    selectAll: 'সব নির্বাচন করুন',
    offlineReady: 'অফলাইনে প্রস্তুত',
    clipsUnit: 'ক্লিপ',
    downloadSelected: 'নির্বাচিত ডাউনলোড করুন',
    allSelectedReady: 'কোর্স অফলাইনে প্রস্তুত',
    downloadingLabel: 'অডিও ডাউনলোড হচ্ছে:',
    cancel: 'বাতিল',
    done: 'সম্পন্ন',
    removePackTitle: 'অফলাইন অডিও মুছে ফেলুন',
    unsupportedNote: 'এই ব্রাউজার মোডে অফলাইন স্টোরেজ উপলব্ধ নয়।',
    completedBanner: 'অফলাইন অডিও সংরক্ষিত হয়েছে! এয়ারপ্লেন মোডে ব্যবহারের জন্য প্রস্তুত।',
  },
  ur: {
    title: 'آف لائن آڈیو کورسز',
    subtitle: 'تلفظ پیک ڈاؤن لوڈ کریں تاکہ ایئرپلین موڈ میں بھی اسباق اور سننے کے کوئز چل سکیں۔',
    installPromptBanner: 'ایپ تیار ہے! آف لائن مشق کے لیے اپنی فعال زبانوں کی جوڑی ابھی ڈاؤن لوڈ کریں۔',
    activePairHeading: 'فعال کورس جوڑی (تجویز کردہ)',
    allCoursesHeading: 'مزید زبانیں',
    selectActivePair: 'صرف فعال جوڑی',
    selectAll: 'سب منتخب کریں',
    offlineReady: 'آف لائن تیار',
    clipsUnit: 'کلپس',
    downloadSelected: 'منتخب ڈاؤن لوڈ کریں',
    allSelectedReady: 'کورسز آف لائن تیار ہیں',
    downloadingLabel: 'آڈیو ڈاؤن لوڈ ہو رہی ہے:',
    cancel: 'منسوخ کریں',
    done: 'مکمل',
    removePackTitle: 'آف لائن آڈیو ہٹائیں',
    unsupportedNote: 'اس براؤزر موڈ میں آف لائن اسٹوریج دستیاب نہیں ہے۔',
    completedBanner: 'آف لائن آڈیو محفوظ ہو گئی! اب ایئرپلین موڈ میں مشق کریں۔',
  },
};

export const OfflineAudioModal: React.FC<OfflineAudioModalProps> = ({
  isOpen,
  onClose,
  openedFromInstall = false,
}) => {
  const { baseLanguage, targetLanguage } = useLanguage();
  const copy = OFFLINE_MODAL_COPY[baseLanguage] || OFFLINE_MODAL_COPY.en;

  const [downloadedLangs, setDownloadedLangs] = useState<Set<SupportedLanguageId>>(
    () => new Set(readStoredDownloadedLanguages())
  );
  const [selectedLangs, setSelectedLangs] = useState<Set<SupportedLanguageId>>(new Set());
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState<OfflineDownloadProgress | null>(null);
  const [justCompleted, setJustCompleted] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const activePairIds = useMemo<SupportedLanguageId[]>(() => {
    return Array.from(new Set<SupportedLanguageId>([targetLanguage, baseLanguage]));
  }, [baseLanguage, targetLanguage]);

  const otherLanguageIds = useMemo<SupportedLanguageId[]>(() => {
    return ALL_LANGUAGE_IDS.filter((id) => !activePairIds.includes(id));
  }, [activePairIds]);

  // Sync verified offline status when opened & pre-select undownloaded active pair languages
  useEffect(() => {
    if (!isOpen) return;
    setJustCompleted(false);
    let mounted = true;

    getVerifiedOfflineLanguages().then((verified) => {
      if (!mounted) return;
      setDownloadedLangs(verified);
      const initialSelection = new Set<SupportedLanguageId>();
      for (const id of activePairIds) {
        if (!verified.has(id)) {
          initialSelection.add(id);
        }
      }
      setSelectedLangs(initialSelection);
    });

    const unsub = subscribeOfflineAudioChanges(() => {
      setDownloadedLangs(new Set(readStoredDownloadedLanguages()));
    });

    return () => {
      mounted = false;
      unsub();
    };
  }, [isOpen, activePairIds]);

  // Lock background scroll & close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isDownloading) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, isDownloading, onClose]);

  if (!isOpen) return null;

  const cacheSupported = isCacheStorageSupported();

  const toggleLanguageSelection = (lang: SupportedLanguageId) => {
    if (isDownloading || downloadedLangs.has(lang)) return;
    setSelectedLangs((prev) => {
      const next = new Set(prev);
      if (next.has(lang)) {
        next.delete(lang);
      } else {
        next.add(lang);
      }
      return next;
    });
  };

  const handleSelectActivePairOnly = () => {
    if (isDownloading) return;
    const next = new Set<SupportedLanguageId>();
    for (const id of activePairIds) {
      if (!downloadedLangs.has(id)) next.add(id);
    }
    setSelectedLangs(next);
  };

  const pendingToDownload = Array.from(selectedLangs).filter((id) => !downloadedLangs.has(id));
  const selectedSizeMB = pendingToDownload.reduce(
    (sum, id) => sum + (OFFLINE_AUDIO_PACK_INFO[id]?.sizeMB || 0),
    0
  );

  const handleStartDownload = async () => {
    if (isDownloading || pendingToDownload.length === 0 || !cacheSupported) return;
    const controller = new AbortController();
    abortRef.current = controller;
    setIsDownloading(true);
    setJustCompleted(false);
    setProgress({
      currentLang: pendingToDownload[0],
      completedFiles: 0,
      totalFiles: pendingToDownload.reduce((s, l) => s + OFFLINE_AUDIO_PACK_INFO[l].fileCount, 0),
      percent: 0,
      failedFiles: 0,
    });

    try {
      const res = await downloadOfflineLanguages(
        pendingToDownload,
        (p) => setProgress(p),
        controller.signal
      );
      if (res.downloaded.length > 0) {
        setDownloadedLangs(new Set(readStoredDownloadedLanguages()));
        setSelectedLangs((prev) => {
          const next = new Set(prev);
          res.downloaded.forEach((l) => next.delete(l));
          return next;
        });
        setJustCompleted(true);
      }
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        console.warn('Offline audio download interrupted:', err);
      }
    } finally {
      setIsDownloading(false);
      abortRef.current = null;
    }
  };

  const handleCancelDownload = () => {
    abortRef.current?.abort();
    setIsDownloading(false);
  };

  const handleRemovePack = async (e: React.MouseEvent, lang: SupportedLanguageId) => {
    e.stopPropagation();
    if (isDownloading) return;
    await removeOfflineLanguage(lang);
    setDownloadedLangs(new Set(readStoredDownloadedLanguages()));
  };

  const renderCourseOption = (lang: SupportedLanguageId, isFeaturedPair: boolean) => {
    const meta = SUPPORTED_LANGUAGES[lang];
    const pack = OFFLINE_AUDIO_PACK_INFO[lang];
    const isDownloaded = downloadedLangs.has(lang);
    const isChecked = selectedLangs.has(lang);
    const localizedName = getLocalizedLanguageName(lang, baseLanguage, meta.name);

    return (
      <div
        key={lang}
        role="checkbox"
        aria-checked={isDownloaded || isChecked}
        tabIndex={0}
        data-testid={`offline-pack-${lang}`}
        className={`offline-pack-card ${isFeaturedPair ? 'featured' : ''} ${
          isDownloaded ? 'downloaded' : isChecked ? 'selected' : ''
        }`}
        onClick={() => toggleLanguageSelection(lang)}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            toggleLanguageSelection(lang);
          }
        }}
      >
        <div className="offline-pack-left">
          <FlagIcon lang={lang} size={26} />
          <div className="offline-pack-names">
            <span className="offline-pack-title">{localizedName}</span>
            <span className="offline-pack-meta">
              {pack.sizeMB.toFixed(1)} MB · {pack.fileCount.toLocaleString()} {copy.clipsUnit}
            </span>
          </div>
        </div>

        <div className="offline-pack-right">
          {isDownloaded ? (
            <div className="offline-ready-group">
              <span className="offline-ready-pill">
                <FaCheckCircle />
                <span>{copy.offlineReady}</span>
              </span>
              <button
                type="button"
                className="offline-remove-btn"
                onClick={(e) => handleRemovePack(e, lang)}
                title={copy.removePackTitle}
                aria-label={`${copy.removePackTitle}: ${localizedName}`}
              >
                <FaTrashAlt />
              </button>
            </div>
          ) : (
            <span className={`offline-check-circle ${isChecked ? 'checked' : ''}`}>
              {isChecked && <FaCheck />}
            </span>
          )}
        </div>
      </div>
    );
  };

  const currentLangLabel = progress
    ? getLocalizedLanguageName(
        progress.currentLang,
        baseLanguage,
        SUPPORTED_LANGUAGES[progress.currentLang]?.name || progress.currentLang
      )
    : '';

  return (
    <div
      className="offline-modal-backdrop"
      onClick={() => {
        if (!isDownloading) onClose();
      }}
      role="presentation"
    >
      <div
        className="offline-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={copy.title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="offline-modal-header">
          <div className="offline-modal-title-row">
            <span className="offline-plane-badge" aria-hidden="true">
              <FaPlane />
            </span>
            <div>
              <h2>{copy.title}</h2>
              <p>{copy.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            className="offline-modal-close"
            onClick={onClose}
            disabled={isDownloading}
            aria-label={copy.done}
          >
            <FaTimes />
          </button>
        </div>

        <div className="offline-modal-body">
          {openedFromInstall && !justCompleted && (
            <div className="offline-install-banner">
              <FaCloudDownloadAlt className="offline-banner-icon" />
              <span>{copy.installPromptBanner}</span>
            </div>
          )}

          {justCompleted && (
            <div className="offline-success-banner" role="status">
              <FaCheckCircle className="offline-banner-icon" />
              <span>{copy.completedBanner}</span>
            </div>
          )}

          {!cacheSupported && (
            <div className="offline-warning-banner">{copy.unsupportedNote}</div>
          )}

          {/* Section 1: Pre-selected Active Language Pair */}
          <div className="offline-section-header">
            <h3>{copy.activePairHeading}</h3>
            <div className="offline-quick-links">
              <button type="button" className="offline-text-btn" onClick={handleSelectActivePairOnly}>
                {copy.selectActivePair}
              </button>
            </div>
          </div>
          <div className="offline-pack-grid featured-grid">
            {activePairIds.map((id) => renderCourseOption(id, true))}
          </div>

          {/* Section 2: Remaining 13 Languages */}
          <div className="offline-section-header">
            <h3>{copy.allCoursesHeading}</h3>
          </div>
          <div className="offline-pack-grid">
            {otherLanguageIds.map((id) => renderCourseOption(id, false))}
          </div>
        </div>

        {/* Footer: Progress Bar or Download CTA */}
        <div className="offline-modal-footer">
          {isDownloading && progress ? (
            <div className="offline-progress-container" role="status" aria-live="polite">
              <div className="offline-progress-top">
                <span className="offline-progress-label">
                  {copy.downloadingLabel} <strong>{currentLangLabel}</strong>
                </span>
                <span className="offline-progress-stats">
                  {progress.percent}% ({progress.completedFiles.toLocaleString()}/
                  {progress.totalFiles.toLocaleString()})
                </span>
              </div>
              <div className="offline-progress-track">
                <div
                  className="offline-progress-fill"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
              <button
                type="button"
                className="offline-cancel-btn"
                onClick={handleCancelDownload}
              >
                {copy.cancel}
              </button>
            </div>
          ) : (
            <div className="offline-footer-actions">
              <button
                type="button"
                className="offline-download-cta"
                disabled={!cacheSupported || pendingToDownload.length === 0}
                onClick={handleStartDownload}
              >
                <FaCloudDownloadAlt />
                <span>
                  {pendingToDownload.length > 0
                    ? `${copy.downloadSelected} (${selectedSizeMB.toFixed(1)} MB)`
                    : copy.allSelectedReady}
                </span>
              </button>
              <button type="button" className="offline-done-btn" onClick={onClose}>
                {copy.done}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfflineAudioModal;
