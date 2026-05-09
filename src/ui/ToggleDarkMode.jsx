import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

export default function ToggleDarkMode() {
    const { darkMode, toggleDarkMode } = useDarkMode();
    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
    );
}