export interface AppStore {
    theme: theme;
    changeTheme: (theme: theme) => void
}

export type theme = "dark" | "light";