var h = window.location.hostname,
  tag,
  ts,
  s = null;

if (h.match(/biccamera.rakuten.co.jp/)) {
  s = location.href.match(/([0-9]+)/)[1];
}
else if (h.match(/rakuten.co.jp/)) {
  s = document.getElementById('ratRanCode').value;
}
else if (h.match(/joshinweb.jp/)) {
  s = document.getElementsByName('SM_ID')[0].value;
}
else if (h.match(/yamada-denkiweb.com/)) {
  ts = document.querySelectorAll('div.spec-table th');
  for (let i = 0; i < ts.length; i++) {
    if (ts[i].textContent.match(/JAN/)) {
      s = ts[i].nextElementSibling.textContent;
      break;
    }
  }
}
else if (h.match(/edion.com/)) {
  tag = document.getElementsByClassName('modelInfo')[0];
  s = tag.getElementsByTagName('dd')[2].textContent;
}
else if (h.match(/online.nojima.co.jp/)) {
  tag = document.querySelector('span[itemprop=identifier]');
  s = tag.getElementsByTagName('span')[0].textContent;
}
else if (h.match(/shop.hikaritv.net/)) {
  tag = document.querySelector('table.specTable');
  ts = tag.getElementsByTagName('td');
  s = ts[ts.length - 1].textContent;
}
else if (h.match(/ebest.co.jp/)) {
  tag = document.querySelector('form[name=frm_accesory]');
  s = tag.getElementsByTagName('input')[0].value;
}
else if (h.match(/ksdenki.com/)) {
  tag = document.querySelector('span.goodsspec_detail_code_');
  s = tag.textContent.substr(4);
}
else if (h.match(/wowma.jp/)) {
  tag = document.querySelector('link[rel=canonical]');
  s = tag.href.match(/jan(.+)/)[1];
}
else if (h.match(/bookoffonline.co.jp/)) {
  ts = document.querySelectorAll('div.infotxt th');
  for (let i = 0; i < ts.length; i++) {
    if (ts[i].textContent.match(/JAN/)) {
      s = ts[i].nextElementSibling.textContent;
      break;
    }
  }
}
else if (h.match(/tsutaya.co.jp/)) {
  tag = document.querySelector('div.tolImg a');
  s = tag.getAttribute('onclick').match(/janCd=(\d+)/)[1];
}
else if (h.match(/lohaco.jp/)) {
  ts = document.querySelectorAll('table.prodSpecTable td');
  for (let i = 0; i < ts.length; i++) {
    if (ts[i].textContent.match(/JAN/)) {
      s = ts[i].nextElementSibling.textContent;
      break;
    }
  }
}
else if (h.match(/askul.co.jp/)) {
  tag = document.querySelector('span.janCode');
  s = tag.textContent.match(/([0-9].+)/)[1];
}
else if (h.match(/paypaymall.yahoo.co.jp/)) {
  ts = document.querySelectorAll('li.ItemDetails_list');
  for (let i = 0; i < ts.length; i++) {
    if (ts[i].textContent.match(/JAN/)) {
      s = ts[i].textContent.match(/([0-9].+)/)[1];
      break;
    }
  }
}
else if (h.match(/yahoo.co.jp/)) {
  ts = document.querySelectorAll('div.elRowData');
  for (let i = 0; i < ts.length; i++) {
    tag = ts[i].textContent.trim().match(/([0-9].+)/);
    if (tag) {
      s = tag[1];
      break;
    }
  }
}
else if (h.match(/kaldi.co.jp/)) {
  ts = document.querySelectorAll('p.number');
  for (let i = 0; i < ts.length; i++) {
    tag = ts[i].textContent.trim().match(/([0-9].+)/);
    if (tag) {
      s = tag[1];
      break;
    }
  }
}
else if (h.match(/biccamera.com/)) {
  ts = document.querySelectorAll('script[type="text/javascript"]');
  for (let i = 0; i < ts.length; i++) {
    if (ts[i].textContent.match(/serGoodsStkNo/)) {
      s = ts[i].textContent.match(/serGoodsStkNo : '(.+)'/)[1];
      break;
    }
  }
}
if (s) {
  s = s.trim();
  window.open('http://www.amazon.co.jp/s/ref=nb_sb_noss?url=search-alias=aps&field-keywords=' + s, '_blank');
}
