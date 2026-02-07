/**
 * ═══════════════════════════════════════════════════════════════
 * TOWNGAS AI 設計系統 - 共用 JavaScript
 * 版本 1.0
 * ═══════════════════════════════════════════════════════════════
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════
    // Tab 切換功能
    // ═══════════════════════════════════════════════════════════════
    
    function initTabs() {
        document.querySelectorAll('.tab-item').forEach(tab => {
            tab.addEventListener('click', function() {
                const parent = this.parentElement;
                parent.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // 導航連結高亮
    // ═══════════════════════════════════════════════════════════════
    
    function initNavLinks() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                // 如果是實際頁面連結，不阻止默認行為
                if (this.getAttribute('href') && this.getAttribute('href') !== '#') {
                    return;
                }
                e.preventDefault();
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // 根據當前頁面 URL 設置活動狀態
        const currentPath = window.location.pathname;
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href.replace('.html', ''))) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // 鍵盤快捷鍵
    // ═══════════════════════════════════════════════════════════════
    
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // ⌘K 或 Ctrl+K 聚焦搜尋框
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('header input[type="text"]');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // 文本框自動調整高度
    // ═══════════════════════════════════════════════════════════════
    
    function initAutoResize() {
        const textareas = document.querySelectorAll('textarea[data-auto-resize]');
        textareas.forEach(textarea => {
            textarea.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = Math.min(this.scrollHeight, 200) + 'px';
            });
        });

        // 兼容舊代碼
        const mainTextarea = document.querySelector('textarea');
        if (mainTextarea) {
            mainTextarea.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = Math.min(this.scrollHeight, 200) + 'px';
            });
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // 輪播功能
    // ═══════════════════════════════════════════════════════════════
    
    function initCarousel() {
        const container = document.getElementById('matrix-container');
        const prevBtn = document.getElementById('matrix-prev');
        const nextBtn = document.getElementById('matrix-next');

        if (!container || !prevBtn || !nextBtn) return;

        // 計算捲動距離：一個卡片的寬度 + 間距
        function getScrollAmount() {
            const card = container.querySelector('.matrix-card');
            if (!card) return 0;
            const style = window.getComputedStyle(container);
            const gap = parseInt(style.gap) || 24;
            return card.offsetWidth + gap;
        }

        prevBtn.addEventListener('click', function() {
            container.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', function() {
            container.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // 隱藏滾動條但保持滾動功能
        container.style.scrollbarWidth = 'none';
        container.style.msOverflowStyle = 'none';
    }

    // ═══════════════════════════════════════════════════════════════
    // 搜尋框動畫
    // ═══════════════════════════════════════════════════════════════
    
    function initSearchAnimation() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('focus', function() {
                this.parentElement.classList.add('search-active');
            });
            searchInput.addEventListener('blur', function() {
                this.parentElement.classList.remove('search-active');
            });
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // 試試這樣提問功能
    // ═══════════════════════════════════════════════════════════════
    
    function initQuestionExamples() {
        const textarea = document.querySelector('textarea');
        if (!textarea) return;

        document.querySelectorAll('.neu-card .flex.items-center.gap-3 button').forEach(button => {
            button.addEventListener('click', function() {
                textarea.value = this.textContent;
                textarea.focus();
                // 觸發自動高度調整
                textarea.dispatchEvent(new Event('input'));
            });
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // 檔案上傳功能
    // ═══════════════════════════════════════════════════════════════

    function initFileUpload() {
        const btnAttach = document.getElementById('btn-attach');
        const btnImage = document.getElementById('btn-image');
        const inputAttach = document.getElementById('input-attach');
        const inputImage = document.getElementById('input-image');
        const previewContainer = document.getElementById('file-previews');

        if (!btnAttach || !btnImage || !inputAttach || !inputImage || !previewContainer) return;

        // 觸發文件選擇
        btnAttach.addEventListener('click', () => inputAttach.click());
        btnImage.addEventListener('click', () => inputImage.click());

        // 處理文件選擇
        inputAttach.addEventListener('change', (e) => handleFiles(e.target.files, 'file'));
        inputImage.addEventListener('change', (e) => handleFiles(e.target.files, 'image'));

        function handleFiles(files, type) {
            Array.from(files).forEach(file => {
                const fileId = 'file-' + Math.random().toString(36).substr(2, 9);
                renderPreview(file, fileId, type);
                simulateUpload(fileId);
            });
            // 清空 input 以便再次選擇相同文件
            inputAttach.value = '';
            inputImage.value = '';
        }

        function renderPreview(file, id, type) {
            const card = document.createElement('div');
            card.id = id;
            card.className = 'neu-card p-2 rounded-xl border border-white/10 flex items-center gap-3 min-w-[160px] max-w-[240px] pointer-events-auto animate-fadeIn';
            
            let iconHtml = '';
            if (type === 'image') {
                iconHtml = `
                    <div class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center overflow-hidden">
                        <img src="${URL.createObjectURL(file)}" class="w-full h-full object-cover">
                    </div>`;
            } else {
                iconHtml = `
                    <div class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
                        </svg>
                    </div>`;
            }

            card.innerHTML = `
                ${iconHtml}
                <div class="flex-1 min-w-0">
                    <p class="text-[10px] font-medium text-slate-200 truncate mb-1">${file.name}</p>
                    <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div class="progress-bar h-full bg-emerald-500 w-0 transition-all duration-300"></div>
                    </div>
                </div>
                <button class="text-slate-500 hover:text-red-400 transition-colors p-1" onclick="this.parentElement.remove()">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            `;
            previewContainer.appendChild(card);
        }

        function simulateUpload(id) {
            const card = document.getElementById(id);
            if (!card) return;
            const progressBar = card.querySelector('.progress-bar');
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 30;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setTimeout(() => {
                        progressBar.parentElement.innerHTML = '<span class="text-[9px] text-emerald-400 flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>已上傳</span>';
                    }, 300);
                }
                progressBar.style.width = progress + '%';
            }, 200);
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // 返回頂部功能
    // ═══════════════════════════════════════════════════════════════
    
    function initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });

            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // 移動端菜單
    // ═══════════════════════════════════════════════════════════════
    
    function initMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileNav = document.getElementById('mobile-nav');

        if (menuBtn && mobileNav) {
            menuBtn.addEventListener('click', function() {
                this.classList.toggle('active');
                mobileNav.classList.toggle('active');
            });

            // 點擊菜單項關閉
            mobileNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    menuBtn.classList.remove('active');
                    mobileNav.classList.remove('active');
                });
            });

            // ESC 關閉
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                    menuBtn.classList.remove('active');
                    mobileNav.classList.remove('active');
                }
            });
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // 工具函數
    // ═══════════════════════════════════════════════════════════════
    
    // 防抖函數
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 格式化數字
    function formatNumber(num) {
        if (num >= 10000) {
            return (num / 10000).toFixed(1) + '萬';
        } else if (num >= 1000) {
            return num.toLocaleString();
        }
        return num.toString();
    }

    // 複製到剪貼板
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('複製失敗:', err);
            return false;
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // 語言切換功能
    // ═══════════════════════════════════════════════════════════════
    
    function initLanguageSwitcher() {
        const languageSwitcher = document.querySelector('.language-switcher');
        if (!languageSwitcher) return;

        const traditionalIcon = languageSwitcher.querySelector('.language-icon.traditional');
        const simplifiedIcon = languageSwitcher.querySelector('.language-icon.simplified');
        
        // 從本地存儲讀取當前語言設置
        let currentLanguage = localStorage.getItem('tgai-language') || 'traditional';
        
        // 初始化顯示
        function updateLanguageDisplay() {
            if (currentLanguage === 'traditional') {
                traditionalIcon.classList.remove('hidden');
                traditionalIcon.classList.add('active');
                simplifiedIcon.classList.add('hidden');
                simplifiedIcon.classList.remove('active');
            } else {
                traditionalIcon.classList.add('hidden');
                traditionalIcon.classList.remove('active');
                simplifiedIcon.classList.remove('hidden');
                simplifiedIcon.classList.add('active');
            }
        }
        
        // 切換語言
        function toggleLanguage() {
            currentLanguage = currentLanguage === 'traditional' ? 'simplified' : 'traditional';
            localStorage.setItem('tgai-language', currentLanguage);
            updateLanguageDisplay();
            
            // 這裡可以添加實際的語言切換邏輯
            console.log('切換語言到:', currentLanguage === 'traditional' ? '繁體中文' : '簡體中文');
        }
        
        // 點擊切換語言
        languageSwitcher.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleLanguage();
        });
        
        // 初始化顯示
        updateLanguageDisplay();
    }

    // ═══════════════════════════════════════════════════════════════
    // 初始化
    // ═══════════════════════════════════════════════════════════════
    
    function init() {
        initTabs();
        initNavLinks();
        initKeyboardShortcuts();
        initAutoResize();
        initCarousel();
        initSearchAnimation();
        initQuestionExamples();
        initFileUpload();
        initBackToTop();
        initMobileMenu();
        initLanguageSwitcher();
    }

    // DOM 加載完成後初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 暴露公共 API
    window.TowngasAI = {
        debounce,
        formatNumber,
        copyToClipboard
    };

})();
