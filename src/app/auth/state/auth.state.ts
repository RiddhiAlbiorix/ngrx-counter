import { User } from "src/app/modals/user.modal";

export interface AuthState {
  user: User | null
}

export const initialState: AuthState = {
  user: null,
};
