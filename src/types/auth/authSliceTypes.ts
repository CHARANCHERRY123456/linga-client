interface User {
    id: string;
    email: string;
    username?: string;
    avatar?: string;
}

interface AuthRootState {
    auth: {
        isLoading: boolean;
        error: string | null;
        isAuthenticated: boolean;
        user: User | null;
    }
}

export type { AuthRootState, User };