var rule = {
    title: '麻豆传媒-全能版',
    host: 'https://madou.com',
    url: '/topic/0/fyclass/0/fypage/', 
    searchUrl: '/searchvideo/**/fypage/',
    searchable: 1,
    quickSearch: 1,
    headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'Referer': 'https://madou.com/',
    },

    // 完善后的分类：包含麻豆精选、国产、日本、欧美等
    class_name: '麻豆精选&传媒片商&国产视频&日本AV&欧美中字',
    class_url: '13678&30521&30526&30522&13726',

    // 一级解析：兼容首页轮播图 + 普通列表
    // 逻辑：匹配所有包含链接的 slide 或 cardBox
    一级: 'js:
        var items = [];
        var html = request(input);
        
        // 1. 解析首页轮播图 (Swiper)
        var swipers = pdfa(html, ".swiper-main .swiper-slide");
        swipers.forEach(function(it) {
            items.push({
                title: pdfh(it, "a&&aria-label"),
                img: pd(it, "img&&data-src-pc") || pd(it, "img&&data-src-mobile"),
                desc: "推荐",
                url: pd(it, "a&&href")
            });
        });

        // 2. 解析常规视频卡片 (针对分类页)
        var cards = pdfa(html, ".cardBox, .stui-vodlist li");
        cards.forEach(function(it) {
            items.push({
                title: pdfh(it, ".cardTitle&&Text") || pdfh(it, "a&&title"),
                img: pd(it, "img&&data-src") || pd(it, "img&&data-original"),
                desc: pdfh(it, ".cardTag&&Text") || "视频",
                url: pd(it, "a&&href")
            });
        });
        setResult(items);
    ',

    // 二级详情页解析
    二级: {
        "title": "h1&&Text",
        "img": "js: var html=request(input); var post=html.match(/posterImg\\s*=\\s*\"(.*?)\"/); input=post?post[1]:'';",
        "desc": ".gldetail-new-breadcrumb&&Text",
        "content": "meta[property='og:description']&&content",
        "tabs": "js: TABS=['官方极速源']",
        "lists": "js: LISTS=[[input]]",
    },

    // 播放解析：直接抓取脚本内的 path 变量并替换转义符
    lazy: `js:
        var html = request(input);
        var pathMatch = html.match(/const\\s+path\\s*=\\s*\"(.*?)\"/);
        if (pathMatch) {
            var path = pathMatch[1];
            var realUrl = "https://madou.com/h5/m3u8/" + path.replace(/\\\\u0026/g, '&');
            input = { jx: 0, url: realUrl, parse: 0 };
        } else {
            input = { jx: 0, url: input, parse: 1 };
        }
    `,

    搜索: '.cardBox; .cardTitle&&Text; img&&data-src; .cardTitle&&Text; a&&href',
}
