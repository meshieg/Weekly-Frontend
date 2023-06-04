import { useEffect } from "react";
import { TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import "./DisplayAssignment.css";
import useToolbar from "../../customHooks/useToolbar";
import { Priority, PriorityLabels } from "../../utils/constants";
import Tag from "../../components/Tag/Tag";
import { useNewItemsContext } from "../../contexts/NewItemsStore/NewItemsContext";
import { TaskService } from "../../services/task.service";

const textFieldStyle = {
  margin: "1rem 0",
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "black",
  },
};

const DisplayTaskPage = () => {
  const { removeItem } = useNewItemsContext();
  const navigate = useNavigate();
  const navLocation = useLocation();
  const { setToolbar } = useToolbar();
  var taskToShow: ITask = navLocation.state?.task;

  useEffect(() => {
    setToolbar("Task Details", true);

    if (navLocation.state?.isFromDB) {
      //ToDo add request fromDB
    }
  }, []);

  const navToEdit = () => {
    navigate("/add-task", {
      state: { task: taskToShow, isFromDB: navLocation.state?.isFromDB },
    });
  };

  const deleteTask = () => {
    if (navLocation.state?.isFromDB) {
      TaskService.deleteTask(taskToShow.id);
      navigate(-1);
    } else {
      removeItem(taskToShow.id);
      navigate(-1);
    }
  };

  return (
    <>
      {taskToShow === undefined ? (
        <>nothing to show</>
      ) : (
        <div className="pageContainer">
          <div className="fieldsContainer">
            <TextField
              value={taskToShow.title}
              disabled={true}
              label="Title"
              variant="standard"
              sx={textFieldStyle}
              inputProps={{ style: { color: "black" } }}
            />
            <TextField
              value={taskToShow.location === "" ? " " : taskToShow.location}
              disabled={true}
              label="Location"
              variant="standard"
              sx={textFieldStyle}
            />
            <TextField
              value={taskToShow.dueDate.toLocaleDateString()}
              disabled={true}
              label="Due date"
              variant="standard"
              sx={textFieldStyle}
            />
            <TextField
              value={taskToShow.dueDate.toLocaleTimeString()}
              disabled={true}
              label="Due time"
              variant="standard"
              sx={textFieldStyle}
            />
            <TextField
              value={
                taskToShow.description === "" ? " " : taskToShow.description
              }
              multiline
              disabled={true}
              label="Description"
              variant="standard"
              sx={textFieldStyle}
            />
            <TextField
              value={PriorityLabels[taskToShow.priority as Priority]}
              // value={ PriorityLabels[taskToShow.priority]}
              disabled={true}
              label="Priority"
              variant="standard"
              sx={textFieldStyle}
            />
            <Tag
              width="2.8rem"
              label={taskToShow.tag?.name}
              color={taskToShow.tag?.color}
            />
          </div>
          <div className="btnContainer">
            <button
              className="btn btn__primary display__button"
              onClick={navToEdit}
            >
              Edit
            </button>
            <button
              className="btn btn__primary display__button"
              onClick={deleteTask}
              style={{ background: "#d32f2f", border: "#d32f2f" }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default DisplayTaskPage;
