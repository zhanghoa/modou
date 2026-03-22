var rule = {
    title: '麻豆官方-深度修复版',
    host: 'https://d2r1iw2cxonh4q.cloudfront.net',
    url: '/topic/0/fyclass/fypage/',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://madou.com/',
        'Cookie': 'isAgeModalShownKey=true; is_mobile=0'
    },
    class_name: '精选好片&MSD系列&淫欲中国&传媒片商&国产视频&日本AV&欧美中字',
    class_url: '13678&13679&13682&30521&30526&30522&13726',
    play_parse: true,

    一级: "js: var items=[]; var html=request(input); var m=html.match(/var dataJson\\s*=\\s*'(.*?)'/); if(m){ try { var res = JSON.parse(JSON.parse('\"' + m[1] + '\"')); var list = res.data.videoInfos || res.data.videoInfosList || []; list.forEach(function(it){ if(it.id > 0){ items.push({title: it.title, img: it.coverImg, desc: it.creatorName, url: '/archives/' + it.id + '/' }); } }); } catch(e){} } setResult(items);",
    
    二级: "js: var html=request(input); var VOD={}; try { \
        var m = html.match(/var dataJson\\s*=\\s*'(.*?)'/); \
        if(m){ \
            /* 1. 双重解析还原对象 */ \
            var res = JSON.parse(JSON.parse('\"' + m[1] + '\"')); \
            var d = res.data; \
            /* 2. 进入正确的 video 层级 */ \
            var videoMetadata = d.video || {}; \
            var videoStreamInfo = videoMetadata.video || {}; \
            \
            /* 3. 填充详情信息 */ \
            VOD.vod_name = videoMetadata.title || '视频播放'; \
            VOD.vod_pic = videoMetadata.coverImg || ''; \
            VOD.vod_remarks = videoMetadata.bango || '官方源'; \
            \
            /* 4. 提取汉字简介：路径是 d.video.desc */ \
            VOD.vod_content = videoMetadata.desc || '暂无详细介绍'; \
            \
            /* 5. 提取播放地址：路径是 d.video.video.url */ \
            var path = videoStreamInfo.url || ''; \
            if(!path){ \
                var m_path = html.match(/const path = \"(.*?)\";/); \
                if(m_path) path = m_path[1]; \
            } \
            \
            if(path){ \
                var cleanPath = path.replace(/\\\\u0026/g, '&').replace(/^\\//, ''); \
                VOD.vod_play_from = 'Cloudfront高速线'; \
                VOD.vod_play_url = '立即播放$https://d2r1iw2cxonh4q.cloudfront.net/h5/m3u8/' + cleanPath; \
            } \
        } \
    } catch(e){ VOD.vod_content = '解析深度错误:' + e.message; } setResult(VOD);",
    
    lazy: "js: input = {jx:0, url:input.split('$')[1], parse:0, header: JSON.stringify({'User-Agent': 'Mozilla/5.0', 'Referer': 'https://madou.com/'}) };"
};
