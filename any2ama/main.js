[j] = document.documentElement.innerHTML.match(/(45|49)\d{11}/);
j && (window.open('http://www.amazon.co.jp/s/ref=nb_sb_noss?url=search-alias=aps&field-keywords=' + j.trim(), '_blank'));
