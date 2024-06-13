// +----------------------------------------------------------------------
// | quickadmin框架 [ quickadmin框架 ]
// +----------------------------------------------------------------------
// | 版权所有 2020~2022 南京新思汇网络科技有限公司
// +----------------------------------------------------------------------
// | 官方网站: https://www.quickadmin.icu
// +----------------------------------------------------------------------
// | Author: mj <931982149@qq.com>
// +----------------------------------------------------------------------
// | Description:v-edit.onlyread.hidden 禁用、隐藏操作处理 .hidden隐藏 .onlyread 只读
// +----------------------------------------------------------------------

export default {
    inserted(el) {
        setTimeout(() => {
          adjustColumnWidth(el);
        }, 300);
      },
      componentUpdated(el) {
        el.classList.add("r-table");
        setTimeout(() => {
          adjustColumnWidth(el);
        }, 300);
      },
}

function adjustColumnWidth(table) {
    const colgroup = table.querySelector("colgroup");
    const colDefs = [...colgroup.querySelectorAll("col")];
    colDefs.forEach((col) => {
      const clsName = col.getAttribute("name");
      const cells = [
        ...table.querySelectorAll(`td.${clsName}`),
        ...table.querySelectorAll(`th.${clsName}`),
      ];
      // 忽略加了"leave-alone"类的列
      if (cells[0]?.classList?.contains?.("leave-alone")) {
        return;
      }
      const widthList = cells.map((el) => {
        return el.querySelector(".cell")?.scrollWidth || 0;
      });
      const max = Math.max(...widthList);
      const padding = 20;
      table.querySelectorAll(`col[name=${clsName}]`).forEach((el) => {
        el.setAttribute("width", max + padding);
      });
    });


    // 此段代码放入 adjustColumnWidth 内部最后面即可。
    const scrollingBody = table.querySelectorAll("div.is-scrolling-none");
    if(scrollingBody[0]?.classList?.contains?.("is-scrolling-none")) {
    scrollingBody[0].classList.remove("is-scrolling-none");
    scrollingBody[0].classList.add("is-scrolling-left");
    scrollingBody[0].style.overflowX = "auto";
    }

  }
