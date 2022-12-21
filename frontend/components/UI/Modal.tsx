import {
  Dialog,
  DialogContent,
  DialogProps,
  IconButton,
  Stack,
  SxProps,
  Theme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ThemedStyles } from "../../types";

type Props = {
  onClose: () => void;
};

const Modal = ({
  children,
  onClose,
  maxWidth = "sm",
  ...props
}: Props & DialogProps) => {
  return (
    <Dialog fullWidth maxWidth={maxWidth} onClose={onClose} {...props}>
      <DialogContent sx={styles.root}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
        >
          <IconButton
            onClick={onClose}
            size="small"
            edge="start"
            sx={{ p: 0.5 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        {children}
      </DialogContent>
    </Dialog>
  );
};

const styles: ThemedStyles = {
  root: {
    px: 2.5,
    color: (theme) => theme.palette.text.primary,
  },
};

export default Modal;
