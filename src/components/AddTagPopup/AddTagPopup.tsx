import { useEffect, useState } from "react";
import Colorful from "@uiw/react-color-colorful";
import { TextField } from "@mui/material";
import "./AddTagPopup.css";
import { TagService } from "../../services/tag.service";
import GeneralDialog from "../GeneralDialog/GeneralDialog";
import { ReactComponent as AddTaskIcon } from "../../assets/icons/AddTaskIcon.svg";
import useAlert from "../../customHooks/useAlert";
import AlertPopup from "../AlertPopup/AlertPopup";

interface IAddTagProps {
  open: boolean;
  onCancel: () => void;
  tag?: ITag;
}

const AddTagPopup = (props: IAddTagProps) => {
  const [tagColor, setTagColor] = useState("#8A64D6");
  const [tagName, setTagName] = useState("");
  const { setAlert } = useAlert();

  useEffect(() => {
    if (props.tag) {
      setTagColor(props.tag.color);
      setTagName(props.tag.name);
    } else {
      setTagColor("#8A64D6");
      setTagName("");
    }
  }, [props.open]);

  const onSaveTag = () => {
    if (tagName === undefined || tagName === "" || tagName === " ") {
      setAlert("error", "Please enter tag name");
    } else {
      if (props.tag) {
        TagService.updateTag({
          id: props.tag.id,
          name: tagName,
          color: tagColor,
        } as ITag)
          .then((data) => {
            setAlert("success", "Tag updated successfully");
            props.onCancel();
          })
          .catch((err) => {
            setAlert("error", "Could not update tag:( please try again later");
          })
          .finally(() => {
            props.onCancel();
          });
      } else {
        console.log("test");
        TagService.addTag({ name: tagName, color: tagColor } as ITag)
          .then((data) => {
            setAlert("success", "Tag added successfully");
            props.onCancel();
          })
          .catch((err) => {
            setAlert("error", "Could not add tag:( please try again later");
          });
      }
    }
  };

  return (
    <GeneralDialog
      open={props.open}
      onClose={props.onCancel}
      icon={<AddTaskIcon />}
    >
      <div className="addTagPageContainer">
        <Colorful
          color={tagColor}
          onChange={(color) => {
            setTagColor(color.hex);
          }}
          disableAlpha={true}
        />
        <TextField
          label="Tag name"
          value={tagName}
          onChange={(text) => setTagName(text.target.value)}
          required={true}
          placeholder="Tag name"
        />
        <div className="addTagButtonsContainer">
          <button
            className="btn btn__primary add-event__btn"
            onClick={onSaveTag}
          >
            Save
          </button>
          <button
            className="btn btn__secondary add-event__btn"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </div>
        <AlertPopup />
      </div>
    </GeneralDialog>
  );
};

export default AddTagPopup;
