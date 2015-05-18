
/**
 * @name chart.js
 * @description 根据name来加载绘图文件，并执行draw方法
 */

'use strict'

Y.define('chart', [], function() {

    var http = Y.use('http')

    var chart = {

        draw: function(name, svg, data, config) {

            var url = './js/chart/' + name + '.js'

            http.getScript(url, function() {

                var c = eval('new ' + name + '(svg, data)')
                // TODO: selector将作为chartMap中的key值，暂时使用用户定义的id
                var id = svg.getAttribute('id')
                var self = Y.find('#' + id)

                // TODO: selector暂时使用id代替
                self.chart = {
                    selector: id,
                    name: name,
                    obj: c,
                    data: data,
                }

                // 将所有config绑定到图表对象上
                for (var k in config) {

                    c[k] = config[k]
                }

                c.draw()

                // 绑定事件
                Y.bindEvent(self)
            })
        }
    }

    return chart
})
/**
 * 2015.5.18
 * 放弃了原使用css的设计，样式改从config中读取
 * 绘图后会进行事件绑定
 * 
 */
