export interface ReduxEntityBase<T> {
  loading: boolean;
  error: string | undefined;
  data: T;
  success: boolean;
}
