var rule = {
    title: '麻豆官方',
    host: 'https://madou.com',
    url: '/topic/0/fyclass/0/fypage/',
    searchUrl: '/searchvideo/**/fypage/',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'Referer': 'https://madou.com/',
        'Cookie': 'isAgeModalShownKey=true; is_mobile=1'
    },
    class_name: '精选好片&MSD系列&淫欲中国&传媒片商&国产视频&日本AV&欧美中字',
    class_url: '13678&13679&13682&30521&30526&30522&13726',
    play_parse: true,
    lazy: "js: var html = request(input); var m = html.match(/const\\s+path\\s*=\\s*\"(.*?)\"/); if (m) { var p = m[1].replace(/\\\\u0026/g, '&'); input = { jx: 0, url: 'https://madou.com/h5/m3u8/' + p, parse: 0 }; } else { input = { jx: 0, url: input, parse: 1 }; }",
    limit: 6,
    推荐: '*',
    "一级": "js: try { var items = []; var html = request(input); if (!html) { items.push({title: '⚠️ 网页超时', img: '', desc: '网络问题', url: input}); } else if (html.indexOf('Cloudflare') !== -1 || html.indexOf('Just a moment') !== -1) { items.push({title: '⚠️ 被防火墙拦截', img: '', desc: '请换节点', url: input}); } else { var list = pdfa(html, '.cardBox, .section-content__item, .video-card, .list-item, div[class*=\"item\"]'); if (list.length === 0) { items.push({title: '⚠️ 找到0个视频', img: '', desc: '改版或空分类', url: input}); } else { list.forEach(function(it) { var title = pdfh(it, '.cardTitle&&Text') || pdfh(it, 'img&&alt') || pdfh(it, 'a&&title'); var img = pd(it, 'img&&data-src') || pd(it, 'img&&src'); var url = pd(it, 'a&&href'); if (title && url) { items.push({ title: title.trim(), img: img, desc: pdfh(it, '.cardTag&&Text') || 'HD', url: url }); } }); } } setResult(items); } catch(e) { setResult([{title: '❌ 解析出错: ' + e.message, img: '', desc: '', url: input}]); }",
    二级: {
        "title": "h1&&Text",
        "img": "js: var html = request(input); var m = html.match(/posterImg\\s*=\\s*\"(.*?)\"/); input = m ? m[1] : '';",
        "desc": ".gldetail-new-breadcrumb&&Text",
        "content": "meta[name='description']&&content",
        "tabs": "js: TABS=['官方源']",
        "lists": "js: LISTS=[[input]]"
    }
};
