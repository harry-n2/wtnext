/* wtnext 計測スクリプト (GA4 + Google Ads コンバージョン)
   無課金・外部ライブラリなし。下の3行にIDを入れた瞬間に通電する。
   空のままなら一切の通信を行わない（no-op）。

   GA4_ID     Google アナリティクスの測定ID。例 G-XXXXXXXXXX
   ADS_ID     Google 広告のコンバージョンID。例 AW-1234567890
   ADS_LABEL  同コンバージョンアクションのラベル。例 AbC-D_efG

   計測するもの
   1. 全ページの page_view
   2. 公式LINE（lin.ee / line.me）ボタンのクリックを line_click として送信
   3. ADS_ID と ADS_LABEL が入っていれば同じクリックを広告のコンバージョンとして送信
*/
var GA4_ID = "G-WGDFHY84N8";
var ADS_ID = "";
var ADS_LABEL = "";

(function () {
  var ids = [GA4_ID, ADS_ID].filter(function (v) { return !!v; });
  if (ids.length === 0) { return; }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ids[0]);
  document.head.appendChild(s);

  gtag("js", new Date());
  for (var i = 0; i < ids.length; i++) { gtag("config", ids[i]); }

  document.addEventListener("click", function (e) {
    var el = e.target;
    if (!el || typeof el.closest !== "function") { return; }
    var a = el.closest("a[href]");
    if (!a) { return; }
    var href = a.getAttribute("href") || "";
    if (href.indexOf("lin.ee") === -1 && href.indexOf("line.me") === -1) { return; }

    if (GA4_ID) {
      gtag("event", "line_click", {
        link_url: href,
        link_text: (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60),
        page_location: location.href
      });
    }
    if (ADS_ID && ADS_LABEL) {
      gtag("event", "conversion", { send_to: ADS_ID + "/" + ADS_LABEL });
    }
  }, true);
})();
