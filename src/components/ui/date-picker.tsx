import {
	formatDate,
	formatToDate,
	getDaysForEachWeekday,
	getTimeSlots,
	getWeekDaysShort,
	isDateInMonth,
	isDateSame,
	isDateToday,
} from "@/utils/date";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
	PropsWithChildren,
	useEffect,
	useReducer,
	useRef,
	useState,
} from "react";
import "react-day-picker/dist/style.css";
import Divider from "./divider";
import Spinner from "../shared/spinner";
import { cn } from "@/utils/helpers";
import React from "react";

interface DatePickerProps {
	enableTimePicker?: boolean;
  type?: "range";
  onChange?: (date: Date) => void;
  onTimeSelect?: (date: string) => void;
  disabledTimeSlots?: Record<string, string[]>;
}

const today = new Date();
const slots = getTimeSlots();
const weekdays = getWeekDaysShort();

export default function DatePicker({ enableTimePicker, type, onChange, onTimeSelect, disabledTimeSlots }: DatePickerProps) {
	const [loading, setLoading] = useState(true);
	const [rendered, forceUpdate] = useReducer((x) => x + 1, 0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
	const [datePickerRef, setDatePickerRef] = useState<HTMLDivElement | null>(
		null
	);
	const [date, setDate] = useState({
		year: today.getFullYear(),
		month: today.getMonth() + 1,
		day: today.getDate(),
	});
  
	const { height } = datePickerRef?.getBoundingClientRect() || {};

	useEffect(() => {
		if (rendered <= 1) {
			forceUpdate();
		} else {
			setLoading(false);
		}
	}, [rendered]);

  const generateCalenderUi = ({ year, month, day }: typeof date) => {
    const datesOfMonth = getDaysForEachWeekday(year, month);

    return (
      <div
        className="w-full"
        key={enableTimePicker + ""}
        ref={setDatePickerRef}
      >
        <div className="flex items-center justify-between">
          <DatePicker.Cell
            onClick={() => setDate((values => {
              const newValues = {...values};
              if (newValues.month === 0) {
                newValues["year"] = newValues.year - 1;
                newValues["month"] = 11;
              } else {
                newValues["month"] = newValues.month - 1;
              }
              return newValues;
            }))}
          >
            <ChevronLeft className="size-5 text-foreground/50" />
          </DatePicker.Cell>
          <span className="text-lg font-medium font-geist-mono text-foreground">
            {formatDate(year, month, day, "MMMM yyyy")}
          </span>
          <DatePicker.Cell
            onClick={() => setDate((values => {
              const newValues = {...values};
              if (newValues.month === 11) {
                newValues["year"] = newValues.year + 1;
                newValues["month"] = 0;
              } else {
                newValues["month"] = newValues.month + 1;
              }
              return newValues;
            }))}
          >
            <ChevronRight className="size-5 text-foreground/50" />
          </DatePicker.Cell>
        </div>

        <ul className="w-full mt-2">
          <li className="grid grid-cols-7">
            {weekdays.map((weekDay) => (
              <DatePicker.Cell
                key={weekDay}
                className="text-sm font-medium font-geist-mono text-foreground/50 w-full"
                readOnly
              >
                {weekDay}
              </DatePicker.Cell>
            ))}
          </li>
          {new Array(6).fill("").map((_, spaceKey) => (
            <li key={"MonthRow" + spaceKey} className="grid grid-cols-7">
              {weekdays.map((weekDay) => {
                const cell =
                  datesOfMonth?.[weekDay]?.[spaceKey];
                const isDateInMon = isDateInMonth(cell.year, cell.month, cell.day, year, month);
                const isToday = isDateToday(cell.year, cell.month, cell.day);

                return (
                  <DatePicker.Cell
                    key={weekDay}
                    className="text-sm font-medium font-geist-mono text-foreground/50 w-full"
                    readOnly={!isDateInMon}
                    disabled={!isDateInMon}
                    selected={isToday}
                    onClick={() => {
                      setDate(cell);
                      onChange?.(formatToDate(cell.year, cell.month, cell.day));
                    }}
                  >
                    {cell.day}
                  </DatePicker.Cell>
                );
              })}
            </li>
          ))}
        </ul>
      </div>
    )
  }

	return (
		<div className="w-full flex relative">
			{loading && (
				<div className="absolute inset-0 w-full h-full flex justify-center items-center bg-background z-50">
					<Spinner />
				</div>
			)}
			<div className="w-full py-2 px-3 flex-1 flex items-start">
				{generateCalenderUi({
          year: date.year,
          month: date.month,
          day: date.day
        })}
				{type === "range" && generateCalenderUi({
          year: date.year,
          month: date.month >= 0 && date.month < 12 ? date.month + 1 : date.month === 12 ? 1 : 12,
          day: date.day
        })}
			</div>
			{enableTimePicker && type !== 'range' && height && height > 0 && (
				<>
					<Divider className="h-auto self-stretch w-[2px] my-4" />
					<ul
						className="my-4 px-3 w-max overflow-y-auto flex flex-col gap-2"
						style={{ height }}
					>
						{slots
							.map((item) => ({
								title: item,
								disabled: disabledTimeSlots && Object.keys(disabledTimeSlots).map(key => isDateSame(new Date(key), formatToDate(date.year, date.month, date.day)) ? disabledTimeSlots[key] : undefined)?.filter(Boolean)?.[0]?.some(time => time === item) || false,
								selected: item === selectedTimeSlot,
							}))
							.map((slot) => (
								<li
                  key={slot.title}
									className={cn(
										"w-full text-sm font-medium font-geist-mono text-foreground/50 hover:text-foreground transition",
										{
											"text-foreground/10 pointer-events-none": slot.disabled,
											"text-primary": slot.selected,
										}
									)}
								>
									<button disabled={slot.disabled} type="button" onClick={() => {
                    setSelectedTimeSlot(slot.title);
                    onTimeSelect?.(slot.title);
                  }}>{slot.title}</button>
								</li>
							))}
					</ul>
				</>
			)}
		</div>
	);
}

DatePicker.Cell = ({
	children,
	className,
	readOnly,
	disabled,
	onClick,
	selected,
}: PropsWithChildren<{
	className?: string;
	readOnly?: boolean;
	disabled?: boolean;
	selected?: boolean;
	onClick?: () => void;
}>) => {
	return (
		<button
			type="button"
      onClick={onClick}
			className={cn(
				"border-none outline-none flex justify-center items-center w-10 aspect-square rounded-full relative transition",
				className,
				{
					"hover:bg-foreground/20": !readOnly,
					"text-foreground/20": disabled,
					"bg-primary text-primary-foreground text-base hover:bg-primary": selected,
				}
			)}
		>
			{children}
		</button>
	);
};
