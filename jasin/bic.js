javascript:(function() {
var insertHtml=`
<!-- loading -->
<div id='loading' class='is-hide'>
  <div class='cv-spinner'>
    <span class='spinner'></span>
  </div>
</div>
<!-- loading -->
`;
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
`;
function bic_items() {
  var items = null;

  if(h.match(/biccamera.com/)){
    var elems = d.querySelectorAll('li.prod_box');
    items = Array.from(elems).map((e) => {
      var _a;

      // 商品URL
      var url = e.querySelector('a.bcs_item').attributes['href'].textContent;
      // 価格 number | NaN
      _a = e.querySelector('p.bcs_price>span');
      var price = parseInt(_a ? _a.textContent.replace(/[,|円]/g, '') : void 0);
      // 販売終了時の価格 number | NaN
      _a = e.querySelector('p.bcs_price_soldout>span');
      var price_soldout = parseInt(_a ? _a.textContent.replace(/[,|円]/g, '') : void 0);
      // ポイント number | NaN
      _a = e.querySelector('p.bcs_point>span');
      var point = parseInt(_a ? _a.textContent.replace(/[,|ポイント]/g, '') : void 0);

      // '販売を終了しました' | '予定数の販売を終了しました'
      _a = e.querySelector('p.label_gray');
      var label = _a ? e.querySelector('p.label_gray').textContent : void 0;

      // ポイント率
      var ratio = Math.round((point / (price || price_soldout) * 100) || 0);
      return [price || price_soldout, ratio, label, url];
    })
    .filter((item) => {
      var [price, ratio, label, url] = [...item];
      return ( ratio === 1 && label.match(/販売を終了しました/) ) ? true : false;
    });
  }
  return items
}

var d=document,
  h=window.location.hostname,
  e=d.querySelector('div#loading');
if(!e || e.classList.contains('is-hide')) {
  if(!e) {
    d.querySelector('head').insertAdjacentHTML('beforeend', insertCSS);
    d.querySelector('body').insertAdjacentHTML('afterbegin', insertHtml);
  }
  var items = bic_items();
  if(items) {
    d.getElementById('loading').classList.remove('is-hide');

    var text = d.createElement('textarea');
    text.textContent = items.map((item) => {
      var [price, ratio, label, url] = [...item];
      return [url];
    }).join('\n');
    d.body.appendChild(text);
    text.select();
    d.execCommand('copy');
    d.body.removeChild(text);

    f=(items) => {
      d.getElementById('loading').classList.add('is-hide');
      setTimeout(alert, 50, `${items.length}件のデータをコピーしました`);
    };
    setTimeout(f, 180, items);
  }
}
})();
