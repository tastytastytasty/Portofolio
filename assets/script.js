// Carousel
function initSlider({ trackId, dotsId, prevId, nextId }) {
  const track = document.getElementById(trackId);
  const dotsContainer = document.getElementById(dotsId);
  const btnPrev = document.getElementById(prevId);
  const btnNext = document.getElementById(nextId);

  if (!track || !dotsContainer || !btnPrev || !btnNext) return;

  const cards = track.children;
  let current = 0;
  let visibleCount;
  let total;
  let dots;
  let currentOffset = 0;

  function getVisibleCount() {
    return window.innerWidth < 768 ? 1 : 2;
  }

  function buildDots() {
    dotsContainer.innerHTML = "";
    visibleCount = getVisibleCount();
    total = Math.ceil(cards.length / visibleCount);
    current = 0;
    currentOffset = 0;
    track.style.transform = "translateX(0)";

    for (let i = 0; i < total; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    }

    dots = dotsContainer.querySelectorAll(".dot");
  }

  function goTo(idx) {
    current = idx;
    const totalCards = cards.length;

    let startIndex = current * visibleCount;
    if (startIndex + visibleCount > totalCards) {
      startIndex = totalCards - visibleCount;
    }

    track.style.transform = "translateX(0)";

    const trackLeft = track.getBoundingClientRect().left;
    const cardLeft = cards[startIndex].getBoundingClientRect().left;
    currentOffset = cardLeft - trackLeft;

    track.style.transform = `translateX(-${currentOffset}px)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  function next() {
    goTo((current + 1) % total);
  }
  function prev() {
    goTo((current - 1 + total) % total);
  }

  btnPrev.addEventListener("click", prev);
  btnNext.addEventListener("click", next);

  buildDots();
  window.addEventListener("resize", buildDots);
}

initSlider({
  trackId: "track-projek",
  dotsId: "dots-projek",
  prevId: "btn-prev-projek",
  nextId: "btn-next-projek",
});

initSlider({
  trackId: "track-sertifikat",
  dotsId: "dots-sertifikat",
  prevId: "btn-prev-sertifikat",
  nextId: "btn-next-sertifikat",
});

// Theme Toggle
function initTheme() {
  const btn = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    if (icon) icon.className = "bx bx-sun";
  }

  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");
      if (icon) icon.className = isLight ? "bx bx-sun" : "bx bx-moon";
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  }
}

// Language Options
const translations = {
  id: {
    nav_home: "Beranda",
    nav_about: "Tentang",
    nav_portfolio: "Portofolio",
    nav_projects: "Projek",
    nav_resume: "Pengalaman",
    nav_certificate: "Sertifikat",
    nav_contact: "Kontak",
    modal_selengkapnya: "Selengkapnya",
    modal_lebih_sedikit: "Lebih sedikit",
    modal_latar_belakang: "Latar belakang",
    modal_tech_stack: "Tech stack",
    modal_info_projek: "Info proyek",
    modal_tahun: "Tahun",
    modal_durasi: "Durasi",
    modal_peran: "Peran",
    home_greet: "Halo, Saya",
    home_name: "Muhammad Akmal",
    home_desc:
      "<span>Software Developer</span> yang antusias dalam membangun aplikasi berbasis web yang menarik dan mudah digunakan.",
    home_more: 'Selengkapnya<i class="bx bx-chevron-right ikon"></i>',
    about_title: "Tentang Saya",
    about_subtitle: "Saya Software Developer.",
    about_description:
      "Seseorang yang memiliki ketertarikan dalam pengembangan aplikasi berbasis web dengan berfokus pada kemudahan dan kenyamanan pengguna. Selalu berusaha membangun tampilan dan alur yang sederhana, mudah digunakan, dan menyenangkan.",
    resume_title: "Pendidikan & Pengalaman",
    resume_education_date: "Juli 2023 - Juni 2026",
    resume_education_title: "Pendidikan Rekayasa Perangkat Lunak",
    resume_education_description:
      "Mempelajari pengembangan aplikasi berbasis web, database, dan dasar pemrograman.",
    resume_education_institution: "SMK TI Pembangunan Cimahi",
    resume_experience_date: "Desember 2025 - April 2026",
    resume_experience_title: "Praktik Kerja Lapangan",
    resume_experience_description:
      "Mengembangkan aplikasi <i>e-commerce</i> berbasis web menggunakan PHP, CodeIgniter 3, dan MySQL.",
    resume_experience_institution: "PT Goldstep Teknologi Indonesia",
    certificate_title: "Sertifikat",
    projects_title: "Projek",
    projects_bad_habit_durasi: "1 hari",
    projects_bad_habit_peran: "Solo developer",
    projects_bad_habit_alasan:
      "Proyek ini dibuat untuk memenuhi tugas akhir dari RevoU CodingCamp, yaitu membuat mini-project to-do list. Namun saya ingin melangkah lebih jauh dari sekadar to-do list biasa — saya tertarik pada bagaimana kebiasaan buruk bisa menguras waktu tanpa kita sadari. Maka dari itu saya mengubah konsepnya menjadi pelacak kebiasaan yang membantu pengguna memantau dan menganalisis waktu yang terbuang secara visual.",
    projects_bad_habit_desc:
      "Aplikasi pelacak kebiasaan berbasis web yang membantu pengguna memantau dan menganalisis waktu yang terbuang melalui tampilan responsif, visualisasi data interaktif, serta fitur yang mendukung peningkatan produktivitas.",
    projects_utaps_durasi: "3 bulan",
    projects_utaps_peran: "Full-stack Developer – Customer Side",
    projects_utaps_alasan:
      "Proyek ini dikerjakan sebagai bagian dari program PKL di PT Goldstep Teknologi Indonesia, dengan tujuan membangun web app simulasi e-commerce sepatu bernama UTAPS. Saya bergabung dalam tim dan bertanggung jawab penuh pada sisi customer — bukan CMS. Bersama satu rekan, kami membagi halaman secara merata, dan bagian saya mencakup halaman login, registrasi, beranda, about, katalog produk, detail produk, halaman promo, wishlist, dan keranjang belanja. Tidak hanya tampilan, saya juga menangani logika backend untuk fitur-fitur yang saya kerjakan — mulai dari sistem autentikasi, manajemen wishlist, keranjang belanja, hingga alur checkout yang terhubung langsung ke database. Pengalaman ini mengajarkan saya bagaimana bekerja secara end-to-end dalam satu fitur, berkolaborasi dalam tim kecil, serta memastikan tampilan dan alur pengguna terasa konsisten dari satu halaman ke halaman lain.",
    projects_utaps_desc:
      "Aplikasi e-commerce sepatu berbasis web yang menghadirkan pengalaman belanja modern dengan tampilan responsif, navigasi yang mudah, dan fitur yang mendukung kenyamanan pengguna.",
    projects_lelangku_durasi: "4 hari",
    projects_lelangku_peran: "Solo developer",
    projects_lelangku_alasan:
      "Proyek ini dibuat untuk memenuhi tugas Uji Kompetensi di sekolah, dengan tema membangun web app lelang barang. Saya mengambil referensi visual dan fungsional dari platform nyata seperti Lelang Indonesia, lalu mengadaptasinya menjadi versi saya sendiri. Dalam waktu 4 hari, saya merancang dan membangun seluruh aplikasi sendirian — mulai dari alur penawaran, manajemen barang, hingga tampilan yang intuitif bagi pengguna. Proyek ini menjadi tantangan tersendiri karena harus menyeimbangkan kecepatan pengerjaan dengan kualitas hasil di bawah tekanan waktu ujian.",
    projects_lelangku_desc:
      "Aplikasi lelang berbasis web dengan tampilan sederhana dan interaktif untuk memudahkan pengguna dalam melakukan penawaran barang yang sedang di lelang.",
    projects_spp_durasi: "3 bulan",
    projects_spp_peran: "Full-stack Developer – Modul SPP",
    projects_spp_alasan:
      "Proyek ini dikerjakan sebagai tugas PKK di sekolah, dengan tujuan membangun web app administrasi untuk RA Darul Ikhlas. Kami mengerjakan proyek ini bertiga — saya dan dua rekan — dengan membagi sistem menjadi tiga modul utama: pendaftaran siswa baru, pencatatan tabungan harian, dan pencatatan pembayaran SPP. Saya bertanggung jawab penuh pada modul SPP secara end-to-end — mulai dari mendesain tampilan halaman pembayaran SPP, riwayat transaksi, dan riwayat pembayaran per siswa, hingga logika backend seperti pencatatan pembayaran bulanan, validasi data, dan pelaporan status pembayaran. Ketiga modul ini dikerjakan secara paralel lalu disatukan menjadi satu sistem yang terintegrasi. Proyek ini mengajarkan saya pentingnya komunikasi antar anggota tim agar struktur database dan alur data antar modul tetap konsisten saat digabungkan.",
    projects_spp_desc:
      "Aplikasi pembayaran SPP berbasis web untuk membantu proses pencatatan dan pengelolaan pembayaran siswa pada lembaga pendidikan RA Darul Ikhlas secara lebih efisien.",
    cta_text: "Mari ciptakan produk yang bermanfaat bersama!",
    cta_button: "Hubungi Saya",
    contact_title: "Hubungi Saya",
    contact_name: "Nama",
    contact_email: "Email",
    contact_message: "Pesan",
    contact_submit: "Kirim Pesan",
    thanksTitle: "Terima kasih!",
    thanksDesc:
      "Email kamu sudah berhasil terkirim dan masuk ke kotak masuk saya.",
    thanksBtn: "Kembali ke Halaman Utama",
    thanksFootnote: "Ditunggu kolaborasinya ✦ sampai jumpa di pesan berikutnya",
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_portfolio: "Portfolio",
    nav_projects: "Projects",
    nav_certificate: "Certificates",
    nav_resume: "Experience",
    nav_contact: "Contact",
    modal_selengkapnya: "See more",
    modal_lebih_sedikit: "See less",
    modal_latar_belakang: "Background",
    modal_tech_stack: "Tech stack",
    modal_info_projek: "Project info",
    modal_tahun: "Year",
    modal_durasi: "Duration",
    modal_peran: "Role",
    home_greet: "Hi, I'm",
    home_name: "Muhammad Akmal",
    home_desc:
      "<span>Software Developer</span> passionate about building attractive and easy-to-use web applications.",
    home_more: 'Learn More<i class="bx bx-chevron-right ikon"></i>',
    about_title: "About Me",
    about_subtitle: "I'm a Software Developer.",
    about_description:
      "Someone with a strong interest in web-based application development, focusing on ease of use and user comfort. Always striving to build simple, intuitive, and enjoyable interfaces and workflows.",
    resume_title: "Education & Experience",
    resume_education_date: "July 2023 - June 2026",
    resume_education_title: "Software Engineering Education",
    resume_education_description:
      "Studying web-based application development, databases, and programming fundamentals.",
    resume_education_institution: "SMK TI Pembangunan Cimahi",
    resume_experience_date: "December 2025 - April 2026",
    resume_experience_title: "Field Work Practice",
    resume_experience_description:
      "Developing a web-based <i>e-commerce</i> application using PHP, CodeIgniter 3, and MySQL.",
    resume_experience_institution: "PT Goldstep Teknologi Indonesia",
    certificate_title: "Certificates",
    projects_title: "Projects",
    projects_bad_habit_durasi: "1 day",
    projects_bad_habit_peran: "Solo developer",
    projects_bad_habit_alasan:
      "This project was created to fulfill a final assignment from RevoU CodingCamp — building a mini to-do list project. However, I wanted to go beyond a simple to-do list. I was curious about how bad habits silently drain our time without us noticing. So I reframed the concept into a habit tracker that helps users monitor and visually analyze the time lost to unproductive habits.",
    projects_bad_habit_desc:
      "A web-based habit tracking application that helps users monitor and analyze time spent on unproductive activities through a responsive interface, interactive data visualizations, and features designed to encourage better productivity.",
    projects_utaps_durasi: "3 months",
    projects_utaps_peran: "Full-stack Developer – Customer Side",
    projects_utaps_alasan:
      "This project was developed during my internship at PT Goldstep Teknologi Indonesia, as part of building a shoe e-commerce web app simulation called UTAPS. I was part of the team and took full ownership of the customer-facing side — separate from the CMS. Working alongside one teammate, we divided the pages between us. My responsibilities covered the login, registration, home, about, product catalog, product detail, promo, wishlist, and shopping cart pages. Beyond the UI, I also handled the backend logic for every feature I built — including authentication, wishlist management, shopping cart, and the checkout flow connected directly to the database. This experience taught me how to work end-to-end on a feature, collaborate effectively in a small team, and maintain a consistent look and user flow across multiple pages.",
    projects_utaps_desc:
      "A web-based shoe e-commerce app that delivers a modern shopping experience with a responsive design, easy navigation, and features built for user comfort.",
    projects_lelangku_durasi: "4 days",
    projects_lelangku_peran: "Solo developer",
    projects_lelangku_alasan:
      "This project was built to fulfill a Competency Test assignment at school, with the theme of creating an online auction web app. I took visual and functional references from real platforms like Lelang Indonesia, then adapted them into my own version. Within just 4 days, I designed and built the entire application on my own — from the bidding flow and item management to an intuitive user interface. The project was a personal challenge in balancing speed and quality under the pressure of an exam deadline.",
    projects_lelangku_desc:
      "A web-based auction app with a simple and interactive interface that makes it easy for users to place bids on items up for auction.",
    projects_spp_durasi: "3 months",
    projects_spp_peran: "Full-stack Developer – SPP Module",
    projects_spp_alasan:
      "This project was developed as a PKK assignment at school, aimed at building an administration web app for RA Darul Ikhlas, a kindergarten. I worked in a team of three, dividing the system into three main modules: new student registration, daily savings tracking, and monthly tuition fee recording. I took full end-to-end ownership of the SPP module — designing the UI for the payment page, transaction history, and per-student payment history, while also handling the backend logic for monthly payment recording, data validation, and payment status reporting. Each module was built in parallel and later merged into one integrated system. This project taught me the importance of clear communication within a team, especially when aligning database structures and data flow across independently developed modules.",
    projects_spp_desc:
      "A web-based SPP payment app designed to help streamline the recording and management of student payments at the RA Darul Ikhlas educational institution.",
    cta_text: "Let's create something meaningful together!",
    cta_button: "Contact Me",
    contact_title: "Contact Me",
    contact_name: "Name",
    contact_email: "Email",
    contact_message: "Message",
    contact_submit: "Send Message",
    thanksTitle: "Thank you!",
    thanksDesc: "Your email has been successfully sent and is now in my inbox.",
    thanksBtn: "Back to Home",
    thanksFootnote:
      "Looking forward to collaborating ✦ see you in the next message",
  },
  ja: {
    nav_home: "ホーム",
    nav_about: "について",
    nav_portfolio: "ポートフォリオ",
    nav_certificate: "証書",
    nav_projects: "プロジェクト",
    nav_resume: "経験",
    nav_contact: "お問い合わせ",
    modal_selengkapnya: "もっと見る",
    modal_lebih_sedikit: "閉じる",
    modal_latar_belakang: "背景",
    modal_tech_stack: "技術スタック",
    modal_info_projek: "プロジェクト情報",
    modal_tahun: "年",
    modal_durasi: "期間",
    modal_peran: "役割",
    home_greet: "こんにちは、私は",
    home_name: "Muhammad Akmal",
    home_desc:
      "<span>ソフトウェア開発者</span>で、魅力的で使いやすいWebアプリケーションの構築に情熱を持っています。",
    home_more: 'もっと見る<i class="bx bx-chevron-right ikon"></i>',
    about_title: "私について",
    about_subtitle: "ソフトウェア開発者です。",
    about_description:
      "Webアプリケーション開発に強い関心を持ち、使いやすさとユーザーの快適さを重視しています。シンプルで直感的、そして心地よいインターフェースとワークフローの構築を常に心がけています。",
    resume_title: "学歴・職歴",
    resume_education_date: "2023年7月 - 2026年6月",
    resume_education_title: "ソフトウェアエンジニアリング教育",
    resume_education_description:
      "Webアプリケーション開発、データベース、プログラミングの基礎を学んでいます。",
    resume_education_institution: "SMK TI Pembangunan Cimahi",
    resume_experience_date: "2025年12月 - 2026年4月",
    resume_experience_title: "現場実習",
    resume_experience_description:
      "PHP、CodeIgniter 3、MySQLを使用したWebベースの<i>eコマース</i>アプリケーションを開発しました。",
    resume_experience_institution: "PT Goldstep Teknologi Indonesia",
    certificate_title: "証書",
    projects_title: "プロジェクト",
    projects_bad_habit_durasi: "1日",
    projects_bad_habit_peran: "個人開発",
    projects_bad_habit_alasan:
      "このプロジェクトは、RevoU CodingCampの最終課題として作成しました。課題内容はミニToDoリストの制作でしたが、単純なToDoリストにとどまらず、もう一歩踏み込みたいと思いました。悪い習慣が気づかないうちに時間を奪っていくことに興味を持ち、コンセプトを習慣トラッカーに転換しました。このアプリは、無駄に費やした時間を視覚的に把握・分析できるツールです。",
    projects_bad_habit_desc:
      "非生産的な活動に費やした時間を記録・分析できるWebベースの習慣管理アプリです。レスポンシブなインターフェース、インタラクティブなデータ可視化機能、生産性向上をサポートする機能を備えています。",
    projects_utaps_durasi: "3ヶ月",
    projects_utaps_peran: "フルスタック開発者 – カスタマーサイド担当",
    projects_utaps_alasan:
      "このプロジェクトは、PT Goldstep Teknologi IndonesiaでのPKL（インターンシップ）期間中に、UTAPSという靴のECサイトシミュレーションアプリを構築するために取り組みました。私はチームの一員として、CMSではなくカスタマー向けサイドを専任で担当しました。チームメイトと二人でページを分担し、私が担当したのはログイン、会員登録、トップページ、会社紹介、商品カタログ、商品詳細、プロモーション、ウィッシュリスト、ショッピングカートの各ページです。UIだけでなく、担当した全機能のバックエンドロジックも実装しました。具体的には認証システム、ウィッシュリスト管理、ショッピングカート、そしてデータベースに直接接続したチェックアウトフローまで手がけました。この経験を通じて、一つの機能をエンドツーエンドで完結させる力、小規模チームでの効果的な協力体制、そして複数ページにわたる一貫したデザインとユーザーフローの維持について実践的に学びました。",
    projects_utaps_desc:
      "レスポンシブデザイン、使いやすいナビゲーション、ユーザーの快適さを重視した機能を備えた、モダンなショッピング体験を提供するWebベースの靴ECアプリです。",
    projects_lelangku_durasi: "4日間",
    projects_lelangku_peran: "個人開発",
    projects_lelangku_alasan:
      "このプロジェクトは、学校の技能検定課題として、オークションWebアプリを制作するために取り組みました。Lelang Indonesiaなどの実在するプラットフォームをビジュアルと機能面の参考にしながら、自分なりのアレンジを加えて制作しました。わずか4日間で、入札の流れ、商品管理、直感的なUIまで、アプリ全体を一人で設計・開発しました。試験という時間的プレッシャーの中で、スピードと完成度のバランスを取ることが最大の挑戦でした。",
    projects_lelangku_desc:
      "シンプルでインタラクティブな画面で、オークション出品中の商品への入札を簡単に行えるWebベースのオークションアプリです。",
    projects_spp_durasi: "3ヶ月",
    projects_spp_peran: "フルスタック開発者 – SPPモジュール担当",
    projects_spp_alasan:
      "このプロジェクトは、学校のPKK課題として、RA Darul Ikhlas（幼稚園）向けの管理Webアプリを構築するために取り組みました。私を含む3人のチームで開発を進め、システムを3つの主要モジュールに分担しました。私はSPPモジュールをエンドツーエンドで全面的に担当しました。フロントエンドでは月謝支払いページ、取引履歴、生徒ごとの支払い履歴画面を設計・実装し、バックエンドでは月次支払いの記録ロジック、データバリデーション、支払い状況レポート機能を構築しました。各モジュールは並行して開発され、最終的に一つの統合システムとして結合されました。このプロジェクトを通じて、独立して開発されたモジュール間でデータベース構造とデータフローを一致させるための、チーム内コミュニケーションの重要性を実感しました。",
    projects_spp_desc:
      "RA Darul Ikhlas教育機関における生徒の支払い記録と管理を効率化するために設計されたWebベースのSPP支払いアプリです。",
    cta_text: "一緒に意味のあるものを作りましょう！",
    cta_button: "お問い合わせ",
    contact_title: "お問い合わせ",
    contact_name: "お名前",
    contact_email: "メールアドレス",
    contact_message: "メッセージ",
    contact_submit: "送信する",
    thanksTitle: "送信ありがとうございました！",
    thanksDesc:
      "メッセージは正常に送信されました。内容を確認のうえ、折り返しご連絡いたします。",
    thanksBtn: "ホームへ戻る",
    thanksFootnote:
      "今後のご協力を楽しみにしております ✦ またのご連絡をお待ちしております。",
  },
};
const cvFiles = {
  id: "img/CV M Akmal Web Dev.pdf",
  en: "img/CV M Akmal Web Dev EN.pdf",
  ja: "img/CV M Akmal Web Dev JP.pdf",
};
let currentLang = "id";

// Language Toggle
function applyLang(lang) {
  const t = translations[lang] || translations["id"];

  document.querySelectorAll("[data-lgn]").forEach((el) => {
    const key = el.getAttribute("data-lgn");
    if (t[key]) el.innerHTML = t[key];
  });

  document.querySelectorAll("[data-lgn-place]").forEach((el) => {
    const key = el.getAttribute("data-lgn-place");
    if (t[key]) el.placeholder = t[key];
  });

  document.querySelectorAll("[data-lgn-value]").forEach((el) => {
    const key = el.getAttribute("data-lgn-value");
    if (t[key]) el.value = t[key];
  });

  const cvLink = document.getElementById("cv-download");
  if (cvLink && cvFiles[lang]) {
    cvLink.href = cvFiles[lang];
    cvLink.setAttribute("download", "");
  }

  document.documentElement.setAttribute("lang", lang);
}

function setLang(lang) {
  localStorage.setItem("lang", lang);
  applyLang(lang);
  currentLang = lang;

  document.querySelectorAll(".lang-switcher button").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });
}

function initLang() {
  const savedLang = localStorage.getItem("lang") || "id";
  setLang(savedLang);
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLang();
  initCertModal();
  initImageModal();
  initMenuToggle();
  initScrollReveal();
});

// Cert Modal
function initCertModal() {
  const certModal = document.getElementById("cert-modal");
  const certModalImg = document.getElementById("cert-modal-img");
  const certModalClose = document.getElementById("cert-modal-close");
  const certImages = document.querySelectorAll(".sertifikat-row img");

  if (!certModal || !certModalImg || !certModalClose) return;

  certImages.forEach((img) => {
    img.addEventListener("click", () => {
      certModalImg.src = img.src;
      certModalImg.alt = img.alt;
      certModal.style.display = "flex";
    });
  });

  certModalClose.addEventListener("click", (e) => {
    e.stopPropagation();
    certModal.style.display = "none";
  });

  certModal.addEventListener("click", (e) => {
    if (e.target === certModal) {
      certModal.style.display = "none";
    }
  });
}

// Image Modal
function initImageModal() {
  const modal = document.getElementById("img-modal");
  const modalClose = document.getElementById("modal-close");
  const modalImg = document.getElementById("modal-img");
  const modalDesc = document.getElementById("modal-desc");
  const modalPrev = document.getElementById("modal-prev");
  const modalNext = document.getElementById("modal-next");
  const modalTitle = document.getElementById("modal-title");
  const modalChips = document.getElementById("modal-chips");
  const btnMore = document.getElementById("btn-selengkapnya");
  const detailPanel = document.getElementById("modal-detail");
  const detailAlasan = document.getElementById("detail-alasan");
  const detailStack = document.getElementById("detail-stack");
  const detailTahun = document.getElementById("detail-tahun");
  const detailDurasi = document.getElementById("detail-durasi");
  const detailPeran = document.getElementById("detail-peran");

  if (
    !modal ||
    !modalClose ||
    !modalImg ||
    !modalDesc ||
    !modalPrev ||
    !modalNext
  )
    return;

  let currentImages = [];
  let currentIndex = 0;

  function showImage(index) {
    currentIndex = index;
    modalImg.src = currentImages[currentIndex];

    const hasMultiple = currentImages.length > 1;
    modalPrev.style.display = hasMultiple ? "flex" : "none";
    modalNext.style.display = hasMultiple ? "flex" : "none";

    const counter = document.getElementById("modal-counter");
    if (counter) {
      counter.textContent = hasMultiple
        ? `${currentIndex + 1} / ${currentImages.length}`
        : "";
    }
  }

  function openModal(card) {
    detailPanel.classList.remove("expanded");
    btnMore.classList.remove("expanded");
    btnMore
      .querySelector("span")
      .setAttribute("data-lgn", "modal_selengkapnya");
    btnMore.querySelector("i").className = "bx bx-chevron-down";

    const raw = card.dataset.images;
    currentImages = raw ? JSON.parse(raw) : [card.querySelector("img").src];
    showImage(0);

    modalDesc.textContent = card.querySelector("p").textContent;
    modalTitle.textContent = card.dataset.title;

    const chips = card.dataset.chips ? JSON.parse(card.dataset.chips) : [];
    modalChips.innerHTML = chips
      .map((c) => `<span class="chip">${c}</span>`)
      .join("");

    detailAlasan.setAttribute("data-lgn", card.dataset.alasanLgn);
    detailDurasi.setAttribute("data-lgn", card.dataset.durasiLgn);
    detailPeran.setAttribute("data-lgn", card.dataset.peranLgn);

    detailTahun.textContent = card.dataset.tahun;

    const stack = card.dataset.stack ? JSON.parse(card.dataset.stack) : {};
    detailStack.innerHTML = Object.entries(stack)
      .map(
        ([kat, items]) => `
      <div class="stack-group">
        <p class="stack-group-label">${kat}</p>
        <div class="stack-chips">
          ${items.map((i) => `<span class="stack-chip">${i}</span>`).join("")}
        </div>
      </div>
    `,
      )
      .join("");

    applyLang(currentLang);

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  document.querySelectorAll(".row img").forEach((img) => {
    img.addEventListener("click", () => {
      openModal(img.closest(".row"));
    });
  });

  modalPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage((currentIndex - 1 + currentImages.length) % currentImages.length);
  });

  modalNext.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage((currentIndex + 1) % currentImages.length);
  });

  btnMore.addEventListener("click", () => {
    const isExpanded = detailPanel.classList.toggle("expanded");
    btnMore.classList.toggle("expanded", isExpanded);
    btnMore
      .querySelector("span")
      .setAttribute(
        "data-lgn",
        isExpanded ? "modal_lebih_sedikit" : "modal_selengkapnya",
      );
    btnMore.querySelector("i").className = isExpanded
      ? "bx bx-chevron-up"
      : "bx bx-chevron-down";
    applyLang(currentLang);
  });

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closeModal();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  function initCardChips() {
    document.querySelectorAll(".row").forEach((card) => {
      const chips = card.dataset.chips ? JSON.parse(card.dataset.chips) : [];
      const container = card.querySelector(".row-chips");
      if (!container) return;
      container.innerHTML = chips
        .map((c) => `<span class="chip">${c}</span>`)
        .join("");
    });
  }
  initCardChips();
}

// Menu Toggle
function initMenuToggle() {
  let menu = document.querySelector("#menu-icon");
  let navbar = document.querySelector(".navbar");

  if (!menu || !navbar) return;

  menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  };

  window.onscroll = () => {
    menu.classList.remove("bx-x");
    navbar.classList.remove("active");
  };
}

// Scroll Reveal
function initScrollReveal() {
  if (typeof ScrollReveal === "undefined") return;

  const sr = ScrollReveal({
    distance: "60px",
    duration: 2500,
    reset: true,
  });

  sr.reveal(".home-text", { delay: 200, origin: "top" });
  sr.reveal(".home-img", { delay: 400, origin: "top" });
  sr.reveal(".about, .cta, .resume, .contact, .footer", {
    delay: 200,
    origin: "top",
  });
}
