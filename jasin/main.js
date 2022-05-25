export default () => {
  var insertHtml=`
  <!-- loading -->
  <div id="loading" class="is-hide">
    <div class="cv-spinner">
      <span class="spinner"></span>
    </div>
  </div>
  <!-- loading -->
  `
  var insertCSS=`
  <style>
    #loading{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2147483647;
      width: 100%;
      height:100%;
      background: rgba(0,0,0,0.6);
    }
    #loading .cv-spinner {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    #loading .spinner {
      width: 80px;
      height: 80px;
      border: 4px #ddd solid;
      border-top: 4px #999 solid;
      border-radius: 50%;
      animation: sp-anime 0.8s infinite linear;
    }
    @keyframes sp-anime {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(359deg); }
    }
    #loading.is-hide{
      display:none;
    }
  </style>
  `
  function jasin() {
    var items = null
    if(h.match(/rakuten.co.jp/)){
      var elems = d.querySelectorAll('div.searchresultitem')
      items = Array.from(elems).map((e) => {
        jan = e.querySelector("div.qs-container div.qs-jan div.qs-value").textContent
        asin = e.querySelector("div.qs-container div.qs-asin div.qs-value").textContent
        price = parseInt(e.querySelector("span.important").textContent.replace(/[,|円]/, ""))
        url = e.querySelector("div>a").attributes['href'].textContent
        return [jan,asin,price,url]
      })
    }
    else if(h.match(/yahoo.co.jp/)){
      var elems = d.querySelectorAll("li.LoopList__item")
      if(elems.length) {
        // 商品検索ページ用
        items = Array.from(elems).map((e) => {
          jan = e.querySelector("div.qs-container div.qs-jan div.qs-value").textContent
          asin = e.querySelector("div.qs-container div.qs-asin div.qs-value").textContent
          price = Array.from(e.querySelectorAll("div")).filter((e) => e.hasAttribute("data-postage-beacon")).map((e) => e.textContent).join("")
          price = price.replace(/,/, "").replace(/\d*%[^\d]+/, "").replace(/円.*/, "")
          url = e.querySelector("div>div>a").attributes['href'].textContent
          return [jan,asin,price,url]
        })
      }
      else {
        // ショップページ用
        var elems = d.querySelectorAll("div.mdSearchResult li.elItem")
        items = Array.from(elems).map((e) => {
          jan = e.querySelector("div.qs-container div.qs-jan div.qs-value").textContent
          asin = e.querySelector("div.qs-container div.qs-asin div.qs-value").textContent
          price = e.querySelector("span.elPriceValue").textContent.replace(/[,|円]/g,"")
          url = e.querySelector("a").attributes['href'].textContent
          return [jan,asin,price,url]
        })
      }
    }
    return items
  }

  var d=document,
    h=window.location.hostname,
    e=d.querySelector('div#loading')
  if(!e || e.classList.contains('is-hide')) {
    if(!e) {
      d.querySelector('head').insertAdjacentHTML('beforeend', insertCSS)
      d.querySelector('body').insertAdjacentHTML('afterbegin', insertHtml)
    }
    items = jasin()
    if(items) {
      // show-loading
      d.getElementById('loading').classList.remove('is-hide')

      // copy
      text = d.createElement("textarea")
      text.textContent = items.join('\n')
      d.body.appendChild(text)
      text.select()
      d.execCommand("copy")
      d.body.removeChild(text)

      f=(items) => {
        // hide-loading
        d.getElementById('loading').classList.add('is-hide')
        setTimeout(alert, 75, `items.length : ${items.length}`)
      };
      setTimeout(f, 500, items)
    }
  }
}
