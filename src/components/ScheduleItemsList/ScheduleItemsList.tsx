import React from "react";
import ScheduleItemRow from "../ScheduleItemRow/ScheduleItemRow";
import { instanceOfTask, instanceOfEvent } from "../../utils/typeChecks";

interface IScheduleItemsListProps {
  items: ITask[] | IEvent[];
  onCheckedClick?: (taskId: number) => void;
  onItemClick?: (taskId: number) => void;
  onDeleteClick?: (taskId: number) => void;
  showNoAssignmentIndication?: boolean;
}

const ScheduleItemsList: React.FC<IScheduleItemsListProps> = (props) => {
  return (
    <div style={{ margin: "0 1rem" }}>
      {props.items?.map((item) => {
        return (
          <ScheduleItemRow
            key={item.id}
            id={item.id}
            title={item.title}
            date={
              instanceOfTask(item)
                ? item.dueDate
                : instanceOfEvent(item)
                ? item.startTime
                : new Date("")
            }
            tag={item.tag}
            isDone={instanceOfTask(item) ? item.isDone : undefined}
            displayTime={instanceOfTask(item) ? false : true}
            checkbox={props.onCheckedClick ? true : false}
            onCheckedClick={props.onCheckedClick}
            onClick={props.onItemClick}
            onDeleteClick={props.onDeleteClick}
            infoIndication={
              props.showNoAssignmentIndication &&
              instanceOfTask(item) &&
              (item.assignment === undefined || item.assignment === null)
            }
          />
        );
      })}
    </div>
  );
};

export default ScheduleItemsList;
