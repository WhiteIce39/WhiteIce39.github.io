try {
    // 创建 <link> 标签并监听其加载完成事件
    const link = $("<link>", {
        href: "live2d/assets/waifu.css?v=1.4.2",
        rel: "stylesheet",
        type: "text/css"
    });

    link.on('load', function () {
        // 等 CSS 加载完成后再插入 Live2D 组件
        $('body').append(`
            <div class="waifu">
                <div class="waifu-tips"></div>
                <canvas id="live2d" class="live2d"></canvas>
                <div class="waifu-tool">
                    <span class="fui-home"></span>
                    <span class="fui-chat"></span>
                    <span class="fui-eye"></span>
                    <span class="fui-user"></span>
                    <span class="fui-photo"></span>
                    <span class="fui-info-circle"></span>
                    <span class="fui-cross"></span>
                </div>
            </div>
        `);

        // 异步加载 JS 资源后再初始化
        $.when(
            $.ajax({url: 'live2d/assets/waifu-tips.js?v=1.4.2', dataType: "script", cache: true}),
            $.ajax({url: 'live2d/assets/live2d.js?v=1.0.5', dataType: "script", cache: true})
        ).done(function () {
            // 设置 Live2D 参数
            live2d_settings['hitokotoAPI'] = 'hitokoto.cn';
            live2d_settings['modelId'] = 5;
            live2d_settings['modelTexturesId'] = 1;
            live2d_settings['modelStorage'] = true;

            // 初始化模型
            initModel('live2d/assets/waifu-tips.json');
        });
    });

    // 把 link 插入到 head
    link.appendTo('head');

} catch (err) {
    console.log('[Error] JQuery is not defined.')
}
