import { ThunkAction, UnknownAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>;
