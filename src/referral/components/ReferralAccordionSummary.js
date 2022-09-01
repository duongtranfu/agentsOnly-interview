import AccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const CustomAccordionSummary = styled(AccordionSummary)(() => ({
  borderRadius: 6,
  paddingLeft: 0,
  margin: 0,
  height: 64,
  "&:before": {
    display: "none",
  },
  ".MuiAccordionSummary-content": {
    margin: 0,
    height: "100%",
    alignItems: "stretch",
    paddingRight: 16,
    ".number, .text": {
      alignItems: "center",
      justifyContent: "center",
      display: "inline-flex",
    },
    ".number": {
      width: 40,
      color: "#FFF",
    },
    ".text": {
      textAlign: "left",
      width: "calc(100% - 40px - 18px)",
      color: "#3A719B",
      justifyContent: "flex-start",
      marginLeft: 16,
      fontWeight: 500,
      fontSize: 20,
    },
    ".MuiIconButton-root": {
      padding: 0,
    },
  },
}));

const getColor = (number) => {
  switch (number) {
    case 1:
      return "#25A575";
    case 2:
      return "#2595A5";
    case 3:
      return "#3A719B";
    case 4:
      return "#254B7A";
    case 5:
      return "#142B58";
    default:
      return "#25A575";
  }
};

export const ReferralAccordionSummary = ({
  number,
  text,
  isShowExpandIcon = true,
  isShowDeleteButton = true,
  onRemove
}) => {
  const handleClickRemove = (e) => {
    e.stopPropagation();
    onRemove();
  };
  return (
    <CustomAccordionSummary expandIcon={isShowExpandIcon && <ExpandMoreIcon />}>
      <div
        style={{
          backgroundColor: getColor(number),
        }}
        className="number"
      >
        {number}
      </div>
      <div className="text">{text.trim() || 'New Referral'}</div>
      {isShowDeleteButton && <IconButton
        size="small"
        sx={{
          "&:hover": { backgroundColor: "unset" },
        }}
        aria-label="delete"
        onClick={handleClickRemove}
      >
        <DeleteIcon fontSize="16" />
      </IconButton>}
    </CustomAccordionSummary>
  )
};
