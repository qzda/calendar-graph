import template from "virtual:template";
import dayjs from "dayjs";
import { devLog } from "./utils";

// todo 根据count判断等级
function getLevel(count: number) {
  const levels = ["0", "1", "2", "3", "4"] as const;
  return levels[(Math.random() * levels.length) >> 0];
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
        count: 0,
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
      .map((i) => {
        return `<tr>${i
          .map((j) => {
            const dataDate = `data-date="${j.date.format("YYYY/MM/DD")}"`;
            const dataLevel =
              j.count > -1 ? `data-level="${getLevel(j.count)}"` : "";

            return `<td ${dataDate} ${dataLevel}></td>`;
          })
          .join("")}</tr>`;
      })
      .join("")}`;

    shadow.appendChild(content);
  }
}

window.customElements.define("calendar-graph", CalendarGraph);
