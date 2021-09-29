export interface SharedState {
  showLoading: boolean;
  errorMessage: string;
}

export const initialstate: SharedState = {
  showLoading: false,
  errorMessage: ''
}