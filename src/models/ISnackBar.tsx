export interface ISnackbar {
  open: boolean,
  type: string,
  message: string
  onClose: Function
}
