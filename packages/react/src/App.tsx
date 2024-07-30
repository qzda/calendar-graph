import dayjs from "dayjs";
import "../../style.scss";
import { formatDayjs } from "../../utils";

function App(props: {
  dataFrom?: string | dayjs.Dayjs;
  dataEnd?: string | dayjs.Dayjs;
}) {
  console.log(props);
  const FirstDay = dayjs(`${new Date().getFullYear()}/1/1`);
  const LastDay = dayjs(`${new Date().getFullYear()}/12/31`);
  console.log(formatDayjs(FirstDay), formatDayjs(LastDay));

  return (
    <div className="calendar-graph">
      <table>
        <thead>
          <tr>
            <td></td>
            {new Array(12).fill(null).map((_, index) => {
              return (
                <td
                  key={index}
                  className="ContributionCalendar-label"
                  colSpan={2}
                >
                  {dayjs().month(index).format("MMM")}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {new Array(7).fill(null).map((_, index) => {
            return (
              <tr key={index}>
                <td className="ContributionCalendar-label">
                  {[1, 3, 5].includes(index) &&
                    dayjs().day(index).format("ddd")}
                </td>
                {new Array(10).fill(null).map((_, index2) => {
                  return (
                    <td key={index2} className="ContributionCalendar-day"></td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="footer">
        <div></div>
        <div className="right">
          <span>Less</span>
          {new Array(5).fill(null).map((_, index) => {
            return (
              <div
                className="ContributionCalendar-day"
                data-level={index}
                key={index}
              ></div>
            );
          })}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

export default App;
