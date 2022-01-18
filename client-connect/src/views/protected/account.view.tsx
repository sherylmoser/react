import { Button, ButtonGroup } from "semantic-ui-react";
import { useGlobalContext } from "../../contexts/global.context";
import { usePreferencesContext } from "../../contexts/preferences.context";

type ThemeButtonProps = {
    theme: string;
    onChange?: (theme: string) => void;
    currentTheme?: string
    label: string;
}

function ThemeButton({ theme, onChange, currentTheme, label }: ThemeButtonProps) {
    return <Button primary active={theme === currentTheme} onClick={() => onChange?.(theme)}>{label}</Button>
}

export function AccountView() {
    const { state: { user } } = useGlobalContext();
    const { state: { theme }, dispatch, onChangeTheme, onChange } = usePreferencesContext();

    if (!user) {
        return (
            <div>
                <h3>Not logged in</h3>
            </div>
        )
    }
    return (
        <div>
            <div>
                {user.firstName} {user.lastName}
            </div>
            <div>
                <ButtonGroup>
                    <ThemeButton theme="light" label="Light" onChange={(theme: string) => onChange?.("theme", theme)} currentTheme={theme} />
                    <ThemeButton theme="dark" label="Dark" onChange={onChangeTheme} currentTheme={theme} />
                </ButtonGroup>
            </div>
        </div>
    );
}