import template from "virtual:template";
import dayjs from "dayjs";

class CalendarGraph extends HTMLElement {
  constructor() {
    super();

    const attrNames = this.getAttributeNames();
    console.log("attrNames", attrNames);

    const shadow = this.attachShadow({ mode: "closed" });
    const templateElem = document.createElement(
      "template"
    ) as HTMLTemplateElement;
    templateElem.innerHTML = template;
    console.log(templateElem);
    const content = templateElem.content.cloneNode(true) as HTMLTemplateElement;

    const props = attrNames.reduce((obj, name) => {
      obj[name] = this.getAttribute(name);
      return obj;
    }, {} as Record<string, any>);

    // show props in pre tag
    const NODE_ENV = process.env.NODE_ENV;
    if (
      NODE_ENV === "development" ||
      NODE_ENV === "dev" ||
      NODE_ENV === "test"
    ) {
      const pre = document.createElement("pre");
      pre.innerHTML = JSON.stringify(props, null, 2);
      content.appendChild(pre);
    }

    const count =
      Math.abs(
        dayjs(props["date-start"]).diff(dayjs(props["date-end"]), "day")
      ) + 1;
    console.log("count", count);

    shadow.appendChild(content);
  }
}

window.customElements.define("calendar-graph", CalendarGraph);
