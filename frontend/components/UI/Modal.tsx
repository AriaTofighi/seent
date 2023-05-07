import {
  Dialog,
  DialogContent,
  DialogContentProps,
  DialogProps,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ThemedStyles } from "../../types";

type Props = {
  onClose: () => void;
  title?: string;
  DialogContentProps?: DialogContentProps;
};

const Modal = ({
  children,
  onClose,
  title,
  maxWidth = "sm",
  DialogContentProps,
  ...props
}: Props & DialogProps) => {
  const dialogContentSx = {
    ...styles.root,
    ...(DialogContentProps?.sx as SxProps<Theme>),
  };

  return (
    <Dialog fullWidth maxWidth={maxWidth} onClose={onClose} {...props}>
      <DialogContent {...DialogContentProps} sx={dialogContentSx}>
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
        {title && (
          <Typography variant="h5" mb={2}>
            {title}
          </Typography>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

const styles: ThemedStyles = {
  root: {
    px: 2,
    py: 1.5,
    color: (theme) => theme.palette.text.primary,
  },
};

export default Modal;
