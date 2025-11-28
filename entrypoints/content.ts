export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  async main() {
    const deleteId = ["guide-inner-content", "items", "guide-button", "secondary"];

    // MutationObserverを使用して要素の削除を監視する関数
    const observeAndDelete = (id: string) => {
      const el = document.getElementById(id);
      if (el) el.remove();

    };

    const delId = () => {
      deleteId.forEach(id => { observeAndDelete(id) });
    }

    // bodyの内容を変更する関数
    const changeBody = () => {
      const body = document.querySelector("body");
      if (body) {
        body.innerHTML = `<style>body{margin:0;padding:0;font-family:"Roboto",Arial,sans-serif;background-color:#0f0f0f;color:#f1f1f1}.search-container{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:0}.logo-container{margin-bottom:40px;text-align:center}.logo{font-size:48px;font-weight:bold;color:#ff0000;text-shadow:2px 2px 4px rgba(0,0,0,0.3)}.search-wrapper{width:100%;max-width:600px;position:relative}.search-box{width:100%;padding:12px 48px 12px 16px;font-size:16px;border:1px solid #303030;border-radius:40px;background-color:#121212;color:#f1f1f1;outline:none;transition:all .3s ease;box-sizing:border-box}.search-box:focus{border-color:#1c62b9;box-shadow:0 0 0 1px #1c62b9}.search-box::placeholder{color:#717171}.search-icon{position:absolute;right:16px;top:50%;transform:translateY(-50%);width:24px;height:24px;opacity:.6;pointer-events:none}.suggestions{margin-top:20px;text-align:center}.suggestions-title{color:#aaa;font-size:14px;margin-bottom:12px}.suggestion-chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}.chip{padding:8px 16px;background-color:#272727;border-radius:20px;font-size:14px;color:#f1f1f1;cursor:pointer;transition:background-color .2s ease}.chip:hover{background-color:#3e3e3e}</style><div class="search-container"><div class="logo-container"><div class="logo">YouTube</div></div><div class="search-wrapper"><input type="text" class="search-box" placeholder="検索" autofocus/><svg class="search-icon" viewBox="0 0 24 24" fill="#f1f1f1"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></div><div class="suggestions"><div class="suggestions-title">人気の検索</div><div class="suggestion-chips"><div class="chip">音楽</div><div class="chip">ゲーム</div><div class="chip">ニュース</div><div class="chip">映画</div><div class="chip">スポーツ</div></div></div></div>`;
        const searchBox = document.querySelector('.search-box') as HTMLInputElement;
        if (searchBox) {
          searchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && searchBox.value.trim()) {
              const searchQuery = encodeURIComponent(searchBox.value.trim());
              window.location.href = `https://www.youtube.com/results?search_query=${searchQuery}`;
            }
          });
        }

        // チップのクリックイベントを追加
        const chips = document.querySelectorAll('.chip');
        chips.forEach(chip => {
          chip.addEventListener('click', () => {
            const query = encodeURIComponent(chip.textContent || '');
            window.location.href = `https://www.youtube.com/results?search_query=${query}`;
          });
        });
      }
    }

    const checkHome = () => {
      if (location.pathname === "/") {
        observerContents();
      } else {
        delId();
      }
    };

    // MutationObserverを使用して#contentsの変更を監視する関数
    const observerContents = () => {
      changeBody();
      const observer = new MutationObserver(() => {
        const target = document.getElementById("contents");
        if (target) {
          changeBody();
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    if (location.pathname === "/") {
      observerContents();
    } else {
      delId();
    }

    window.addEventListener("yt-navigate-finish", () => {
      checkHome();
    });
  },
});