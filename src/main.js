var $siteList = $('.siteList')
var $lastli = $siteList.find('li.last')
var x = localStorage.getItem('N');
var xObject = JSON.parse(x)
var hashMap = xObject || [{
    logo: 'A',
    url: 'https://www.acfun.cn'
}, {
    logo: 'B',
    url: 'https://www.bilibili.com'
}];

console.log(hashMap)
var simplify = function simplify(url) {
    return url.replace('https://', '').replace('www.', '').replace('http://', '').replace(/\/.*/, '')//删除/开头的内容
};
var render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo[0]}</div>
            <div class="link">${simplify(node.url)}</div>
            <div class="close">
             <svg class="icon">
               <use xlink:href="#icon-close"></use>
             </svg>
         </div>
        </div>
    </li>`).insertBefore($lastli);
        $li.on('click', () => window.open(node.url))
        $li.on('click', '.close', (e) => {
            e.stopPropagation()   //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render();
$('.addButton').on('click', () => {
    let url = window.prompt("您添加的网站是？")
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
        logo: simplify(url)[0].toUpperCase(),
        url: url
    })
    render();
});

window.onbeforeunload = () => {
    var string = JSON.stringify(hashMap)  //对象变成字符串
    window.localStorage.setItem('N', string)

}


$(document).on('keypress', (e) => {
    const key = e.key
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})