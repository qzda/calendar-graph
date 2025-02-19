import template from "virtual:template";
import dayjs from "dayjs";
import { devLog } from "./utils";

function getLevel(count: number) {
  const levels = ["0", "1", "2", "3", "4"] as const;
  if (count === 0) {
    return levels[0];
  }
  if (count < 9) {
    return levels[1];
  }
  if (count < 18) {
    return levels[2];
  }
  if (count < 27) {
    return levels[3];
  }
  return levels[4];
}

class CalendarGraph extends HTMLElement {
  constructor() {
    super();

    const attrNames = this.getAttributeNames();
    devLog("attrNames", attrNames);
    const props = attrNames.reduce((obj, name) => {
      obj[name] = this.getAttribute(name);
      return obj;
    }, {} as Record<string, any>);
    devLog("props", props);

    const shadow = this.attachShadow({ mode: "closed" });
    const templateElem = document.createElement(
      "template"
    ) as HTMLTemplateElement;
    templateElem.innerHTML = template;
    const content = templateElem.content.cloneNode(true) as HTMLTemplateElement;

    const dateStart = props["date-start"]
      ? dayjs(props["date-start"])
      : // 默认为今年第一天
        dayjs().month(0).date(1);
    const dateEnd = props["date-end"]
      ? dayjs(props["date-end"])
      : // 默认为今年最后一天
        dayjs()
          .year(dayjs().year() + 1)
          .month(0)
          .date(1)
          .subtract(1, "day");

    const count = Math.abs(dateStart.diff(dateEnd, "day")) + 1;
    devLog(dateStart.format("YYYY/MM/DD"), dateEnd.format("YYYY/MM/DD"), count);

    type Lump = { count: number; date: dayjs.Dayjs };
    const allLump: Lump[] = new Array(count).fill(0).map((_, index) => {
      return {
        count: (Math.random() * 30) >> 0,
        date: dateStart.add(index, "day"),
      };
    });
    // 默认以周日作为第一行，第一天不是周日的，需要填充空白
    allLump.unshift(
      ...new Array(6 - dateStart.day())
        .fill(0)
        .map((_, index) => {
          return {
            count: -1,
            date: dateStart.subtract(index + 1, "day"),
          };
        })
        .reverse()
    );
    devLog(
      "allLump",
      allLump.map((i) => i.date.format("YYYY/MM/DD"))
    );
    const allLump7: Lump[][] = new Array(7).fill(0).map(() => new Array());
    allLump.forEach((lump, index) => {
      allLump7[index % 7].push(lump);
    });
    devLog("allLump7", allLump7);

    content.querySelector("tbody")!.innerHTML = `${allLump7
      .map((i, index) => {
        const week = [1, 3, 5].includes(index)
          ? dayjs().day(index).format("ddd")
          : "";

        const preTd = `<td class="preTd"><span>${week}</span></td>`;

        const tds = i
          .map((j) => {
            const dataDate = `data-date="${j.date.format("YYYY/MM/DD")}"`;
            const dataLevel =
              j.count > -1 ? `data-level="${getLevel(j.count)}"` : "";

            return `<td ${dataDate} ${dataLevel}></td>`;
          })
          .join("");

        return `<tr>${preTd}${tds}</tr>`;
      })
      .join("")}`;

    const _months: string[] = [];
    // 找到第一个不包含-1的行
    const firstRowNotIncludeNegativeOne = allLump7.find(
      (i) => i[0].count > -1
    )!;
    const headerTd = firstRowNotIncludeNegativeOne.map((i) => {
      const _month = i.date.format("MMM");
      if (_months.at(-1) === _month) {
        return `<td></td>`;
      } else {
        _months.push(_month);
        return `<td><span>${i.date.format("MMM")}</span></td>`;
      }
    });

    content.querySelector(
      "thead tr"
    )!.innerHTML = `<td class="preTd"></td>${headerTd.join("")}`;

    shadow.appendChild(content);
  }
}

initWebComponent();

export default function initWebComponent() {
  window.customElements.define("calendar-graph", CalendarGraph);
}
