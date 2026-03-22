var rule = {
    title: '麻豆源码直采-终极版',
    host: 'https://d2r1iw2cxonh4q.cloudfront.net',
    url: '/topic/0/fyclass/fypage/',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://madou.com/',
        'Cookie': 'isAgeModalShownKey=true'
    },
    class_name: '精选好片&MSD系列&淫欲中国&传媒片商&国产视频&日本AV&欧美中字',
    class_url: '13678&13679&13682&30521&30526&30522&13726',
    play_parse: true,

    // 一级：提取海报墙和详情页地址
    一级: "js: var items=[]; var html=request(input); var m=html.match(/dataJson\\s*=\\s*['\"](.*?)['\"]/); if(m){ try { var raw=m[1].replace(/\\\\u0022/g, '\"'); var res=JSON.parse(raw); var list=res.data.videoInfos || res.data.videoInfosList || []; list.forEach(function(it){ if(it.id > 0){ items.push({title:it.title, img:it.coverImg, desc:it.creatorName, url:'/archives/'+it.id+'/'}); } }); } catch(e){} } setResult(items);",
    
    // 二级：提取汉字简介和播放连接
    二级: "js: var html = request(input); var VOD = {}; try { \
    /* 1. 直接获取 var dataJson = '...' 内部的所有内容 */ \
    var m = html.match(/var dataJson\\s*=\\s*'(.*?)'/); \
    if (m) { \
        var rawData = m[1]; \
        \
        /* 2. 开始清洗：把 Unicode 乱码强行替换回正常字符 */ \
        /* 把 \\u0022 换成双引号，把 \\/ 换成斜杠，把 \\u0026 换成 & */ \
        var cleanData = rawData.replace(/\\\\u0022/g, '\"') \
                               .replace(/\\\\\\//g, '/') \
                               .replace(/\\\\u0026/g, '&'); \
        \
        /* 3. 解析成真正的 JS 对象 */ \
        var res = JSON.parse(cleanData); \
        var d = res.data.video; // 定位到视频信息层 \
        \
        /* 4. 直接点对点提取，不再猜位置 */ \
        VOD.vod_name = d.title || '视频播放'; \
        VOD.vod_pic = d.coverImg || ''; \
        VOD.vod_remarks = d.bango || ''; \
        \
        /* 重点：提取你想要的汉字简介 */ \
        VOD.vod_content = d.desc || '暂无简介'; \
        \
        /* 重点：提取播放地址 (注意这里又是套了一层 video) */ \
        var videoStream = d.video || {}; \
        if (videoStream.url) { \
            var path = videoStream.url.replace(/^\\//, ''); \
            VOD.vod_play_from = 'Cloudfront高速直连'; \
            /* 拼接最终地址 */ \
            VOD.vod_play_url = '立即播放$https://d2r1iw2cxonh4q.cloudfront.net/h5/m3u8/' + path; \
        } \
    } else { \
        VOD.vod_content = '源码中未找到 dataJson 变量'; \
    } \
} catch(e) { VOD.vod_content = '清洗解析出错: ' + e.message; } setResult(VOD);",
    
    lazy: "js: input = {jx:0, url:input.split('$')[1], parse:0, header: JSON.stringify({'User-Agent': 'Mozilla/5.0', 'Referer': 'https://madou.com/'}) };"
};
